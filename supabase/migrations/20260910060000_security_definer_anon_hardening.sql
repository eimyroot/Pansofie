begin;

-- Live-backend compatibility hardening.
--
-- The canonical PANSOFIE project predates the current repository migration
-- baseline and still contains governed pilot RPCs that may not exist on a
-- clean database. Guard every privilege change with to_regprocedure() so the
-- migration is safe both on the live-derived schema and on a fresh dev branch.
--
-- These user-facing RPCs contain their own authenticated membership/role
-- checks. They remain callable by authenticated users, but never by anon.
do $$
declare
  function_signature text;
begin
  foreach function_signature in array array[
    'public.pansofie_add_experience_team_member(uuid,uuid,text)',
    'public.pansofie_add_pilot_cohort_member(uuid,uuid,text)',
    'public.pansofie_assign_pilot_team_mission(uuid,uuid)',
    'public.pansofie_can_access_team(uuid,uuid)',
    'public.pansofie_create_experience_team(uuid,text)'
  ]
  loop
    if to_regprocedure(function_signature) is not null then
      execute 'revoke execute on function ' || function_signature || ' from public, anon';
      execute 'grant execute on function ' || function_signature || ' to authenticated';
    end if;
  end loop;
end
$$;

-- This helper has no caller authorization check of its own and is used only
-- from other SECURITY DEFINER functions in the verified live schema. Keeping
-- it directly executable by anon/authenticated allows callers to materialize
-- mission-version rows outside the governed assignment flows.
do $$
begin
  if to_regprocedure('public.pansofie_materialize_mission_version(uuid)') is not null then
    execute 'revoke execute on function public.pansofie_materialize_mission_version(uuid) from public, anon, authenticated';
  end if;
end
$$;

commit;
