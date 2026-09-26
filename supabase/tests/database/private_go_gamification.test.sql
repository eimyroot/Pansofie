begin;

create extension if not exists pgtap with schema extensions;
select plan(10);

select ok(
  to_regclass('public.game_badges') is not null
  and to_regclass('public.mission_game_rewards') is not null,
  'private gamification metadata tables exist'
);

select ok(
  (select relrowsecurity from pg_class where oid = 'public.game_badges'::regclass)
  and (select relrowsecurity from pg_class where oid = 'public.mission_game_rewards'::regclass),
  'gamification metadata is RLS protected'
);

select ok(
  not has_table_privilege('anon', 'public.game_badges', 'SELECT')
  and not has_table_privilege('anon', 'public.mission_game_rewards', 'SELECT'),
  'anon cannot read authenticated game metadata'
);

select ok(
  has_table_privilege('authenticated', 'public.game_badges', 'SELECT')
  and has_table_privilege('authenticated', 'public.mission_game_rewards', 'SELECT')
  and not has_table_privilege('authenticated', 'public.game_badges', 'INSERT')
  and not has_table_privilege('authenticated', 'public.mission_game_rewards', 'UPDATE'),
  'authenticated clients can read but not mutate reward definitions'
);

select ok(
  to_regclass('public.user_xp') is null
  and to_regclass('public.student_leaderboard') is null
  and to_regclass('public.reputation_scores') is null,
  'gamification creates no mutable person score or leaderboard table'
);
select is(
  (select count(*) from public.game_badges where visibility = 'private'),
  (select count(*) from public.game_badges),
  'all game badges are private by contract'
);

select is(
  (
    select count(*)
    from public.mission_game_rewards mgr
    join public.missions m on m.id = mgr.mission_id
    where m.slug in ('ai-detektiv-over-odpoved','rozpocet-pod-tlakem','phishing-pod-lupou')
  ),
  3::bigint,
  'all three pilot school quests have explicit game rewards'
);

select ok(
  (select bool_and(xp_reward > 0 and xp_reward <= 500) from public.mission_game_rewards),
  'XP rewards stay bounded game metadata'
);

set local role authenticated;
set local request.jwt.claim.sub = '00000000-0000-4000-8000-000000000001';

select throws_ok(
  $$insert into public.mission_game_rewards (mission_id, xp_reward)
    select id, 999 from public.missions limit 1$$,
  null::text, null::text,
  'ordinary authenticated users cannot manufacture XP rewards'
);

select throws_ok(
  $$update public.game_badges set title = 'Můj titul' where badge_key = 'ai-verifier'$$,
  null::text, null::text,
  'ordinary authenticated users cannot relabel badges'
);

select * from finish();
rollback;
