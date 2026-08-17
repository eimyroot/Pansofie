-- PANSOFIE School assignable learner directory R1.
--
-- Teachers/coordinators need a display name when assigning a mission, but the
-- generic profiles table remains own/admin only. This RPC exposes only the
-- minimum directory fields required for mission assignment, and only when:
--   1) caller is an active teacher/coordinator in the organization;
--   2) target account is an active learner in that organization; and
--   3) the learner has an active school_mission_assignment processing basis.

create or replace function public.pansofie_list_assignable_school_learners(
  target_org_ids uuid[]
)
returns table (
  id uuid,
  organization_id uuid,
  user_id uuid,
  role text,
  status text,
  display_name text
)
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select
    m.id,
    m.organization_id,
    m.user_id,
    m.role,
    m.status,
    coalesce(nullif(btrim(p.full_name), ''), 'Žák ' || left(m.user_id::text, 8)) as display_name
  from public.organization_memberships m
  left join public.profiles p on p.id = m.user_id
  where m.organization_id = any(coalesce(target_org_ids, array[]::uuid[]))
    and m.role = 'learner'
    and m.status = 'active'
    and pansofie_private.pansofie_is_active_org_member(
      m.organization_id,
      array['teacher', 'coordinator']::text[],
      auth.uid()
    )
    and pansofie_private.pansofie_has_processing_basis(
      m.user_id,
      m.organization_id,
      'school_mission_assignment'
    )
  order by m.created_at asc;
$$;

revoke all on function public.pansofie_list_assignable_school_learners(uuid[]) from public;
revoke execute on function public.pansofie_list_assignable_school_learners(uuid[]) from anon;
grant execute on function public.pansofie_list_assignable_school_learners(uuid[]) to authenticated, service_role;

comment on function public.pansofie_list_assignable_school_learners(uuid[]) is
  'Purpose-scoped learner directory for teacher/coordinator school assignment UI. Returns only active learners in caller-governed orgs with active school_mission_assignment basis.';
