-- PANSOFIE R4 bounded Partner workspace identity projection.
-- A partner_contact can see only organizations where their own membership is active.

create or replace function public.pansofie_list_my_partner_organizations()
returns table(
  organization_id uuid,
  organization_name text,
  organization_type text,
  organization_status text,
  verification_status text
)
language sql
stable
security definer
set search_path = public
as $$
  select
    o.id,
    o.name,
    o.organization_type,
    o.status,
    public.pansofie_partner_verification_status(o.id)
  from public.organization_memberships m
  join public.organizations o on o.id = m.organization_id
  where m.user_id = auth.uid()
    and m.role = 'partner_contact'
    and m.status = 'active'
  order by o.name;
$$;

revoke execute on function public.pansofie_list_my_partner_organizations() from public, anon, authenticated;
grant execute on function public.pansofie_list_my_partner_organizations() to authenticated;
