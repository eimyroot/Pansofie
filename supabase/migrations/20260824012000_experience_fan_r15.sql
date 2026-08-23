-- PANSOFIE R15 — Pansofický pas + Vějíř zkušeností
--
-- ADDITIVE ONLY.
-- This migration deliberately does NOT create a second Evidence table and does
-- NOT store a user score. Canonical evidence remains in experience_evidence,
-- reflection remains in experience_reflections, completed Experience records
-- remain in experiences, and verified Passport output remains in portfolio_items.
--
-- The Experience Fan is a derived view over verified Experiences:
--   0 = no verified Experience on the axis
--   1 = first verified Experience
--   2 = repeated verified Experience
--   3 = verified Experiences in more than one context
--   4 = verified real-world application attestation
--   5 = verified follow-up impact attestation
--
-- A human being is never represented by one aggregate score.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Governed Mission -> Fan axis mapping.
-- One Mission may contribute to more than one axis, but the mapping itself is
-- admin-governed. Learners cannot choose an axis to inflate their own Fan.
-- ---------------------------------------------------------------------------
create table if not exists public.mission_experience_axes (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references public.missions(id) on delete cascade,
  pillar_code text not null check (pillar_code in (
    'know_self',
    'create_with_others',
    'improve_world'
  )),
  axis_code text not null check (axis_code in (
    'digital_attention',
    'critical_reason',
    'respectful_dialogue',
    'cooperation',
    'circular_action',
    'local_impact'
  )),
  rationale text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (mission_id, axis_code),
  check (
    (pillar_code = 'know_self' and axis_code in ('digital_attention', 'critical_reason'))
    or (pillar_code = 'create_with_others' and axis_code in ('respectful_dialogue', 'cooperation'))
    or (pillar_code = 'improve_world' and axis_code in ('circular_action', 'local_impact'))
  )
);

create index if not exists mission_experience_axes_mission_idx
  on public.mission_experience_axes(mission_id);
create index if not exists mission_experience_axes_axis_idx
  on public.mission_experience_axes(axis_code);

drop trigger if exists mission_experience_axes_touch_updated_at on public.mission_experience_axes;
create trigger mission_experience_axes_touch_updated_at
  before update on public.mission_experience_axes
  for each row execute procedure public.pansofie_touch_updated_at();

alter table public.mission_experience_axes enable row level security;

drop policy if exists "mission_axes_select_authenticated" on public.mission_experience_axes;
create policy "mission_axes_select_authenticated"
  on public.mission_experience_axes for select
  to authenticated
  using (true);

drop policy if exists "mission_axes_insert_admin_only" on public.mission_experience_axes;
create policy "mission_axes_insert_admin_only"
  on public.mission_experience_axes for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "mission_axes_update_admin_only" on public.mission_experience_axes;
create policy "mission_axes_update_admin_only"
  on public.mission_experience_axes for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "mission_axes_delete_admin_only" on public.mission_experience_axes;
create policy "mission_axes_delete_admin_only"
  on public.mission_experience_axes for delete
  to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Governed attestations for Fan depth 4 and 5.
-- These do NOT verify the person. They attest a specific outcome of one
-- already-verified Experience: real-world application or follow-up impact.
-- ---------------------------------------------------------------------------
create table if not exists public.experience_outcome_attestations (
  id uuid primary key default gen_random_uuid(),
  experience_id uuid not null references public.experiences(id) on delete cascade,
  axis_code text not null check (axis_code in (
    'digital_attention',
    'critical_reason',
    'respectful_dialogue',
    'cooperation',
    'circular_action',
    'local_impact'
  )),
  outcome_kind text not null check (outcome_kind in ('application', 'impact')),
  status text not null default 'confirmed' check (status in ('confirmed', 'revoked')),
  reviewer_id uuid references auth.users(id) on delete set null,
  note text,
  verified_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (experience_id, axis_code, outcome_kind),
  check (
    (status = 'confirmed' and verified_at is not null and revoked_at is null)
    or (status = 'revoked' and revoked_at is not null)
  )
);

create index if not exists experience_outcome_attestations_experience_idx
  on public.experience_outcome_attestations(experience_id);
create index if not exists experience_outcome_attestations_axis_idx
  on public.experience_outcome_attestations(axis_code, outcome_kind, status);

drop trigger if exists experience_outcome_attestations_touch_updated_at on public.experience_outcome_attestations;
create trigger experience_outcome_attestations_touch_updated_at
  before update on public.experience_outcome_attestations
  for each row execute procedure public.pansofie_touch_updated_at();

alter table public.experience_outcome_attestations enable row level security;

drop policy if exists "experience_outcomes_select_scoped" on public.experience_outcome_attestations;
create policy "experience_outcomes_select_scoped"
  on public.experience_outcome_attestations for select
  to authenticated
  using (
    public.is_admin()
    or reviewer_id = auth.uid()
    or exists (
      select 1
      from public.experiences e
      where e.id = experience_id
        and e.user_id = auth.uid()
    )
  );

-- Append-only audit trail for every current-state attestation change.
create table if not exists public.experience_outcome_attestation_events (
  id uuid primary key default gen_random_uuid(),
  attestation_id uuid not null references public.experience_outcome_attestations(id) on delete restrict,
  experience_id uuid not null references public.experiences(id) on delete cascade,
  axis_code text not null,
  outcome_kind text not null,
  status text not null,
  reviewer_id uuid references auth.users(id) on delete set null,
  note text,
  created_at timestamptz not null default now()
);

create index if not exists experience_outcome_attestation_events_experience_idx
  on public.experience_outcome_attestation_events(experience_id, created_at desc);

alter table public.experience_outcome_attestation_events enable row level security;

drop policy if exists "experience_outcome_events_select_scoped" on public.experience_outcome_attestation_events;
create policy "experience_outcome_events_select_scoped"
  on public.experience_outcome_attestation_events for select
  to authenticated
  using (
    public.is_admin()
    or reviewer_id = auth.uid()
    or exists (
      select 1
      from public.experiences e
      where e.id = experience_id
        and e.user_id = auth.uid()
    )
  );

create or replace function public.pansofie_log_experience_outcome_attestation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.experience_outcome_attestation_events (
    attestation_id,
    experience_id,
    axis_code,
    outcome_kind,
    status,
    reviewer_id,
    note
  ) values (
    new.id,
    new.experience_id,
    new.axis_code,
    new.outcome_kind,
    new.status,
    new.reviewer_id,
    new.note
  );
  return new;
end;
$$;

revoke all on function public.pansofie_log_experience_outcome_attestation() from public;

drop trigger if exists experience_outcome_attestation_audit on public.experience_outcome_attestations;
create trigger experience_outcome_attestation_audit
  after insert or update on public.experience_outcome_attestations
  for each row execute procedure public.pansofie_log_experience_outcome_attestation();

-- Only an authorized Passport reviewer (or admin) can confirm/revoke an
-- application/impact attestation. There is no browser-direct write policy.
create or replace function public.pansofie_attest_experience_outcome(
  target_experience_id uuid,
  target_axis_code text,
  target_outcome_kind text,
  target_status text default 'confirmed',
  target_note text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  caller_id uuid := auth.uid();
  target_run_id uuid;
  target_mission_id uuid;
  row_id uuid;
begin
  if caller_id is null then
    raise exception 'authentication required';
  end if;

  if target_outcome_kind not in ('application', 'impact') then
    raise exception 'unsupported outcome kind';
  end if;

  if target_status not in ('confirmed', 'revoked') then
    raise exception 'unsupported attestation status';
  end if;

  select e.run_id, e.mission_id
    into target_run_id, target_mission_id
  from public.experiences e
  where e.id = target_experience_id;

  if target_run_id is null or target_mission_id is null then
    raise exception 'experience not found';
  end if;

  if not exists (
    select 1
    from public.mission_experience_axes m
    where m.mission_id = target_mission_id
      and m.axis_code = target_axis_code
  ) then
    raise exception 'axis is not governed for this mission';
  end if;

  if not public.is_admin()
     and not public.pansofie_can_review_run(target_run_id, 'school_passport_review') then
    raise exception 'passport review access required';
  end if;

  if not exists (
    select 1
    from public.portfolio_items p
    where p.experience_id = target_experience_id
      and p.verified_at is not null
  ) then
    raise exception 'verified Passport Experience required before outcome attestation';
  end if;

  insert into public.experience_outcome_attestations (
    experience_id,
    axis_code,
    outcome_kind,
    status,
    reviewer_id,
    note,
    verified_at,
    revoked_at
  ) values (
    target_experience_id,
    target_axis_code,
    target_outcome_kind,
    target_status,
    caller_id,
    nullif(btrim(coalesce(target_note, '')), ''),
    case when target_status = 'confirmed' then now() else null end,
    case when target_status = 'revoked' then now() else null end
  )
  on conflict (experience_id, axis_code, outcome_kind)
  do update set
    status = excluded.status,
    reviewer_id = excluded.reviewer_id,
    note = excluded.note,
    verified_at = case
      when excluded.status = 'confirmed' then now()
      else experience_outcome_attestations.verified_at
    end,
    revoked_at = case
      when excluded.status = 'revoked' then now()
      else null
    end,
    updated_at = now()
  returning id into row_id;

  return row_id;
end;
$$;

revoke all on function public.pansofie_attest_experience_outcome(uuid, text, text, text, text) from public;
grant execute on function public.pansofie_attest_experience_outcome(uuid, text, text, text, text) to authenticated;

-- ---------------------------------------------------------------------------
-- Evidence-derived Experience Fan.
-- SECURITY DEFINER is intentionally bounded to auth.uid(); callers cannot pass
-- another user ID. Only verified Passport Experiences contribute.
-- ---------------------------------------------------------------------------
create or replace function public.pansofie_my_experience_fan()
returns table (
  pillar_code text,
  axis_code text,
  experience_count bigint,
  evidence_count bigint,
  context_count bigint,
  depth smallint,
  latest_experience_id uuid,
  latest_title text,
  latest_occurred_at timestamptz
)
language sql
security definer
set search_path = public
as $$
  with caller as (
    select auth.uid() as user_id
  ),
  axes(pillar_code, axis_code, sort_order) as (
    values
      ('know_self'::text, 'digital_attention'::text, 1),
      ('know_self'::text, 'critical_reason'::text, 2),
      ('create_with_others'::text, 'respectful_dialogue'::text, 3),
      ('create_with_others'::text, 'cooperation'::text, 4),
      ('improve_world'::text, 'circular_action'::text, 5),
      ('improve_world'::text, 'local_impact'::text, 6)
  ),
  verified as (
    select distinct
      e.id as experience_id,
      e.run_id,
      e.title,
      e.occurred_at,
      map.pillar_code,
      map.axis_code,
      coalesce(o.organization_type, 'personal') as context_kind
    from caller c
    join public.experiences e on e.user_id = c.user_id
    join public.portfolio_items p
      on p.experience_id = e.id
     and p.user_id = c.user_id
     and p.verified_at is not null
    join public.mission_experience_axes map on map.mission_id = e.mission_id
    left join public.mission_runs r on r.id = e.run_id
    left join public.organizations o on o.id = r.organization_id
    where c.user_id is not null
  ),
  evidence_totals as (
    select
      v.axis_code,
      count(distinct ev.id)::bigint as evidence_count
    from verified v
    left join public.experience_evidence ev on ev.run_id = v.run_id
    group by v.axis_code
  ),
  outcomes as (
    select
      v.axis_code,
      bool_or(a.outcome_kind = 'application' and a.status = 'confirmed') as has_application,
      bool_or(a.outcome_kind = 'impact' and a.status = 'confirmed') as has_impact
    from verified v
    left join public.experience_outcome_attestations a
      on a.experience_id = v.experience_id
     and a.axis_code = v.axis_code
    group by v.axis_code
  ),
  aggregates as (
    select
      v.pillar_code,
      v.axis_code,
      count(distinct v.experience_id)::bigint as experience_count,
      count(distinct v.context_kind)::bigint as context_count
    from verified v
    group by v.pillar_code, v.axis_code
  )
  select
    a.pillar_code,
    a.axis_code,
    coalesce(g.experience_count, 0)::bigint,
    coalesce(et.evidence_count, 0)::bigint,
    coalesce(g.context_count, 0)::bigint,
    case
      when coalesce(oc.has_impact, false) then 5
      when coalesce(oc.has_application, false) then 4
      when coalesce(g.experience_count, 0) >= 2 and coalesce(g.context_count, 0) >= 2 then 3
      when coalesce(g.experience_count, 0) >= 2 then 2
      when coalesce(g.experience_count, 0) >= 1 then 1
      else 0
    end::smallint as depth,
    latest.experience_id as latest_experience_id,
    latest.title as latest_title,
    latest.occurred_at as latest_occurred_at
  from axes a
  left join aggregates g
    on g.pillar_code = a.pillar_code
   and g.axis_code = a.axis_code
  left join evidence_totals et on et.axis_code = a.axis_code
  left join outcomes oc on oc.axis_code = a.axis_code
  left join lateral (
    select v.experience_id, v.title, v.occurred_at
    from verified v
    where v.axis_code = a.axis_code
    order by v.occurred_at desc, v.experience_id desc
    limit 1
  ) latest on true
  order by a.sort_order;
$$;

revoke all on function public.pansofie_my_experience_fan() from public;
grant execute on function public.pansofie_my_experience_fan() to authenticated;

comment on table public.mission_experience_axes
  is 'Governed Mission-to-Experience-Fan mapping. Mapping an axis is not a grade and cannot be chosen by the learner.';
comment on table public.experience_outcome_attestations
  is 'Governed current-state attestation that a verified Experience produced real-world application or follow-up impact.';
comment on table public.experience_outcome_attestation_events
  is 'Append-only audit trail for Experience outcome attestation state changes.';
comment on function public.pansofie_my_experience_fan()
  is 'Returns six evidence-derived Experience Fan axes for auth.uid(). No aggregate person score is stored or returned.';
comment on function public.pansofie_attest_experience_outcome(uuid, text, text, text, text)
  is 'Purpose-gated Passport reviewer attestation for application/impact of one verified Experience.';
