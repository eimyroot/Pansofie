-- PANSOFIE STAGING ASSIGNABLE LEARNER DIRECTORY R1
-- Read-only contract checks for the governed teacher learner-directory RPC.

do $$
declare
  fn regprocedure := 'public.pansofie_list_assignable_school_learners(uuid[])'::regprocedure;
begin
  if has_function_privilege('anon', fn, 'EXECUTE') then
    raise exception 'anon EXECUTE unexpectedly allowed on %', fn;
  end if;
  if not has_function_privilege('authenticated', fn, 'EXECUTE') then
    raise exception 'authenticated EXECUTE missing on %', fn;
  end if;
end $$;

select
  p.oid::regprocedure as function_name,
  p.prosecdef as security_definer,
  has_function_privilege('anon', p.oid, 'EXECUTE') as anon_execute,
  has_function_privilege('authenticated', p.oid, 'EXECUTE') as authenticated_execute
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname = 'pansofie_list_assignable_school_learners';
