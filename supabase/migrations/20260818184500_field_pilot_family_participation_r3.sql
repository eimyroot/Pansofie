-- PANSOFIE FIELD PILOT FAMILY PARTICIPATION R3
-- Projection-first family runtime. A verified guardian relationship alone never
-- grants access; purpose-specific processing basis is required.

-- Extend the purpose vocabulary without turning guardian access into one global consent flag.
alter table public.processing_basis_records
  drop constraint if exists processing_basis_records_purpose_code_check;
alter table public.processing_basis_records
  add constraint processing_basis_records_purpose_code_check check (purpose_code in (
    'core_account',
    'school_program_participation',
    'school_mission_assignment',
    'school_mission_review',
    'school_evidence_review',
    'school_reflection_review',
    'school_passport_review',
    'guardian_passport_view',
    'guardian_family_participation'
  ));

create table if not exists public.family_contributions (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null references public.mission_runs(id) on delete cascade,
  child_user_id uuid not null references auth.users(id) on delete cascade,
  guardian_user_id uuid not null references auth.users(id) on delete cascade,
  contribution_kind text not null check (contribution_kind in ('context', 'contact', 'resource', 'observation')),
  content text not null check (char_length(btrim(content)) between 1 and 2000),
  status text not null default 'active' check (status in ('active', 'withdrawn')),
  withdrawn_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((status <> 'withdrawn') or withdrawn_at is not null)
);

create index if not exists family_contributions_run_idx
  on public.family_contributions(run_id, status, created_at);
create index if not exists family_contributions_guardian_idx
  on public.family_contributions(guardian_user_id, status, created_at desc);

drop trigger if exists family_contributions_touch_updated_at on public.family_contributions;
create trigger family_contributions_touch_updated_at
  before update on public.family_contributions
  for each row execute procedure public.pansofie_touch_updated_at();

alter table public.family_contributions enable row level security;

-- No browser table policies. Family data is exposed only by bounded projections/RPCs.
revoke all on table public.family_contributions from anon;
revoke all on table public.family_contributions from authenticated;

create or replace function public.pansofie_can_guardian_participate_in_run(target_run_id uuid)
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
      and r.cohort_id is not null
      and r.status in ('assigned', 'in_progress', 'submitted')
      and public.pansofie_is_verified_guardian(r.user_id, auth.uid())
      and public.pansofie_has_processing_basis(
        r.user_id,
        r.organization_id,
        'guardian_family_participation'
      )
  );
$$;

create or replace function public.pansofie_family_access_summary()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  with rel as (
    select g.child_user_id
    from public.guardian_relationships g
    where g.guardian_user_id = auth.uid() and g.status = 'verified'
  ), participation as (
    select distinct r.child_user_id
    from rel r
    join public.processing_basis_records p on p.subject_user_id = r.child_user_id
    where p.purpose_code = 'guardian_family_participation'
      and p.status = 'active'
      and (p.expires_at is null or p.expires_at > now())
  ), passport as (
    select distinct r.child_user_id
    from rel r
    where public.pansofie_can_guardian_view_passport(r.child_user_id)
  )
  select jsonb_build_object(
    'verified_relationships', (select count(*) from rel),
    'participation_children', (select count(*) from participation),
    'passport_children', (select count(*) from passport),
    'has_family_access', ((select count(*) from participation) > 0 or (select count(*) from passport) > 0)
  );
$$;

create or replace function public.pansofie_list_my_family_context()
returns table (
  run_id uuid,
  child_user_id uuid,
  child_name text,
  organization_id uuid,
  organization_name text,
  cohort_id uuid,
  cohort_name text,
  pilot_starts_on date,
  pilot_ends_on date,
  mission_title text,
  mission_summary text,
  mission_why text,
  contribution_prompt text,
  safety_notes text,
  run_status text,
  started_at timestamptz,
  submitted_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select
    r.id,
    r.user_id,
    coalesce(nullif(btrim(p.full_name), ''), 'Learner') as child_name,
    r.organization_id,
    o.name,
    r.cohort_id,
    c.name,
    c.starts_on,
    c.ends_on,
    m.title,
    m.summary,
    m.why,
    m.contribution_prompt,
    m.safety_notes,
    r.status,
    r.started_at,
    r.submitted_at
  from public.mission_runs r
  join public.missions m on m.id = r.mission_id
  join public.organizations o on o.id = r.organization_id
  join public.pilot_cohorts c on c.id = r.cohort_id
  left join public.profiles p on p.id = r.user_id
  where r.status in ('assigned', 'in_progress', 'submitted')
    and public.pansofie_can_guardian_participate_in_run(r.id)
  order by c.starts_on nulls last, r.created_at desc;
$$;

create or replace function public.pansofie_list_my_guardian_passport_summaries()
returns table (
  child_user_id uuid,
  child_name text,
  portfolio_item_id uuid,
  title text,
  summary text,
  verified_at timestamptz,
  occurred_at timestamptz,
  path_ids text[]
)
language sql
stable
security definer
set search_path = public
as $$
  select
    pi.user_id,
    coalesce(nullif(btrim(p.full_name), ''), 'Learner') as child_name,
    pi.id,
    pi.title,
    pi.summary,
    pi.verified_at,
    e.occurred_at,
    e.path_ids
  from public.portfolio_items pi
  join public.experiences e on e.id = pi.experience_id
  left join public.profiles p on p.id = pi.user_id
  where public.pansofie_can_guardian_view_passport(pi.user_id)
  order by e.occurred_at desc;
$$;

create or replace function public.pansofie_add_family_contribution(
  target_run_id uuid,
  target_kind text,
  target_content text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  run_row public.mission_runs%rowtype;
  contribution_id uuid;
begin
  if target_kind not in ('context', 'contact', 'resource', 'observation') then
    raise exception 'unsupported family contribution kind';
  end if;
  if nullif(btrim(coalesce(target_content, '')), '') is null then
    raise exception 'family contribution content required';
  end if;
  if char_length(btrim(target_content)) > 2000 then
    raise exception 'family contribution content too long';
  end if;
  if not public.pansofie_can_guardian_participate_in_run(target_run_id) then
    raise exception 'guardian family participation is not authorized for this run';
  end if;

  select * into run_row from public.mission_runs where id = target_run_id;

  insert into public.family_contributions (
    run_id, child_user_id, guardian_user_id, contribution_kind, content
  ) values (
    target_run_id, run_row.user_id, auth.uid(), target_kind, btrim(target_content)
  ) returning id into contribution_id;

  return contribution_id;
end;
$$;

create or replace function public.pansofie_list_my_family_contributions()
returns table (
  id uuid,
  run_id uuid,
  child_user_id uuid,
  contribution_kind text,
  content text,
  status text,
  created_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select fc.id, fc.run_id, fc.child_user_id, fc.contribution_kind, fc.content, fc.status, fc.created_at
  from public.family_contributions fc
  where fc.guardian_user_id = auth.uid()
    and exists (
      select 1 from public.guardian_relationships g
      where g.child_user_id = fc.child_user_id
        and g.guardian_user_id = auth.uid()
        and g.status = 'verified'
    )
  order by fc.created_at desc;
$$;

create or replace function public.pansofie_withdraw_family_contribution(target_contribution_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.family_contributions
  set status = 'withdrawn', withdrawn_at = now()
  where id = target_contribution_id
    and guardian_user_id = auth.uid()
    and status = 'active';

  if not found then
    raise exception 'active family contribution not found';
  end if;
end;
$$;

create or replace function public.pansofie_list_staff_family_contributions()
returns table (
  id uuid,
  run_id uuid,
  child_user_id uuid,
  child_name text,
  organization_id uuid,
  organization_name text,
  mission_title text,
  contribution_kind text,
  content text,
  created_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select
    fc.id,
    fc.run_id,
    fc.child_user_id,
    coalesce(nullif(btrim(p.full_name), ''), 'Learner') as child_name,
    r.organization_id,
    o.name,
    m.title,
    fc.contribution_kind,
    fc.content,
    fc.created_at
  from public.family_contributions fc
  join public.mission_runs r on r.id = fc.run_id
  join public.organizations o on o.id = r.organization_id
  join public.missions m on m.id = r.mission_id
  left join public.profiles p on p.id = fc.child_user_id
  where fc.status = 'active'
    and public.pansofie_is_active_org_member(
      r.organization_id,
      array['teacher', 'coordinator']::text[],
      auth.uid()
    )
    and public.pansofie_has_processing_basis(
      fc.child_user_id,
      r.organization_id,
      'school_mission_review'
    )
  order by fc.created_at desc;
$$;

-- Trusted provisioning of the new purpose. The system does not infer a lawful
-- basis. An admin must supply the controller-approved legal basis/policy version.
create or replace function public.pansofie_enable_guardian_family_participation(
  target_guardian_relationship_id uuid,
  target_org_id uuid,
  target_legal_basis text,
  target_policy_version text,
  target_source_note text default null,
  target_consent_recorded_at timestamptz default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  rel public.guardian_relationships%rowtype;
  existing_id uuid;
  basis_id uuid;
begin
  if not public.is_admin() then
    raise exception 'admin required';
  end if;

  select * into rel from public.guardian_relationships where id = target_guardian_relationship_id;
  if rel.id is null or rel.status <> 'verified' then
    raise exception 'verified guardian relationship required';
  end if;
  if not public.pansofie_is_active_org_member(target_org_id, array['learner']::text[], rel.child_user_id) then
    raise exception 'child must be an active learner in the target organization';
  end if;
  if target_legal_basis not in ('consent', 'contract', 'legal_obligation', 'vital_interests', 'public_task', 'legitimate_interests') then
    raise exception 'unsupported legal basis';
  end if;
  if nullif(btrim(coalesce(target_policy_version, '')), '') is null then
    raise exception 'policy version required';
  end if;
  if target_legal_basis = 'consent' and target_consent_recorded_at is null then
    raise exception 'consent timestamp required when consent is the legal basis';
  end if;

  select id into existing_id
  from public.processing_basis_records
  where subject_user_id = rel.child_user_id
    and organization_id = target_org_id
    and purpose_code = 'guardian_family_participation'
    and status = 'active'
  limit 1;

  if existing_id is not null then
    update public.processing_basis_records set status = 'superseded' where id = existing_id;
  end if;

  insert into public.processing_basis_records (
    subject_user_id,
    organization_id,
    purpose_code,
    legal_basis,
    controller_scope,
    status,
    policy_version,
    consent_actor_type,
    authorized_by_user_id,
    guardian_relationship_id,
    consent_recorded_at,
    source_note,
    recorded_by
  ) values (
    rel.child_user_id,
    target_org_id,
    'guardian_family_participation',
    target_legal_basis,
    'organization',
    'active',
    btrim(target_policy_version),
    case when target_legal_basis = 'consent' then 'guardian' else null end,
    case when target_legal_basis = 'consent' then rel.guardian_user_id else null end,
    case when target_legal_basis = 'consent' then rel.id else null end,
    case when target_legal_basis = 'consent' then target_consent_recorded_at else null end,
    nullif(btrim(coalesce(target_source_note, '')), ''),
    auth.uid()
  ) returning id into basis_id;

  return basis_id;
end;
$$;

-- Explicit function execute boundaries. Supabase roles may have default function
-- EXECUTE grants, so revoke browser access deliberately before granting intended RPCs.
revoke execute on function public.pansofie_can_guardian_participate_in_run(uuid) from anon;
revoke execute on function public.pansofie_can_guardian_participate_in_run(uuid) from authenticated;

revoke execute on function public.pansofie_family_access_summary() from anon;
revoke execute on function public.pansofie_list_my_family_context() from anon;
revoke execute on function public.pansofie_list_my_guardian_passport_summaries() from anon;
revoke execute on function public.pansofie_add_family_contribution(uuid, text, text) from anon;
revoke execute on function public.pansofie_list_my_family_contributions() from anon;
revoke execute on function public.pansofie_withdraw_family_contribution(uuid) from anon;
revoke execute on function public.pansofie_list_staff_family_contributions() from anon;
revoke execute on function public.pansofie_enable_guardian_family_participation(uuid, uuid, text, text, text, timestamptz) from anon;

grant execute on function public.pansofie_family_access_summary() to authenticated;
grant execute on function public.pansofie_list_my_family_context() to authenticated;
grant execute on function public.pansofie_list_my_guardian_passport_summaries() to authenticated;
grant execute on function public.pansofie_add_family_contribution(uuid, text, text) to authenticated;
grant execute on function public.pansofie_list_my_family_contributions() to authenticated;
grant execute on function public.pansofie_withdraw_family_contribution(uuid) to authenticated;
grant execute on function public.pansofie_list_staff_family_contributions() to authenticated;
grant execute on function public.pansofie_enable_guardian_family_participation(uuid, uuid, text, text, text, timestamptz) to authenticated;

comment on table public.family_contributions is 'Bounded family input to a real School Experience. Never learner evidence, private reflection, or human-worth scoring.';
comment on function public.pansofie_list_my_family_context() is 'Guardian-facing projection: purpose, timing and contribution guidance only; no raw learner evidence/reflection.';
comment on function public.pansofie_enable_guardian_family_participation(uuid, uuid, text, text, text, timestamptz) is 'Admin-only provisioning for purpose-specific family participation after controller/legal basis decision.';
