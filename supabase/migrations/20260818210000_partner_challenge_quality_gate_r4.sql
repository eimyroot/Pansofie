-- PANSOFIE PARTNER CHALLENGE + QUALITY GATE R4
-- Staging-first additive migration. Production deployment is explicitly out of scope.
--
-- Principles:
-- - verified partner organization + active partner_contact membership required;
-- - Challenges contain adult/org/business context, never child profiles;
-- - screening and verification history are append-only evidence;
-- - no numeric Challenge score;
-- - managed matching only; no open marketplace or automated learner matching;
-- - browser access to new Partner data is RPC projection-only;
-- - partner never receives learner raw evidence, private reflection, teacher review or Passport data in R4.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Partner identity role
-- ---------------------------------------------------------------------------

alter table public.organization_memberships
  drop constraint if exists organization_memberships_role_check;

alter table public.organization_memberships
  add constraint organization_memberships_role_check
  check (role in ('learner', 'teacher', 'coordinator', 'mentor', 'staff', 'partner_contact'));

-- ---------------------------------------------------------------------------
-- Append-only partner verification evidence
-- ---------------------------------------------------------------------------

create table if not exists public.partner_organization_verification_events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  status text not null check (status in ('pending', 'verified', 'suspended')),
  note text,
  actor_user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists partner_verification_org_created_idx
  on public.partner_organization_verification_events(organization_id, created_at desc);

create or replace function public.pansofie_reject_partner_evidence_mutation()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  raise exception 'partner verification/screening evidence is append-only';
end;
$$;

-- ---------------------------------------------------------------------------
-- Challenge model
-- ---------------------------------------------------------------------------

create table if not exists public.partner_challenges (
  id uuid primary key default gen_random_uuid(),
  partner_organization_id uuid not null references public.organizations(id) on delete restrict,
  created_by uuid not null references auth.users(id) on delete restrict,
  title text not null,
  problem_statement text not null,
  beneficiary text not null,
  context text,
  desired_output text not null,
  available_resources text,
  data_requirements text,
  age_min smallint check (age_min is null or age_min >= 6),
  age_max smallint check (age_max is null or age_max <= 25),
  timeframe text,
  ip_expectations text,
  safety_notes text,
  feedback_commitment text not null,
  adoption_possibility text,
  status text not null default 'draft' check (status in ('draft', 'submitted', 'needs_work', 'ready', 'blocked', 'active', 'completed', 'archived')),
  revision_no integer not null default 0 check (revision_no >= 0),
  submitted_at timestamptz,
  activated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (age_max is null or age_min is null or age_max >= age_min)
);

create index if not exists partner_challenges_org_status_idx
  on public.partner_challenges(partner_organization_id, status, updated_at desc);

create table if not exists public.partner_challenge_screenings (
  id uuid primary key default gen_random_uuid(),
  challenge_id uuid not null references public.partner_challenges(id) on delete restrict,
  challenge_revision integer not null check (challenge_revision > 0),
  decision text not null check (decision in ('needs_work', 'ready', 'blocked')),
  dimensions jsonb not null,
  note text,
  challenge_snapshot jsonb not null,
  screened_by uuid references auth.users(id) on delete set null,
  screened_at timestamptz not null default now(),
  unique (challenge_id, challenge_revision)
);

create index if not exists challenge_screenings_challenge_idx
  on public.partner_challenge_screenings(challenge_id, challenge_revision desc);

create table if not exists public.partner_challenge_assignments (
  id uuid primary key default gen_random_uuid(),
  challenge_id uuid not null references public.partner_challenges(id) on delete restrict,
  school_organization_id uuid not null references public.organizations(id) on delete restrict,
  cohort_id uuid not null references public.pilot_cohorts(id) on delete restrict,
  team_id uuid not null references public.experience_teams(id) on delete restrict,
  mission_id uuid not null references public.missions(id) on delete restrict,
  mission_version_id uuid not null references public.mission_versions(id) on delete restrict,
  status text not null default 'proposed' check (status in ('proposed', 'active', 'completed', 'cancelled')),
  proposed_by uuid references auth.users(id) on delete set null,
  proposed_at timestamptz not null default now(),
  accepted_by uuid references auth.users(id) on delete set null,
  accepted_at timestamptz,
  cancelled_by uuid references auth.users(id) on delete set null,
  cancelled_at timestamptz,
  cancellation_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((status <> 'active') or accepted_at is not null),
  check ((status <> 'cancelled') or cancelled_at is not null)
);

create unique index if not exists challenge_assignment_one_open_idx
  on public.partner_challenge_assignments(challenge_id)
  where status in ('proposed', 'active');

create index if not exists challenge_assignments_school_status_idx
  on public.partner_challenge_assignments(school_organization_id, status, proposed_at desc);

alter table public.mission_runs
  add column if not exists challenge_assignment_id uuid references public.partner_challenge_assignments(id) on delete restrict;

create index if not exists mission_runs_challenge_assignment_idx
  on public.mission_runs(challenge_assignment_id)
  where challenge_assignment_id is not null;

-- Standard updated_at handling.
drop trigger if exists partner_challenges_touch_updated_at on public.partner_challenges;
create trigger partner_challenges_touch_updated_at
  before update on public.partner_challenges
  for each row execute procedure public.pansofie_touch_updated_at();

drop trigger if exists partner_challenge_assignments_touch_updated_at on public.partner_challenge_assignments;
create trigger partner_challenge_assignments_touch_updated_at
  before update on public.partner_challenge_assignments
  for each row execute procedure public.pansofie_touch_updated_at();

-- Append-only evidence triggers.
drop trigger if exists partner_verification_events_immutable on public.partner_organization_verification_events;
create trigger partner_verification_events_immutable
  before update or delete on public.partner_organization_verification_events
  for each row execute procedure public.pansofie_reject_partner_evidence_mutation();

drop trigger if exists partner_challenge_screenings_immutable on public.partner_challenge_screenings;
create trigger partner_challenge_screenings_immutable
  before update or delete on public.partner_challenge_screenings
  for each row execute procedure public.pansofie_reject_partner_evidence_mutation();

-- ---------------------------------------------------------------------------
-- Internal authorization helpers
-- ---------------------------------------------------------------------------

create or replace function public.pansofie_partner_verification_status(target_org_id uuid)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((
    select e.status
    from public.partner_organization_verification_events e
    where e.organization_id = target_org_id
    order by e.created_at desc, e.id desc
    limit 1
  ), 'pending'::text);
$$;

create or replace function public.pansofie_is_active_partner_contact(
  target_org_id uuid,
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
    from public.organization_memberships m
    join public.organizations o on o.id = m.organization_id
    where m.organization_id = target_org_id
      and m.user_id = target_user_id
      and m.role = 'partner_contact'
      and m.status = 'active'
      and o.status = 'active'
      and o.organization_type in ('company', 'ngo', 'community', 'municipality')
      and public.pansofie_partner_verification_status(target_org_id) = 'verified'
  );
$$;

create or replace function public.pansofie_validate_challenge_dimensions(target_dimensions jsonb)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  dim text;
  state text;
  expected text[] := array[
    'educational_fit',
    'age_fit',
    'scope',
    'data_privacy',
    'safeguarding',
    'ip',
    'deliverable',
    'feedback_plan',
    'adoption_possibility'
  ];
begin
  if target_dimensions is null or jsonb_typeof(target_dimensions) <> 'object' then
    raise exception 'dimensions must be a JSON object';
  end if;

  for dim in select jsonb_object_keys(target_dimensions)
  loop
    if not (dim = any(expected)) then
      raise exception 'unsupported Challenge Quality Gate dimension: %', dim;
    end if;
  end loop;

  foreach dim in array expected
  loop
    state := upper(coalesce(target_dimensions->>dim, ''));
    if state not in ('PASS', 'NEEDS_WORK', 'BLOCKED', 'NOT_APPLICABLE') then
      raise exception 'invalid state for dimension %', dim;
    end if;
  end loop;
end;
$$;

-- ---------------------------------------------------------------------------
-- Admin provisioning / verification
-- ---------------------------------------------------------------------------

create or replace function public.pansofie_admin_register_partner_organization(
  target_slug text,
  target_name text,
  target_organization_type text,
  target_contact_email text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  caller_id uuid := auth.uid();
  contact_id uuid;
  org_id uuid;
  clean_slug text := lower(btrim(coalesce(target_slug, '')));
  clean_name text := btrim(coalesce(target_name, ''));
  clean_email text := lower(btrim(coalesce(target_contact_email, '')));
begin
  if caller_id is null or not public.is_admin() then raise exception 'admin access required'; end if;
  if clean_slug = '' or clean_name = '' or clean_email = '' then raise exception 'slug, name and contact email are required'; end if;
  if target_organization_type not in ('company', 'ngo', 'community', 'municipality') then raise exception 'unsupported partner organization type'; end if;
  if exists (select 1 from public.organizations where slug = clean_slug) then raise exception 'organization slug already exists'; end if;

  select u.id into contact_id
  from auth.users u
  where lower(u.email) = clean_email
  order by u.created_at asc
  limit 1;

  if contact_id is null then raise exception 'partner contact must already have an invited PANSOFIE account'; end if;

  insert into public.organizations (slug, name, organization_type, country_code, status, created_by)
  values (clean_slug, clean_name, target_organization_type, 'CZ', 'active', caller_id)
  returning id into org_id;

  insert into public.organization_memberships (
    organization_id, user_id, role, status, joined_at, created_by
  ) values (
    org_id, contact_id, 'partner_contact', 'active', now(), caller_id
  );

  insert into public.partner_organization_verification_events (
    organization_id, status, note, actor_user_id
  ) values (
    org_id, 'pending', 'Partner organization created; verification pending.', caller_id
  );

  return org_id;
end;
$$;

create or replace function public.pansofie_admin_set_partner_verification(
  target_org_id uuid,
  target_status text,
  target_note text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  caller_id uuid := auth.uid();
  event_id uuid;
begin
  if caller_id is null or not public.is_admin() then raise exception 'admin access required'; end if;
  if target_status not in ('pending', 'verified', 'suspended') then raise exception 'unsupported verification status'; end if;
  if not exists (
    select 1 from public.organizations o
    where o.id = target_org_id
      and o.organization_type in ('company', 'ngo', 'community', 'municipality')
  ) then raise exception 'partner organization not found'; end if;

  insert into public.partner_organization_verification_events (
    organization_id, status, note, actor_user_id
  ) values (
    target_org_id, target_status, nullif(btrim(coalesce(target_note, '')), ''), caller_id
  ) returning id into event_id;

  return event_id;
end;
$$;

-- ---------------------------------------------------------------------------
-- Partner Challenge authoring
-- ---------------------------------------------------------------------------

create or replace function public.pansofie_partner_create_challenge(
  target_org_id uuid,
  target_title text,
  target_problem_statement text,
  target_beneficiary text,
  target_desired_output text,
  target_feedback_commitment text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare challenge_id uuid;
begin
  if not public.pansofie_is_active_partner_contact(target_org_id, auth.uid()) then
    raise exception 'verified partner_contact membership required';
  end if;
  if nullif(btrim(coalesce(target_title, '')), '') is null then raise exception 'Challenge title is required'; end if;
  if nullif(btrim(coalesce(target_problem_statement, '')), '') is null then raise exception 'problem statement is required'; end if;
  if nullif(btrim(coalesce(target_beneficiary, '')), '') is null then raise exception 'beneficiary is required'; end if;
  if nullif(btrim(coalesce(target_desired_output, '')), '') is null then raise exception 'desired output is required'; end if;
  if nullif(btrim(coalesce(target_feedback_commitment, '')), '') is null then raise exception 'feedback commitment is required'; end if;

  insert into public.partner_challenges (
    partner_organization_id, created_by, title, problem_statement, beneficiary,
    desired_output, feedback_commitment, status, revision_no
  ) values (
    target_org_id, auth.uid(), btrim(target_title), btrim(target_problem_statement), btrim(target_beneficiary),
    btrim(target_desired_output), btrim(target_feedback_commitment), 'draft', 0
  ) returning id into challenge_id;

  return challenge_id;
end;
$$;

create or replace function public.pansofie_partner_update_challenge(
  target_challenge_id uuid,
  target_title text,
  target_problem_statement text,
  target_beneficiary text,
  target_context text,
  target_desired_output text,
  target_available_resources text,
  target_data_requirements text,
  target_age_min integer,
  target_age_max integer,
  target_timeframe text,
  target_ip_expectations text,
  target_safety_notes text,
  target_feedback_commitment text,
  target_adoption_possibility text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare challenge_row public.partner_challenges%rowtype;
begin
  select * into challenge_row from public.partner_challenges where id = target_challenge_id for update;
  if challenge_row.id is null then raise exception 'Challenge not found'; end if;
  if not public.pansofie_is_active_partner_contact(challenge_row.partner_organization_id, auth.uid()) then
    raise exception 'verified partner_contact membership required';
  end if;
  if challenge_row.status not in ('draft', 'needs_work') then raise exception 'Challenge is not editable in current state'; end if;
  if nullif(btrim(coalesce(target_title, '')), '') is null then raise exception 'Challenge title is required'; end if;
  if nullif(btrim(coalesce(target_problem_statement, '')), '') is null then raise exception 'problem statement is required'; end if;
  if nullif(btrim(coalesce(target_beneficiary, '')), '') is null then raise exception 'beneficiary is required'; end if;
  if nullif(btrim(coalesce(target_desired_output, '')), '') is null then raise exception 'desired output is required'; end if;
  if nullif(btrim(coalesce(target_feedback_commitment, '')), '') is null then raise exception 'feedback commitment is required'; end if;
  if target_age_min is not null and target_age_min < 6 then raise exception 'age_min must be at least 6'; end if;
  if target_age_max is not null and target_age_max > 25 then raise exception 'age_max must be at most 25'; end if;
  if target_age_min is not null and target_age_max is not null and target_age_max < target_age_min then raise exception 'age range is invalid'; end if;

  update public.partner_challenges set
    title = btrim(target_title),
    problem_statement = btrim(target_problem_statement),
    beneficiary = btrim(target_beneficiary),
    context = nullif(btrim(coalesce(target_context, '')), ''),
    desired_output = btrim(target_desired_output),
    available_resources = nullif(btrim(coalesce(target_available_resources, '')), ''),
    data_requirements = nullif(btrim(coalesce(target_data_requirements, '')), ''),
    age_min = target_age_min,
    age_max = target_age_max,
    timeframe = nullif(btrim(coalesce(target_timeframe, '')), ''),
    ip_expectations = nullif(btrim(coalesce(target_ip_expectations, '')), ''),
    safety_notes = nullif(btrim(coalesce(target_safety_notes, '')), ''),
    feedback_commitment = btrim(target_feedback_commitment),
    adoption_possibility = nullif(btrim(coalesce(target_adoption_possibility, '')), ''),
    status = 'draft',
    submitted_at = null
  where id = target_challenge_id;

  return target_challenge_id;
end;
$$;

create or replace function public.pansofie_partner_submit_challenge(target_challenge_id uuid)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  challenge_row public.partner_challenges%rowtype;
  next_revision integer;
begin
  select * into challenge_row from public.partner_challenges where id = target_challenge_id for update;
  if challenge_row.id is null then raise exception 'Challenge not found'; end if;
  if not public.pansofie_is_active_partner_contact(challenge_row.partner_organization_id, auth.uid()) then
    raise exception 'verified partner_contact membership required';
  end if;
  if challenge_row.status <> 'draft' then raise exception 'only a draft Challenge can be submitted'; end if;
  if nullif(btrim(challenge_row.title), '') is null
     or nullif(btrim(challenge_row.problem_statement), '') is null
     or nullif(btrim(challenge_row.beneficiary), '') is null
     or nullif(btrim(challenge_row.desired_output), '') is null
     or nullif(btrim(challenge_row.feedback_commitment), '') is null then
    raise exception 'Challenge required fields are incomplete';
  end if;

  next_revision := challenge_row.revision_no + 1;
  update public.partner_challenges
  set status = 'submitted', revision_no = next_revision, submitted_at = now()
  where id = target_challenge_id;

  return next_revision;
end;
$$;

-- ---------------------------------------------------------------------------
-- Quality Gate
-- ---------------------------------------------------------------------------

create or replace function public.pansofie_admin_screen_partner_challenge(
  target_challenge_id uuid,
  target_decision text,
  target_dimensions jsonb,
  target_note text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  challenge_row public.partner_challenges%rowtype;
  screening_id uuid;
  dim text;
  state text;
  consequential text[] := array[
    'educational_fit', 'age_fit', 'scope', 'data_privacy', 'safeguarding', 'ip', 'deliverable', 'feedback_plan'
  ];
  has_blocked boolean := false;
  has_needs_work boolean := false;
begin
  if auth.uid() is null or not public.is_admin() then raise exception 'admin access required'; end if;
  if target_decision not in ('needs_work', 'ready', 'blocked') then raise exception 'unsupported screening decision'; end if;
  perform public.pansofie_validate_challenge_dimensions(target_dimensions);

  select * into challenge_row from public.partner_challenges where id = target_challenge_id for update;
  if challenge_row.id is null then raise exception 'Challenge not found'; end if;
  if challenge_row.status <> 'submitted' then raise exception 'only a submitted Challenge can be screened'; end if;
  if public.pansofie_partner_verification_status(challenge_row.partner_organization_id) <> 'verified' then
    raise exception 'partner organization must remain verified';
  end if;

  for dim in select jsonb_object_keys(target_dimensions)
  loop
    state := upper(target_dimensions->>dim);
    if state = 'BLOCKED' then has_blocked := true; end if;
    if state = 'NEEDS_WORK' then has_needs_work := true; end if;
  end loop;

  if target_decision = 'blocked' and not has_blocked then
    raise exception 'BLOCKED decision requires at least one BLOCKED dimension';
  end if;
  if target_decision = 'needs_work' and (has_blocked or not has_needs_work) then
    raise exception 'NEEDS_WORK requires at least one NEEDS_WORK dimension and no BLOCKED dimensions';
  end if;
  if target_decision = 'ready' then
    foreach dim in array consequential
    loop
      if upper(target_dimensions->>dim) <> 'PASS' then
        raise exception 'READY requires PASS for dimension %', dim;
      end if;
    end loop;
    if upper(target_dimensions->>'adoption_possibility') not in ('PASS', 'NOT_APPLICABLE') then
      raise exception 'READY requires adoption_possibility PASS or NOT_APPLICABLE';
    end if;
  end if;

  insert into public.partner_challenge_screenings (
    challenge_id, challenge_revision, decision, dimensions, note, challenge_snapshot, screened_by
  ) values (
    challenge_row.id,
    challenge_row.revision_no,
    target_decision,
    target_dimensions,
    nullif(btrim(coalesce(target_note, '')), ''),
    to_jsonb(challenge_row),
    auth.uid()
  ) returning id into screening_id;

  update public.partner_challenges
  set status = target_decision
  where id = challenge_row.id;

  return screening_id;
end;
$$;

-- ---------------------------------------------------------------------------
-- Managed matching and School acceptance
-- ---------------------------------------------------------------------------

create or replace function public.pansofie_admin_propose_challenge_assignment(
  target_challenge_id uuid,
  target_school_org_id uuid,
  target_cohort_id uuid,
  target_team_id uuid
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  challenge_row public.partner_challenges%rowtype;
  cohort_row public.pilot_cohorts%rowtype;
  team_row public.experience_teams%rowtype;
  mission_row public.missions%rowtype;
  target_version_id uuid;
  assignment_id uuid;
begin
  if auth.uid() is null or not public.is_admin() then raise exception 'admin access required'; end if;

  select * into challenge_row from public.partner_challenges where id = target_challenge_id;
  if challenge_row.id is null or challenge_row.status <> 'ready' then raise exception 'READY Challenge required'; end if;
  if public.pansofie_partner_verification_status(challenge_row.partner_organization_id) <> 'verified' then
    raise exception 'partner organization must remain verified';
  end if;
  if not exists (
    select 1 from public.partner_challenge_screenings s
    where s.challenge_id = challenge_row.id
      and s.challenge_revision = challenge_row.revision_no
      and s.decision = 'ready'
  ) then raise exception 'current Challenge revision does not have a READY screening'; end if;
  if exists (
    select 1 from public.partner_challenge_assignments a
    where a.challenge_id = challenge_row.id and a.status in ('proposed', 'active')
  ) then raise exception 'Challenge already has an open managed assignment'; end if;

  if not exists (
    select 1 from public.organizations o
    where o.id = target_school_org_id and o.organization_type = 'school' and o.status = 'active'
  ) then raise exception 'active school organization required'; end if;

  select * into cohort_row from public.pilot_cohorts where id = target_cohort_id;
  if cohort_row.id is null or cohort_row.organization_id <> target_school_org_id or cohort_row.status not in ('planned', 'active') then
    raise exception 'planned/active cohort must belong to target school';
  end if;

  select * into team_row from public.experience_teams where id = target_team_id;
  if team_row.id is null or team_row.cohort_id <> cohort_row.id or team_row.status <> 'active' then
    raise exception 'active Experience team must belong to target cohort';
  end if;
  if not exists (
    select 1 from public.experience_team_members tm
    where tm.team_id = team_row.id and tm.role = 'learner' and tm.status = 'active'
  ) then raise exception 'target team must contain at least one active learner'; end if;

  select * into mission_row
  from public.missions
  where slug = 'circular-challenge' and status = 'published';
  if mission_row.id is null then raise exception 'published circular-challenge Mission required'; end if;

  target_version_id := public.pansofie_materialize_mission_version(mission_row.id);

  insert into public.partner_challenge_assignments (
    challenge_id, school_organization_id, cohort_id, team_id, mission_id,
    mission_version_id, status, proposed_by, proposed_at
  ) values (
    challenge_row.id, target_school_org_id, cohort_row.id, team_row.id, mission_row.id,
    target_version_id, 'proposed', auth.uid(), now()
  ) returning id into assignment_id;

  return assignment_id;
end;
$$;

create or replace function public.pansofie_school_accept_challenge_assignment(target_assignment_id uuid)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  assignment_row public.partner_challenge_assignments%rowtype;
  challenge_row public.partner_challenges%rowtype;
  current_version_id uuid;
  learner_record record;
  bound_count integer := 0;
begin
  select * into assignment_row
  from public.partner_challenge_assignments
  where id = target_assignment_id
  for update;

  if assignment_row.id is null or assignment_row.status <> 'proposed' then raise exception 'proposed assignment required'; end if;
  if not public.pansofie_is_active_org_member(assignment_row.school_organization_id, array['teacher', 'coordinator']::text[], auth.uid())
     and not public.is_admin() then
    raise exception 'teacher/coordinator membership required';
  end if;

  select * into challenge_row from public.partner_challenges where id = assignment_row.challenge_id for update;
  if challenge_row.id is null or challenge_row.status <> 'ready' then raise exception 'Challenge must remain READY'; end if;
  if public.pansofie_partner_verification_status(challenge_row.partner_organization_id) <> 'verified' then
    raise exception 'partner organization is no longer verified';
  end if;
  if not exists (
    select 1 from public.partner_challenge_screenings s
    where s.challenge_id = challenge_row.id
      and s.challenge_revision = challenge_row.revision_no
      and s.decision = 'ready'
  ) then raise exception 'current Challenge revision no longer has a READY screening'; end if;

  current_version_id := public.pansofie_materialize_mission_version(assignment_row.mission_id);
  if current_version_id <> assignment_row.mission_version_id then
    raise exception 'Circular Challenge Mission version changed; managed assignment must be recreated';
  end if;

  if exists (
    select 1
    from public.mission_runs r
    where r.team_id = assignment_row.team_id
      and r.mission_id = assignment_row.mission_id
      and r.status in ('in_progress', 'submitted')
  ) then raise exception 'cannot bind a Challenge to already-started learner runs'; end if;

  if exists (
    select 1
    from public.mission_runs r
    where r.team_id = assignment_row.team_id
      and r.mission_id = assignment_row.mission_id
      and r.status = 'assigned'
      and r.challenge_assignment_id is not null
      and r.challenge_assignment_id <> assignment_row.id
  ) then raise exception 'an assigned learner run is already bound to another Challenge'; end if;

  for learner_record in
    select * from public.pansofie_assign_pilot_team_mission(assignment_row.mission_id, assignment_row.team_id)
  loop
    update public.mission_runs
    set challenge_assignment_id = assignment_row.id
    where id = learner_record.run_id
      and status = 'assigned'
      and (challenge_assignment_id is null or challenge_assignment_id = assignment_row.id);
    if found then bound_count := bound_count + 1; end if;
  end loop;

  if bound_count = 0 then raise exception 'no not-yet-started learner runs were bound'; end if;

  update public.partner_challenge_assignments
  set status = 'active', accepted_by = auth.uid(), accepted_at = now()
  where id = assignment_row.id;

  update public.partner_challenges
  set status = 'active', activated_at = now()
  where id = challenge_row.id;

  return bound_count;
end;
$$;

create or replace function public.pansofie_school_decline_challenge_assignment(
  target_assignment_id uuid,
  target_note text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare assignment_row public.partner_challenge_assignments%rowtype;
begin
  select * into assignment_row
  from public.partner_challenge_assignments
  where id = target_assignment_id
  for update;
  if assignment_row.id is null or assignment_row.status <> 'proposed' then raise exception 'proposed assignment required'; end if;
  if not public.pansofie_is_active_org_member(assignment_row.school_organization_id, array['teacher', 'coordinator']::text[], auth.uid())
     and not public.is_admin() then
    raise exception 'teacher/coordinator membership required';
  end if;

  update public.partner_challenge_assignments
  set status = 'cancelled', cancelled_by = auth.uid(), cancelled_at = now(), cancellation_note = nullif(btrim(coalesce(target_note, '')), '')
  where id = assignment_row.id;

  return assignment_row.id;
end;
$$;

-- ---------------------------------------------------------------------------
-- Read-only browser projections
-- ---------------------------------------------------------------------------

create or replace function public.pansofie_list_my_partner_challenges()
returns table(
  challenge_id uuid,
  partner_organization_id uuid,
  partner_organization_name text,
  title text,
  problem_statement text,
  beneficiary text,
  context text,
  desired_output text,
  available_resources text,
  data_requirements text,
  age_min smallint,
  age_max smallint,
  timeframe text,
  ip_expectations text,
  safety_notes text,
  feedback_commitment text,
  adoption_possibility text,
  challenge_status text,
  revision_no integer,
  submitted_at timestamptz,
  screening_decision text,
  screening_dimensions jsonb,
  screening_note text,
  screened_at timestamptz,
  assignment_id uuid,
  assignment_status text,
  school_name text,
  cohort_name text,
  team_name text,
  proposed_at timestamptz,
  accepted_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select
    c.id,
    c.partner_organization_id,
    o.name,
    c.title,
    c.problem_statement,
    c.beneficiary,
    c.context,
    c.desired_output,
    c.available_resources,
    c.data_requirements,
    c.age_min,
    c.age_max,
    c.timeframe,
    c.ip_expectations,
    c.safety_notes,
    c.feedback_commitment,
    c.adoption_possibility,
    c.status,
    c.revision_no,
    c.submitted_at,
    s.decision,
    s.dimensions,
    s.note,
    s.screened_at,
    a.id,
    a.status,
    school.name,
    pc.name,
    t.name,
    a.proposed_at,
    a.accepted_at
  from public.partner_challenges c
  join public.organizations o on o.id = c.partner_organization_id
  left join lateral (
    select x.decision, x.dimensions, x.note, x.screened_at
    from public.partner_challenge_screenings x
    where x.challenge_id = c.id
    order by x.challenge_revision desc, x.screened_at desc
    limit 1
  ) s on true
  left join lateral (
    select x.*
    from public.partner_challenge_assignments x
    where x.challenge_id = c.id
    order by x.proposed_at desc
    limit 1
  ) a on true
  left join public.organizations school on school.id = a.school_organization_id
  left join public.pilot_cohorts pc on pc.id = a.cohort_id
  left join public.experience_teams t on t.id = a.team_id
  where public.pansofie_is_active_partner_contact(c.partner_organization_id, auth.uid())
  order by c.updated_at desc;
$$;

create or replace function public.pansofie_list_school_challenge_assignments(target_org_ids uuid[])
returns table(
  assignment_id uuid,
  challenge_id uuid,
  assignment_status text,
  partner_organization_name text,
  title text,
  problem_statement text,
  beneficiary text,
  context text,
  desired_output text,
  available_resources text,
  data_requirements text,
  age_min smallint,
  age_max smallint,
  timeframe text,
  ip_expectations text,
  safety_notes text,
  feedback_commitment text,
  adoption_possibility text,
  screening_decision text,
  screening_dimensions jsonb,
  school_organization_id uuid,
  school_name text,
  cohort_id uuid,
  cohort_name text,
  team_id uuid,
  team_name text,
  mission_title text,
  mission_version_no integer,
  proposed_at timestamptz,
  accepted_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select
    a.id,
    c.id,
    a.status,
    partner.name,
    c.title,
    c.problem_statement,
    c.beneficiary,
    c.context,
    c.desired_output,
    c.available_resources,
    c.data_requirements,
    c.age_min,
    c.age_max,
    c.timeframe,
    c.ip_expectations,
    c.safety_notes,
    c.feedback_commitment,
    c.adoption_possibility,
    s.decision,
    s.dimensions,
    a.school_organization_id,
    school.name,
    a.cohort_id,
    pc.name,
    a.team_id,
    t.name,
    m.title,
    mv.version_no,
    a.proposed_at,
    a.accepted_at
  from public.partner_challenge_assignments a
  join public.partner_challenges c on c.id = a.challenge_id
  join public.organizations partner on partner.id = c.partner_organization_id
  join public.organizations school on school.id = a.school_organization_id
  join public.pilot_cohorts pc on pc.id = a.cohort_id
  join public.experience_teams t on t.id = a.team_id
  join public.missions m on m.id = a.mission_id
  join public.mission_versions mv on mv.id = a.mission_version_id
  left join lateral (
    select x.decision, x.dimensions
    from public.partner_challenge_screenings x
    where x.challenge_id = c.id and x.challenge_revision = c.revision_no
    order by x.screened_at desc
    limit 1
  ) s on true
  where a.school_organization_id = any(coalesce(target_org_ids, '{}'::uuid[]))
    and (
      public.is_admin()
      or public.pansofie_is_active_org_member(a.school_organization_id, array['teacher', 'coordinator']::text[], auth.uid())
    )
  order by a.proposed_at desc;
$$;

create or replace function public.pansofie_admin_list_partner_challenges()
returns table(
  challenge_id uuid,
  partner_organization_id uuid,
  partner_organization_name text,
  verification_status text,
  title text,
  challenge_status text,
  revision_no integer,
  submitted_at timestamptz,
  screening_decision text,
  screening_dimensions jsonb,
  screening_note text,
  screened_at timestamptz,
  assignment_id uuid,
  assignment_status text,
  school_name text,
  cohort_name text,
  team_name text
)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if auth.uid() is null or not public.is_admin() then raise exception 'admin access required'; end if;
  return query
  select
    c.id,
    c.partner_organization_id,
    o.name,
    public.pansofie_partner_verification_status(o.id),
    c.title,
    c.status,
    c.revision_no,
    c.submitted_at,
    s.decision,
    s.dimensions,
    s.note,
    s.screened_at,
    a.id,
    a.status,
    school.name,
    pc.name,
    t.name
  from public.partner_challenges c
  join public.organizations o on o.id = c.partner_organization_id
  left join lateral (
    select x.decision, x.dimensions, x.note, x.screened_at
    from public.partner_challenge_screenings x
    where x.challenge_id = c.id
    order by x.challenge_revision desc, x.screened_at desc
    limit 1
  ) s on true
  left join lateral (
    select x.* from public.partner_challenge_assignments x
    where x.challenge_id = c.id
    order by x.proposed_at desc
    limit 1
  ) a on true
  left join public.organizations school on school.id = a.school_organization_id
  left join public.pilot_cohorts pc on pc.id = a.cohort_id
  left join public.experience_teams t on t.id = a.team_id
  order by c.updated_at desc;
end;
$$;

create or replace function public.pansofie_admin_list_partner_organizations()
returns table(
  organization_id uuid,
  organization_name text,
  organization_type text,
  organization_status text,
  verification_status text,
  latest_verification_note text,
  verified_at timestamptz,
  active_partner_contacts bigint
)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if auth.uid() is null or not public.is_admin() then raise exception 'admin access required'; end if;
  return query
  select
    o.id,
    o.name,
    o.organization_type,
    o.status,
    coalesce(v.status, 'pending'),
    v.note,
    v.created_at,
    (
      select count(*)
      from public.organization_memberships m
      where m.organization_id = o.id and m.role = 'partner_contact' and m.status = 'active'
    )::bigint
  from public.organizations o
  left join lateral (
    select e.status, e.note, e.created_at
    from public.partner_organization_verification_events e
    where e.organization_id = o.id
    order by e.created_at desc, e.id desc
    limit 1
  ) v on true
  where o.organization_type in ('company', 'ngo', 'community', 'municipality')
  order by o.name;
end;
$$;

create or replace function public.pansofie_admin_list_challenge_assignment_candidates()
returns table(
  school_organization_id uuid,
  school_name text,
  cohort_id uuid,
  cohort_name text,
  cohort_status text,
  team_id uuid,
  team_name text,
  active_learners bigint
)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if auth.uid() is null or not public.is_admin() then raise exception 'admin access required'; end if;
  return query
  select
    o.id,
    o.name,
    pc.id,
    pc.name,
    pc.status,
    t.id,
    t.name,
    (
      select count(*)
      from public.experience_team_members tm
      where tm.team_id = t.id and tm.role = 'learner' and tm.status = 'active'
    )::bigint
  from public.organizations o
  join public.pilot_cohorts pc on pc.organization_id = o.id
  join public.experience_teams t on t.cohort_id = pc.id and t.status = 'active'
  where o.organization_type = 'school'
    and o.status = 'active'
    and pc.status in ('planned', 'active')
  order by o.name, pc.name, t.name;
end;
$$;

-- ---------------------------------------------------------------------------
-- RLS + explicit RPC-only table boundary
-- ---------------------------------------------------------------------------

alter table public.partner_organization_verification_events enable row level security;
alter table public.partner_challenges enable row level security;
alter table public.partner_challenge_screenings enable row level security;
alter table public.partner_challenge_assignments enable row level security;

-- There are intentionally no browser table policies. SECURITY DEFINER RPCs above
-- perform authorization and return bounded projections.
revoke all on table public.partner_organization_verification_events from anon, authenticated;
revoke all on table public.partner_challenges from anon, authenticated;
revoke all on table public.partner_challenge_screenings from anon, authenticated;
revoke all on table public.partner_challenge_assignments from anon, authenticated;

-- Internal helpers / trigger-only functions are never direct browser RPCs.
revoke execute on function public.pansofie_reject_partner_evidence_mutation() from anon, authenticated;
revoke execute on function public.pansofie_partner_verification_status(uuid) from anon, authenticated;
revoke execute on function public.pansofie_is_active_partner_contact(uuid, uuid) from anon, authenticated;
revoke execute on function public.pansofie_validate_challenge_dimensions(jsonb) from anon, authenticated;

-- No anonymous Partner execution.
revoke execute on function public.pansofie_admin_register_partner_organization(text, text, text, text) from anon;
revoke execute on function public.pansofie_admin_set_partner_verification(uuid, text, text) from anon;
revoke execute on function public.pansofie_partner_create_challenge(uuid, text, text, text, text, text) from anon;
revoke execute on function public.pansofie_partner_update_challenge(uuid, text, text, text, text, text, text, text, integer, integer, text, text, text, text, text) from anon;
revoke execute on function public.pansofie_partner_submit_challenge(uuid) from anon;
revoke execute on function public.pansofie_admin_screen_partner_challenge(uuid, text, jsonb, text) from anon;
revoke execute on function public.pansofie_admin_propose_challenge_assignment(uuid, uuid, uuid, uuid) from anon;
revoke execute on function public.pansofie_school_accept_challenge_assignment(uuid) from anon;
revoke execute on function public.pansofie_school_decline_challenge_assignment(uuid, text) from anon;
revoke execute on function public.pansofie_list_my_partner_challenges() from anon;
revoke execute on function public.pansofie_list_school_challenge_assignments(uuid[]) from anon;
revoke execute on function public.pansofie_admin_list_partner_challenges() from anon;
revoke execute on function public.pansofie_admin_list_partner_organizations() from anon;
revoke execute on function public.pansofie_admin_list_challenge_assignment_candidates() from anon;

-- Authenticated browser gets only governed RPC entrypoints. Each RPC re-checks
-- the role/verification/admin boundary at execution time.
grant execute on function public.pansofie_admin_register_partner_organization(text, text, text, text) to authenticated;
grant execute on function public.pansofie_admin_set_partner_verification(uuid, text, text) to authenticated;
grant execute on function public.pansofie_partner_create_challenge(uuid, text, text, text, text, text) to authenticated;
grant execute on function public.pansofie_partner_update_challenge(uuid, text, text, text, text, text, text, text, integer, integer, text, text, text, text, text) to authenticated;
grant execute on function public.pansofie_partner_submit_challenge(uuid) to authenticated;
grant execute on function public.pansofie_admin_screen_partner_challenge(uuid, text, jsonb, text) to authenticated;
grant execute on function public.pansofie_admin_propose_challenge_assignment(uuid, uuid, uuid, uuid) to authenticated;
grant execute on function public.pansofie_school_accept_challenge_assignment(uuid) to authenticated;
grant execute on function public.pansofie_school_decline_challenge_assignment(uuid, text) to authenticated;
grant execute on function public.pansofie_list_my_partner_challenges() to authenticated;
grant execute on function public.pansofie_list_school_challenge_assignments(uuid[]) to authenticated;
grant execute on function public.pansofie_admin_list_partner_challenges() to authenticated;
grant execute on function public.pansofie_admin_list_partner_organizations() to authenticated;
grant execute on function public.pansofie_admin_list_challenge_assignment_candidates() to authenticated;

comment on table public.partner_challenge_screenings is 'Immutable 9-dimension Challenge Quality Gate evidence. No numeric quality score.';
comment on table public.partner_challenge_assignments is 'Managed Partner Challenge to School/cohort/team binding. Partner is never a learner reviewer in R4.';
comment on column public.mission_runs.challenge_assignment_id is 'R4 provenance only; does not grant Partner access to learner run data.';
