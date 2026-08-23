begin;

alter table public.profiles
  add column if not exists network_role text,
  add column if not exists offers_text text,
  add column if not exists seeks_text text,
  add column if not exists onboarding_completed_at timestamptz;

alter table public.profiles drop constraint if exists profiles_network_role_r14_check;
alter table public.profiles add constraint profiles_network_role_r14_check
  check (network_role is null or network_role in ('young_person','family','educator','school','company','mentor','nonprofit','municipality','community','other'));

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
    and (target_region is null or l.region = target_region)
  order by l.created_at desc
  limit 100;
$$;

revoke all on function public.pansofie_public_available_materials(text) from public;
grant execute on function public.pansofie_public_available_materials(text) to anon, authenticated;

comment on function public.pansofie_public_available_materials(text) is
  'Public-safe projection of AVAILABLE Material Bridge listings. Exposes no owner user id, organization id, email or reservation identity.';

commit;
