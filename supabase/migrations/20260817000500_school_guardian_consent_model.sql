-- PANSOFIE R0.2 school / guardian / consent access model
--
-- ADDITIVE migration stacked after 20260816235000_canonical_experience_model.sql.
-- It does not drop or rewrite profiles, user_roles, auth.users or existing
-- Experience data. It deliberately starts with restrictive write policies.
--
-- Legal-design note:
-- GDPR Article 8 / Czech age 15 concerns consent-based information-society
-- services offered directly to a child. Consent is NOT assumed to be the legal
-- basis for every school-processing purpose. We therefore record lawful basis
-- per purpose instead of storing one global "parent consent" boolean.

create extension if not exists pgcrypto;

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  organization_type text not null check (organization_type in ('school', 'municipality', 'ngo', 'community', 'company')),
  country_code text not null default 'CZ' check (char_length(country_code) = 2),
  status text not null default 'active' check (status in ('pending', 'active', 'suspended', 'archived')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.organization_memberships (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('learner', 'teacher', 'coordinator', 'mentor', 'staff')),
  status text not null default 'invited' check (status in ('invited', 'active', 'suspended', 'ended')),
  joined_at timestamptz,
  ended_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, user_id, role)
);

create table if not exists public.guardian_relationships (
  id uuid primary key default gen_random_uuid(),
  child_user_id uuid not null references auth.users(id) on delete cascade,
  guardian_user_id uuid not null references auth.users(id) on delete cascade,
  relationship_kind text not null check (relationship_kind in ('parental_responsibility_holder', 'guardian', 'caregiver', 'other')),
  status text not null default 'pending' check (status in ('pending', 'verified', 'revoked')),
  verification_method text check (verification_method in ('email_link', 'school_attestation', 'manual_admin', 'other')),
  verified_by uuid references auth.users(id) on delete set null,
  verified_at timestamptz,
  revoked_at timestamptz,
  evidence jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (child_user_id <> guardian_user_id),
  check ((status <> 'verified') or verified_at is not null),
  check ((status <> 'revoked') or revoked_at is not null),
  unique (child_user_id, guardian_user_id)
);

-- Minimal age assurance: store a coarse age band instead of date of birth unless
-- a later validated use case proves that exact birth date is necessary.
create table if not exists public.age_assurance_records (
  id uuid primary key default gen_random_uuid(),
  subject_user_id uuid not null references auth.users(id) on delete cascade,
  jurisdiction_code text not null default 'CZ' check (char_length(jurisdiction_code) = 2),
  age_band text not null check (age_band in ('unknown', 'under_11', '11_12', '13_14', '15_17', '18_plus')),
  assurance_method text not null check (assurance_method in ('self_asserted', 'guardian_attested', 'school_attested', 'admin_verified', 'other')),
  asserted_by_user_id uuid references auth.users(id) on delete set null,
  organization_id uuid references public.organizations(id) on delete restrict,
  valid_until timestamptz,
  evidence jsonb not null default '{}'::jsonb,
  recorded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.processing_basis_records (
  id uuid primary key default gen_random_uuid(),
  subject_user_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete restrict,
  purpose_code text not null check (purpose_code in (
    'core_account',
    'school_program_participation',
    'school_mission_assignment',
    'school_mission_review',
    'school_evidence_review',
    'school_reflection_review',
    'school_passport_review',
    'guardian_passport_view'
  )),
  legal_basis text not null check (legal_basis in ('consent', 'contract', 'legal_obligation', 'vital_interests', 'public_task', 'legitimate_interests')),
  controller_scope text not null default 'unknown' check (controller_scope in ('pansofie', 'organization', 'joint', 'unknown')),
  status text not null default 'active' check (status in ('active', 'withdrawn', 'expired', 'superseded')),
  policy_version text not null,
  consent_actor_type text check (consent_actor_type in ('subject', 'guardian')),
  authorized_by_user_id uuid references auth.users(id) on delete set null,
  guardian_relationship_id uuid references public.guardian_relationships(id) on delete restrict,
  consent_recorded_at timestamptz,
  consent_withdrawn_at timestamptz,
  expires_at timestamptz,
  source_note text,
  metadata jsonb not null default '{}'::jsonb,
  recorded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    legal_basis = 'consent'
    or (
      consent_actor_type is null
      and guardian_relationship_id is null
      and consent_recorded_at is null
      and consent_withdrawn_at is null
    )
  ),
  check ((legal_basis <> 'consent') or consent_recorded_at is not null),
  check ((consent_actor_type is distinct from 'guardian') or guardian_relationship_id is not null),
  check ((status <> 'withdrawn') or legal_basis <> 'consent' or consent_withdrawn_at is not null)
);

create table if not exists public.processing_basis_events (
  id uuid primary key default gen_random_uuid(),
  processing_basis_id uuid not null references public.processing_basis_records(id) on delete restrict,
  event_type text not null check (event_type in ('recorded', 'withdrawn', 'expired', 'superseded', 'reactivated', 'corrected')),
  actor_user_id uuid references auth.users(id) on delete set null,
  snapshot jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- Review is a separate record. Teachers do not mutate learner evidence,
-- reflections or Passport rows to "verify" them.
create table if not exists public.experience_reviews (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null references public.mission_runs(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete restrict,
  reviewer_id uuid references auth.users(id) on delete set null,
  review_scope text not null check (review_scope in ('mission', 'evidence', 'reflection', 'passport')),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'needs_revision', 'not_verified')),
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (run_id, reviewer_id, review_scope)
);

-- Bind a run to an organization only when it is actually used in an
-- organization context. Existing/legacy personal runs remain NULL and valid.
alter table public.mission_runs
  add column if not exists organization_id uuid references public.organizations(id) on delete restrict;

alter table public.mission_runs
  add column if not exists assigned_by uuid references auth.users(id) on delete set null;

create index if not exists organization_memberships_user_idx
  on public.organization_memberships(user_id, status);
create index if not exists organization_memberships_org_idx
  on public.organization_memberships(organization_id, role, status);
create index if not exists guardian_relationships_child_idx
  on public.guardian_relationships(child_user_id, status);
create index if not exists guardian_relationships_guardian_idx
  on public.guardian_relationships(guardian_user_id, status);
create index if not exists age_assurance_subject_idx
  on public.age_assurance_records(subject_user_id, created_at desc);
create index if not exists processing_basis_subject_purpose_idx
  on public.processing_basis_records(subject_user_id, purpose_code, status);
create index if not exists processing_basis_org_purpose_idx
  on public.processing_basis_records(organization_id, purpose_code, status);
create index if not exists experience_reviews_run_idx
  on public.experience_reviews(run_id, review_scope, status);
create index if not exists mission_runs_org_idx
  on public.mission_runs(organization_id, status);

-- Prevent two simultaneous active records for the same scoped purpose.
create unique index if not exists processing_basis_one_active_org_scope
  on public.processing_basis_records(subject_user_id, organization_id, purpose_code)
  where status = 'active' and organization_id is not null;
create unique index if not exists processing_basis_one_active_global_scope
  on public.processing_basis_records(subject_user_id, purpose_code)
  where status = 'active' and organization_id is null;

-- Shared updated_at triggers.
drop trigger if exists organizations_touch_updated_at on public.organizations;
create trigger organizations_touch_updated_at
  before update on public.organizations
  for each row execute procedure public.pansofie_touch_updated_at();

drop trigger if exists organization_memberships_touch_updated_at on public.organization_memberships;
create trigger organization_memberships_touch_updated_at
  before update on public.organization_memberships
  for each row execute procedure public.pansofie_touch_updated_at();

drop trigger if exists guardian_relationships_touch_updated_at on public.guardian_relationships;
create trigger guardian_relationships_touch_updated_at
  before update on public.guardian_relationships
  for each row execute procedure public.pansofie_touch_updated_at();

drop trigger if exists processing_basis_touch_updated_at on public.processing_basis_records;
create trigger processing_basis_touch_updated_at
  before update on public.processing_basis_records
  for each row execute procedure public.pansofie_touch_updated_at();

drop trigger if exists experience_reviews_touch_updated_at on public.experience_reviews;
create trigger experience_reviews_touch_updated_at
  before update on public.experience_reviews
  for each row execute procedure public.pansofie_touch_updated_at();

-- SECURITY DEFINER helpers keep policy joins centralized and avoid recursive RLS.
create or replace function public.pansofie_is_active_org_member(
  target_org_id uuid,
  allowed_roles text[] default null,
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
    where m.organization_id = target_org_id
      and m.user_id = target_user_id
      and m.status = 'active'
      and (allowed_roles is null or m.role = any(allowed_roles))
  );
$$;

create or replace function public.pansofie_is_verified_guardian(
  target_child_user_id uuid,
  target_guardian_user_id uuid default auth.uid()
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.guardian_relationships g
    where g.child_user_id = target_child_user_id
      and g.guardian_user_id = target_guardian_user_id
      and g.status = 'verified'
  );
$$;

create or replace function public.pansofie_has_processing_basis(
  target_subject_user_id uuid,
  target_org_id uuid,
  target_purpose_code text
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.processing_basis_records p
    where p.subject_user_id = target_subject_user_id
      and p.purpose_code = target_purpose_code
      and p.status = 'active'
      and (p.expires_at is null or p.expires_at > now())
      and (
        p.organization_id = target_org_id
        or (p.organization_id is null and target_org_id is null)
      )
  );
$$;

create or replace function public.pansofie_can_review_run(
  target_run_id uuid,
  target_purpose_code text
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.mission_runs r
    where r.id = target_run_id
      and r.organization_id is not null
      and public.pansofie_is_active_org_member(
        r.organization_id,
        array['teacher', 'coordinator']::text[],
        auth.uid()
      )
      and public.pansofie_is_active_org_member(
        r.organization_id,
        array['learner']::text[],
        r.user_id
      )
      and public.pansofie_has_processing_basis(
        r.user_id,
        r.organization_id,
        target_purpose_code
      )
  );
$$;

create or replace function public.pansofie_can_review_experience(
  target_experience_id uuid,
  target_purpose_code text
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.experiences e
    where e.id = target_experience_id
      and public.pansofie_can_review_run(e.run_id, target_purpose_code)
  );
$$;

create or replace function public.pansofie_can_guardian_view_passport(
  target_child_user_id uuid
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.pansofie_is_verified_guardian(target_child_user_id, auth.uid())
    and public.pansofie_has_processing_basis(
      target_child_user_id,
      null,
      'guardian_passport_view'
    );
$$;

revoke all on function public.pansofie_is_active_org_member(uuid, text[], uuid) from public;
revoke all on function public.pansofie_is_verified_guardian(uuid, uuid) from public;
revoke all on function public.pansofie_has_processing_basis(uuid, uuid, text) from public;
revoke all on function public.pansofie_can_review_run(uuid, text) from public;
revoke all on function public.pansofie_can_review_experience(uuid, text) from public;
revoke all on function public.pansofie_can_guardian_view_passport(uuid) from public;

grant execute on function public.pansofie_is_active_org_member(uuid, text[], uuid) to authenticated;
grant execute on function public.pansofie_is_verified_guardian(uuid, uuid) to authenticated;
grant execute on function public.pansofie_has_processing_basis(uuid, uuid, text) to authenticated;
grant execute on function public.pansofie_can_review_run(uuid, text) to authenticated;
grant execute on function public.pansofie_can_review_experience(uuid, text) to authenticated;
grant execute on function public.pansofie_can_guardian_view_passport(uuid) to authenticated;

-- Consent integrity: a guardian-based consent record must point to a verified
-- relationship for the same child and the same authorizing guardian.
create or replace function public.pansofie_validate_processing_basis()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  rel public.guardian_relationships%rowtype;
begin
  if new.legal_basis = 'consent' then
    if new.consent_actor_type = 'subject' then
      if new.authorized_by_user_id is distinct from new.subject_user_id then
        raise exception 'subject consent must be authorized by the subject';
      end if;
    elsif new.consent_actor_type = 'guardian' then
      select * into rel
      from public.guardian_relationships
      where id = new.guardian_relationship_id;

      if rel.id is null
         or rel.child_user_id <> new.subject_user_id
         or rel.guardian_user_id is distinct from new.authorized_by_user_id
         or rel.status <> 'verified' then
        raise exception 'guardian consent requires a verified matching guardian relationship';
      end if;
    else
      raise exception 'consent requires subject or guardian actor type';
    end if;
  end if;

  return new;
end;
$$;

revoke all on function public.pansofie_validate_processing_basis() from public;

drop trigger if exists processing_basis_validate on public.processing_basis_records;
create trigger processing_basis_validate
  before insert or update on public.processing_basis_records
  for each row execute procedure public.pansofie_validate_processing_basis();

-- Append audit events automatically when a basis record is created or its
-- status changes. The snapshot intentionally records metadata, not raw evidence
-- files or child content.
create or replace function public.pansofie_log_processing_basis_event()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  event_name text;
begin
  if tg_op = 'INSERT' then
    event_name := 'recorded';
  elsif old.status is distinct from new.status then
    event_name := case new.status
      when 'withdrawn' then 'withdrawn'
      when 'expired' then 'expired'
      when 'superseded' then 'superseded'
      when 'active' then 'reactivated'
      else 'corrected'
    end;
  else
    event_name := 'corrected';
  end if;

  insert into public.processing_basis_events (
    processing_basis_id,
    event_type,
    actor_user_id,
    snapshot
  ) values (
    new.id,
    event_name,
    auth.uid(),
    jsonb_build_object(
      'subject_user_id', new.subject_user_id,
      'organization_id', new.organization_id,
      'purpose_code', new.purpose_code,
      'legal_basis', new.legal_basis,
      'controller_scope', new.controller_scope,
      'status', new.status,
      'policy_version', new.policy_version,
      'consent_actor_type', new.consent_actor_type,
      'authorized_by_user_id', new.authorized_by_user_id,
      'guardian_relationship_id', new.guardian_relationship_id,
      'consent_recorded_at', new.consent_recorded_at,
      'consent_withdrawn_at', new.consent_withdrawn_at,
      'expires_at', new.expires_at
    )
  );

  return new;
end;
$$;

revoke all on function public.pansofie_log_processing_basis_event() from public;

drop trigger if exists processing_basis_audit on public.processing_basis_records;
create trigger processing_basis_audit
  after insert or update on public.processing_basis_records
  for each row execute procedure public.pansofie_log_processing_basis_event();

-- A learner must not self-assert Passport verification by editing the legacy
-- verified_by / verified_at columns. School review lives in experience_reviews.
create or replace function public.pansofie_protect_portfolio_verification()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  if public.is_admin() then
    return new;
  end if;

  if tg_op = 'INSERT' then
    new.verified_by := null;
    new.verified_at := null;
  else
    new.verified_by := old.verified_by;
    new.verified_at := old.verified_at;
  end if;

  return new;
end;
$$;

drop trigger if exists portfolio_protect_verification on public.portfolio_items;
create trigger portfolio_protect_verification
  before insert or update on public.portfolio_items
  for each row execute procedure public.pansofie_protect_portfolio_verification();

alter table public.organizations enable row level security;
alter table public.organization_memberships enable row level security;
alter table public.guardian_relationships enable row level security;
alter table public.age_assurance_records enable row level security;
alter table public.processing_basis_records enable row level security;
alter table public.processing_basis_events enable row level security;
alter table public.experience_reviews enable row level security;

-- Organizations: visible to active members; mutation stays admin-only in R0.2.
create policy "organizations_select_member_or_admin"
  on public.organizations for select
  to authenticated
  using (public.is_admin() or public.pansofie_is_active_org_member(id));

create policy "organizations_insert_admin_only"
  on public.organizations for insert
  to authenticated
  with check (public.is_admin());

create policy "organizations_update_admin_only"
  on public.organizations for update
  to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "organizations_delete_admin_only"
  on public.organizations for delete
  to authenticated
  using (public.is_admin());

-- Memberships: user sees own; teachers/coordinators can see their active org
-- roster; all mutation remains admin-only until an invite workflow exists.
create policy "organization_memberships_select_scoped"
  on public.organization_memberships for select
  to authenticated
  using (
    public.is_admin()
    or user_id = auth.uid()
    or public.pansofie_is_active_org_member(
      organization_id,
      array['teacher', 'coordinator']::text[],
      auth.uid()
    )
  );

create policy "organization_memberships_insert_admin_only"
  on public.organization_memberships for insert
  to authenticated
  with check (public.is_admin());

create policy "organization_memberships_update_admin_only"
  on public.organization_memberships for update
  to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "organization_memberships_delete_admin_only"
  on public.organization_memberships for delete
  to authenticated
  using (public.is_admin());

-- Guardian relationship never equals automatic access to child content.
create policy "guardian_relationships_select_parties_or_admin"
  on public.guardian_relationships for select
  to authenticated
  using (public.is_admin() or child_user_id = auth.uid() or guardian_user_id = auth.uid());

create policy "guardian_relationships_insert_admin_only"
  on public.guardian_relationships for insert
  to authenticated
  with check (public.is_admin());

create policy "guardian_relationships_update_admin_only"
  on public.guardian_relationships for update
  to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "guardian_relationships_delete_admin_only"
  on public.guardian_relationships for delete
  to authenticated
  using (public.is_admin());

-- Age assurance is minimized and not exposed to teachers by default.
create policy "age_assurance_select_subject_guardian_admin"
  on public.age_assurance_records for select
  to authenticated
  using (
    public.is_admin()
    or subject_user_id = auth.uid()
    or public.pansofie_is_verified_guardian(subject_user_id, auth.uid())
  );

create policy "age_assurance_insert_admin_only"
  on public.age_assurance_records for insert
  to authenticated
  with check (public.is_admin());

create policy "age_assurance_update_admin_only"
  on public.age_assurance_records for update
  to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "age_assurance_delete_admin_only"
  on public.age_assurance_records for delete
  to authenticated
  using (public.is_admin());

-- Processing-basis records are readable by the subject and relevant verified
-- guardian, but browser clients cannot manufacture a legal basis themselves.
create policy "processing_basis_select_subject_guardian_admin"
  on public.processing_basis_records for select
  to authenticated
  using (
    public.is_admin()
    or subject_user_id = auth.uid()
    or public.pansofie_is_verified_guardian(subject_user_id, auth.uid())
  );

create policy "processing_basis_insert_admin_only"
  on public.processing_basis_records for insert
  to authenticated
  with check (public.is_admin());

create policy "processing_basis_update_admin_only"
  on public.processing_basis_records for update
  to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "processing_basis_delete_admin_only"
  on public.processing_basis_records for delete
  to authenticated
  using (public.is_admin());

create policy "processing_basis_events_select_subject_guardian_admin"
  on public.processing_basis_events for select
  to authenticated
  using (
    public.is_admin()
    or exists (
      select 1
      from public.processing_basis_records p
      where p.id = processing_basis_id
        and (
          p.subject_user_id = auth.uid()
          or public.pansofie_is_verified_guardian(p.subject_user_id, auth.uid())
        )
    )
  );

-- School assignment requires an active teacher/coordinator, active learner in
-- the same organization, and an explicit active basis for this purpose.
create policy "mission_runs_insert_school_assignment"
  on public.mission_runs for insert
  to authenticated
  with check (
    organization_id is not null
    and assigned_by = auth.uid()
    and public.pansofie_is_active_org_member(
      organization_id,
      array['teacher', 'coordinator']::text[],
      auth.uid()
    )
    and public.pansofie_is_active_org_member(
      organization_id,
      array['learner']::text[],
      user_id
    )
    and public.pansofie_has_processing_basis(
      user_id,
      organization_id,
      'school_mission_assignment'
    )
  );

-- Separate read purposes. Reflection access is NOT implied by evidence access.
create policy "mission_runs_select_school_reviewer"
  on public.mission_runs for select
  to authenticated
  using (
    public.pansofie_can_review_run(id, 'school_mission_review')
    or public.pansofie_can_review_run(id, 'school_evidence_review')
    or public.pansofie_can_review_run(id, 'school_reflection_review')
    or public.pansofie_can_review_run(id, 'school_passport_review')
  );

create policy "evidence_select_school_reviewer"
  on public.experience_evidence for select
  to authenticated
  using (public.pansofie_can_review_run(run_id, 'school_evidence_review'));

create policy "reflections_select_school_reviewer"
  on public.experience_reflections for select
  to authenticated
  using (public.pansofie_can_review_run(run_id, 'school_reflection_review'));

create policy "experiences_select_school_reviewer"
  on public.experiences for select
  to authenticated
  using (public.pansofie_can_review_run(run_id, 'school_passport_review'));

create policy "portfolio_select_school_reviewer"
  on public.portfolio_items for select
  to authenticated
  using (public.pansofie_can_review_experience(experience_id, 'school_passport_review'));

-- Guardian view is limited to completed Experience/Passport, not raw private
-- evidence or reflection, unless a future explicit purpose is introduced.
create policy "experiences_select_verified_guardian"
  on public.experiences for select
  to authenticated
  using (public.pansofie_can_guardian_view_passport(user_id));

create policy "portfolio_select_verified_guardian"
  on public.portfolio_items for select
  to authenticated
  using (public.pansofie_can_guardian_view_passport(user_id));

-- Review records are visible to learner/reviewer/admin. A teacher can create or
-- update only a review for a purpose the school is explicitly permitted to use.
create policy "experience_reviews_select_participant_reviewer_admin"
  on public.experience_reviews for select
  to authenticated
  using (
    public.is_admin()
    or reviewer_id = auth.uid()
    or exists (
      select 1 from public.mission_runs r
      where r.id = run_id and r.user_id = auth.uid()
    )
  );

create policy "experience_reviews_insert_authorized_reviewer"
  on public.experience_reviews for insert
  to authenticated
  with check (
    reviewer_id = auth.uid()
    and (
      (review_scope = 'mission' and public.pansofie_can_review_run(run_id, 'school_mission_review'))
      or (review_scope = 'evidence' and public.pansofie_can_review_run(run_id, 'school_evidence_review'))
      or (review_scope = 'reflection' and public.pansofie_can_review_run(run_id, 'school_reflection_review'))
      or (review_scope = 'passport' and public.pansofie_can_review_run(run_id, 'school_passport_review'))
    )
  );

create policy "experience_reviews_update_authorized_reviewer"
  on public.experience_reviews for update
  to authenticated
  using (
    public.is_admin()
    or (
      reviewer_id = auth.uid()
      and (
        (review_scope = 'mission' and public.pansofie_can_review_run(run_id, 'school_mission_review'))
        or (review_scope = 'evidence' and public.pansofie_can_review_run(run_id, 'school_evidence_review'))
        or (review_scope = 'reflection' and public.pansofie_can_review_run(run_id, 'school_reflection_review'))
        or (review_scope = 'passport' and public.pansofie_can_review_run(run_id, 'school_passport_review'))
      )
    )
  )
  with check (
    public.is_admin()
    or (
      reviewer_id = auth.uid()
      and (
        (review_scope = 'mission' and public.pansofie_can_review_run(run_id, 'school_mission_review'))
        or (review_scope = 'evidence' and public.pansofie_can_review_run(run_id, 'school_evidence_review'))
        or (review_scope = 'reflection' and public.pansofie_can_review_run(run_id, 'school_reflection_review'))
        or (review_scope = 'passport' and public.pansofie_can_review_run(run_id, 'school_passport_review'))
      )
    )
  );

create policy "experience_reviews_delete_admin_only"
  on public.experience_reviews for delete
  to authenticated
  using (public.is_admin());

comment on table public.organizations is 'Verified/managed PANSOFIE delivery contexts such as schools and municipalities.';
comment on table public.organization_memberships is 'Scoped organization role; global user_roles remains authorization for PANSOFIE member/admin only.';
comment on table public.guardian_relationships is 'Verified relationship metadata. A relationship alone never grants access to child content.';
comment on table public.age_assurance_records is 'Coarse, purpose-limited age assurance. Avoid exact birth date unless later proven necessary.';
comment on table public.processing_basis_records is 'Purpose-specific processing/legal-basis register. Consent is one possible basis, not a universal school default.';
comment on table public.processing_basis_events is 'Automatic audit trail for processing-basis state changes.';
comment on table public.experience_reviews is 'Independent teacher/coordinator review. Reviewers do not mutate learner evidence/reflection rows.';
