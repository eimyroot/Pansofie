-- PANSOFIE FIELD PILOT OPERATIONALIZATION R1
--
-- Additive staging-first migration.
-- Goals:
--   1) bind every new governed run to an immutable Mission version snapshot,
--   2) introduce pilot cohorts and bounded Experience teams,
--   3) preserve individual learner evidence/reflection while allowing shared team artifacts,
--   4) materialize the three canonical first-pilot Experiences,
--   5) keep the already-verified individual School flow backward compatible.
--
-- NON-GOALS:
--   - no open social graph / messaging
--   - no partner direct-to-child channel
--   - no human-worth scoring
--   - no production-specific data

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Immutable Mission versions
-- ---------------------------------------------------------------------------
create table if not exists public.mission_versions (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references public.missions(id) on delete restrict,
  version_no integer not null check (version_no > 0),
  snapshot jsonb not null,
  content_hash text not null,
  created_by uuid references auth.users(id) on delete set null,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (mission_id, version_no),
  unique (mission_id, content_hash)
);

create index if not exists mission_versions_mission_idx
  on public.mission_versions(mission_id, version_no desc);

create or replace function public.pansofie_reject_mission_version_mutation()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  raise exception 'mission_versions are immutable';
end;
$$;

drop trigger if exists mission_versions_immutable on public.mission_versions;
create trigger mission_versions_immutable
  before update or delete on public.mission_versions
  for each row execute procedure public.pansofie_reject_mission_version_mutation();

create or replace function public.pansofie_materialize_mission_version(target_mission_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  mission_row public.missions%rowtype;
  version_snapshot jsonb;
  version_hash text;
  existing_version_id uuid;
  next_version_no integer;
begin
  select * into mission_row
  from public.missions
  where id = target_mission_id;

  if mission_row.id is null then
    raise exception 'mission not found';
  end if;

  if mission_row.status <> 'published' then
    raise exception 'only published missions can be versioned for governed execution';
  end if;

  version_snapshot := jsonb_build_object(
    'mission_id', mission_row.id,
    'slug', mission_row.slug,
    'title', mission_row.title,
    'summary', mission_row.summary,
    'why', mission_row.why,
    'program_id', mission_row.program_id,
    'lab_id', mission_row.lab_id,
    'path_ids', to_jsonb(mission_row.path_ids),
    'age_min', mission_row.age_min,
    'age_max', mission_row.age_max,
    'estimated_minutes', mission_row.estimated_minutes,
    'evidence_prompt', mission_row.evidence_prompt,
    'reflection_prompt', mission_row.reflection_prompt,
    'transfer_prompt', mission_row.transfer_prompt,
    'contribution_prompt', mission_row.contribution_prompt,
    'safety_notes', mission_row.safety_notes,
    'curriculum_mapping', mission_row.curriculum_mapping,
    'teacher_load', mission_row.teacher_load
  );

  version_hash := encode(digest(version_snapshot::text, 'sha256'), 'hex');

  select id into existing_version_id
  from public.mission_versions
  where mission_id = target_mission_id
    and content_hash = version_hash;

  if existing_version_id is not null then
    return existing_version_id;
  end if;

  select coalesce(max(version_no), 0) + 1 into next_version_no
  from public.mission_versions
  where mission_id = target_mission_id;

  insert into public.mission_versions (
    mission_id,
    version_no,
    snapshot,
    content_hash,
    created_by,
    published_at
  ) values (
    target_mission_id,
    next_version_no,
    version_snapshot,
    version_hash,
    mission_row.created_by,
    now()
  ) returning id into existing_version_id;

  return existing_version_id;
end;
$$;

-- ---------------------------------------------------------------------------
-- Pilot cohorts and bounded teams
-- ---------------------------------------------------------------------------
create table if not exists public.pilot_cohorts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  name text not null,
  status text not null default 'planned' check (status in ('planned', 'active', 'completed', 'cancelled')),
  starts_on date,
  ends_on date,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_on is null or starts_on is null or ends_on >= starts_on)
);

create table if not exists public.pilot_cohort_members (
  id uuid primary key default gen_random_uuid(),
  cohort_id uuid not null references public.pilot_cohorts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('learner', 'teacher', 'coordinator')),
  status text not null default 'active' check (status in ('active', 'ended')),
  joined_at timestamptz not null default now(),
  ended_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (cohort_id, user_id, role),
  check ((status <> 'ended') or ended_at is not null)
);

create table if not exists public.experience_teams (
  id uuid primary key default gen_random_uuid(),
  cohort_id uuid not null references public.pilot_cohorts(id) on delete cascade,
  name text not null,
  status text not null default 'active' check (status in ('active', 'archived')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (cohort_id, name)
);

create table if not exists public.experience_team_members (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.experience_teams(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'learner' check (role in ('learner', 'facilitator')),
  status text not null default 'active' check (status in ('active', 'ended')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  ended_at timestamptz,
  unique (team_id, user_id),
  check ((status <> 'ended') or ended_at is not null)
);

create table if not exists public.experience_team_artifacts (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.experience_teams(id) on delete cascade,
  mission_version_id uuid not null references public.mission_versions(id) on delete restrict,
  kind text not null default 'artifact' check (kind in ('note', 'photo', 'video', 'document', 'link', 'artifact', 'measurement', 'prototype')),
  uri text,
  description text,
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists pilot_cohorts_org_status_idx
  on public.pilot_cohorts(organization_id, status);
create index if not exists pilot_cohort_members_user_idx
  on public.pilot_cohort_members(user_id, status);
create index if not exists experience_teams_cohort_idx
  on public.experience_teams(cohort_id, status);
create index if not exists experience_team_members_user_idx
  on public.experience_team_members(user_id, status);
create index if not exists experience_team_artifacts_team_idx
  on public.experience_team_artifacts(team_id, created_at);

-- Preserve all legacy individual runs while allowing new runs to bind pilot context.
alter table public.mission_runs
  add column if not exists mission_version_id uuid references public.mission_versions(id) on delete restrict;
alter table public.mission_runs
  add column if not exists cohort_id uuid references public.pilot_cohorts(id) on delete restrict;
alter table public.mission_runs
  add column if not exists team_id uuid references public.experience_teams(id) on delete restrict;

create index if not exists mission_runs_version_idx on public.mission_runs(mission_version_id);
create index if not exists mission_runs_cohort_idx on public.mission_runs(cohort_id, status);
create index if not exists mission_runs_team_idx on public.mission_runs(team_id, status);

alter table public.experiences
  add column if not exists mission_version_id uuid references public.mission_versions(id) on delete restrict;
alter table public.experiences
  add column if not exists cohort_id uuid references public.pilot_cohorts(id) on delete restrict;
alter table public.experiences
  add column if not exists team_id uuid references public.experience_teams(id) on delete restrict;

-- shared updated_at trigger

drop trigger if exists pilot_cohorts_touch_updated_at on public.pilot_cohorts;
create trigger pilot_cohorts_touch_updated_at
  before update on public.pilot_cohorts
  for each row execute procedure public.pansofie_touch_updated_at();

drop trigger if exists experience_teams_touch_updated_at on public.experience_teams;
create trigger experience_teams_touch_updated_at
  before update on public.experience_teams
  for each row execute procedure public.pansofie_touch_updated_at();

-- ---------------------------------------------------------------------------
-- Team access helper
-- ---------------------------------------------------------------------------
create or replace function public.pansofie_can_access_team(
  target_team_id uuid,
  target_user_id uuid default auth.uid()
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.experience_teams t
    join public.pilot_cohorts c on c.id = t.cohort_id
    where t.id = target_team_id
      and (
        public.pansofie_is_active_org_member(
          c.organization_id,
          array['teacher', 'coordinator']::text[],
          target_user_id
        )
        or exists (
          select 1
          from public.experience_team_members tm
          where tm.team_id = t.id
            and tm.user_id = target_user_id
            and tm.status = 'active'
        )
      )
  );
$$;

-- ---------------------------------------------------------------------------
-- Governed pilot operations
-- ---------------------------------------------------------------------------
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
begin
  if nullif(btrim(coalesce(target_name, '')), '') is null then
    raise exception 'cohort name is required';
  end if;

  if not public.pansofie_is_active_org_member(
    target_org_id,
    array['teacher', 'coordinator']::text[],
    auth.uid()
  ) and not public.is_admin() then
    raise exception 'teacher/coordinator membership required';
  end if;

  insert into public.pilot_cohorts (
    organization_id,
    name,
    status,
    starts_on,
    ends_on,
    created_by
  ) values (
    target_org_id,
    btrim(target_name),
    'planned',
    target_starts_on,
    target_ends_on,
    auth.uid()
  ) returning id into cohort_id;

  return cohort_id;
end;
$$;

create or replace function public.pansofie_add_pilot_cohort_member(
  target_cohort_id uuid,
  target_user_id uuid,
  target_role text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  cohort_row public.pilot_cohorts%rowtype;
  membership_id uuid;
begin
  if target_role not in ('learner', 'teacher', 'coordinator') then
    raise exception 'unsupported cohort role';
  end if;

  select * into cohort_row from public.pilot_cohorts where id = target_cohort_id;
  if cohort_row.id is null then
    raise exception 'cohort not found';
  end if;

  if not public.pansofie_is_active_org_member(
    cohort_row.organization_id,
    array['teacher', 'coordinator']::text[],
    auth.uid()
  ) and not public.is_admin() then
    raise exception 'teacher/coordinator membership required';
  end if;

  if not public.pansofie_is_active_org_member(
    cohort_row.organization_id,
    array[target_role]::text[],
    target_user_id
  ) then
    raise exception 'target user must have matching active organization role';
  end if;

  insert into public.pilot_cohort_members (
    cohort_id, user_id, role, status, created_by
  ) values (
    target_cohort_id, target_user_id, target_role, 'active', auth.uid()
  )
  on conflict (cohort_id, user_id, role)
  do update set status = 'active', ended_at = null
  returning id into membership_id;

  return membership_id;
end;
$$;

create or replace function public.pansofie_create_experience_team(
  target_cohort_id uuid,
  target_name text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  cohort_row public.pilot_cohorts%rowtype;
  team_id uuid;
begin
  if nullif(btrim(coalesce(target_name, '')), '') is null then
    raise exception 'team name is required';
  end if;

  select * into cohort_row from public.pilot_cohorts where id = target_cohort_id;
  if cohort_row.id is null then
    raise exception 'cohort not found';
  end if;

  if not public.pansofie_is_active_org_member(
    cohort_row.organization_id,
    array['teacher', 'coordinator']::text[],
    auth.uid()
  ) and not public.is_admin() then
    raise exception 'teacher/coordinator membership required';
  end if;

  insert into public.experience_teams (
    cohort_id, name, status, created_by
  ) values (
    target_cohort_id, btrim(target_name), 'active', auth.uid()
  ) returning id into team_id;

  return team_id;
end;
$$;

create or replace function public.pansofie_add_experience_team_member(
  target_team_id uuid,
  target_user_id uuid,
  target_role text default 'learner'
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  cohort_row public.pilot_cohorts%rowtype;
  member_id uuid;
  required_org_roles text[];
begin
  if target_role not in ('learner', 'facilitator') then
    raise exception 'unsupported team role';
  end if;

  select c.* into cohort_row
  from public.experience_teams t
  join public.pilot_cohorts c on c.id = t.cohort_id
  where t.id = target_team_id;

  if cohort_row.id is null then
    raise exception 'team not found';
  end if;

  if not public.pansofie_is_active_org_member(
    cohort_row.organization_id,
    array['teacher', 'coordinator']::text[],
    auth.uid()
  ) and not public.is_admin() then
    raise exception 'teacher/coordinator membership required';
  end if;

  required_org_roles := case
    when target_role = 'learner' then array['learner']::text[]
    else array['teacher', 'coordinator']::text[]
  end;

  if not public.pansofie_is_active_org_member(
    cohort_row.organization_id,
    required_org_roles,
    target_user_id
  ) then
    raise exception 'target user does not have the required organization role';
  end if;

  insert into public.experience_team_members (
    team_id, user_id, role, status, created_by
  ) values (
    target_team_id, target_user_id, target_role, 'active', auth.uid()
  )
  on conflict (team_id, user_id)
  do update set role = excluded.role, status = 'active', ended_at = null
  returning id into member_id;

  return member_id;
end;
$$;

-- Existing individual assignment now pins the exact published Mission snapshot.
create or replace function public.pansofie_assign_school_mission(
  target_mission_id uuid,
  target_learner_id uuid,
  target_org_id uuid
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  caller_id uuid := auth.uid();
  existing_run_id uuid;
  new_run_id uuid;
  target_version_id uuid;
begin
  if caller_id is null then
    raise exception 'authentication required';
  end if;

  if not public.pansofie_is_active_org_member(
    target_org_id,
    array['teacher', 'coordinator']::text[],
    caller_id
  ) and not public.is_admin() then
    raise exception 'teacher/coordinator membership required';
  end if;

  if not public.pansofie_is_active_org_member(
    target_org_id,
    array['learner']::text[],
    target_learner_id
  ) then
    raise exception 'target learner must be active in organization';
  end if;

  if not public.pansofie_has_processing_basis(
    target_learner_id,
    target_org_id,
    'school_mission_assignment'
  ) then
    raise exception 'school_mission_assignment processing basis required';
  end if;

  if not exists (
    select 1 from public.missions m
    where m.id = target_mission_id
      and m.status = 'published'
  ) and not public.is_admin() then
    raise exception 'only published missions can be assigned';
  end if;

  select r.id into existing_run_id
  from public.mission_runs r
  where r.mission_id = target_mission_id
    and r.user_id = target_learner_id
    and r.organization_id = target_org_id
    and r.status in ('assigned', 'in_progress', 'submitted')
  order by r.created_at desc
  limit 1;

  if existing_run_id is not null then
    return existing_run_id;
  end if;

  target_version_id := public.pansofie_materialize_mission_version(target_mission_id);

  insert into public.mission_runs (
    mission_id,
    mission_version_id,
    user_id,
    organization_id,
    assigned_by,
    status
  ) values (
    target_mission_id,
    target_version_id,
    target_learner_id,
    target_org_id,
    caller_id,
    'assigned'
  ) returning id into new_run_id;

  return new_run_id;
end;
$$;

create or replace function public.pansofie_assign_pilot_team_mission(
  target_mission_id uuid,
  target_team_id uuid
)
returns table(run_id uuid, user_id uuid)
language plpgsql
security definer
set search_path = public
as $$
declare
  team_row public.experience_teams%rowtype;
  cohort_row public.pilot_cohorts%rowtype;
  learner_row record;
  existing_run_id uuid;
  created_run_id uuid;
  target_version_id uuid;
begin
  select * into team_row from public.experience_teams where id = target_team_id;
  if team_row.id is null or team_row.status <> 'active' then
    raise exception 'active team required';
  end if;

  select * into cohort_row from public.pilot_cohorts where id = team_row.cohort_id;
  if cohort_row.id is null or cohort_row.status not in ('planned', 'active') then
    raise exception 'planned/active cohort required';
  end if;

  if not public.pansofie_is_active_org_member(
    cohort_row.organization_id,
    array['teacher', 'coordinator']::text[],
    auth.uid()
  ) and not public.is_admin() then
    raise exception 'teacher/coordinator membership required';
  end if;

  if not exists (
    select 1 from public.missions m
    where m.id = target_mission_id and m.status = 'published'
  ) then
    raise exception 'published mission required';
  end if;

  if not exists (
    select 1 from public.experience_team_members tm
    where tm.team_id = target_team_id
      and tm.role = 'learner'
      and tm.status = 'active'
  ) then
    raise exception 'team must contain at least one active learner';
  end if;

  -- Fail the whole assignment if even one learner lacks the purpose-specific basis.
  for learner_row in
    select tm.user_id
    from public.experience_team_members tm
    where tm.team_id = target_team_id
      and tm.role = 'learner'
      and tm.status = 'active'
    order by tm.created_at
  loop
    if not public.pansofie_has_processing_basis(
      learner_row.user_id,
      cohort_row.organization_id,
      'school_mission_assignment'
    ) then
      raise exception 'school_mission_assignment processing basis required for learner %', learner_row.user_id;
    end if;
  end loop;

  target_version_id := public.pansofie_materialize_mission_version(target_mission_id);

  for learner_row in
    select tm.user_id
    from public.experience_team_members tm
    where tm.team_id = target_team_id
      and tm.role = 'learner'
      and tm.status = 'active'
    order by tm.created_at
  loop
    select r.id into existing_run_id
    from public.mission_runs r
    where r.mission_id = target_mission_id
      and r.user_id = learner_row.user_id
      and r.organization_id = cohort_row.organization_id
      and r.team_id = target_team_id
      and r.status in ('assigned', 'in_progress', 'submitted')
    order by r.created_at desc
    limit 1;

    if existing_run_id is null then
      insert into public.mission_runs (
        mission_id,
        mission_version_id,
        user_id,
        organization_id,
        assigned_by,
        cohort_id,
        team_id,
        status
      ) values (
        target_mission_id,
        target_version_id,
        learner_row.user_id,
        cohort_row.organization_id,
        auth.uid(),
        cohort_row.id,
        target_team_id,
        'assigned'
      ) returning id into created_run_id;
    else
      created_run_id := existing_run_id;
    end if;

    run_id := created_run_id;
    user_id := learner_row.user_id;
    return next;
  end loop;
end;
$$;

-- Finalization reads the immutable snapshot when available, so a later Mission
-- edit cannot retroactively change the learner's completed Experience.
create or replace function public.pansofie_finalize_school_experience(target_run_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  run_row public.mission_runs%rowtype;
  mission_row public.missions%rowtype;
  reflection_row public.experience_reflections%rowtype;
  mission_snapshot jsonb;
  existing_experience_id uuid;
  experience_id uuid;
  final_reviewer uuid;
  snapshot_paths text[];
begin
  select * into run_row
  from public.mission_runs
  where id = target_run_id
  for update;

  if run_row.id is null then
    raise exception 'run not found';
  end if;

  if run_row.status = 'completed' then
    select e.id into existing_experience_id
    from public.experiences e
    where e.run_id = target_run_id;
    return existing_experience_id;
  end if;

  if run_row.status <> 'submitted' then
    raise exception 'run must be submitted before finalization';
  end if;

  if not public.pansofie_can_review_run(target_run_id, 'school_mission_review')
     and not public.is_admin() then
    raise exception 'mission review access required';
  end if;

  select r.reviewer_id into final_reviewer
  from public.experience_reviews r
  where r.run_id = target_run_id
    and r.review_scope = 'mission'
    and r.status = 'confirmed'
  order by r.updated_at desc
  limit 1;

  if final_reviewer is null then
    raise exception 'confirmed mission review required';
  end if;

  if not exists (select 1 from public.experience_evidence e where e.run_id = target_run_id) then
    raise exception 'evidence required';
  end if;

  select * into reflection_row
  from public.experience_reflections x
  where x.run_id = target_run_id;

  if reflection_row.id is null
     or nullif(btrim(coalesce(reflection_row.what_learned, '')), '') is null then
    raise exception 'completed reflection required';
  end if;

  select * into mission_row from public.missions m where m.id = run_row.mission_id;
  if mission_row.id is null then
    raise exception 'mission not found';
  end if;

  if run_row.mission_version_id is not null then
    select mv.snapshot into mission_snapshot
    from public.mission_versions mv
    where mv.id = run_row.mission_version_id;
  end if;

  if mission_snapshot is null then
    mission_snapshot := jsonb_build_object(
      'title', mission_row.title,
      'path_ids', to_jsonb(mission_row.path_ids),
      'program_id', mission_row.program_id,
      'lab_id', mission_row.lab_id
    );
  end if;

  select coalesce(array_agg(value), '{}'::text[])
  into snapshot_paths
  from jsonb_array_elements_text(coalesce(mission_snapshot->'path_ids', '[]'::jsonb)) as value;

  select e.id into existing_experience_id
  from public.experiences e
  where e.run_id = target_run_id;

  if existing_experience_id is null then
    insert into public.experiences (
      run_id,
      mission_id,
      mission_version_id,
      cohort_id,
      team_id,
      user_id,
      title,
      path_ids,
      program_id,
      lab_id,
      impact_summary,
      occurred_at
    ) values (
      run_row.id,
      mission_row.id,
      run_row.mission_version_id,
      run_row.cohort_id,
      run_row.team_id,
      run_row.user_id,
      coalesce(mission_snapshot->>'title', mission_row.title),
      snapshot_paths,
      coalesce(mission_snapshot->>'program_id', mission_row.program_id),
      coalesce(mission_snapshot->>'lab_id', mission_row.lab_id),
      nullif(btrim(coalesce(reflection_row.contribution, '')), ''),
      now()
    ) returning id into experience_id;
  else
    experience_id := existing_experience_id;
  end if;

  insert into public.portfolio_items (
    experience_id,
    user_id,
    title,
    summary,
    visibility,
    verified_by,
    verified_at
  ) values (
    experience_id,
    run_row.user_id,
    coalesce(mission_snapshot->>'title', mission_row.title),
    nullif(btrim(coalesce(reflection_row.what_learned, '')), ''),
    'private',
    final_reviewer,
    now()
  )
  on conflict (experience_id) do nothing;

  update public.mission_runs
  set status = 'completed', completed_at = now()
  where id = target_run_id;

  return experience_id;
end;
$$;

-- ---------------------------------------------------------------------------
-- Row-level security
-- ---------------------------------------------------------------------------
alter table public.mission_versions enable row level security;
alter table public.pilot_cohorts enable row level security;
alter table public.pilot_cohort_members enable row level security;
alter table public.experience_teams enable row level security;
alter table public.experience_team_members enable row level security;
alter table public.experience_team_artifacts enable row level security;

drop policy if exists "mission_versions_select_authenticated" on public.mission_versions;
create policy "mission_versions_select_authenticated"
  on public.mission_versions for select
  to authenticated
  using (true);

-- No insert/update/delete policy exists for mission_versions. The mutation
-- trigger also protects against accidental privileged updates/deletes.

drop policy if exists "pilot_cohorts_select_org_members" on public.pilot_cohorts;
create policy "pilot_cohorts_select_org_members"
  on public.pilot_cohorts for select
  to authenticated
  using (
    public.is_admin()
    or public.pansofie_is_active_org_member(organization_id, null, auth.uid())
  );

drop policy if exists "pilot_cohorts_write_staff" on public.pilot_cohorts;
create policy "pilot_cohorts_write_staff"
  on public.pilot_cohorts for all
  to authenticated
  using (
    public.is_admin()
    or public.pansofie_is_active_org_member(
      organization_id,
      array['teacher', 'coordinator']::text[],
      auth.uid()
    )
  )
  with check (
    public.is_admin()
    or public.pansofie_is_active_org_member(
      organization_id,
      array['teacher', 'coordinator']::text[],
      auth.uid()
    )
  );

drop policy if exists "pilot_cohort_members_select_org_members" on public.pilot_cohort_members;
create policy "pilot_cohort_members_select_org_members"
  on public.pilot_cohort_members for select
  to authenticated
  using (
    public.is_admin()
    or exists (
      select 1 from public.pilot_cohorts c
      where c.id = cohort_id
        and public.pansofie_is_active_org_member(c.organization_id, null, auth.uid())
    )
  );

drop policy if exists "pilot_cohort_members_write_staff" on public.pilot_cohort_members;
create policy "pilot_cohort_members_write_staff"
  on public.pilot_cohort_members for all
  to authenticated
  using (
    public.is_admin()
    or exists (
      select 1 from public.pilot_cohorts c
      where c.id = cohort_id
        and public.pansofie_is_active_org_member(
          c.organization_id,
          array['teacher', 'coordinator']::text[],
          auth.uid()
        )
    )
  )
  with check (
    public.is_admin()
    or exists (
      select 1 from public.pilot_cohorts c
      where c.id = cohort_id
        and public.pansofie_is_active_org_member(
          c.organization_id,
          array['teacher', 'coordinator']::text[],
          auth.uid()
        )
    )
  );

drop policy if exists "experience_teams_select_org_members" on public.experience_teams;
create policy "experience_teams_select_org_members"
  on public.experience_teams for select
  to authenticated
  using (
    public.is_admin()
    or exists (
      select 1 from public.pilot_cohorts c
      where c.id = cohort_id
        and public.pansofie_is_active_org_member(c.organization_id, null, auth.uid())
    )
  );

drop policy if exists "experience_teams_write_staff" on public.experience_teams;
create policy "experience_teams_write_staff"
  on public.experience_teams for all
  to authenticated
  using (
    public.is_admin()
    or exists (
      select 1 from public.pilot_cohorts c
      where c.id = cohort_id
        and public.pansofie_is_active_org_member(
          c.organization_id,
          array['teacher', 'coordinator']::text[],
          auth.uid()
        )
    )
  )
  with check (
    public.is_admin()
    or exists (
      select 1 from public.pilot_cohorts c
      where c.id = cohort_id
        and public.pansofie_is_active_org_member(
          c.organization_id,
          array['teacher', 'coordinator']::text[],
          auth.uid()
        )
    )
  );

drop policy if exists "experience_team_members_select_access" on public.experience_team_members;
create policy "experience_team_members_select_access"
  on public.experience_team_members for select
  to authenticated
  using (public.is_admin() or public.pansofie_can_access_team(team_id, auth.uid()));

drop policy if exists "experience_team_members_write_staff" on public.experience_team_members;
create policy "experience_team_members_write_staff"
  on public.experience_team_members for all
  to authenticated
  using (
    public.is_admin()
    or exists (
      select 1
      from public.experience_teams t
      join public.pilot_cohorts c on c.id = t.cohort_id
      where t.id = team_id
        and public.pansofie_is_active_org_member(
          c.organization_id,
          array['teacher', 'coordinator']::text[],
          auth.uid()
        )
    )
  )
  with check (
    public.is_admin()
    or exists (
      select 1
      from public.experience_teams t
      join public.pilot_cohorts c on c.id = t.cohort_id
      where t.id = team_id
        and public.pansofie_is_active_org_member(
          c.organization_id,
          array['teacher', 'coordinator']::text[],
          auth.uid()
        )
    )
  );

drop policy if exists "experience_team_artifacts_select_access" on public.experience_team_artifacts;
create policy "experience_team_artifacts_select_access"
  on public.experience_team_artifacts for select
  to authenticated
  using (public.is_admin() or public.pansofie_can_access_team(team_id, auth.uid()));

drop policy if exists "experience_team_artifacts_insert_access" on public.experience_team_artifacts;
create policy "experience_team_artifacts_insert_access"
  on public.experience_team_artifacts for insert
  to authenticated
  with check (
    created_by = auth.uid()
    and (public.is_admin() or public.pansofie_can_access_team(team_id, auth.uid()))
  );

drop policy if exists "experience_team_artifacts_delete_creator_or_staff" on public.experience_team_artifacts;
create policy "experience_team_artifacts_delete_creator_or_staff"
  on public.experience_team_artifacts for delete
  to authenticated
  using (
    created_by = auth.uid()
    or public.is_admin()
    or exists (
      select 1
      from public.experience_teams t
      join public.pilot_cohorts c on c.id = t.cohort_id
      where t.id = team_id
        and public.pansofie_is_active_org_member(
          c.organization_id,
          array['teacher', 'coordinator']::text[],
          auth.uid()
        )
    )
  );

-- ---------------------------------------------------------------------------
-- Canonical first field-pilot Experiences
-- ---------------------------------------------------------------------------
insert into public.missions (
  slug, title, summary, why, program_id, lab_id, path_ids, status,
  estimated_minutes, evidence_prompt, reflection_prompt, transfer_prompt,
  contribution_prompt, safety_notes, curriculum_mapping, teacher_load
) values
(
  'zlepsi-svou-skolu',
  'Zlepši svou školu',
  'Tým najde konkrétní problém ve škole, navrhne dosažitelnou změnu, provede malý pilot a doloží, co se skutečně změnilo.',
  'Agency, spolupráce a občanský přínos mají vzniknout na skutečné školní potřebě, ne na simulaci.',
  'school',
  'community',
  array['tvorba-reseni', 'vztahy-spoluprace', 'obcanstvi-prinos']::text[],
  'published',
  240,
  'Doložte výchozí stav, týmový postup, konkrétní výstup a výsledek malého pilotu.',
  'Co se opravdu změnilo? Co nefungovalo? Co jste pochopili o spolupráci a změně ve škole?',
  'Jaký další krok má smysl, pokud má změna pokračovat?',
  'Komu vznikla konkrétní hodnota a jak ji lze doložit?',
  'Změna musí být bezpečná, legální a schválená školou; nezasahuje do citlivých osobních údajů ani bezpečnostních systémů.',
  '{}'::jsonb,
  '{"target_review_minutes_per_team":5}'::jsonb
),
(
  'digitalni-most',
  'Digitální most',
  'Tým připraví bezpečnou a praktickou digitální pomoc člověku z jiné generace v předem vyjasněném rámci.',
  'Mezigenerační spolupráce má vést k reálné pomoci a současně ověřit bezpečné předávání digitálních dovedností.',
  'school',
  'community',
  array['poznani-mysleni', 'vztahy-spoluprace', 'obcanstvi-prinos']::text[],
  'published',
  180,
  'Doložte potřebu, bezpečný rozsah pomoci, průběh a ověření, zda pomoc skutečně fungovala.',
  'Co člověk skutečně potřeboval? Co bylo těžké vysvětlit? Co jste se naučili o komunikaci a bezpečnosti?',
  'Co by šlo příště udělat lépe nebo nabídnout dalším lidem?',
  'Jaká konkrétní pomoc vznikla a pro koho?',
  'Nikdy nepracujte s hesly, PINy, bankovnictvím, platbami, zdravotními záznamy, doklady totožnosti, soukromými zprávami ani remote-access softwarem.',
  '{}'::jsonb,
  '{"target_review_minutes_per_team":5}'::jsonb
),
(
  'circular-challenge',
  'Circular Challenge',
  'Tým změří konkrétní materiálový nebo odpadový problém, vytvoří návrh či prototyp a oddělí výstup od rozhodnutí o adopci a dopadu.',
  'Udržitelnost má být doložená prací se skutečnými zdroji a trade-offy, ne pouze deklarací dobrého úmyslu.',
  'school',
  'nature',
  array['priroda-udrzitelnost', 'tvorba-reseni', 'samostatnost-podnikavost']::text[],
  'published',
  240,
  'Doložte výchozí měření, návrh, prototyp nebo test a jasně oddělte output od případné adopce.',
  'Kde byl největší trade-off? Co měření ukázalo? Co by bylo potřeba pro další pilot?',
  'Kdo by mohl rozhodnout o pilotní adopci a jaké další důkazy by potřeboval?',
  'Jakou hodnotu výstup vytvořil pro školu, komunitu nebo partnera bez přehánění impact claimu?',
  'Partner hodnotí výstup, ne lidskou hodnotu. Platba ani partnerství nekupuje adopci, pozitivní hodnocení nebo impact claim.',
  '{}'::jsonb,
  '{"target_review_minutes_per_team":5}'::jsonb
)
on conflict (slug) do update set
  title = excluded.title,
  summary = excluded.summary,
  why = excluded.why,
  program_id = excluded.program_id,
  lab_id = excluded.lab_id,
  path_ids = excluded.path_ids,
  status = 'published',
  estimated_minutes = excluded.estimated_minutes,
  evidence_prompt = excluded.evidence_prompt,
  reflection_prompt = excluded.reflection_prompt,
  transfer_prompt = excluded.transfer_prompt,
  contribution_prompt = excluded.contribution_prompt,
  safety_notes = excluded.safety_notes,
  curriculum_mapping = excluded.curriculum_mapping,
  teacher_load = excluded.teacher_load;

-- Create an immutable version for each canonical pilot Experience.
select public.pansofie_materialize_mission_version(id)
from public.missions
where slug in ('zlepsi-svou-skolu', 'digitalni-most', 'circular-challenge');

-- ---------------------------------------------------------------------------
-- Function permissions
-- ---------------------------------------------------------------------------
revoke all on function public.pansofie_materialize_mission_version(uuid) from public;
revoke all on function public.pansofie_can_access_team(uuid, uuid) from public;
revoke all on function public.pansofie_create_pilot_cohort(uuid, text, date, date) from public;
revoke all on function public.pansofie_add_pilot_cohort_member(uuid, uuid, text) from public;
revoke all on function public.pansofie_create_experience_team(uuid, text) from public;
revoke all on function public.pansofie_add_experience_team_member(uuid, uuid, text) from public;
revoke all on function public.pansofie_assign_pilot_team_mission(uuid, uuid) from public;

-- materialize_mission_version remains internal-only.
grant execute on function public.pansofie_can_access_team(uuid, uuid) to authenticated;
grant execute on function public.pansofie_create_pilot_cohort(uuid, text, date, date) to authenticated;
grant execute on function public.pansofie_add_pilot_cohort_member(uuid, uuid, text) to authenticated;
grant execute on function public.pansofie_create_experience_team(uuid, text) to authenticated;
grant execute on function public.pansofie_add_experience_team_member(uuid, uuid, text) to authenticated;
grant execute on function public.pansofie_assign_pilot_team_mission(uuid, uuid) to authenticated;

comment on table public.mission_versions is 'Immutable snapshot of a published Mission used for governed execution provenance.';
comment on table public.pilot_cohorts is 'Bounded real-field-pilot cohort attached to one organization.';
comment on table public.experience_teams is 'Small working team inside a pilot cohort; not a social-network group.';
comment on table public.experience_team_artifacts is 'Shared team output/evidence; individual learner reflection remains separate.';
comment on function public.pansofie_assign_pilot_team_mission(uuid, uuid) is 'Creates one individually owned run per active learner while binding all runs to one cohort/team and exact immutable Mission version.';
