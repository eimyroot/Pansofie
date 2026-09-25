begin;

create extension if not exists pgtap with schema extensions;
select plan(25);

select ok(
  to_regclass('public.school_classes') is not null
  and to_regclass('public.school_class_memberships') is not null,
  'GO School Foundation tables exist'
);

select ok(
  (
    select bool_and(c.relrowsecurity)
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public'
      and c.relname = any(array['school_classes', 'school_class_memberships'])
  ),
  'RLS is enabled on school class tables'
);

select ok(
  to_regclass('public.school_students') is null
  and to_regclass('public.school_teachers') is null
  and to_regclass('public.school_admins') is null,
  'school foundation does not duplicate canonical user identities'
);

select ok(
  not has_table_privilege('anon', 'public.school_classes', 'SELECT')
  and not has_table_privilege('anon', 'public.school_class_memberships', 'SELECT'),
  'anon cannot read school class data'
);

select ok(
  not has_function_privilege('anon', 'public.is_school_coordinator(uuid)', 'EXECUTE')
  and not has_function_privilege('anon', 'public.is_school_class_staff(uuid)', 'EXECUTE')
  and not has_function_privilege('anon', 'public.can_manage_school_class_member(uuid,uuid,text)', 'EXECUTE'),
  'anon cannot execute school authorization helpers'
);

select ok(
  not has_table_privilege('authenticated', 'public.school_classes', 'DELETE')
  and not has_table_privilege('authenticated', 'public.school_class_memberships', 'DELETE'),
  'ordinary clients cannot hard-delete classes or class memberships'
);

select ok(
  has_column_privilege('authenticated', 'public.school_classes', 'name', 'UPDATE')
  and not has_column_privilege('authenticated', 'public.school_classes', 'school_id', 'UPDATE')
  and has_column_privilege('authenticated', 'public.school_class_memberships', 'status', 'UPDATE')
  and not has_column_privilege('authenticated', 'public.school_class_memberships', 'role', 'UPDATE'),
  'identity and school linkage columns remain immutable to ordinary clients'
);

insert into auth.users (id, email) values
  ('90111111-1111-4111-8111-111111111111', 'school-coordinator-a@pansofie.test'),
  ('90222222-2222-4222-8222-222222222222', 'school-teacher-a@pansofie.test'),
  ('90333333-3333-4333-8333-333333333333', 'school-learner-a1@pansofie.test'),
  ('90444444-4444-4444-8444-444444444444', 'school-learner-a2@pansofie.test'),
  ('90555555-5555-4555-8555-555555555555', 'school-coordinator-b@pansofie.test'),
  ('90666666-6666-4666-8666-666666666666', 'school-teacher-b@pansofie.test'),
  ('90777777-7777-4777-8777-777777777777', 'school-learner-b@pansofie.test'),
  ('90888888-8888-4888-8888-888888888888', 'school-unrelated@pansofie.test'),
  ('90999999-9999-4999-8999-999999999999', 'school-platform-admin@pansofie.test')
on conflict (id) do nothing;

insert into public.organizations (id, slug, name, organization_type, status, created_by) values
  ('90aaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'go-school-a', 'GO School A', 'school', 'active', '90111111-1111-4111-8111-111111111111'),
  ('90bbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'go-school-b', 'GO School B', 'school', 'active', '90555555-5555-4555-8555-555555555555')
on conflict (id) do nothing;

insert into public.organization_memberships (
  organization_id, user_id, role, status, joined_at, created_by
) values
  ('90aaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', '90111111-1111-4111-8111-111111111111', 'coordinator', 'active', now(), '90111111-1111-4111-8111-111111111111'),
  ('90aaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', '90222222-2222-4222-8222-222222222222', 'teacher', 'active', now(), '90111111-1111-4111-8111-111111111111'),
  ('90aaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', '90333333-3333-4333-8333-333333333333', 'learner', 'active', now(), '90111111-1111-4111-8111-111111111111'),
  ('90aaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', '90444444-4444-4444-8444-444444444444', 'learner', 'active', now(), '90111111-1111-4111-8111-111111111111'),
  ('90bbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', '90555555-5555-4555-8555-555555555555', 'coordinator', 'active', now(), '90555555-5555-4555-8555-555555555555'),
  ('90bbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', '90666666-6666-4666-8666-666666666666', 'teacher', 'active', now(), '90555555-5555-4555-8555-555555555555'),
  ('90bbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', '90777777-7777-4777-8777-777777777777', 'learner', 'active', now(), '90555555-5555-4555-8555-555555555555')
on conflict (organization_id, user_id, role) do nothing;

update public.user_roles
set role = 'admin'
where user_id = '90999999-9999-4999-8999-999999999999';

insert into public.school_classes (
  id, school_id, name, academic_year, status, created_by
) values (
  '90cccccc-cccc-4ccc-8ccc-cccccccccccc',
  '90bbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
  '1.B', '2026/2027', 'active',
  '90555555-5555-4555-8555-555555555555'
);

set local role authenticated;
set local request.jwt.claim.sub = '90111111-1111-4111-8111-111111111111';

select lives_ok(
  $$insert into public.school_classes (school_id, name, academic_year, created_by)
    values (
      '90aaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      '1.A', '2026/2027',
      '90111111-1111-4111-8111-111111111111'
    )$$,
  'school coordinator can create a class in their school'
);

select lives_ok(
  $$insert into public.school_class_memberships (class_id, user_id, role, created_by)
    select id, '90222222-2222-4222-8222-222222222222', 'teacher',
      '90111111-1111-4111-8111-111111111111'
    from public.school_classes where name = '1.A'$$,
  'school coordinator can add an active school teacher to the class'
);

select lives_ok(
  $$insert into public.school_class_memberships (class_id, user_id, role, created_by)
    select id, '90333333-3333-4333-8333-333333333333', 'learner',
      '90111111-1111-4111-8111-111111111111'
    from public.school_classes where name = '1.A'$$,
  'school coordinator can add an active school learner to the class'
);

select throws_ok(
  $$insert into public.school_class_memberships (class_id, user_id, role, created_by)
    select id, '90777777-7777-4777-8777-777777777777', 'learner',
      '90111111-1111-4111-8111-111111111111'
    from public.school_classes where name = '1.A'$$,
  null::text, null::text,
  'school coordinator cannot import a learner from another school'
);

select results_eq(
  'select count(*) from public.school_classes',
  array[1::bigint],
  'school coordinator sees only classes in their school'
);

select results_eq(
  'select count(*) from public.school_class_memberships',
  array[2::bigint],
  'school coordinator sees the whole roster in their school class'
);

set local request.jwt.claim.sub = '90222222-2222-4222-8222-222222222222';

select results_eq(
  'select count(*) from public.school_classes',
  array[1::bigint],
  'teacher sees only classes where they have active class membership'
);

select results_eq(
  'select count(*) from public.school_class_memberships',
  array[2::bigint],
  'teacher can read the roster of their class'
);

select lives_ok(
  $$insert into public.school_class_memberships (class_id, user_id, role, created_by)
    select id, '90444444-4444-4444-8444-444444444444', 'learner',
      '90222222-2222-4222-8222-222222222222'
    from public.school_classes where name = '1.A'$$,
  'teacher can add an active learner to their own class'
);

select throws_ok(
  $$insert into public.school_class_memberships (class_id, user_id, role, created_by)
    select id, '90333333-3333-4333-8333-333333333333', 'teacher',
      '90222222-2222-4222-8222-222222222222'
    from public.school_classes where name = '1.A'$$,
  null::text, null::text,
  'teacher cannot promote a learner into a teacher class role'
);

select throws_ok(
  $$insert into public.school_classes (school_id, name, academic_year, created_by)
    values (
      '90aaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      '2.A', '2026/2027',
      '90222222-2222-4222-8222-222222222222'
    )$$,
  null::text, null::text,
  'teacher cannot create classes at school scope'
);

select lives_ok(
  $$update public.school_class_memberships
    set status = 'ended', ended_at = now()
    where user_id = '90444444-4444-4444-8444-444444444444'
      and role = 'learner'$$,
  'teacher can end a learner membership in their own class'
);

select results_eq(
  $$update public.school_class_memberships
    set status = 'ended', ended_at = now()
    where user_id = '90222222-2222-4222-8222-222222222222'
      and role = 'teacher'
    returning user_id$$,
  array[]::uuid[],
  'teacher cannot remove or end their own teacher role'
);

set local request.jwt.claim.sub = '90333333-3333-4333-8333-333333333333';

select results_eq(
  'select count(*) from public.school_classes',
  array[1::bigint],
  'learner can read their own class context'
);

select results_eq(
  'select count(*) from public.school_class_memberships',
  array[1::bigint],
  'learner sees only their own class membership, not peer roster'
);

select throws_ok(
  $$insert into public.school_class_memberships (class_id, user_id, role, created_by)
    select id, '90333333-3333-4333-8333-333333333333', 'mentor',
      '90333333-3333-4333-8333-333333333333'
    from public.school_classes where name = '1.A'$$,
  null::text, null::text,
  'learner cannot create or elevate class memberships'
);

set local request.jwt.claim.sub = '90888888-8888-4888-8888-888888888888';

select is(
  (select count(*) from public.school_classes)
  + (select count(*) from public.school_class_memberships),
  0::bigint,
  'unrelated user cannot read school classes or class memberships'
);

set local request.jwt.claim.sub = '90999999-9999-4999-8999-999999999999';

select results_eq(
  'select count(*) from public.school_classes',
  array[2::bigint],
  'Pansofie admin can read school classes across schools'
);

select * from finish();
rollback;
