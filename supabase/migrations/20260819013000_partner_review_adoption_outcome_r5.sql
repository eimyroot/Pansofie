-- PANSOFIE R5 — PARTNER REVIEW / ADOPTION / OUTCOME
-- Staging-first additive migration. Production deployment is explicitly out of scope.
-- Partner reviews a bounded output projection, never learner raw evidence or human worth.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Immutable bounded output + Partner evidence
-- ---------------------------------------------------------------------------

create table if not exists public.challenge_deliverables (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references public.partner_challenge_assignments(id) on delete restrict,
  challenge_id uuid not null references public.partner_challenges(id) on delete restrict,
  challenge_revision integer not null check (challenge_revision > 0),
  team_id uuid not null references public.experience_teams(id) on delete restrict,
  mission_version_id uuid not null references public.mission_versions(id) on delete restrict,
  revision_no integer not null check (revision_no > 0),
  challenge_title text not null,
  agreed_deliverable text not null,
  team_label text not null,
  title text not null,
  summary text not null,
  deliverable_kind text not null default 'other' check (deliverable_kind in ('document','presentation','prototype','report','media','other')),
  deliverable_uri text,
  submitted_by uuid not null references auth.users(id) on delete restrict,
  submitted_at timestamptz not null default now(),
  unique (assignment_id, revision_no)
);

create index if not exists challenge_deliverables_assignment_idx
  on public.challenge_deliverables(assignment_id, revision_no desc);
create index if not exists challenge_deliverables_challenge_idx
  on public.challenge_deliverables(challenge_id, submitted_at desc);

create table if not exists public.partner_reviews (
  id uuid primary key default gen_random_uuid(),
  deliverable_id uuid not null unique references public.challenge_deliverables(id) on delete restrict,
  challenge_id uuid not null references public.partner_challenges(id) on delete restrict,
  partner_organization_id uuid not null references public.organizations(id) on delete restrict,
  challenge_revision integer not null check (challenge_revision > 0),
  deliverable_revision integer not null check (deliverable_revision > 0),
  addressed_brief text not null check (addressed_brief in ('yes','partial','no')),
  useful_text text not null,
  changes_needed text,
  reviewed_by uuid not null references auth.users(id) on delete restrict,
  reviewed_at timestamptz not null default now()
);

create index if not exists partner_reviews_challenge_idx
  on public.partner_reviews(challenge_id, reviewed_at desc);

create table if not exists public.adoption_decisions (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null unique references public.partner_reviews(id) on delete restrict,
  deliverable_id uuid not null references public.challenge_deliverables(id) on delete restrict,
  challenge_id uuid not null references public.partner_challenges(id) on delete restrict,
  assignment_id uuid not null references public.partner_challenge_assignments(id) on delete restrict,
  partner_organization_id uuid not null references public.organizations(id) on delete restrict,
  decision text not null check (decision in ('not_adopt','explore_further','pilot')),
  note text,
  decided_by uuid not null references auth.users(id) on delete restrict,
  decided_at timestamptz not null default now()
);

create index if not exists adoption_decisions_challenge_idx
  on public.adoption_decisions(challenge_id, decided_at desc);

create table if not exists public.outcome_evidence (
  id uuid primary key default gen_random_uuid(),
  adoption_decision_id uuid not null references public.adoption_decisions(id) on delete restrict,
  deliverable_id uuid not null references public.challenge_deliverables(id) on delete restrict,
  challenge_id uuid not null references public.partner_challenges(id) on delete restrict,
  assignment_id uuid not null references public.partner_challenge_assignments(id) on delete restrict,
  partner_organization_id uuid not null references public.organizations(id) on delete restrict,
  what_changed text not null,
  beneficiary text not null,
  observed_on date not null,
  source_text text not null,
  evidence_uri text,
  status text not null default 'reported' check (status in ('reported','verified','disputed')),
  confidence text not null default 'unverified' check (confidence in ('unverified','limited','corroborated')),
  reported_by uuid not null references auth.users(id) on delete restrict,
  reported_at timestamptz not null default now()
);

create index if not exists outcome_evidence_decision_idx
  on public.outcome_evidence(adoption_decision_id, reported_at desc);

-- R5 evidence is immutable. New revisions/events are appended instead of mutated.
create or replace function public.pansofie_reject_r5_evidence_mutation()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  raise exception 'R5 deliverable/review/adoption/outcome evidence is append-only';
end;
$$;

create trigger challenge_deliverables_immutable
  before update or delete on public.challenge_deliverables
  for each row execute procedure public.pansofie_reject_r5_evidence_mutation();
create trigger partner_reviews_immutable
  before update or delete on public.partner_reviews
  for each row execute procedure public.pansofie_reject_r5_evidence_mutation();
create trigger adoption_decisions_immutable
  before update or delete on public.adoption_decisions
  for each row execute procedure public.pansofie_reject_r5_evidence_mutation();
create trigger outcome_evidence_immutable
  before update or delete on public.outcome_evidence
  for each row execute procedure public.pansofie_reject_r5_evidence_mutation();

-- ---------------------------------------------------------------------------
-- RLS + direct browser denial
-- ---------------------------------------------------------------------------

alter table public.challenge_deliverables enable row level security;
alter table public.partner_reviews enable row level security;
alter table public.adoption_decisions enable row level security;
alter table public.outcome_evidence enable row level security;

revoke all on table public.challenge_deliverables from public, anon, authenticated;
revoke all on table public.partner_reviews from public, anon, authenticated;
revoke all on table public.adoption_decisions from public, anon, authenticated;
revoke all on table public.outcome_evidence from public, anon, authenticated;

grant all on table public.challenge_deliverables to service_role;
grant all on table public.partner_reviews to service_role;
grant all on table public.adoption_decisions to service_role;
grant all on table public.outcome_evidence to service_role;

-- ---------------------------------------------------------------------------
-- Private authorization helper
-- ---------------------------------------------------------------------------

create or replace function public.pansofie_is_school_staff_for_assignment(
  target_assignment_id uuid,
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
    from public.partner_challenge_assignments a
    join public.organization_memberships m
      on m.organization_id = a.school_organization_id
    join public.organizations o
      on o.id = a.school_organization_id
    where a.id = target_assignment_id
      and m.user_id = target_user_id
      and m.role in ('teacher','coordinator')
      and m.status = 'active'
      and o.status = 'active'
  );
$$;

-- ---------------------------------------------------------------------------
-- School creates explicit bounded output projection
-- ---------------------------------------------------------------------------

create or replace function public.pansofie_school_submit_challenge_deliverable(
  target_assignment_id uuid,
  target_title text,
  target_summary text,
  target_kind text default 'other',
  target_uri text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  caller_id uuid := auth.uid();
  a public.partner_challenge_assignments%rowtype;
  c public.partner_challenges%rowtype;
  team_name text;
  next_revision integer;
  new_id uuid;
begin
  if caller_id is null then raise exception 'authentication required'; end if;
  if not public.pansofie_is_school_staff_for_assignment(target_assignment_id, caller_id) then
    raise exception 'active School teacher/coordinator membership required';
  end if;

  select * into a from public.partner_challenge_assignments where id = target_assignment_id;
  if a.id is null then raise exception 'Challenge assignment not found'; end if;
  if a.status not in ('active','completed') then raise exception 'Challenge assignment must be active or completed'; end if;

  select * into c from public.partner_challenges where id = a.challenge_id;
  if c.id is null then raise exception 'Challenge not found'; end if;
  if c.revision_no < 1 then raise exception 'Challenge revision provenance missing'; end if;

  select t.name into team_name from public.experience_teams t where t.id = a.team_id;
  if nullif(btrim(coalesce(team_name,'')), '') is null then raise exception 'safe team label missing'; end if;

  if nullif(btrim(coalesce(target_title,'')), '') is null then raise exception 'deliverable title required'; end if;
  if nullif(btrim(coalesce(target_summary,'')), '') is null then raise exception 'deliverable summary required'; end if;
  if target_kind not in ('document','presentation','prototype','report','media','other') then raise exception 'unsupported deliverable kind'; end if;

  select coalesce(max(d.revision_no),0) + 1 into next_revision
  from public.challenge_deliverables d
  where d.assignment_id = target_assignment_id;

  insert into public.challenge_deliverables (
    assignment_id, challenge_id, challenge_revision, team_id, mission_version_id,
    revision_no, challenge_title, agreed_deliverable, team_label,
    title, summary, deliverable_kind, deliverable_uri, submitted_by
  ) values (
    a.id, c.id, c.revision_no, a.team_id, a.mission_version_id,
    next_revision, c.title, c.desired_output, team_name,
    btrim(target_title), btrim(target_summary), target_kind,
    nullif(btrim(coalesce(target_uri,'')), ''), caller_id
  ) returning id into new_id;

  return new_id;
end;
$$;

-- ---------------------------------------------------------------------------
-- Safe Partner projection — no learner tables are joined
-- ---------------------------------------------------------------------------

create or replace function public.pansofie_list_my_partner_deliverables()
returns table (
  deliverable_id uuid,
  assignment_id uuid,
  challenge_id uuid,
  challenge_revision integer,
  deliverable_revision integer,
  challenge_title text,
  agreed_deliverable text,
  team_label text,
  deliverable_title text,
  deliverable_summary text,
  deliverable_kind text,
  deliverable_uri text,
  submitted_at timestamptz,
  addressed_brief text,
  useful_text text,
  changes_needed text,
  reviewed_at timestamptz,
  adoption_decision text,
  adoption_note text,
  decided_at timestamptz,
  latest_outcome_status text,
  latest_outcome_confidence text,
  latest_outcome_text text,
  latest_outcome_observed_on date
)
language sql
stable
security definer
set search_path = public
as $$
  select
    d.id,
    d.assignment_id,
    d.challenge_id,
    d.challenge_revision,
    d.revision_no,
    d.challenge_title,
    d.agreed_deliverable,
    d.team_label,
    d.title,
    d.summary,
    d.deliverable_kind,
    d.deliverable_uri,
    d.submitted_at,
    r.addressed_brief,
    r.useful_text,
    r.changes_needed,
    r.reviewed_at,
    ad.decision,
    ad.note,
    ad.decided_at,
    oe.status,
    oe.confidence,
    oe.what_changed,
    oe.observed_on
  from public.challenge_deliverables d
  join public.partner_challenges c on c.id = d.challenge_id
  join public.organization_memberships m
    on m.organization_id = c.partner_organization_id
   and m.user_id = auth.uid()
   and m.role = 'partner_contact'
   and m.status = 'active'
  join public.organizations o
    on o.id = c.partner_organization_id
   and o.status = 'active'
  left join public.partner_reviews r on r.deliverable_id = d.id
  left join public.adoption_decisions ad on ad.review_id = r.id
  left join lateral (
    select x.status, x.confidence, x.what_changed, x.observed_on
    from public.outcome_evidence x
    where x.adoption_decision_id = ad.id
    order by x.reported_at desc, x.id desc
    limit 1
  ) oe on true
  where public.pansofie_partner_verification_status(c.partner_organization_id) = 'verified'
  order by d.submitted_at desc, d.revision_no desc;
$$;

-- Review + adoption decision are one immutable transaction.
create or replace function public.pansofie_partner_review_deliverable(
  target_deliverable_id uuid,
  target_addressed_brief text,
  target_useful_text text,
  target_changes_needed text,
  target_decision text,
  target_decision_note text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  caller_id uuid := auth.uid();
  d public.challenge_deliverables%rowtype;
  c public.partner_challenges%rowtype;
  a public.partner_challenge_assignments%rowtype;
  review_id uuid;
  decision_id uuid;
  latest_revision integer;
begin
  if caller_id is null then raise exception 'authentication required'; end if;

  select * into d from public.challenge_deliverables where id = target_deliverable_id;
  if d.id is null then raise exception 'Deliverable not found'; end if;
  select * into c from public.partner_challenges where id = d.challenge_id;
  select * into a from public.partner_challenge_assignments where id = d.assignment_id;

  if not public.pansofie_is_active_partner_contact(c.partner_organization_id, caller_id) then
    raise exception 'verified partner_contact membership required';
  end if;
  if a.status not in ('active','completed') then raise exception 'Challenge assignment is not reviewable'; end if;

  select max(x.revision_no) into latest_revision from public.challenge_deliverables x where x.assignment_id = d.assignment_id;
  if d.revision_no <> latest_revision then raise exception 'stale deliverable revision cannot be reviewed'; end if;
  if exists (select 1 from public.partner_reviews r where r.deliverable_id = d.id) then raise exception 'deliverable already reviewed'; end if;

  if target_addressed_brief not in ('yes','partial','no') then raise exception 'addressed_brief must be yes, partial, or no'; end if;
  if nullif(btrim(coalesce(target_useful_text,'')), '') is null then raise exception 'bounded useful feedback required'; end if;
  if target_decision not in ('not_adopt','explore_further','pilot') then raise exception 'unsupported adoption decision'; end if;

  insert into public.partner_reviews (
    deliverable_id, challenge_id, partner_organization_id, challenge_revision,
    deliverable_revision, addressed_brief, useful_text, changes_needed, reviewed_by
  ) values (
    d.id, d.challenge_id, c.partner_organization_id, d.challenge_revision,
    d.revision_no, target_addressed_brief, btrim(target_useful_text),
    nullif(btrim(coalesce(target_changes_needed,'')), ''), caller_id
  ) returning id into review_id;

  insert into public.adoption_decisions (
    review_id, deliverable_id, challenge_id, assignment_id, partner_organization_id,
    decision, note, decided_by
  ) values (
    review_id, d.id, d.challenge_id, d.assignment_id, c.partner_organization_id,
    target_decision, nullif(btrim(coalesce(target_decision_note,'')), ''), caller_id
  ) returning id into decision_id;

  return decision_id;
end;
$$;

-- Outcome remains separate and initially unverified; no Impact is inferred.
create or replace function public.pansofie_partner_report_outcome(
  target_adoption_decision_id uuid,
  target_what_changed text,
  target_beneficiary text,
  target_observed_on date,
  target_source_text text,
  target_evidence_uri text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  caller_id uuid := auth.uid();
  ad public.adoption_decisions%rowtype;
  new_id uuid;
begin
  if caller_id is null then raise exception 'authentication required'; end if;
  select * into ad from public.adoption_decisions where id = target_adoption_decision_id;
  if ad.id is null then raise exception 'Adoption decision not found'; end if;
  if ad.decision <> 'pilot' then raise exception 'Outcome evidence may be reported only after a PILOT decision'; end if;
  if not public.pansofie_is_active_partner_contact(ad.partner_organization_id, caller_id) then raise exception 'verified partner_contact membership required'; end if;
  if target_observed_on is null or target_observed_on > current_date then raise exception 'observed_on must be a real non-future date'; end if;
  if nullif(btrim(coalesce(target_what_changed,'')), '') is null then raise exception 'what_changed required'; end if;
  if nullif(btrim(coalesce(target_beneficiary,'')), '') is null then raise exception 'beneficiary required'; end if;
  if nullif(btrim(coalesce(target_source_text,'')), '') is null then raise exception 'source required'; end if;

  insert into public.outcome_evidence (
    adoption_decision_id, deliverable_id, challenge_id, assignment_id, partner_organization_id,
    what_changed, beneficiary, observed_on, source_text, evidence_uri,
    status, confidence, reported_by
  ) values (
    ad.id, ad.deliverable_id, ad.challenge_id, ad.assignment_id, ad.partner_organization_id,
    btrim(target_what_changed), btrim(target_beneficiary), target_observed_on,
    btrim(target_source_text), nullif(btrim(coalesce(target_evidence_uri,'')), ''),
    'reported', 'unverified', caller_id
  ) returning id into new_id;

  return new_id;
end;
$$;

-- School projection includes bounded Partner feedback/decision/outcome only.
create or replace function public.pansofie_list_school_challenge_outcomes(target_org_ids uuid[])
returns table (
  assignment_id uuid,
  challenge_id uuid,
  challenge_title text,
  partner_organization_name text,
  team_label text,
  deliverable_id uuid,
  deliverable_revision integer,
  deliverable_title text,
  deliverable_summary text,
  deliverable_kind text,
  deliverable_uri text,
  submitted_at timestamptz,
  addressed_brief text,
  useful_text text,
  changes_needed text,
  adoption_decision text,
  adoption_note text,
  decided_at timestamptz,
  latest_outcome_status text,
  latest_outcome_confidence text,
  latest_outcome_text text,
  latest_outcome_observed_on date
)
language sql
stable
security definer
set search_path = public
as $$
  select
    a.id,
    c.id,
    c.title,
    po.name,
    d.team_label,
    d.id,
    d.revision_no,
    d.title,
    d.summary,
    d.deliverable_kind,
    d.deliverable_uri,
    d.submitted_at,
    r.addressed_brief,
    r.useful_text,
    r.changes_needed,
    ad.decision,
    ad.note,
    ad.decided_at,
    oe.status,
    oe.confidence,
    oe.what_changed,
    oe.observed_on
  from public.partner_challenge_assignments a
  join public.partner_challenges c on c.id = a.challenge_id
  join public.organizations po on po.id = c.partner_organization_id
  join public.organization_memberships sm
    on sm.organization_id = a.school_organization_id
   and sm.user_id = auth.uid()
   and sm.role in ('teacher','coordinator')
   and sm.status = 'active'
  left join public.challenge_deliverables d on d.assignment_id = a.id
  left join public.partner_reviews r on r.deliverable_id = d.id
  left join public.adoption_decisions ad on ad.review_id = r.id
  left join lateral (
    select x.status, x.confidence, x.what_changed, x.observed_on
    from public.outcome_evidence x
    where x.adoption_decision_id = ad.id
    order by x.reported_at desc, x.id desc
    limit 1
  ) oe on true
  where a.school_organization_id = any(target_org_ids)
  order by a.proposed_at desc, d.revision_no desc nulls last;
$$;

-- ---------------------------------------------------------------------------
-- EXECUTE hardening: default PostgreSQL PUBLIC grants are not accepted.
-- ---------------------------------------------------------------------------

revoke execute on function public.pansofie_reject_r5_evidence_mutation() from public, anon, authenticated;
revoke execute on function public.pansofie_is_school_staff_for_assignment(uuid, uuid) from public, anon, authenticated;
revoke execute on function public.pansofie_school_submit_challenge_deliverable(uuid,text,text,text,text) from public, anon;
revoke execute on function public.pansofie_list_my_partner_deliverables() from public, anon;
revoke execute on function public.pansofie_partner_review_deliverable(uuid,text,text,text,text,text) from public, anon;
revoke execute on function public.pansofie_partner_report_outcome(uuid,text,text,date,text,text) from public, anon;
revoke execute on function public.pansofie_list_school_challenge_outcomes(uuid[]) from public, anon;

grant execute on function public.pansofie_school_submit_challenge_deliverable(uuid,text,text,text,text) to authenticated, service_role;
grant execute on function public.pansofie_list_my_partner_deliverables() to authenticated, service_role;
grant execute on function public.pansofie_partner_review_deliverable(uuid,text,text,text,text,text) to authenticated, service_role;
grant execute on function public.pansofie_partner_report_outcome(uuid,text,text,date,text,text) to authenticated, service_role;
grant execute on function public.pansofie_list_school_challenge_outcomes(uuid[]) to authenticated, service_role;

grant execute on function public.pansofie_is_school_staff_for_assignment(uuid,uuid) to service_role;
grant execute on function public.pansofie_reject_r5_evidence_mutation() to service_role;
