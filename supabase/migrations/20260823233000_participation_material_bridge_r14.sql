begin;

create table if not exists public.audience_intakes (
  id uuid primary key default gen_random_uuid(),
  audience_kind text not null check (audience_kind in ('school', 'company', 'ecology')),
  full_name text not null check (char_length(full_name) between 2 and 120),
  organization_name text not null check (char_length(organization_name) between 2 and 180),
  position_title text check (position_title is null or char_length(position_title) <= 140),
  email text not null check (char_length(email) <= 254 and position('@' in email) > 1),
  pillar_interests text[] not null default '{}',
  digital_state text check (digital_state is null or char_length(digital_state) <= 500),
  team_size text check (team_size is null or char_length(team_size) <= 120),
  primary_challenge text check (primary_challenge is null or char_length(primary_challenge) <= 3000),
  message text check (message is null or char_length(message) <= 3000),
  source text not null default 'public-web' check (char_length(source) <= 120),
  locale text not null default 'cs' check (locale in ('cs', 'en')),
  status text not null default 'received' check (status in ('received', 'reviewing', 'contacted', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.audience_intakes enable row level security;
revoke all on public.audience_intakes from public;
revoke all on public.audience_intakes from anon, authenticated;
grant insert on public.audience_intakes to anon, authenticated;

create policy audience_intakes_public_insert_r14
on public.audience_intakes
for insert
to anon, authenticated
with check (
  status = 'received'
  and char_length(full_name) between 2 and 120
  and char_length(organization_name) between 2 and 180
  and char_length(email) <= 254
  and position('@' in email) > 1
  and locale in ('cs', 'en')
  and cardinality(pillar_interests) <= 3
);

create table if not exists public.material_bridge_listings (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete set null,
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
  photo_path text check (photo_path is null or char_length(photo_path) <= 500),
  status text not null default 'available' check (status in ('available', 'reserved', 'handed_over', 'cancelled')),
  reserved_by_user_id uuid references auth.users(id) on delete set null,
  reserved_by_organization_id uuid references public.organizations(id) on delete set null,
  reserved_at timestamptz,
  handed_over_at timestamptz,
  impact_summary text check (impact_summary is null or char_length(impact_summary) <= 3000),
  public_story_consent boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint material_bridge_reservation_consistency check (
    (status = 'available' and reserved_by_user_id is null and reserved_at is null)
    or status in ('reserved', 'handed_over', 'cancelled')
  )
);

create index if not exists material_bridge_available_region_idx
  on public.material_bridge_listings (status, listing_type, region, created_at desc);
create index if not exists material_bridge_owner_idx
  on public.material_bridge_listings (owner_user_id, created_at desc);

alter table public.material_bridge_listings enable row level security;
revoke all on public.material_bridge_listings from public;
revoke all on public.material_bridge_listings from anon, authenticated;
grant select, insert, update on public.material_bridge_listings to authenticated;

create policy material_bridge_authenticated_read_r14
on public.material_bridge_listings
for select
to authenticated
using (
  status = 'available'
  or owner_user_id = auth.uid()
  or reserved_by_user_id = auth.uid()
  or exists (
    select 1
    from public.organization_memberships om
    where om.user_id = auth.uid()
      and om.status = 'active'
      and om.organization_id in (organization_id, reserved_by_organization_id)
  )
);

create policy material_bridge_owner_insert_r14
on public.material_bridge_listings
for insert
to authenticated
with check (
  owner_user_id = auth.uid()
  and status = 'available'
  and reserved_by_user_id is null
  and reserved_by_organization_id is null
  and (
    organization_id is null
    or exists (
      select 1 from public.organization_memberships om
      where om.user_id = auth.uid()
        and om.organization_id = organization_id
        and om.status = 'active'
    )
  )
);

create policy material_bridge_owner_update_r14
on public.material_bridge_listings
for update
to authenticated
using (owner_user_id = auth.uid())
with check (
  owner_user_id = auth.uid()
  and (
    organization_id is null
    or exists (
      select 1 from public.organization_memberships om
      where om.user_id = auth.uid()
        and om.organization_id = organization_id
        and om.status = 'active'
    )
  )
);

create or replace function public.pansofie_reserve_material_listing(
  target_listing_id uuid,
  target_organization_id uuid default null
)
returns uuid
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  actor uuid := auth.uid();
  claimed uuid;
begin
  if actor is null then
    raise exception 'AUTH_REQUIRED';
  end if;

  if target_organization_id is not null and not exists (
    select 1 from public.organization_memberships om
    where om.user_id = actor
      and om.organization_id = target_organization_id
      and om.status = 'active'
  ) then
    raise exception 'ORGANIZATION_MEMBERSHIP_REQUIRED';
  end if;

  update public.material_bridge_listings
  set status = 'reserved',
      reserved_by_user_id = actor,
      reserved_by_organization_id = target_organization_id,
      reserved_at = now(),
      updated_at = now()
  where id = target_listing_id
    and listing_type = 'offer'
    and status = 'available'
    and owner_user_id <> actor
  returning id into claimed;

  if claimed is null then
    raise exception 'LISTING_NOT_AVAILABLE';
  end if;

  return claimed;
end;
$$;

create or replace function public.pansofie_mark_material_handed_over(
  target_listing_id uuid,
  target_impact_summary text default null,
  target_public_story_consent boolean default false
)
returns uuid
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  actor uuid := auth.uid();
  changed uuid;
begin
  if actor is null then
    raise exception 'AUTH_REQUIRED';
  end if;

  update public.material_bridge_listings
  set status = 'handed_over',
      handed_over_at = now(),
      impact_summary = nullif(trim(target_impact_summary), ''),
      public_story_consent = coalesce(target_public_story_consent, false),
      updated_at = now()
  where id = target_listing_id
    and owner_user_id = actor
    and status = 'reserved'
  returning id into changed;

  if changed is null then
    raise exception 'HANDOVER_NOT_ALLOWED';
  end if;

  return changed;
end;
$$;

create or replace function public.pansofie_public_material_stories()
returns table (
  listing_id uuid,
  title text,
  category text,
  region text,
  impact_summary text,
  handed_over_at timestamptz
)
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select l.id, l.title, l.category, l.region, l.impact_summary, l.handed_over_at
  from public.material_bridge_listings l
  where l.status = 'handed_over'
    and l.public_story_consent = true
    and l.impact_summary is not null
  order by l.handed_over_at desc
  limit 30;
$$;

revoke all on function public.pansofie_reserve_material_listing(uuid, uuid) from public;
revoke all on function public.pansofie_mark_material_handed_over(uuid, text, boolean) from public;
revoke all on function public.pansofie_public_material_stories() from public;
grant execute on function public.pansofie_reserve_material_listing(uuid, uuid) to authenticated;
grant execute on function public.pansofie_mark_material_handed_over(uuid, text, boolean) to authenticated;
grant execute on function public.pansofie_public_material_stories() to anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('material-bridge', 'material-bridge', false, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

create policy material_bridge_storage_read_r14
on storage.objects
for select
to authenticated
using (bucket_id = 'material-bridge');

create policy material_bridge_storage_insert_r14
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'material-bridge'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy material_bridge_storage_update_r14
on storage.objects
for update
to authenticated
using (
  bucket_id = 'material-bridge'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'material-bridge'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy material_bridge_storage_delete_r14
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'material-bridge'
  and (storage.foldername(name))[1] = auth.uid()::text
);

commit;
