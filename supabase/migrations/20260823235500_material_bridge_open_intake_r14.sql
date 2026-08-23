begin;

create table if not exists public.material_bridge_intakes (
  id uuid primary key default gen_random_uuid(),
  actor_kind text not null check (actor_kind in ('individual', 'family', 'school', 'company', 'nonprofit', 'municipality', 'community')),
  full_name text not null check (char_length(full_name) between 2 and 120),
  email text not null check (char_length(email) <= 254 and position('@' in email) > 1),
  organization_name text check (organization_name is null or char_length(organization_name) <= 180),
  listing_type text not null check (listing_type in ('offer', 'request')),
  title text not null check (char_length(title) between 3 and 180),
  category text not null check (category in ('technology', 'workshop_material', 'furniture', 'garden_ecology', 'other')),
  condition_status text not null default 'not_applicable' check (condition_status in ('like_new', 'needs_repair', 'clean_surplus', 'not_applicable')),
  quantity text check (quantity is null or char_length(quantity) <= 120),
  description text check (description is null or char_length(description) <= 3000),
  region text not null check (char_length(region) between 2 and 120),
  locality text check (locality is null or char_length(locality) <= 160),
  handoff_methods text[] not null default '{}',
  personal_involvement text[] not null default '{}',
  locale text not null default 'cs' check (locale in ('cs', 'en')),
  status text not null default 'received' check (status in ('received', 'reviewing', 'accepted', 'declined', 'converted')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.material_bridge_intakes enable row level security;
revoke all on public.material_bridge_intakes from public;
revoke all on public.material_bridge_intakes from anon, authenticated;
grant insert on public.material_bridge_intakes to anon, authenticated;

create policy material_bridge_intake_open_insert_r14
on public.material_bridge_intakes
for insert
to anon, authenticated
with check (
  status = 'received'
  and actor_kind in ('individual', 'family', 'school', 'company', 'nonprofit', 'municipality', 'community')
  and listing_type in ('offer', 'request')
  and char_length(full_name) between 2 and 120
  and char_length(email) <= 254
  and position('@' in email) > 1
  and cardinality(handoff_methods) <= 3
  and cardinality(personal_involvement) <= 2
  and locale in ('cs', 'en')
);

-- Public intake is intentionally NOT a live listing. Only a trusted operator can
-- review it and convert it into material_bridge_listings after identity/contact
-- and safeguarding/logistics checks. No SELECT grant is given to anon/authenticated.

commit;
