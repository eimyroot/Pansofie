-- PANSOFIE FIELD PILOT READINESS + MEASUREMENT R2 structural verification
-- Safe to run repeatedly. Does not create or mutate pilot data.

do $$
declare
  missing_tables text[];
  missing_functions text[];
  rls_missing text[];
  fn text;
begin
  select array_agg(name) into missing_tables
  from unnest(array[
    'pilot_cohort_experience_plan',
    'pilot_responsibilities',
    'pilot_teacher_load_entries',
    'pilot_incidents'
  ]) as name
  where to_regclass('public.' || name) is null;

  if missing_tables is not null then
    raise exception 'FIELD_PILOT_R2 missing tables: %', missing_tables;
  end if;

  select array_agg(name) into missing_functions
  from unnest(array[
    'pansofie_seed_canonical_pilot_plan',
    'pansofie_set_pilot_responsibility',
    'pansofie_record_teacher_load',
    'pansofie_report_pilot_incident',
    'pansofie_set_pilot_incident_status',
    'pansofie_pilot_readiness',
    'pansofie_activate_pilot_cohort',
    'pansofie_pilot_metrics',
    'pansofie_set_pilot_cohort_dates'
  ]) as name
  where not exists (
    select 1 from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname = name
  );

  if missing_functions is not null then
    raise exception 'FIELD_PILOT_R2 missing functions: %', missing_functions;
  end if;

  select array_agg(c.relname) into rls_missing
  from pg_class c
  join pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'public'
    and c.relname in (
      'pilot_cohort_experience_plan',
      'pilot_responsibilities',
      'pilot_teacher_load_entries',
      'pilot_incidents'
    )
    and c.relrowsecurity is not true;

  if rls_missing is not null then
    raise exception 'FIELD_PILOT_R2 RLS missing: %', rls_missing;
  end if;

  -- Internal seed helper must not be callable by either browser role.
  if has_function_privilege('anon', 'public.pansofie_seed_canonical_pilot_plan(uuid)', 'EXECUTE')
     or has_function_privilege('authenticated', 'public.pansofie_seed_canonical_pilot_plan(uuid)', 'EXECUTE') then
    raise exception 'FIELD_PILOT_R2 private seed helper execute boundary failed';
  end if;

  -- Governed operator RPCs are authenticated-only, never anon.
  foreach fn in array array[
    'public.pansofie_set_pilot_responsibility(uuid,text,text,text,uuid)',
    'public.pansofie_record_teacher_load(uuid,date,integer,text)',
    'public.pansofie_report_pilot_incident(uuid,text,text,text)',
    'public.pansofie_set_pilot_incident_status(uuid,text)',
    'public.pansofie_pilot_readiness(uuid)',
    'public.pansofie_activate_pilot_cohort(uuid)',
    'public.pansofie_pilot_metrics(uuid)',
    'public.pansofie_set_pilot_cohort_dates(uuid,date,date)'
  ] loop
    if has_function_privilege('anon', fn, 'EXECUTE') then
      raise exception 'FIELD_PILOT_R2 anon execute leaked for %', fn;
    end if;
    if not has_function_privilege('authenticated', fn, 'EXECUTE') then
      raise exception 'FIELD_PILOT_R2 authenticated execute missing for %', fn;
    end if;
  end loop;

  if (select count(*) from public.missions where slug in ('zlepsi-svou-skolu','digitalni-most','circular-challenge') and status='published') <> 3 then
    raise exception 'FIELD_PILOT_R2 canonical 3 published Missions missing';
  end if;

  raise notice 'FIELD_PILOT_READINESS_MEASUREMENT_R2=PASS';
end;
$$;
