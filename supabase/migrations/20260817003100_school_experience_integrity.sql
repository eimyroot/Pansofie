-- PANSOFIE R0.3 integrity hardening
--
-- Stacked after 20260817003000_school_experience_flow.sql.
-- Adds submission freeze, governed revision reopening, and append-only review
-- event evidence. No auth/profile tables are altered.

-- ---------------------------------------------------------------------------
-- Freeze learner-authored content after submission.
-- A needs_revision teacher decision reopens the run to in_progress.
-- ---------------------------------------------------------------------------
create or replace function public.pansofie_guard_evidence_mutation()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
declare
  target_run uuid := coalesce(new.run_id, old.run_id);
  run_owner uuid;
  run_status text;
begin
  if public.is_admin() then
    return case when tg_op = 'DELETE' then old else new end;
  end if;

  select r.user_id, r.status into run_owner, run_status
  from public.mission_runs r
  where r.id = target_run;

  if run_owner is distinct from auth.uid() then
    raise exception 'evidence mutation allowed only to run owner';
  end if;

  if run_status <> 'in_progress' then
    raise exception 'evidence is editable only while mission is in_progress';
  end if;

  return case when tg_op = 'DELETE' then old else new end;
end;
$$;

drop trigger if exists evidence_freeze_after_submission on public.experience_evidence;
create trigger evidence_freeze_after_submission
  before insert or update or delete on public.experience_evidence
  for each row execute procedure public.pansofie_guard_evidence_mutation();

create or replace function public.pansofie_guard_reflection_mutation()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
declare
  target_run uuid := coalesce(new.run_id, old.run_id);
  run_owner uuid;
  run_status text;
begin
  if public.is_admin() then
    return case when tg_op = 'DELETE' then old else new end;
  end if;

  select r.user_id, r.status into run_owner, run_status
  from public.mission_runs r
  where r.id = target_run;

  if run_owner is distinct from auth.uid() then
    raise exception 'reflection mutation allowed only to run owner';
  end if;

  if run_status <> 'in_progress' then
    raise exception 'reflection is editable only while mission is in_progress';
  end if;

  return case when tg_op = 'DELETE' then old else new end;
end;
$$;

drop trigger if exists reflection_freeze_after_submission on public.experience_reflections;
create trigger reflection_freeze_after_submission
  before insert or update or delete on public.experience_reflections
  for each row execute procedure public.pansofie_guard_reflection_mutation();

-- ---------------------------------------------------------------------------
-- Preserve review history as events instead of relying only on mutable current
-- review rows.
-- ---------------------------------------------------------------------------
create table if not exists public.experience_review_events (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null references public.experience_reviews(id) on delete restrict,
  run_id uuid not null references public.mission_runs(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete restrict,
  reviewer_id uuid references auth.users(id) on delete set null,
  review_scope text not null,
  status text not null,
  note text,
  event_type text not null check (event_type in ('created', 'changed', 'system_reset')),
  created_at timestamptz not null default now()
);

create index if not exists experience_review_events_run_idx
  on public.experience_review_events(run_id, created_at desc);

alter table public.experience_review_events enable row level security;

create policy "experience_review_events_select_scoped"
  on public.experience_review_events for select
  to authenticated
  using (
    public.is_admin()
    or reviewer_id = auth.uid()
    or exists (
      select 1 from public.mission_runs r
      where r.id = run_id and r.user_id = auth.uid()
    )
  );

create or replace function public.pansofie_log_review_event()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.experience_review_events (
    review_id,
    run_id,
    organization_id,
    reviewer_id,
    review_scope,
    status,
    note,
    event_type
  ) values (
    new.id,
    new.run_id,
    new.organization_id,
    new.reviewer_id,
    new.review_scope,
    new.status,
    new.note,
    case
      when tg_op = 'INSERT' then 'created'
      when new.status = 'pending' and old.status is distinct from 'pending' then 'system_reset'
      else 'changed'
    end
  );
  return new;
end;
$$;

revoke all on function public.pansofie_log_review_event() from public;

drop trigger if exists experience_reviews_audit_event on public.experience_reviews;
create trigger experience_reviews_audit_event
  after insert or update on public.experience_reviews
  for each row execute procedure public.pansofie_log_review_event();

-- ---------------------------------------------------------------------------
-- Replace the R0.3 review RPC with stricter lifecycle semantics.
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
  run_status text;
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

  select r.organization_id, r.status into run_org_id, run_status
  from public.mission_runs r
  where r.id = target_run_id;

  if run_org_id is null then
    raise exception 'school review requires organization-bound run';
  end if;

  if not public.pansofie_can_review_run(target_run_id, purpose_code)
     and not public.is_admin() then
    raise exception 'review access denied for purpose %', purpose_code;
  end if;

  if target_status <> 'pending' and run_status <> 'submitted' then
    raise exception 'non-pending review decisions require submitted run';
  end if;

  -- Reopening invalidates prior positive review decisions because learner
  -- evidence/reflection may change before the next submission.
  if target_scope = 'mission' and target_status = 'needs_revision' then
    update public.experience_reviews
    set status = 'pending',
        note = case
          when reviewer_id = auth.uid() and review_scope = 'mission' then note
          else 'Reset because mission was reopened for revision.'
        end,
        updated_at = now()
    where run_id = target_run_id
      and status = 'confirmed';
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

  if target_scope = 'mission' and target_status = 'needs_revision' then
    update public.mission_runs
    set status = 'in_progress',
        submitted_at = null
    where id = target_run_id
      and status = 'submitted';
  end if;

  return review_out;
end;
$$;

revoke all on function public.pansofie_review_school_run(uuid, text, text, text) from public;
grant execute on function public.pansofie_review_school_run(uuid, text, text, text) to authenticated;

comment on table public.experience_review_events
  is 'Append-only review audit snapshots. Current review state remains in experience_reviews.';
comment on function public.pansofie_guard_evidence_mutation()
  is 'Freezes learner evidence after submission until a governed needs_revision reopens the run.';
comment on function public.pansofie_guard_reflection_mutation()
  is 'Freezes learner reflection after submission until a governed needs_revision reopens the run.';
