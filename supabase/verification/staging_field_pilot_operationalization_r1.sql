-- PANSOFIE Field Pilot Operationalization R1 staging verification
-- Read-only structural/data assertions after migration application.

do $$
declare
  missing_tables integer;
  missing_columns integer;
  canonical_missions integer;
  canonical_versions integer;
begin
  select count(*) into missing_tables
  from (values
    ('mission_versions'),
    ('pilot_cohorts'),
    ('pilot_cohort_members'),
    ('experience_teams'),
    ('experience_team_members'),
    ('experience_team_artifacts')
  ) as required(table_name)
  where not exists (
    select 1 from information_schema.tables t
    where t.table_schema = 'public'
      and t.table_name = required.table_name
  );

  if missing_tables <> 0 then
    raise exception 'FIELD_PILOT_R1 missing required tables: %', missing_tables;
  end if;

  select count(*) into missing_columns
  from (values
    ('mission_runs', 'mission_version_id'),
    ('mission_runs', 'cohort_id'),
    ('mission_runs', 'team_id'),
    ('experiences', 'mission_version_id'),
    ('experiences', 'cohort_id'),
    ('experiences', 'team_id')
  ) as required(table_name, column_name)
  where not exists (
    select 1 from information_schema.columns c
    where c.table_schema = 'public'
      and c.table_name = required.table_name
      and c.column_name = required.column_name
  );

  if missing_columns <> 0 then
    raise exception 'FIELD_PILOT_R1 missing required columns: %', missing_columns;
  end if;

  select count(*) into canonical_missions
  from public.missions
  where status = 'published'
    and slug in ('zlepsi-svou-skolu', 'digitalni-most', 'circular-challenge');

  if canonical_missions <> 3 then
    raise exception 'FIELD_PILOT_R1 expected 3 canonical published missions, got %', canonical_missions;
  end if;

  select count(distinct mv.mission_id) into canonical_versions
  from public.mission_versions mv
  join public.missions m on m.id = mv.mission_id
  where m.slug in ('zlepsi-svou-skolu', 'digitalni-most', 'circular-challenge');

  if canonical_versions <> 3 then
    raise exception 'FIELD_PILOT_R1 expected immutable versions for all 3 missions, got %', canonical_versions;
  end if;

  if not exists (
    select 1 from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname = 'pansofie_assign_pilot_team_mission'
  ) then
    raise exception 'FIELD_PILOT_R1 team assignment function missing';
  end if;
end;
$$;

select 'FIELD_PILOT_OPERATIONALIZATION_R1=PASS' as result;
