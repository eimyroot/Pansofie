begin;

create extension if not exists pgtap with schema extensions;
select plan(16);

select ok(
  to_regclass('public.school_mentor_usage_policy') is not null
  and to_regclass('public.school_mentor_usage_daily') is not null,
  'mentor quota tables exist'
);

select ok(
  (select relrowsecurity from pg_class where oid = 'public.school_mentor_usage_policy'::regclass)
  and (select relrowsecurity from pg_class where oid = 'public.school_mentor_usage_daily'::regclass),
  'mentor quota tables are RLS protected'
);

select ok(
  not has_table_privilege('anon', 'public.school_mentor_usage_daily', 'SELECT')
  and not has_table_privilege('authenticated', 'public.school_mentor_usage_daily', 'SELECT')
  and not has_table_privilege('authenticated', 'public.school_mentor_usage_daily', 'INSERT'),
  'ordinary clients cannot read or mutate usage counters directly'
);

select ok(
  not has_function_privilege('anon', 'public.reserve_school_mentor_usage(uuid)', 'EXECUTE')
  and has_function_privilege('authenticated', 'public.reserve_school_mentor_usage(uuid)', 'EXECUTE'),
  'only authenticated callers can invoke the governed reservation function'
);

select ok(
  not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'school_mentor_usage_daily'
      and column_name in ('user_id','prompt','response','content','transcript')
  ),
  'usage counters persist no raw user id or mentor content'
);
insert into auth.users (id, email) values
  ('a1111111-1111-4111-8111-111111111111', 'mentor-a1@pansofie.test'),
  ('a2222222-2222-4222-8222-222222222222', 'mentor-a2@pansofie.test'),
  ('b1111111-1111-4111-8111-111111111111', 'mentor-b1@pansofie.test'),
  ('c1111111-1111-4111-8111-111111111111', 'mentor-coordinator@pansofie.test')
on conflict (id) do nothing;

insert into public.organizations (id, slug, name, organization_type, status, created_by) values
  ('aa000000-0000-4000-8000-000000000001', 'mentor-school-a', 'Mentor School A', 'school', 'active', 'c1111111-1111-4111-8111-111111111111'),
  ('bb000000-0000-4000-8000-000000000001', 'mentor-school-b', 'Mentor School B', 'school', 'active', 'c1111111-1111-4111-8111-111111111111')
on conflict (id) do nothing;

insert into public.organization_memberships (
  organization_id, user_id, role, status, joined_at, created_by
) values
  ('aa000000-0000-4000-8000-000000000001', 'a1111111-1111-4111-8111-111111111111', 'learner', 'active', now(), 'c1111111-1111-4111-8111-111111111111'),
  ('aa000000-0000-4000-8000-000000000001', 'a2222222-2222-4222-8222-222222222222', 'learner', 'active', now(), 'c1111111-1111-4111-8111-111111111111'),
  ('bb000000-0000-4000-8000-000000000001', 'b1111111-1111-4111-8111-111111111111', 'learner', 'active', now(), 'c1111111-1111-4111-8111-111111111111')
on conflict (organization_id, user_id, role) do nothing;

insert into public.school_classes (id, school_id, name, academic_year, status, created_by) values
  ('aa100000-0000-4000-8000-000000000001', 'aa000000-0000-4000-8000-000000000001', '2.A', '2026/2027', 'active', 'c1111111-1111-4111-8111-111111111111'),
  ('bb100000-0000-4000-8000-000000000001', 'bb000000-0000-4000-8000-000000000001', '2.B', '2026/2027', 'active', 'c1111111-1111-4111-8111-111111111111')
on conflict (id) do nothing;
insert into public.school_mission_assignments (
  id, school_id, class_id, mission_id, scope, target_user_id, status, assigned_by
)
select
  'aa200000-0000-4000-8000-000000000001',
  'aa000000-0000-4000-8000-000000000001',
  'aa100000-0000-4000-8000-000000000001',
  m.id, 'learner', 'a1111111-1111-4111-8111-111111111111', 'active',
  'c1111111-1111-4111-8111-111111111111'
from public.missions m where m.slug = 'ai-detektiv-over-odpoved'
on conflict (id) do nothing;

insert into public.school_mission_assignments (
  id, school_id, class_id, mission_id, scope, target_user_id, status, assigned_by
)
select
  'aa200000-0000-4000-8000-000000000002',
  'aa000000-0000-4000-8000-000000000001',
  'aa100000-0000-4000-8000-000000000001',
  m.id, 'learner', 'a2222222-2222-4222-8222-222222222222', 'active',
  'c1111111-1111-4111-8111-111111111111'
from public.missions m where m.slug = 'rozpocet-pod-tlakem'
on conflict (id) do nothing;

insert into public.school_mission_assignments (
  id, school_id, class_id, mission_id, scope, target_user_id, status, assigned_by
)
select
  'bb200000-0000-4000-8000-000000000001',
  'bb000000-0000-4000-8000-000000000001',
  'bb100000-0000-4000-8000-000000000001',
  m.id, 'learner', 'b1111111-1111-4111-8111-111111111111', 'active',
  'c1111111-1111-4111-8111-111111111111'
from public.missions m where m.slug = 'phishing-pod-lupou'
on conflict (id) do nothing;
insert into public.mission_runs (id, mission_id, user_id, status)
select 'aa300000-0000-4000-8000-000000000001', m.id,
  'a1111111-1111-4111-8111-111111111111', 'in_progress'
from public.missions m where m.slug = 'ai-detektiv-over-odpoved'
on conflict (id) do nothing;

insert into public.mission_runs (id, mission_id, user_id, status)
select 'aa300000-0000-4000-8000-000000000002', m.id,
  'a2222222-2222-4222-8222-222222222222', 'in_progress'
from public.missions m where m.slug = 'rozpocet-pod-tlakem'
on conflict (id) do nothing;

insert into public.mission_runs (id, mission_id, user_id, status)
select 'bb300000-0000-4000-8000-000000000001', m.id,
  'b1111111-1111-4111-8111-111111111111', 'in_progress'
from public.missions m where m.slug = 'phishing-pod-lupou'
on conflict (id) do nothing;

insert into public.school_mission_assignment_runs (assignment_id, user_id, mission_run_id) values
  ('aa200000-0000-4000-8000-000000000001', 'a1111111-1111-4111-8111-111111111111', 'aa300000-0000-4000-8000-000000000001'),
  ('aa200000-0000-4000-8000-000000000002', 'a2222222-2222-4222-8222-222222222222', 'aa300000-0000-4000-8000-000000000002'),
  ('bb200000-0000-4000-8000-000000000001', 'b1111111-1111-4111-8111-111111111111', 'bb300000-0000-4000-8000-000000000001')
on conflict (assignment_id, user_id) do nothing;

update public.school_mentor_usage_policy
set subject_daily_request_limit = 2,
    school_daily_request_limit = 10,
    global_daily_budget_micro_usd = 1000000,
    per_request_budget_micro_usd = 30000
where id = 1;
set local role authenticated;
set local request.jwt.claim.sub = 'a1111111-1111-4111-8111-111111111111';

select lives_ok(
  $$select * from public.reserve_school_mentor_usage('aa200000-0000-4000-8000-000000000001')$$,
  'learner can reserve first bounded mentor request'
);
select lives_ok(
  $$select * from public.reserve_school_mentor_usage('aa200000-0000-4000-8000-000000000001')$$,
  'learner can reserve second bounded mentor request'
);
select throws_ok(
  $$select * from public.reserve_school_mentor_usage('aa200000-0000-4000-8000-000000000001')$$,
  null::text, null::text,
  'daily pseudonymous subject quota blocks the next request'
);

reset role;
select is(
  (select request_count from public.school_mentor_usage_daily
   where school_id = 'aa000000-0000-4000-8000-000000000001'),
  2,
  'subject usage aggregates requests without raw identity'
);

delete from public.school_mentor_usage_daily;
update public.school_mentor_usage_policy
set subject_daily_request_limit = 10,
    school_daily_request_limit = 2,
    global_daily_budget_micro_usd = 1000000
where id = 1;
set local role authenticated;
set local request.jwt.claim.sub = 'a1111111-1111-4111-8111-111111111111';
select lives_ok(
  $$select * from public.reserve_school_mentor_usage('aa200000-0000-4000-8000-000000000001')$$,
  'first learner can reserve within school quota'
);

set local request.jwt.claim.sub = 'a2222222-2222-4222-8222-222222222222';
select lives_ok(
  $$select * from public.reserve_school_mentor_usage('aa200000-0000-4000-8000-000000000002')$$,
  'second learner can reserve within school quota'
);

set local request.jwt.claim.sub = 'a1111111-1111-4111-8111-111111111111';
select throws_ok(
  $$select * from public.reserve_school_mentor_usage('aa200000-0000-4000-8000-000000000001')$$,
  null::text, null::text,
  'school quota blocks aggregate requests without a leaderboard or user ledger'
);

reset role;
delete from public.school_mentor_usage_daily;
update public.school_mentor_usage_policy
set subject_daily_request_limit = 10,
    school_daily_request_limit = 10,
    global_daily_budget_micro_usd = 60000,
    per_request_budget_micro_usd = 30000
where id = 1;
set local role authenticated;
set local request.jwt.claim.sub = 'a1111111-1111-4111-8111-111111111111';
select lives_ok(
  $$select * from public.reserve_school_mentor_usage('aa200000-0000-4000-8000-000000000001')$$,
  'first school can reserve within global spend ceiling'
);

set local request.jwt.claim.sub = 'b1111111-1111-4111-8111-111111111111';
select lives_ok(
  $$select * from public.reserve_school_mentor_usage('bb200000-0000-4000-8000-000000000001')$$,
  'second school can consume the remaining global budget'
);

set local request.jwt.claim.sub = 'a2222222-2222-4222-8222-222222222222';
select throws_ok(
  $$select * from public.reserve_school_mentor_usage('aa200000-0000-4000-8000-000000000002')$$,
  null::text, null::text,
  'global daily spend ceiling blocks requests before an external model call'
);

reset role;
select is(
  (select sum(budgeted_micro_usd)::bigint from public.school_mentor_usage_daily),
  60000::bigint,
  'budget ledger records only bounded aggregate micro-USD reservations'
);

select * from finish();
rollback;
