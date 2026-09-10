begin;

-- Live-backend and restored-local-baseline compatibility hardening.
-- Guard every privilege change with to_regprocedure() so this migration is
-- safe whether a historical function exists or not.

-- Restored canonical auth baseline. The predicate is needed by authenticated
-- RLS policies but should never be directly executable by anon/public.
do $$
begin
  if to_regprocedure('public.is_admin()') is not null then
    execute 'revoke execute on function public.is_admin() from public, anon';
    execute 'grant execute on function public.is_admin() to authenticated';
  end if;

  if to_regprocedure('public.handle_new_user()') is not null then
    execute 'revoke execute on function public.handle_new_user() from public, anon, authenticated';
  end if;
end
$$;

-- These user-facing legacy pilot/team RPCs contain their own authenticated
-- membership/role checks. They remain callable by authenticated users, never
-- by anon/public.
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
-- it directly executable lets callers materialize mission-version rows outside
-- the governed assignment flows.
do $$
begin
  if to_regprocedure('public.pansofie_materialize_mission_version(uuid)') is not null then
    execute 'revoke execute on function public.pansofie_materialize_mission_version(uuid) from public, anon, authenticated';
  end if;
end
$$;

commit;
