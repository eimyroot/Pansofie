begin;

alter table public.profiles
  add column if not exists network_role text,
  add column if not exists offers_text text,
  add column if not exists seeks_text text,
  add column if not exists onboarding_completed_at timestamptz;

alter table public.profiles drop constraint if exists profiles_network_role_r14_check;
alter table public.profiles add constraint profiles_network_role_r14_check
  check (network_role is null or network_role in ('young_person','family','educator','school','company','mentor','nonprofit','municipality','community','other'));

alter table public.material_bridge_listings
  add column if not exists public_catalog_consent boolean not null default false,
  add column if not exists public_catalog_approved_at timestamptz,
  add column if not exists public_catalog_approved_by uuid references auth.users(id) on delete set null;

create or replace function public.pansofie_guard_public_catalog_approval()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if (
    new.public_catalog_approved_at is distinct from old.public_catalog_approved_at
    or new.public_catalog_approved_by is distinct from old.public_catalog_approved_by
  ) and not public.is_admin() then
    raise exception 'PUBLIC_CATALOG_APPROVAL_REQUIRES_ADMIN';
  end if;

  if new.public_catalog_approved_at is null then
    new.public_catalog_approved_by := null;
  elsif new.public_catalog_approved_by is null then
    new.public_catalog_approved_by := auth.uid();
  end if;

  return new;
end;
$$;

revoke all on function public.pansofie_guard_public_catalog_approval() from public;

drop trigger if exists material_bridge_public_catalog_approval_guard_r14 on public.material_bridge_listings;
create trigger material_bridge_public_catalog_approval_guard_r14
before update on public.material_bridge_listings
for each row execute function public.pansofie_guard_public_catalog_approval();

create or replace function public.pansofie_public_available_materials(
  target_region text default null
)
returns table (
  listing_id uuid,
  listing_type text,
  title text,
  category text,
  condition_status text,
  quantity text,
  description text,
  region text,
  locality text,
  handoff_methods text[],
  created_at timestamptz
)
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select
    l.id,
    l.listing_type,
    l.title,
    l.category,
    l.condition_status,
    l.quantity,
    l.description,
    l.region,
    l.locality,
    l.handoff_methods,
    l.created_at
  from public.material_bridge_listings l
  where l.status = 'available'
    and l.public_catalog_consent = true
    and l.public_catalog_approved_at is not null
    and (target_region is null or l.region = target_region)
  order by l.created_at desc
  limit 100;
$$;

revoke all on function public.pansofie_public_available_materials(text) from public;
grant execute on function public.pansofie_public_available_materials(text) to anon, authenticated;

comment on function public.pansofie_public_available_materials(text) is
  'Public-safe projection of real AVAILABLE Material Bridge listings. Requires author consent plus trusted approval. Exposes no owner user id, organization id, email or reservation identity.';

commit;
