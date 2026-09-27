begin;

create extension if not exists pgtap with schema extensions;
select plan(17);

select ok(to_regclass('public.school_class_invites') is not null, 'school invite table exists');
select ok((select relrowsecurity from pg_class where oid = 'public.school_class_invites'::regclass), 'school invite table has RLS');
select ok(
  not has_table_privilege('anon', 'public.school_class_invites', 'SELECT')
  and not has_table_privilege('authenticated', 'public.school_class_invites', 'SELECT'),
  'invite bearer hashes are not directly readable by clients'
);
select ok(
  not has_function_privilege('anon', 'public.create_school_class_invite(uuid)', 'EXECUTE')
  and not has_function_privilege('anon', 'public.accept_school_class_invite(text)', 'EXECUTE'),
  'anon cannot create or accept school invites'
);

insert into auth.users (id, email) values
  ('a1111111-1111-4111-8111-111111111111', 'pilot-coordinator@pansofie.test'),
  ('a2222222-2222-4222-8222-222222222222', 'pilot-learner@pansofie.test'),
  ('a3333333-3333-4333-8333-333333333333', 'pilot-other@pansofie.test')
on conflict (id) do nothing;

insert into public.organizations (id, slug, name, organization_type, status, created_by)
values ('a4444444-4444-4444-8444-444444444444', 'pilot-school', 'Pilot School', 'school', 'active', 'a1111111-1111-4111-8111-111111111111');

insert into public.organization_memberships (organization_id, user_id, role, status, joined_at, created_by)
values ('a4444444-4444-4444-8444-444444444444', 'a1111111-1111-4111-8111-111111111111', 'coordinator', 'active', now(), 'a1111111-1111-4111-8111-111111111111');

insert into public.school_classes (id, school_id, name, academic_year, status, created_by)
values ('a5555555-5555-4555-8555-555555555555', 'a4444444-4444-4444-8444-444444444444', 'Pilot 7.A', '2026/2027', 'active', 'a1111111-1111-4111-8111-111111111111');

set local role authenticated;
set local request.jwt.claim.sub = 'a1111111-1111-4111-8111-111111111111';

create temp table invite_capture on commit drop as
select * from public.create_school_class_invite('a5555555-5555-4555-8555-555555555555');

select ok((select invite_token ~ '^[0-9a-f]{48}$' from invite_capture), 'coordinator receives an opaque 48-char invite token');
select ok((select invite_expires_at <= now() + interval '48 hours 1 minute' from invite_capture), 'invite lifetime is bounded to 48 hours');

set local request.jwt.claim.sub = 'a2222222-2222-4222-8222-222222222222';

select lives_ok(
  $$select * from public.accept_school_class_invite((select invite_token from invite_capture))$$,
  'authenticated learner can accept the valid invite once'
);
select results_eq(
  $$select count(*) from public.organization_memberships where organization_id = 'a4444444-4444-4444-8444-444444444444' and user_id = 'a2222222-2222-4222-8222-222222222222' and role = 'learner' and status = 'active'$$,
  array[1::bigint],
  'invite creates canonical active school learner membership'
);
select results_eq(
  $$select count(*) from public.school_class_memberships where class_id = 'a5555555-5555-4555-8555-555555555555' and user_id = 'a2222222-2222-4222-8222-222222222222' and role = 'learner' and status = 'active'$$,
  array[1::bigint],
  'invite creates canonical active class learner membership'
);
select results_eq(
  $$select count(*) from public.school_class_memberships where class_id = 'a5555555-5555-4555-8555-555555555555'$$,
  array[1::bigint],
  'learner RLS exposes only their own class membership'
);

select is(
  public.complete_onboarding('school', 'Duplicate School', 'Pilot Learner', date '2012-05-06'),
  'a4444444-4444-4444-8444-444444444444'::uuid,
  'first onboarding reuses the accepted school membership'
);
select results_eq(
  $$select count(*) from public.organizations where organization_type = 'school'$$,
  array[1::bigint],
  'invite-aware onboarding does not create a duplicate school'
);

reset role;
insert into public.missions (id, slug, title, summary, program_id, status, created_by)
values (
  'a6666666-6666-4666-8666-666666666666',
  'pilot-first-mission',
  'Pilot First Mission',
  'Canonical first mission for the school pilot chain',
  'pansofiego', 'published',
  'a1111111-1111-4111-8111-111111111111'
);

set local role authenticated;
set local request.jwt.claim.sub = 'a1111111-1111-4111-8111-111111111111';
select lives_ok(
  $$select * from public.assign_school_mission(
    'a5555555-5555-4555-8555-555555555555',
    'a6666666-6666-4666-8666-666666666666',
    null,
    now(),
    now() + interval '7 days'
  )$$,
  'coordinator can assign the first canonical mission after learner joins'
);

reset role;
select results_eq(
  $$select count(*) from public.school_mission_assignments where class_id = 'a5555555-5555-4555-8555-555555555555' and mission_id = 'a6666666-6666-4666-8666-666666666666'$$,
  array[1::bigint],
  'pilot chain creates one school assignment intent'
);
select results_eq(
  $$select count(*) from public.mission_runs where user_id = 'a2222222-2222-4222-8222-222222222222' and mission_id = 'a6666666-6666-4666-8666-666666666666' and status = 'assigned'$$,
  array[1::bigint],
  'first assignment materializes the invited learner canonical mission run'
);

set local role authenticated;
set local request.jwt.claim.sub = 'a3333333-3333-4333-8333-333333333333';
select throws_ok(
  $$select * from public.accept_school_class_invite((select invite_token from invite_capture))$$,
  'Pozvánka už není aktivní.',
  'single-use invite cannot be claimed by a second account'
);
select throws_ok(
  $$select * from public.create_school_class_invite('a5555555-5555-4555-8555-555555555555')$$,
  'Nemáš oprávnění vytvářet pozvánku do této třídy.',
  'unrelated account cannot create class invites'
);

select * from finish();
rollback;
