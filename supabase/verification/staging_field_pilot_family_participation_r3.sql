-- PANSOFIE FIELD PILOT FAMILY PARTICIPATION R3 structural verification
-- Safe to run repeatedly. Does not create or mutate pilot/family data.

do $$
declare
  fn text;
begin
  if to_regclass('public.family_contributions') is null then
    raise exception 'FIELD_PILOT_R3 family_contributions table missing';
  end if;

  if not exists (
    select 1 from pg_class c join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public' and c.relname = 'family_contributions' and c.relrowsecurity
  ) then
    raise exception 'FIELD_PILOT_R3 family_contributions RLS missing';
  end if;

  if not exists (
    select 1 from pg_constraint con
    join pg_class c on c.oid = con.conrelid
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public'
      and c.relname = 'processing_basis_records'
      and pg_get_constraintdef(con.oid) ilike '%guardian_family_participation%'
  ) then
    raise exception 'FIELD_PILOT_R3 guardian_family_participation purpose missing';
  end if;

  if has_table_privilege('anon', 'public.family_contributions', 'SELECT')
     or has_table_privilege('anon', 'public.family_contributions', 'INSERT')
     or has_table_privilege('authenticated', 'public.family_contributions', 'SELECT')
     or has_table_privilege('authenticated', 'public.family_contributions', 'INSERT')
     or has_table_privilege('authenticated', 'public.family_contributions', 'UPDATE')
     or has_table_privilege('authenticated', 'public.family_contributions', 'DELETE') then
    raise exception 'FIELD_PILOT_R3 direct family_contributions table access leaked';
  end if;

  if has_function_privilege('anon', 'public.pansofie_can_guardian_participate_in_run(uuid)', 'EXECUTE')
     or has_function_privilege('authenticated', 'public.pansofie_can_guardian_participate_in_run(uuid)', 'EXECUTE') then
    raise exception 'FIELD_PILOT_R3 private participation helper execute boundary failed';
  end if;

  foreach fn in array array[
    'public.pansofie_family_access_summary()',
    'public.pansofie_list_my_family_context()',
    'public.pansofie_list_my_guardian_passport_summaries()',
    'public.pansofie_add_family_contribution(uuid,text,text)',
    'public.pansofie_list_my_family_contributions()',
    'public.pansofie_withdraw_family_contribution(uuid)',
    'public.pansofie_list_staff_family_contributions()',
    'public.pansofie_enable_guardian_family_participation(uuid,uuid,text,text,text,timestamp with time zone)'
  ] loop
    if has_function_privilege('anon', fn, 'EXECUTE') then
      raise exception 'FIELD_PILOT_R3 anon execute leaked for %', fn;
    end if;
    if not has_function_privilege('authenticated', fn, 'EXECUTE') then
      raise exception 'FIELD_PILOT_R3 authenticated execute missing for %', fn;
    end if;
  end loop;

  raise notice 'FIELD_PILOT_FAMILY_PARTICIPATION_R3=PASS';
end;
$$;
