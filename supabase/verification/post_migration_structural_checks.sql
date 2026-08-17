-- PANSOFIE staging post-migration structural checks.
-- Run after all five migrations on an isolated staging project.
-- This is not a substitute for role-isolated RLS/RPC tests.

begin;

do $$
declare
  missing text[] := array[]::text[];
  t text;
  f text;
  required_tables text[] := array[
    'profiles',
    'user_roles',
    'missions',
    'mission_runs',
    'experience_evidence',
    'experience_reflections',
    'experiences',
    'portfolio_items',
    'organizations',
    'organization_memberships',
    'guardian_relationships',
    'age_assurance_records',
    'processing_basis_records',
    'processing_basis_events',
    'experience_reviews',
    'experience_review_events'
  ];
  required_functions text[] := array[
    'is_admin',
    'pansofie_assign_school_mission',
    'pansofie_start_mission',
    'pansofie_submit_mission',
    'pansofie_review_school_run',
    'pansofie_finalize_school_experience',
    'pansofie_guard_evidence_mutation',
    'pansofie_guard_reflection_mutation',
    'pansofie_log_review_event'
  ];
begin
  foreach t in array required_tables loop
    if to_regclass('public.' || t) is null then
      missing := array_append(missing, 'table:' || t);
    end if;
  end loop;

  foreach f in array required_functions loop
    if not exists (
      select 1
      from pg_proc p
      join pg_namespace n on n.oid = p.pronamespace
      where n.nspname = 'public' and p.proname = f
    ) then
      missing := array_append(missing, 'function:' || f);
    end if;
  end loop;

  if array_length(missing, 1) is not null then
    raise exception 'PANSOFIE structural check missing: %', array_to_string(missing, ', ');
  end if;
end;
$$;

-- All participant/governance tables in this list must have RLS enabled.
do $$
declare
  t text;
  required_rls_tables text[] := array[
    'profiles',
    'user_roles',
    'missions',
    'mission_runs',
    'experience_evidence',
    'experience_reflections',
    'experiences',
    'portfolio_items',
    'organizations',
    'organization_memberships',
    'guardian_relationships',
    'age_assurance_records',
    'processing_basis_records',
    'processing_basis_events',
    'experience_reviews',
    'experience_review_events'
  ];
begin
  foreach t in array required_rls_tables loop
    if not exists (
      select 1
      from pg_class c
      join pg_namespace n on n.oid = c.relnamespace
      where n.nspname = 'public'
        and c.relname = t
        and c.relrowsecurity = true
    ) then
      raise exception 'PANSOFIE expected RLS enabled on public.%', t;
    end if;
  end loop;
end;
$$;

-- Integrity hardening triggers must exist and remain enabled.
do $$
begin
  if not exists (
    select 1 from pg_trigger
    where tgname = 'evidence_freeze_after_submission' and not tgisinternal and tgenabled <> 'D'
  ) then
    raise exception 'missing/enabled trigger: evidence_freeze_after_submission';
  end if;

  if not exists (
    select 1 from pg_trigger
    where tgname = 'reflection_freeze_after_submission' and not tgisinternal and tgenabled <> 'D'
  ) then
    raise exception 'missing/enabled trigger: reflection_freeze_after_submission';
  end if;

  if not exists (
    select 1 from pg_trigger
    where tgname = 'experience_reviews_audit_event' and not tgisinternal and tgenabled <> 'D'
  ) then
    raise exception 'missing/enabled trigger: experience_reviews_audit_event';
  end if;
end;
$$;

select
  'PANSOFIE_POST_MIGRATION_STRUCTURAL_CHECK' as check_name,
  'PASS' as result,
  current_database() as database_name,
  now() as checked_at;

rollback;
