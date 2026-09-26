begin;

create extension if not exists pgtap with schema extensions;

select plan(44);

select ok(
  to_regclass('public.school_mission_assignments') is not null
  and to_regclass('public.school_mission_assignment_runs') is not null,
  'school assignment tables exist'
);

select ok(
  to_regclass('public.quest_assignments') is null
  and to_regclass('public.school_mission_runs') is null,
  'school assignment creates no parallel quest or mission-run engine'
);

select ok(
  (
    select bool_and(c.relrowsecurity)
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public'
      and c.relname = any(array[
        'school_mission_assignments',
        'school_mission_assignment_runs'
      ])
  ),
  'RLS is enabled on school assignment tables'
);
select ok(
  not has_table_privilege('anon', 'public.school_mission_assignments', 'SELECT')
  and not has_table_privilege('anon', 'public.school_mission_assignment_runs', 'SELECT'),
  'anon cannot read school assignment state'
);

select ok(
  not has_table_privilege('authenticated', 'public.school_mission_assignments', 'INSERT')
  and not has_table_privilege('authenticated', 'public.school_mission_assignments', 'UPDATE')
  and not has_table_privilege('authenticated', 'public.school_mission_assignments', 'DELETE')
  and not has_table_privilege('authenticated', 'public.school_mission_assignment_runs', 'INSERT'),
  'ordinary clients cannot mutate assignment tables directly'
);

select ok(
  not has_function_privilege(
    'anon',
    'public.assign_school_mission(uuid,uuid,uuid,timestamp with time zone,timestamp with time zone)',
    'EXECUTE'
  ),
  'anon cannot execute school assignment RPC'
);

select ok(
  has_function_privilege(
    'authenticated',
    'public.assign_school_mission(uuid,uuid,uuid,timestamp with time zone,timestamp with time zone)',
    'EXECUTE'
  ),
  'authenticated callers may reach governed school assignment RPC'
);

insert into auth.users (id, email) values
  ('71111111-1111-4111-8111-111111111111', 'school-coordinator@pansofie.test'),
  ('72222222-2222-4222-8222-222222222222', 'school-teacher@pansofie.test'),
  ('73333333-3333-4333-8333-333333333333', 'school-learner-one@pansofie.test'),
  ('74444444-4444-4444-8444-444444444444', 'school-learner-two@pansofie.test'),
  ('75555555-5555-4555-8555-555555555555', 'school-outsider@pansofie.test')
on conflict (id) do nothing;

update public.profiles
set display_name = case id
      when '71111111-1111-4111-8111-111111111111' then 'Coordinator'
      when '72222222-2222-4222-8222-222222222222' then 'Teacher'
      when '73333333-3333-4333-8333-333333333333' then 'Learner One'
      when '74444444-4444-4444-8444-444444444444' then 'Learner Two'
      else 'Outsider'
    end,
    date_of_birth = case
      when id in (
        '73333333-3333-4333-8333-333333333333',
        '74444444-4444-4444-8444-444444444444'
      ) then date '2010-01-01'
      else date '1990-01-01'
    end,
    account_context = 'school'
where id in (
  '71111111-1111-4111-8111-111111111111',
  '72222222-2222-4222-8222-222222222222',
  '73333333-3333-4333-8333-333333333333',
  '74444444-4444-4444-8444-444444444444',
  '75555555-5555-4555-8555-555555555555'
);
insert into public.organizations (id, slug, name, organization_type, status, created_by)
values (
  '7aaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  'go-school-assignment-test',
  'GO School Assignment Test',
  'school',
  'active',
  '71111111-1111-4111-8111-111111111111'
)
on conflict (id) do nothing;

insert into public.organization_memberships (
  id, organization_id, user_id, role, status, joined_at, created_by
) values
  (
    '7b111111-1111-4111-8111-111111111111',
    '7aaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    '71111111-1111-4111-8111-111111111111',
    'coordinator', 'active', now(),
    '71111111-1111-4111-8111-111111111111'
  ),
  (
    '7b222222-2222-4222-8222-222222222222',
    '7aaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    '72222222-2222-4222-8222-222222222222',
    'teacher', 'active', now(),
    '71111111-1111-4111-8111-111111111111'
  ),
  (
    '7b333333-3333-4333-8333-333333333333',
    '7aaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    '73333333-3333-4333-8333-333333333333',
    'learner', 'active', now(),
    '71111111-1111-4111-8111-111111111111'
  ),
  (
    '7b444444-4444-4444-8444-444444444444',
    '7aaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    '74444444-4444-4444-8444-444444444444',
    'learner', 'active', now(),
    '71111111-1111-4111-8111-111111111111'
  )
on conflict (organization_id, user_id, role) do nothing;

insert into public.school_classes (
  id, school_id, name, academic_year, status, created_by
) values (
  '7ccccccc-cccc-4ccc-8ccc-cccccccccccc',
  '7aaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  '2.A', '2026/2027', 'active',
  '71111111-1111-4111-8111-111111111111'
);

insert into public.school_class_memberships (
  id, class_id, user_id, role, status, created_by
) values
  (
    '7d222222-2222-4222-8222-222222222222',
    '7ccccccc-cccc-4ccc-8ccc-cccccccccccc',
    '72222222-2222-4222-8222-222222222222',
    'teacher', 'active',
    '71111111-1111-4111-8111-111111111111'
  ),
  (
    '7d333333-3333-4333-8333-333333333333',
    '7ccccccc-cccc-4ccc-8ccc-cccccccccccc',
    '73333333-3333-4333-8333-333333333333',
    'learner', 'active',
    '71111111-1111-4111-8111-111111111111'
  ),
  (
    '7d444444-4444-4444-8444-444444444444',
    '7ccccccc-cccc-4ccc-8ccc-cccccccccccc',
    '74444444-4444-4444-8444-444444444444',
    'learner', 'active',
    '71111111-1111-4111-8111-111111111111'
  );

insert into public.missions (
  id, slug, title, summary, program_id, status, created_by
) values (
  '7eeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
  'school-assignment-test',
  'School Assignment Test',
  'Canonical published mission for school assignment tests',
  'pansofiego', 'published',
  '71111111-1111-4111-8111-111111111111'
);

set local role authenticated;
set local request.jwt.claim.sub = '72222222-2222-4222-8222-222222222222';

select lives_ok(
  $$
    select * from public.assign_school_mission(
      '7ccccccc-cccc-4ccc-8ccc-cccccccccccc',
      '7eeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
      null,
      now(),
      now() + interval '14 days'
    )
  $$,
  'teacher can assign a published canonical mission to their class'
);

reset role;

select is(
  (select count(*)::integer from public.school_mission_assignments),
  1,
  'class assignment creates one assignment intent'
);

select is(
  (select count(*)::integer from public.school_mission_assignment_runs),
  2,
  'class assignment links both active learners'
);
select is(
  (
    select count(*)::integer
    from public.mission_runs
    where mission_id = '7eeeeeee-eeee-4eee-8eee-eeeeeeeeeeee'
      and status = 'assigned'
  ),
  2,
  'class assignment materializes canonical assigned mission_runs'
);

select is(
  (
    select count(*)::integer
    from public.school_mission_assignments
    where assigned_by = '72222222-2222-4222-8222-222222222222'
  ),
  1,
  'assignment is attributable to the authenticated teacher'
);

select ok(
  not has_function_privilege('anon', 'public.get_school_class_roster(uuid)', 'EXECUTE')
  and not has_function_privilege('anon', 'public.get_school_class_assignment_progress(uuid)', 'EXECUTE'),
  'anon cannot execute school GO read-model RPCs'
);

select ok(
  has_function_privilege('authenticated', 'public.get_school_class_roster(uuid)', 'EXECUTE')
  and has_function_privilege('authenticated', 'public.get_school_class_assignment_progress(uuid)', 'EXECUTE'),
  'authenticated callers may reach governed school GO read-model RPCs'
);

set local role authenticated;
set local request.jwt.claim.sub = '72222222-2222-4222-8222-222222222222';

select is(
  (select count(*) from public.get_school_class_roster('7ccccccc-cccc-4ccc-8ccc-cccccccccccc')),
  3::bigint,
  'teacher reads only the three active class memberships'
);

select is(
  (select count(*) from public.get_school_class_roster('7ccccccc-cccc-4ccc-8ccc-cccccccccccc') where class_role = 'learner'),
  2::bigint,
  'teacher roster exposes the two learners through minimal display identity'
);

select is(
  (select count(*) from public.get_school_class_assignment_progress('7ccccccc-cccc-4ccc-8ccc-cccccccccccc')),
  2::bigint,
  'teacher reads canonical progress for the two assigned learner runs'
);

set local request.jwt.claim.sub = '73333333-3333-4333-8333-333333333333';

select is(
  (select count(*) from public.get_school_class_roster('7ccccccc-cccc-4ccc-8ccc-cccccccccccc')),
  0::bigint,
  'learner cannot enumerate the class roster through read-model RPC'
);

select is(
  (select count(*) from public.get_school_class_assignment_progress('7ccccccc-cccc-4ccc-8ccc-cccccccccccc')),
  0::bigint,
  'learner cannot enumerate peer progress through read-model RPC'
);

set local request.jwt.claim.sub = '75555555-5555-4555-8555-555555555555';

select ok(
  (select count(*) from public.get_school_class_roster('7ccccccc-cccc-4ccc-8ccc-cccccccccccc')) = 0
  and (select count(*) from public.get_school_class_assignment_progress('7ccccccc-cccc-4ccc-8ccc-cccccccccccc')) = 0,
  'unrelated user receives no class roster or progress'
);

set local request.jwt.claim.sub = '71111111-1111-4111-8111-111111111111';

select is(
  (select count(*) from public.get_school_class_roster('7ccccccc-cccc-4ccc-8ccc-cccccccccccc')),
  3::bigint,
  'school coordinator may read the governed class roster'
);

reset role;

set local role authenticated;
set local request.jwt.claim.sub = '72222222-2222-4222-8222-222222222222';

select throws_ok(
  $$
    select * from public.assign_school_mission(
      '7ccccccc-cccc-4ccc-8ccc-cccccccccccc',
      '7eeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
      null, now(), null
    )
  $$,
  null::text, null::text,
  'duplicate active class assignment is rejected'
);
select throws_ok(
  $$
    select * from public.assign_school_mission(
      '7ccccccc-cccc-4ccc-8ccc-cccccccccccc',
      '7eeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
      '75555555-5555-4555-8555-555555555555',
      now(), null
    )
  $$,
  null::text, null::text,
  'teacher cannot assign the mission to a user outside the class'
);

set local request.jwt.claim.sub = '73333333-3333-4333-8333-333333333333';

select results_eq(
  'select count(*) from public.school_mission_assignments',
  array[1::bigint],
  'learner sees the class assignment'
);

select results_eq(
  'select count(*) from public.school_mission_assignment_runs',
  array[1::bigint],
  'learner sees only their own assignment-to-run link'
);

select results_eq(
  $$select count(*) from public.mission_runs
    where mission_id = '7eeeeeee-eeee-4eee-8eee-eeeeeeeeeeee'$$,
  array[1::bigint],
  'learner sees only their own canonical mission run'
);
select throws_ok(
  $$
    select * from public.assign_school_mission(
      '7ccccccc-cccc-4ccc-8ccc-cccccccccccc',
      '7eeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
      null, now(), null
    )
  $$,
  null::text, null::text,
  'learner cannot assign missions to the class'
);

select throws_ok(
  $$
    select public.cancel_school_mission_assignment(
      (select id from public.school_mission_assignments limit 1)
    )
  $$,
  null::text, null::text,
  'learner cannot cancel a school assignment'
);

set local request.jwt.claim.sub = '74444444-4444-4444-8444-444444444444';

select results_eq(
  'select count(*) from public.school_mission_assignments',
  array[1::bigint],
  'second learner also sees the class assignment'
);

select results_eq(
  'select count(*) from public.school_mission_assignment_runs',
  array[1::bigint],
  'second learner cannot enumerate peer assignment links'
);
set local request.jwt.claim.sub = '75555555-5555-4555-8555-555555555555';

select results_eq(
  'select count(*) from public.school_mission_assignments',
  array[0::bigint],
  'unrelated user cannot read school assignments'
);

select results_eq(
  'select count(*) from public.school_mission_assignment_runs',
  array[0::bigint],
  'unrelated user cannot read assignment-to-run links'
);

select results_eq(
  'select count(*) from public.mission_runs',
  array[0::bigint],
  'unrelated user cannot read learner mission runs'
);

set local request.jwt.claim.sub = '71111111-1111-4111-8111-111111111111';

select is(
  public.cancel_school_mission_assignment(
    (select id from public.school_mission_assignments limit 1)
  ),
  true,
  'school coordinator can cancel the class assignment'
);

reset role;

select is(
  (
    select count(*)::integer
    from public.school_mission_assignments
    where status = 'cancelled'
      and cancelled_at is not null
  ),
  1,
  'cancelled assignment keeps an explicit audit state'
);

select is(
  (
    select count(*)::integer
    from public.mission_runs
    where mission_id = '7eeeeeee-eeee-4eee-8eee-eeeeeeeeeeee'
      and status = 'assigned'
  ),
  2,
  'cancelling assignment does not cancel learner mission work'
);

set local role authenticated;
set local request.jwt.claim.sub = '72222222-2222-4222-8222-222222222222';

select lives_ok(
  $$
    select * from public.assign_school_mission(
      '7ccccccc-cccc-4ccc-8ccc-cccccccccccc',
      '7eeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
      '73333333-3333-4333-8333-333333333333',
      now(), now() + interval '7 days'
    )
  $$,
  'teacher can assign a mission to one learner after class assignment cancellation'
);

reset role;

select is(
  (
    select count(*)::integer
    from public.school_mission_assignments
    where status = 'active'
      and scope = 'learner'
      and target_user_id = '73333333-3333-4333-8333-333333333333'
  ),
  1,
  'learner-scoped assignment records the intended student'
);

select is(
  (
    select count(*)::integer
    from public.school_mission_assignment_runs sar
    join public.school_mission_assignments sma on sma.id = sar.assignment_id
    where sma.status = 'active'
      and sma.scope = 'learner'
  ),
  1,
  'learner-scoped assignment links exactly one learner run'
);

select is(
  (
    select count(*)::integer
    from public.mission_runs
    where mission_id = '7eeeeeee-eeee-4eee-8eee-eeeeeeeeeeee'
  ),
  2,
  'learner reassignment reuses existing canonical run instead of duplicating it'
);
set local role authenticated;
set local request.jwt.claim.sub = '73333333-3333-4333-8333-333333333333';

select results_eq(
  'select count(*) from public.school_mission_assignments',
  array[2::bigint],
  'target learner sees class history plus their learner assignment'
);

select results_eq(
  'select count(*) from public.school_mission_assignment_runs',
  array[2::bigint],
  'target learner sees only their own links across both assignments'
);

set local request.jwt.claim.sub = '74444444-4444-4444-8444-444444444444';

select results_eq(
  'select count(*) from public.school_mission_assignments',
  array[1::bigint],
  'peer learner cannot read another learners targeted assignment'
);

select results_eq(
  'select count(*) from public.school_mission_assignment_runs',
  array[1::bigint],
  'peer learner cannot read another learners targeted assignment link'
);

select * from finish();
rollback;
