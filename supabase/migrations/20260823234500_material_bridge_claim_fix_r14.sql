begin;

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
    and status = 'available'
    and owner_user_id <> actor
  returning id into claimed;

  if claimed is null then
    raise exception 'LISTING_NOT_AVAILABLE';
  end if;

  return claimed;
end;
$$;

revoke all on function public.pansofie_reserve_material_listing(uuid, uuid) from public;
grant execute on function public.pansofie_reserve_material_listing(uuid, uuid) to authenticated;

commit;
