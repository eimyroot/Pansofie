begin;

create extension if not exists pgtap with schema extensions;

select plan(26);

select ok(
  to_regclass('public.mission_run_cycle_progress') is not null,
  'canonical mission cycle progress table exists'
);

select ok(
  (select relrowsecurity from pg_class where oid = 'public.mission_run_cycle_progress'::regclass),
  'mission cycle progress has RLS enabled'
);

select ok(
  not has_table_privilege('anon', 'public.mission_run_cycle_progress', 'SELECT'),
  'anon cannot read mission cycle progress'
);

select ok(
  not has_function_privilege('anon', 'public.advance_mission_learning_cycle(uuid,text)', 'EXECUTE'),
  'anon cannot advance mission cycle'
);

select ok(
  has_function_privilege('authenticated', 'public.advance_mission_learning_cycle(uuid,text)', 'EXECUTE'),
  'authenticated user may call governed mission cycle RPC'
);
select is(
  (select count(*)::integer from public.missions where topic_key in ('ai_education','financial_literacy','cyber_security')),
  3,
  'three starter school quest topics are canonical published missions'
);

select is(
  (select count(*)::integer from public.missions where difficulty between 1 and 5 and jsonb_array_length(jsonb_path_query_array(learning_cycle, '$.*')) = 6),
  4,
  'four seeded missions expose six learning-cycle prompts and governed difficulty'
);

insert into auth.users (id, email) values
  ('81111111-1111-4111-8111-111111111111', 'cycle-owner@pansofie.test'),
  ('82222222-2222-4222-8222-222222222222', 'cycle-peer@pansofie.test'),
  ('83333333-3333-4333-8333-333333333333', 'cycle-outsider@pansofie.test')
on conflict (id) do nothing;

insert into public.mission_runs (id, mission_id, user_id, status)
select '8aaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', m.id,
       '81111111-1111-4111-8111-111111111111', 'assigned'
from public.missions m where m.slug = 'ai-detektiv-over-odpoved';

insert into public.mission_runs (id, mission_id, user_id, status)
select '8bbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', m.id,
       '82222222-2222-4222-8222-222222222222', 'assigned'
from public.missions m where m.slug = 'rozpocet-pod-tlakem';
set local role authenticated;
set local request.jwt.claim.sub = '81111111-1111-4111-8111-111111111111';

select results_eq(
  'select count(*) from public.mission_run_cycle_progress',
  array[0::bigint],
  'owner starts without synthetic cycle progress'
);

select lives_ok(
  $$select * from public.advance_mission_learning_cycle('8aaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','learn')$$,
  'owner advances the first LEARN phase'
);

select results_eq(
  $$select status from public.mission_runs where id = '8aaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'$$,
  array['in_progress'::text],
  'first phase transitions assigned canonical run to in_progress'
);

select ok(
  (select started_at is not null from public.mission_runs where id = '8aaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'),
  'first phase records canonical run start time'
);

select results_eq(
  $$select current_phase, completed_phases from public.mission_run_cycle_progress where run_id = '8aaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'$$,
  $$values ('play'::text, array['learn']::text[])$$,
  'cycle state advances to PLAY and records LEARN'
);
select throws_ok(
  $$select * from public.advance_mission_learning_cycle('8aaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','do')$$,
  null::text, null::text,
  'owner cannot skip PLAY and jump directly to DO'
);

select lives_ok(
  $$select * from public.advance_mission_learning_cycle('8aaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','play')$$,
  'owner advances PLAY in sequence'
);

set local request.jwt.claim.sub = '82222222-2222-4222-8222-222222222222';

select results_eq(
  'select count(*) from public.mission_run_cycle_progress',
  array[0::bigint],
  'peer cannot read another learners cycle progress'
);

select throws_ok(
  $$select * from public.advance_mission_learning_cycle('8aaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','do')$$,
  null::text, null::text,
  'peer cannot advance another learners run'
);

set local request.jwt.claim.sub = '83333333-3333-4333-8333-333333333333';
select throws_ok(
  $$select * from public.advance_mission_learning_cycle('8aaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','do')$$,
  null::text, null::text,
  'unrelated authenticated user cannot advance the run'
);

set local request.jwt.claim.sub = '81111111-1111-4111-8111-111111111111';
select lives_ok(
  $$select * from public.advance_mission_learning_cycle('8aaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','do')$$,
  'owner advances DO in sequence'
);
select lives_ok(
  $$select * from public.advance_mission_learning_cycle('8aaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','create')$$,
  'owner advances CREATE in sequence'
);
select lives_ok(
  $$select * from public.advance_mission_learning_cycle('8aaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','share')$$,
  'owner advances SHARE in sequence'
);
select lives_ok(
  $$select * from public.advance_mission_learning_cycle('8aaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','reflect')$$,
  'owner advances REFLECT in sequence'
);

select results_eq(
  $$select current_phase, completed_phases from public.mission_run_cycle_progress where run_id = '8aaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'$$,
  $$values ('reflect'::text, array['learn','play','do','create','share','reflect']::text[])$$,
  'completed cycle stores all six phases without inventing a seventh state'
);

select throws_ok(
  $$select * from public.advance_mission_learning_cycle('8aaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','reflect')$$,
  null::text, null::text,
  'completed cycle cannot be advanced again'
);
select results_eq(
  $$select status from public.mission_runs where id = '8aaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'$$,
  array['in_progress'::text],
  'cycle completion does not fake canonical mission completion'
);

select ok(
  not has_column_privilege('authenticated', 'public.mission_run_cycle_progress', 'user_id', 'UPDATE')
  and not has_column_privilege('authenticated', 'public.mission_run_cycle_progress', 'run_id', 'UPDATE'),
  'ordinary clients cannot rewrite cycle ownership'
);

select results_eq(
  'select count(*) from public.mission_run_cycle_progress',
  array[1::bigint],
  'owner sees exactly their own cycle row'
);

select * from finish();
rollback;
