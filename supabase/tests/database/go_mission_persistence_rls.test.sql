begin;

create extension if not exists pgtap with schema extensions;
select plan(13);

insert into auth.users (id, email) values
  ('81111111-1111-4111-8111-111111111111', 'go-owner@pansofie.test'),
  ('82222222-2222-4222-8222-222222222222', 'go-other@pansofie.test')
on conflict (id) do nothing;

insert into public.missions (slug, title, program_id, path_ids, status)
values ('go-rls-other-mission', 'Other mission', 'pansofie', array['mind']::text[], 'published')
on conflict (slug) do nothing;

set local role authenticated;
set local request.jwt.claim.sub = '81111111-1111-4111-8111-111111111111';

select lives_ok(
  $$insert into public.mission_runs (mission_id, user_id, status, started_at, completed_at)
    select id, '81111111-1111-4111-8111-111111111111', 'completed', now(), now()
    from public.missions where slug = 'vypestuj-prvni-rostlinu'$$,
  'owner can persist a completed canonical mission run'
);

select lives_ok(
  $$insert into public.experiences (id, run_id, mission_id, user_id, title, path_ids, program_id)
    select '8aaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', r.id, r.mission_id, r.user_id, m.title, m.path_ids, m.program_id
    from public.mission_runs r join public.missions m on m.id = r.mission_id
    where r.user_id = '81111111-1111-4111-8111-111111111111'
      and m.slug = 'vypestuj-prvni-rostlinu'
    order by r.updated_at desc limit 1$$,
  'owner can materialize an experience only from their completed run'
);

select lives_ok(
  $$insert into public.portfolio_items (id, experience_id, user_id, title, visibility)
    select '8bbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', id, user_id, title, 'private' from public.experiences
    where user_id = '81111111-1111-4111-8111-111111111111' order by occurred_at desc limit 1$$,
  'owner can create a private portfolio item from their experience'
);

select lives_ok(
  $$insert into public.experience_evidence (run_id, owner_id, kind, description, metadata)
    select id, user_id, 'note', 'first note', '{"source":"go_optional_note"}'::jsonb
    from public.mission_runs where user_id = '81111111-1111-4111-8111-111111111111'
    order by updated_at desc limit 1$$,
  'owner can add optional evidence to their run'
);

select lives_ok(
  $$update public.experience_evidence set description = 'updated note'
    where owner_id = '81111111-1111-4111-8111-111111111111'$$,
  'owner can update optional evidence on their run'
);

select lives_ok(
  $$insert into public.experience_reflections (run_id, user_id, what_learned)
    select id, user_id, 'first reflection' from public.mission_runs
    where user_id = '81111111-1111-4111-8111-111111111111'
    order by updated_at desc limit 1$$,
  'owner can add an optional reflection to their run'
);

select lives_ok(
  $$update public.experience_reflections set what_learned = 'updated reflection'
    where user_id = '81111111-1111-4111-8111-111111111111'$$,
  'owner can update their optional reflection'
);

select throws_ok(
  $$insert into public.experiences (run_id, mission_id, user_id, title)
    select r.id, m.id, '81111111-1111-4111-8111-111111111111', 'mismatch'
    from public.mission_runs r cross join public.missions m
    where r.user_id = '81111111-1111-4111-8111-111111111111'
      and m.slug = 'go-rls-other-mission'
    order by r.updated_at desc limit 1$$,
  null::text, null::text,
  'owner cannot materialize an experience with a mission different from the run'
);

set local request.jwt.claim.sub = '82222222-2222-4222-8222-222222222222';

select results_eq(
  'select count(*) from public.experiences', array[0::bigint],
  'other user cannot read owner experiences'
);
select results_eq(
  'select count(*) from public.portfolio_items', array[0::bigint],
  'other user cannot read owner portfolio'
);
select results_eq(
  'select count(*) from public.experience_evidence', array[0::bigint],
  'other user cannot read owner evidence'
);
select results_eq(
  'select count(*) from public.experience_reflections', array[0::bigint],
  'other user cannot read owner reflections'
);

select throws_ok(
  $$insert into public.portfolio_items (experience_id, user_id, title, visibility)
    values ('8aaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', '82222222-2222-4222-8222-222222222222', 'stolen', 'private')$$,
  null::text, null::text,
  'other user cannot attach a portfolio item to an experience they do not own'
);

select * from finish();
rollback;
