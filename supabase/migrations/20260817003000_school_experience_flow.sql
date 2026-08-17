-- PANSOFIE R0.3 governed school Experience flow
--
-- Stacked after:
--   20260816235000_canonical_experience_model.sql
--   20260817000500_school_guardian_consent_model.sql
--
-- ADDITIVE ONLY. This migration does not alter auth.users, profiles, user_roles,
-- legacy prototype content, or delete existing Experience data.
--
-- Canonical flow:
-- Teacher assigns Mission → Learner starts → Evidence → Reflection →
-- scoped Teacher review → Experience → Passport.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Assignment
-- ---------------------------------------------------------------------------
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

  insert into public.mission_runs (
    mission_id,
    user_id,
    organization_id,
    assigned_by,
    status
  ) values (
    target_mission_id,
    target_learner_id,
    target_org_id,
    caller_id,
    'assigned'
  ) returning id into new_run_id;

  return new_run_id;
end;
$$;

-- ---------------------------------------------------------------------------
-- Learner transitions
-- ---------------------------------------------------------------------------
create or replace function public.pansofie_start_mission(target_run_id uuid)
returns public.mission_runs
language plpgsql
security definer
set search_path = public
as $$
declare
  row_out public.mission_runs%rowtype;
begin
  update public.mission_runs r
  set status = 'in_progress',
      started_at = coalesce(r.started_at, now())
  where r.id = target_run_id
    and r.user_id = auth.uid()
    and r.status in ('assigned', 'in_progress')
  returning r.* into row_out;

  if row_out.id is null then
    raise exception 'run is not startable by current user';
  end if;

  return row_out;
end;
$$;

create or replace function public.pansofie_submit_mission(target_run_id uuid)
returns public.mission_runs
language plpgsql
security definer
set search_path = public
as $$
declare
  row_out public.mission_runs%rowtype;
  evidence_count integer;
  reflection_ready boolean;
begin
  if not exists (
    select 1 from public.mission_runs r
    where r.id = target_run_id
      and r.user_id = auth.uid()
      and r.status = 'in_progress'
  ) then
    raise exception 'run must be in progress and owned by current user';
  end if;

  select count(*) into evidence_count
  from public.experience_evidence e
  where e.run_id = target_run_id
    and e.owner_id = auth.uid();

  if evidence_count < 1 then
    raise exception 'at least one evidence item is required';
  end if;

  select exists (
    select 1 from public.experience_reflections x
    where x.run_id = target_run_id
      and x.user_id = auth.uid()
      and nullif(btrim(coalesce(x.what_learned, '')), '') is not null
  ) into reflection_ready;

  if not reflection_ready then
    raise exception 'reflection with what_learned is required';
  end if;

  update public.mission_runs r
  set status = 'submitted',
      submitted_at = now()
  where r.id = target_run_id
  returning r.* into row_out;

  return row_out;
end;
$$;

-- ---------------------------------------------------------------------------
-- Teacher review
-- ---------------------------------------------------------------------------
create or replace function public.pansofie_review_school_run(
  target_run_id uuid,
  target_scope text,
  target_status text,
  target_note text default null
)
returns public.experience_reviews
language plpgsql
security definer
set search_path = public
as $$
declare
  purpose_code text;
  run_org_id uuid;
  review_out public.experience_reviews%rowtype;
begin
  if target_scope not in ('mission', 'evidence', 'reflection', 'passport') then
    raise exception 'unsupported review scope';
  end if;

  if target_status not in ('pending', 'confirmed', 'needs_revision', 'not_verified') then
    raise exception 'unsupported review status';
  end if;

  purpose_code := case target_scope
    when 'mission' then 'school_mission_review'
    when 'evidence' then 'school_evidence_review'
    when 'reflection' then 'school_reflection_review'
    when 'passport' then 'school_passport_review'
  end;

  select r.organization_id into run_org_id
  from public.mission_runs r
  where r.id = target_run_id;

  if run_org_id is null then
    raise exception 'school review requires organization-bound run';
  end if;

  if not public.pansofie_can_review_run(target_run_id, purpose_code)
     and not public.is_admin() then
    raise exception 'review access denied for purpose %', purpose_code;
  end if;

  insert into public.experience_reviews (
    run_id,
    organization_id,
    reviewer_id,
    review_scope,
    status,
    note
  ) values (
    target_run_id,
    run_org_id,
    auth.uid(),
    target_scope,
    target_status,
    nullif(btrim(coalesce(target_note, '')), '')
  )
  on conflict (run_id, reviewer_id, review_scope)
  do update set
    status = excluded.status,
    note = excluded.note,
    updated_at = now()
  returning * into review_out;

  return review_out;
end;
$$;

-- ---------------------------------------------------------------------------
-- Finalize canonical Experience + Passport
-- ---------------------------------------------------------------------------
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
  existing_experience_id uuid;
  experience_id uuid;
  final_reviewer uuid;
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

  if not exists (
    select 1 from public.experience_evidence e
    where e.run_id = target_run_id
  ) then
    raise exception 'evidence required';
  end if;

  select * into reflection_row
  from public.experience_reflections x
  where x.run_id = target_run_id;

  if reflection_row.id is null
     or nullif(btrim(coalesce(reflection_row.what_learned, '')), '') is null then
    raise exception 'completed reflection required';
  end if;

  select * into mission_row
  from public.missions m
  where m.id = run_row.mission_id;

  if mission_row.id is null then
    raise exception 'mission not found';
  end if;

  select e.id into existing_experience_id
  from public.experiences e
  where e.run_id = target_run_id;

  if existing_experience_id is null then
    insert into public.experiences (
      run_id,
      mission_id,
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
      run_row.user_id,
      mission_row.title,
      mission_row.path_ids,
      mission_row.program_id,
      mission_row.lab_id,
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
    mission_row.title,
    nullif(btrim(coalesce(reflection_row.what_learned, '')), ''),
    'private',
    final_reviewer,
    now()
  )
  on conflict (experience_id)
  do nothing;

  update public.mission_runs
  set status = 'completed',
      completed_at = now()
  where id = target_run_id;

  return experience_id;
end;
$$;

-- ---------------------------------------------------------------------------
-- Function permissions
-- ---------------------------------------------------------------------------
revoke all on function public.pansofie_assign_school_mission(uuid, uuid, uuid) from public;
revoke all on function public.pansofie_start_mission(uuid) from public;
revoke all on function public.pansofie_submit_mission(uuid) from public;
revoke all on function public.pansofie_review_school_run(uuid, text, text, text) from public;
revoke all on function public.pansofie_finalize_school_experience(uuid) from public;

grant execute on function public.pansofie_assign_school_mission(uuid, uuid, uuid) to authenticated;
grant execute on function public.pansofie_start_mission(uuid) to authenticated;
grant execute on function public.pansofie_submit_mission(uuid) to authenticated;
grant execute on function public.pansofie_review_school_run(uuid, text, text, text) to authenticated;
grant execute on function public.pansofie_finalize_school_experience(uuid) to authenticated;

comment on function public.pansofie_assign_school_mission(uuid, uuid, uuid)
  is 'Purpose-gated teacher/coordinator assignment of a published Mission to an active learner.';
comment on function public.pansofie_start_mission(uuid)
  is 'Learner transition from assigned to in_progress.';
comment on function public.pansofie_submit_mission(uuid)
  is 'Learner submission gate requiring at least one evidence item and a substantive reflection.';
comment on function public.pansofie_review_school_run(uuid, text, text, text)
  is 'Purpose-specific independent teacher review; does not mutate learner-authored evidence/reflection.';
comment on function public.pansofie_finalize_school_experience(uuid)
  is 'Creates immutable-ish Experience/Passport output after confirmed mission review and updates run to completed.';
