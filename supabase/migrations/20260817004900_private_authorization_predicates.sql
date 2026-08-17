-- PANSOFIE staging security hardening R2.
--
-- The public API intentionally keeps only governed business RPCs such as
-- assign/start/submit/review/finalize. Authorization predicates used by RLS are
-- duplicated into a non-exposed schema, RLS policies are repointed there, and
-- direct authenticated execution of the public predicate helpers is removed.
-- This prevents the generic helper functions from becoming information-oracle
-- RPCs while preserving existing governed business flows.

create schema if not exists pansofie_private;
revoke all on schema pansofie_private from public, anon;
grant usage on schema pansofie_private to authenticated, service_role;

create or replace function pansofie_private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = auth.uid() and role = 'admin'
  );
$$;

create or replace function pansofie_private.pansofie_is_active_org_member(
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

create or replace function pansofie_private.pansofie_is_verified_guardian(
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

create or replace function pansofie_private.pansofie_has_processing_basis(
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

create or replace function pansofie_private.pansofie_can_review_run(
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
      and pansofie_private.pansofie_is_active_org_member(
        r.organization_id,
        array['teacher', 'coordinator']::text[],
        auth.uid()
      )
      and pansofie_private.pansofie_is_active_org_member(
        r.organization_id,
        array['learner']::text[],
        r.user_id
      )
      and pansofie_private.pansofie_has_processing_basis(
        r.user_id,
        r.organization_id,
        target_purpose_code
      )
  );
$$;

create or replace function pansofie_private.pansofie_can_review_experience(
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
      and pansofie_private.pansofie_can_review_run(e.run_id, target_purpose_code)
  );
$$;

create or replace function pansofie_private.pansofie_can_guardian_view_passport(
  target_child_user_id uuid
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select pansofie_private.pansofie_is_verified_guardian(
      target_child_user_id,
      auth.uid()
    )
    and pansofie_private.pansofie_has_processing_basis(
      target_child_user_id,
      null,
      'guardian_passport_view'
    );
$$;

revoke execute on all functions in schema pansofie_private from public, anon;
grant execute on all functions in schema pansofie_private to authenticated, service_role;

-- Repoint every existing public RLS expression that uses a generic authorization
-- predicate. ALTER POLICY preserves the existing TO role list and command.
do $$
declare
  p record;
  q text;
  c text;
begin
  for p in
    select schemaname, tablename, policyname, qual, with_check
    from pg_policies
    where schemaname = 'public'
      and (
        coalesce(qual, '') ~ '(is_admin|pansofie_is_active_org_member|pansofie_is_verified_guardian|pansofie_has_processing_basis|pansofie_can_review_run|pansofie_can_review_experience|pansofie_can_guardian_view_passport)'
        or coalesce(with_check, '') ~ '(is_admin|pansofie_is_active_org_member|pansofie_is_verified_guardian|pansofie_has_processing_basis|pansofie_can_review_run|pansofie_can_review_experience|pansofie_can_guardian_view_passport)'
      )
  loop
    q := p.qual;
    c := p.with_check;

    if q is not null then
      q := replace(q, 'is_admin()', 'pansofie_private.is_admin()');
      q := replace(q, 'pansofie_is_active_org_member(', 'pansofie_private.pansofie_is_active_org_member(');
      q := replace(q, 'pansofie_is_verified_guardian(', 'pansofie_private.pansofie_is_verified_guardian(');
      q := replace(q, 'pansofie_has_processing_basis(', 'pansofie_private.pansofie_has_processing_basis(');
      q := replace(q, 'pansofie_can_review_run(', 'pansofie_private.pansofie_can_review_run(');
      q := replace(q, 'pansofie_can_review_experience(', 'pansofie_private.pansofie_can_review_experience(');
      q := replace(q, 'pansofie_can_guardian_view_passport(', 'pansofie_private.pansofie_can_guardian_view_passport(');
    end if;

    if c is not null then
      c := replace(c, 'is_admin()', 'pansofie_private.is_admin()');
      c := replace(c, 'pansofie_is_active_org_member(', 'pansofie_private.pansofie_is_active_org_member(');
      c := replace(c, 'pansofie_is_verified_guardian(', 'pansofie_private.pansofie_is_verified_guardian(');
      c := replace(c, 'pansofie_has_processing_basis(', 'pansofie_private.pansofie_has_processing_basis(');
      c := replace(c, 'pansofie_can_review_run(', 'pansofie_private.pansofie_can_review_run(');
      c := replace(c, 'pansofie_can_review_experience(', 'pansofie_private.pansofie_can_review_experience(');
      c := replace(c, 'pansofie_can_guardian_view_passport(', 'pansofie_private.pansofie_can_guardian_view_passport(');
    end if;

    if q is not null and c is not null then
      execute format(
        'alter policy %I on %I.%I using (%s) with check (%s)',
        p.policyname, p.schemaname, p.tablename, q, c
      );
    elsif q is not null then
      execute format(
        'alter policy %I on %I.%I using (%s)',
        p.policyname, p.schemaname, p.tablename, q
      );
    elsif c is not null then
      execute format(
        'alter policy %I on %I.%I with check (%s)',
        p.policyname, p.schemaname, p.tablename, c
      );
    end if;
  end loop;
end $$;

-- Trigger functions execute with the caller's identity, so they must also use
-- the private non-RPC admin predicate before public helper EXECUTE is removed.
create or replace function public.pansofie_guard_evidence_mutation()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  target_run uuid := coalesce(new.run_id, old.run_id);
  run_owner uuid;
  run_status text;
begin
  if pansofie_private.is_admin() then
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

create or replace function public.pansofie_guard_reflection_mutation()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  target_run uuid := coalesce(new.run_id, old.run_id);
  run_owner uuid;
  run_status text;
begin
  if pansofie_private.is_admin() then
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

create or replace function public.pansofie_protect_portfolio_verification()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if pansofie_private.is_admin() then
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

-- Generic public helpers remain available internally to SECURITY DEFINER
-- business functions owned by postgres, but are no longer browser-callable.
revoke execute on function public.is_admin() from public, anon, authenticated;
revoke execute on function public.pansofie_is_active_org_member(uuid, text[], uuid) from public, anon, authenticated;
revoke execute on function public.pansofie_is_verified_guardian(uuid, uuid) from public, anon, authenticated;
revoke execute on function public.pansofie_has_processing_basis(uuid, uuid, text) from public, anon, authenticated;
revoke execute on function public.pansofie_can_review_run(uuid, text) from public, anon, authenticated;
revoke execute on function public.pansofie_can_review_experience(uuid, text) from public, anon, authenticated;
revoke execute on function public.pansofie_can_guardian_view_passport(uuid) from public, anon, authenticated;

grant execute on function public.is_admin() to service_role;
grant execute on function public.pansofie_is_active_org_member(uuid, text[], uuid) to service_role;
grant execute on function public.pansofie_is_verified_guardian(uuid, uuid) to service_role;
grant execute on function public.pansofie_has_processing_basis(uuid, uuid, text) to service_role;
grant execute on function public.pansofie_can_review_run(uuid, text) to service_role;
grant execute on function public.pansofie_can_review_experience(uuid, text) to service_role;
grant execute on function public.pansofie_can_guardian_view_passport(uuid) to service_role;

comment on schema pansofie_private is
  'Non-exposed authorization predicates used by PANSOFIE RLS; not an application RPC surface.';
