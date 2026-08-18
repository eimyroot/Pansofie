-- PANSOFIE FIELD PILOT READINESS + MEASUREMENT R2
-- Staging-first. No synthetic cohort, user, incident or measurement data.
-- Operational purpose: prevent accidental pilot activation before minimum
-- responsibility/safeguarding/runtime prerequisites are satisfied and expose
-- evidence indicators without turning them into a human score.

alter table public.pilot_cohorts
  add column if not exists activated_at timestamptz;
alter table public.pilot_cohorts
  add column if not exists activated_by uuid references auth.users(id) on delete set null;

-- ---------------------------------------------------------------------------
-- Fixed three-Experience plan per cohort
-- ---------------------------------------------------------------------------
create table if not exists public.pilot_cohort_experience_plan (
  id uuid primary key default gen_random_uuid(),
  cohort_id uuid not null references public.pilot_cohorts(id) on delete cascade,
  sequence_no integer not null check (sequence_no between 1 and 3),
  mission_version_id uuid not null references public.mission_versions(id) on delete restrict,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (cohort_id, sequence_no),
  unique (cohort_id, mission_version_id)
);

create index if not exists pilot_cohort_experience_plan_cohort_idx
  on public.pilot_cohort_experience_plan(cohort_id, sequence_no);

create or replace function public.pansofie_seed_canonical_pilot_plan(target_cohort_id uuid)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  target_slug text;
  target_sequence integer;
  version_id uuid;
  inserted_count integer := 0;
begin
  if not exists (select 1 from public.pilot_cohorts where id = target_cohort_id) then
    raise exception 'cohort not found';
  end if;

  for target_sequence, target_slug in
    select * from (values
      (1, 'zlepsi-svou-skolu'::text),
      (2, 'digitalni-most'::text),
      (3, 'circular-challenge'::text)
    ) as canonical(sequence_no, slug)
  loop
    select mv.id into version_id
    from public.mission_versions mv
    join public.missions m on m.id = mv.mission_id
    where m.slug = target_slug
      and m.status = 'published'
    order by mv.version_no desc
    limit 1;

    if version_id is null then
      raise exception 'canonical pilot Mission version missing for %', target_slug;
    end if;

    insert into public.pilot_cohort_experience_plan (
      cohort_id, sequence_no, mission_version_id, created_by
    ) values (
      target_cohort_id, target_sequence, version_id, auth.uid()
    )
    on conflict (cohort_id, sequence_no) do nothing;

    if found then inserted_count := inserted_count + 1; end if;
  end loop;

  return inserted_count;
end;
$$;

-- Backfill only the plan definition for any already-existing cohort. This does
-- not create learners, teams, runs or real pilot evidence.
do $$
declare c record;
begin
  for c in select id from public.pilot_cohorts loop
    perform public.pansofie_seed_canonical_pilot_plan(c.id);
  end loop;
end;
$$;

-- Cohort creation now automatically pins its exact three-Experience plan and
-- records the creating teacher/coordinator as an operational cohort member.
create or replace function public.pansofie_create_pilot_cohort(
  target_org_id uuid,
  target_name text,
  target_starts_on date default null,
  target_ends_on date default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  cohort_id uuid;
  caller_role text;
begin
  if nullif(btrim(coalesce(target_name, '')), '') is null then
    raise exception 'cohort name is required';
  end if;

  select om.role into caller_role
  from public.organization_memberships om
  where om.organization_id = target_org_id
    and om.user_id = auth.uid()
    and om.status = 'active'
    and om.role in ('coordinator', 'teacher')
  order by case om.role when 'coordinator' then 1 else 2 end
  limit 1;

  if caller_role is null and not public.is_admin() then
    raise exception 'teacher/coordinator membership required';
  end if;

  if target_starts_on is not null and target_ends_on is not null and target_ends_on < target_starts_on then
    raise exception 'pilot end date must be on or after start date';
  end if;

  insert into public.pilot_cohorts (
    organization_id, name, status, starts_on, ends_on, created_by
  ) values (
    target_org_id, btrim(target_name), 'planned', target_starts_on, target_ends_on, auth.uid()
  ) returning id into cohort_id;

  if caller_role is not null then
    insert into public.pilot_cohort_members (
      cohort_id, user_id, role, status, created_by
    ) values (
      cohort_id, auth.uid(), caller_role, 'active', auth.uid()
    ) on conflict (cohort_id, user_id, role) do nothing;
  end if;

  perform public.pansofie_seed_canonical_pilot_plan(cohort_id);
  return cohort_id;
end;
$$;

-- ---------------------------------------------------------------------------
-- Named operational responsibilities
-- ---------------------------------------------------------------------------
create table if not exists public.pilot_responsibilities (
  id uuid primary key default gen_random_uuid(),
  cohort_id uuid not null references public.pilot_cohorts(id) on delete cascade,
  responsibility text not null check (responsibility in (
    'pilot_lead',
    'safeguarding',
    'privacy_data',
    'technical_incident',
    'partner_contact',
    'pansofie_operator'
  )),
  contact_name text not null,
  contact_email text not null,
  user_id uuid references auth.users(id) on delete set null,
  confirmed_at timestamptz not null default now(),
  confirmed_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (cohort_id, responsibility),
  check (position('@' in contact_email) > 1)
);

create index if not exists pilot_responsibilities_cohort_idx
  on public.pilot_responsibilities(cohort_id, responsibility);

drop trigger if exists pilot_responsibilities_touch_updated_at on public.pilot_responsibilities;
create trigger pilot_responsibilities_touch_updated_at
  before update on public.pilot_responsibilities
  for each row execute procedure public.pansofie_touch_updated_at();

create or replace function public.pansofie_set_pilot_responsibility(
  target_cohort_id uuid,
  target_responsibility text,
  target_contact_name text,
  target_contact_email text,
  target_user_id uuid default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  cohort_row public.pilot_cohorts%rowtype;
  responsibility_id uuid;
begin
  select * into cohort_row from public.pilot_cohorts where id = target_cohort_id;
  if cohort_row.id is null then raise exception 'cohort not found'; end if;

  if not public.pansofie_is_active_org_member(
    cohort_row.organization_id,
    array['teacher', 'coordinator']::text[],
    auth.uid()
  ) and not public.is_admin() then
    raise exception 'teacher/coordinator membership required';
  end if;

  if target_responsibility not in (
    'pilot_lead', 'safeguarding', 'privacy_data', 'technical_incident', 'partner_contact', 'pansofie_operator'
  ) then
    raise exception 'unsupported pilot responsibility';
  end if;

  if nullif(btrim(coalesce(target_contact_name, '')), '') is null then
    raise exception 'contact name required';
  end if;
  if position('@' in coalesce(target_contact_email, '')) <= 1 then
    raise exception 'valid contact email required';
  end if;

  insert into public.pilot_responsibilities (
    cohort_id, responsibility, contact_name, contact_email, user_id, confirmed_at, confirmed_by
  ) values (
    target_cohort_id, target_responsibility, btrim(target_contact_name), lower(btrim(target_contact_email)), target_user_id, now(), auth.uid()
  )
  on conflict (cohort_id, responsibility)
  do update set
    contact_name = excluded.contact_name,
    contact_email = excluded.contact_email,
    user_id = excluded.user_id,
    confirmed_at = now(),
    confirmed_by = auth.uid()
  returning id into responsibility_id;

  return responsibility_id;
end;
$$;

-- ---------------------------------------------------------------------------
-- Teacher-load evidence and minimal incident register
-- ---------------------------------------------------------------------------
create table if not exists public.pilot_teacher_load_entries (
  id uuid primary key default gen_random_uuid(),
  cohort_id uuid not null references public.pilot_cohorts(id) on delete cascade,
  teacher_id uuid not null references auth.users(id) on delete cascade,
  week_start date not null,
  minutes integer not null check (minutes between 0 and 1440),
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (cohort_id, teacher_id, week_start)
);

drop trigger if exists pilot_teacher_load_touch_updated_at on public.pilot_teacher_load_entries;
create trigger pilot_teacher_load_touch_updated_at
  before update on public.pilot_teacher_load_entries
  for each row execute procedure public.pansofie_touch_updated_at();

create table if not exists public.pilot_incidents (
  id uuid primary key default gen_random_uuid(),
  cohort_id uuid not null references public.pilot_cohorts(id) on delete cascade,
  severity text not null check (severity in ('S1', 'S2', 'S3')),
  category text not null check (category in ('safety', 'privacy', 'technical', 'partner', 'other')),
  status text not null default 'open' check (status in ('open', 'mitigated', 'closed')),
  summary text not null,
  reported_by uuid not null references auth.users(id) on delete restrict,
  reported_at timestamptz not null default now(),
  resolved_at timestamptz,
  updated_at timestamptz not null default now(),
  check ((status <> 'closed') or resolved_at is not null)
);

create index if not exists pilot_incidents_cohort_status_idx
  on public.pilot_incidents(cohort_id, status, severity);

drop trigger if exists pilot_incidents_touch_updated_at on public.pilot_incidents;
create trigger pilot_incidents_touch_updated_at
  before update on public.pilot_incidents
  for each row execute procedure public.pansofie_touch_updated_at();

create or replace function public.pansofie_record_teacher_load(
  target_cohort_id uuid,
  target_week_start date,
  target_minutes integer,
  target_note text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  cohort_row public.pilot_cohorts%rowtype;
  entry_id uuid;
begin
  select * into cohort_row from public.pilot_cohorts where id = target_cohort_id;
  if cohort_row.id is null then raise exception 'cohort not found'; end if;

  if not public.pansofie_is_active_org_member(
    cohort_row.organization_id,
    array['teacher', 'coordinator']::text[],
    auth.uid()
  ) and not public.is_admin() then
    raise exception 'teacher/coordinator membership required';
  end if;

  if target_minutes < 0 or target_minutes > 1440 then
    raise exception 'minutes outside allowed range';
  end if;

  insert into public.pilot_teacher_load_entries (
    cohort_id, teacher_id, week_start, minutes, note
  ) values (
    target_cohort_id, auth.uid(), target_week_start, target_minutes, nullif(btrim(coalesce(target_note, '')), '')
  )
  on conflict (cohort_id, teacher_id, week_start)
  do update set minutes = excluded.minutes, note = excluded.note
  returning id into entry_id;

  return entry_id;
end;
$$;

create or replace function public.pansofie_report_pilot_incident(
  target_cohort_id uuid,
  target_severity text,
  target_category text,
  target_summary text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  cohort_row public.pilot_cohorts%rowtype;
  incident_id uuid;
begin
  select * into cohort_row from public.pilot_cohorts where id = target_cohort_id;
  if cohort_row.id is null then raise exception 'cohort not found'; end if;

  if not public.pansofie_is_active_org_member(
    cohort_row.organization_id,
    array['teacher', 'coordinator']::text[],
    auth.uid()
  ) and not public.is_admin() then
    raise exception 'teacher/coordinator membership required';
  end if;

  if target_severity not in ('S1', 'S2', 'S3') then raise exception 'unsupported severity'; end if;
  if target_category not in ('safety', 'privacy', 'technical', 'partner', 'other') then raise exception 'unsupported incident category'; end if;
  if nullif(btrim(coalesce(target_summary, '')), '') is null then raise exception 'incident summary required'; end if;

  insert into public.pilot_incidents (
    cohort_id, severity, category, status, summary, reported_by
  ) values (
    target_cohort_id, target_severity, target_category, 'open', btrim(target_summary), auth.uid()
  ) returning id into incident_id;

  return incident_id;
end;
$$;

create or replace function public.pansofie_set_pilot_incident_status(
  target_incident_id uuid,
  target_status text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  incident_row public.pilot_incidents%rowtype;
  cohort_row public.pilot_cohorts%rowtype;
begin
  select * into incident_row from public.pilot_incidents where id = target_incident_id;
  if incident_row.id is null then raise exception 'incident not found'; end if;
  select * into cohort_row from public.pilot_cohorts where id = incident_row.cohort_id;

  if not public.pansofie_is_active_org_member(
    cohort_row.organization_id,
    array['teacher', 'coordinator']::text[],
    auth.uid()
  ) and not public.is_admin() then
    raise exception 'teacher/coordinator membership required';
  end if;

  if target_status not in ('open', 'mitigated', 'closed') then raise exception 'unsupported incident status'; end if;

  update public.pilot_incidents
  set status = target_status,
      resolved_at = case when target_status = 'closed' then now() else null end
  where id = target_incident_id;
end;
$$;

-- ---------------------------------------------------------------------------
-- Readiness gate
-- ---------------------------------------------------------------------------
create or replace function public.pansofie_pilot_readiness(target_cohort_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  cohort_row public.pilot_cohorts%rowtype;
  plan_count integer;
  responsibility_count integer;
  active_learners integer;
  team_learners integer;
  learners_missing_basis integer;
  unresolved_s2_s3 integer;
  dates_ready boolean;
  ready boolean;
begin
  select * into cohort_row from public.pilot_cohorts where id = target_cohort_id;
  if cohort_row.id is null then raise exception 'cohort not found'; end if;

  if not public.pansofie_is_active_org_member(
    cohort_row.organization_id,
    array['teacher', 'coordinator']::text[],
    auth.uid()
  ) and not public.is_admin() then
    raise exception 'teacher/coordinator membership required';
  end if;

  select count(*) into plan_count
  from public.pilot_cohort_experience_plan
  where cohort_id = target_cohort_id;

  select count(distinct responsibility) into responsibility_count
  from public.pilot_responsibilities
  where cohort_id = target_cohort_id;

  select count(distinct user_id) into active_learners
  from public.pilot_cohort_members
  where cohort_id = target_cohort_id and role = 'learner' and status = 'active';

  select count(distinct tm.user_id) into team_learners
  from public.experience_team_members tm
  join public.experience_teams t on t.id = tm.team_id
  where t.cohort_id = target_cohort_id
    and t.status = 'active'
    and tm.role = 'learner'
    and tm.status = 'active';

  select count(*) into learners_missing_basis
  from public.pilot_cohort_members pcm
  where pcm.cohort_id = target_cohort_id
    and pcm.role = 'learner'
    and pcm.status = 'active'
    and not public.pansofie_has_processing_basis(
      pcm.user_id,
      cohort_row.organization_id,
      'school_mission_assignment'
    );

  select count(*) into unresolved_s2_s3
  from public.pilot_incidents
  where cohort_id = target_cohort_id
    and severity in ('S2', 'S3')
    and status <> 'closed';

  dates_ready := cohort_row.starts_on is not null
    and cohort_row.ends_on is not null
    and cohort_row.ends_on >= cohort_row.starts_on;

  ready := plan_count = 3
    and responsibility_count = 6
    and active_learners > 0
    and team_learners = active_learners
    and learners_missing_basis = 0
    and unresolved_s2_s3 = 0
    and dates_ready;

  return jsonb_build_object(
    'ready', ready,
    'status', cohort_row.status,
    'plan_count', plan_count,
    'required_plan_count', 3,
    'responsibility_count', responsibility_count,
    'required_responsibility_count', 6,
    'active_learners', active_learners,
    'team_learners', team_learners,
    'learners_missing_assignment_basis', learners_missing_basis,
    'unresolved_s2_s3', unresolved_s2_s3,
    'dates_ready', dates_ready
  );
end;
$$;

create or replace function public.pansofie_activate_pilot_cohort(target_cohort_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  cohort_row public.pilot_cohorts%rowtype;
  readiness jsonb;
begin
  select * into cohort_row from public.pilot_cohorts where id = target_cohort_id for update;
  if cohort_row.id is null then raise exception 'cohort not found'; end if;

  if not public.pansofie_is_active_org_member(
    cohort_row.organization_id,
    array['teacher', 'coordinator']::text[],
    auth.uid()
  ) and not public.is_admin() then
    raise exception 'teacher/coordinator membership required';
  end if;

  readiness := public.pansofie_pilot_readiness(target_cohort_id);
  if coalesce((readiness->>'ready')::boolean, false) is not true then
    raise exception 'pilot readiness gate failed: %', readiness::text;
  end if;

  update public.pilot_cohorts
  set status = 'active', activated_at = now(), activated_by = auth.uid()
  where id = target_cohort_id;

  return readiness || jsonb_build_object('status', 'active', 'activated_at', now());
end;
$$;

-- ---------------------------------------------------------------------------
-- Evidence indicators; never a score of a person.
-- ---------------------------------------------------------------------------
create or replace function public.pansofie_pilot_metrics(target_cohort_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  cohort_row public.pilot_cohorts%rowtype;
  active_learners integer;
  exp1_completers integer;
  exp2_starters_after_exp1 integer;
  completed_two integer;
  ser numeric;
  completion_two_rate numeric;
  median_teacher_minutes numeric;
  unresolved_s2_s3 integer;
begin
  select * into cohort_row from public.pilot_cohorts where id = target_cohort_id;
  if cohort_row.id is null then raise exception 'cohort not found'; end if;

  if not public.pansofie_is_active_org_member(
    cohort_row.organization_id,
    array['teacher', 'coordinator']::text[],
    auth.uid()
  ) and not public.is_admin() then
    raise exception 'teacher/coordinator membership required';
  end if;

  select count(distinct user_id) into active_learners
  from public.pilot_cohort_members
  where cohort_id = target_cohort_id and role = 'learner' and status = 'active';

  with plan as (
    select sequence_no, mission_version_id
    from public.pilot_cohort_experience_plan
    where cohort_id = target_cohort_id
  ), exp1 as (
    select distinct r.user_id
    from public.mission_runs r
    join plan p on p.sequence_no = 1 and p.mission_version_id = r.mission_version_id
    where r.cohort_id = target_cohort_id and r.status = 'completed'
  )
  select count(*) into exp1_completers from exp1;

  with plan as (
    select sequence_no, mission_version_id
    from public.pilot_cohort_experience_plan
    where cohort_id = target_cohort_id
  ), exp1 as (
    select distinct r.user_id
    from public.mission_runs r
    join plan p on p.sequence_no = 1 and p.mission_version_id = r.mission_version_id
    where r.cohort_id = target_cohort_id and r.status = 'completed'
  ), exp2_started as (
    select distinct r.user_id
    from public.mission_runs r
    join plan p on p.sequence_no = 2 and p.mission_version_id = r.mission_version_id
    join exp1 e on e.user_id = r.user_id
    where r.cohort_id = target_cohort_id
      and (r.started_at is not null or r.status in ('in_progress', 'submitted', 'completed'))
  )
  select count(*) into exp2_starters_after_exp1 from exp2_started;

  with plan as (
    select mission_version_id
    from public.pilot_cohort_experience_plan
    where cohort_id = target_cohort_id
  ), completed_by_learner as (
    select r.user_id, count(distinct r.mission_version_id) as completed_count
    from public.mission_runs r
    join plan p on p.mission_version_id = r.mission_version_id
    where r.cohort_id = target_cohort_id and r.status = 'completed'
    group by r.user_id
  )
  select count(*) into completed_two
  from completed_by_learner
  where completed_count >= 2;

  ser := case when exp1_completers > 0 then round((exp2_starters_after_exp1::numeric / exp1_completers::numeric) * 100, 1) else null end;
  completion_two_rate := case when active_learners > 0 then round((completed_two::numeric / active_learners::numeric) * 100, 1) else null end;

  select percentile_cont(0.5) within group (order by minutes)::numeric
  into median_teacher_minutes
  from public.pilot_teacher_load_entries
  where cohort_id = target_cohort_id;

  select count(*) into unresolved_s2_s3
  from public.pilot_incidents
  where cohort_id = target_cohort_id and severity in ('S2', 'S3') and status <> 'closed';

  return jsonb_build_object(
    'active_learners', active_learners,
    'experience_1_completers', exp1_completers,
    'experience_2_starters_after_experience_1', exp2_starters_after_exp1,
    'second_experience_rate_percent', ser,
    'learners_completed_at_least_2_of_3', completed_two,
    'completion_2_of_3_rate_percent', completion_two_rate,
    'median_teacher_overhead_minutes_per_week', median_teacher_minutes,
    'unresolved_s2_s3', unresolved_s2_s3,
    'candidate_thresholds', jsonb_build_object(
      'second_experience_rate_percent', 60,
      'completion_2_of_3_rate_percent', 70,
      'median_teacher_overhead_minutes_per_week_max', 30,
      'unresolved_s2_s3_max', 0
    ),
    'automatic_go_stop_decision', false
  );
end;
$$;

-- ---------------------------------------------------------------------------
-- RLS and direct-write hardening
-- ---------------------------------------------------------------------------
alter table public.pilot_cohort_experience_plan enable row level security;
alter table public.pilot_responsibilities enable row level security;
alter table public.pilot_teacher_load_entries enable row level security;
alter table public.pilot_incidents enable row level security;

drop policy if exists "pilot_plan_select_org_members" on public.pilot_cohort_experience_plan;
create policy "pilot_plan_select_org_members"
  on public.pilot_cohort_experience_plan for select to authenticated
  using (exists (
    select 1 from public.pilot_cohorts c
    where c.id = cohort_id
      and (public.is_admin() or public.pansofie_is_active_org_member(c.organization_id, null, auth.uid()))
  ));

-- Plan has no client write policy. It is pinned by governed cohort creation.

drop policy if exists "pilot_responsibilities_select_staff" on public.pilot_responsibilities;
create policy "pilot_responsibilities_select_staff"
  on public.pilot_responsibilities for select to authenticated
  using (exists (
    select 1 from public.pilot_cohorts c
    where c.id = cohort_id
      and (public.is_admin() or public.pansofie_is_active_org_member(c.organization_id, array['teacher', 'coordinator']::text[], auth.uid()))
  ));

-- Responsibilities are written only through governed RPC.

drop policy if exists "pilot_teacher_load_select_staff" on public.pilot_teacher_load_entries;
create policy "pilot_teacher_load_select_staff"
  on public.pilot_teacher_load_entries for select to authenticated
  using (exists (
    select 1 from public.pilot_cohorts c
    where c.id = cohort_id
      and (public.is_admin() or public.pansofie_is_active_org_member(c.organization_id, array['teacher', 'coordinator']::text[], auth.uid()))
  ));

-- Teacher-load entries are written only through governed RPC.

drop policy if exists "pilot_incidents_select_staff" on public.pilot_incidents;
create policy "pilot_incidents_select_staff"
  on public.pilot_incidents for select to authenticated
  using (exists (
    select 1 from public.pilot_cohorts c
    where c.id = cohort_id
      and (public.is_admin() or public.pansofie_is_active_org_member(c.organization_id, array['teacher', 'coordinator']::text[], auth.uid()))
  ));

-- Prevent bypassing the readiness gate by direct status UPDATE.
drop policy if exists "pilot_cohorts_write_staff" on public.pilot_cohorts;
drop policy if exists "pilot_cohorts_update_staff" on public.pilot_cohorts;
create policy "pilot_cohorts_update_staff"
  on public.pilot_cohorts for update to authenticated
  using (public.is_admin() or public.pansofie_is_active_org_member(organization_id, array['teacher', 'coordinator']::text[], auth.uid()))
  with check (public.is_admin() or public.pansofie_is_active_org_member(organization_id, array['teacher', 'coordinator']::text[], auth.uid()));

revoke insert, delete on public.pilot_cohorts from authenticated;
revoke update on public.pilot_cohorts from authenticated;
grant update (name, starts_on, ends_on) on public.pilot_cohorts to authenticated;

revoke all on table public.pilot_cohort_experience_plan from anon;
revoke insert, update, delete on public.pilot_cohort_experience_plan from authenticated;
revoke all on table public.pilot_responsibilities from anon;
revoke insert, update, delete on public.pilot_responsibilities from authenticated;
revoke all on table public.pilot_teacher_load_entries from anon;
revoke insert, update, delete on public.pilot_teacher_load_entries from authenticated;
revoke all on table public.pilot_incidents from anon;
revoke insert, update, delete on public.pilot_incidents from authenticated;

revoke all on function public.pansofie_seed_canonical_pilot_plan(uuid) from public;
revoke all on function public.pansofie_set_pilot_responsibility(uuid, text, text, text, uuid) from public;
revoke all on function public.pansofie_record_teacher_load(uuid, date, integer, text) from public;
revoke all on function public.pansofie_report_pilot_incident(uuid, text, text, text) from public;
revoke all on function public.pansofie_set_pilot_incident_status(uuid, text) from public;
revoke all on function public.pansofie_pilot_readiness(uuid) from public;
revoke all on function public.pansofie_activate_pilot_cohort(uuid) from public;
revoke all on function public.pansofie_pilot_metrics(uuid) from public;

grant execute on function public.pansofie_set_pilot_responsibility(uuid, text, text, text, uuid) to authenticated;
grant execute on function public.pansofie_record_teacher_load(uuid, date, integer, text) to authenticated;
grant execute on function public.pansofie_report_pilot_incident(uuid, text, text, text) to authenticated;
grant execute on function public.pansofie_set_pilot_incident_status(uuid, text) to authenticated;
grant execute on function public.pansofie_pilot_readiness(uuid) to authenticated;
grant execute on function public.pansofie_activate_pilot_cohort(uuid) to authenticated;
grant execute on function public.pansofie_pilot_metrics(uuid) to authenticated;

comment on table public.pilot_cohort_experience_plan is 'Exact three immutable Mission versions for one bounded field-pilot cohort.';
comment on table public.pilot_responsibilities is 'Named operational contacts required before pilot activation; staff-visible only in R2.';
comment on table public.pilot_teacher_load_entries is 'Weekly teacher overhead evidence used for pilot evaluation, not teacher scoring.';
comment on table public.pilot_incidents is 'Minimal operational incident register. Do not store unnecessary child-sensitive detail here.';
comment on function public.pansofie_pilot_metrics(uuid) is 'Returns cohort-level evidence indicators and candidate thresholds; never an automatic GO/STOP or human score.';
