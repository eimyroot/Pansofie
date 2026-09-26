begin;

create extension if not exists pgtap with schema extensions;
select plan(12);

insert into auth.users (id, email) values
  ('77777777-7777-4777-8777-777777777771', 'm84-owner@pansofie.test'),
  ('77777777-7777-4777-8777-777777777772', 'm84-other@pansofie.test')
on conflict (id) do nothing;

select is(
  (select domain_id from public.skills where code = 'ecological_thinking'),
  'nature',
  'canonical ecological thinking skill is active in nature domain'
);

select results_eq(
  $$select count(*) from public.mission_skills ms
    join public.missions m on m.id = ms.mission_id
    join public.skills s on s.id = ms.skill_id
    where m.slug = 'vypestuj-prvni-rostlinu' and s.code = 'ecological_thinking'$$,
  array[1::bigint],
  'Grow mission maps to ecological thinking exactly once'
);

insert into public.mission_runs (id, mission_id, user_id, status, started_at, completed_at)
select '77777777-7777-4777-8777-777777777781', m.id,
  '77777777-7777-4777-8777-777777777771', 'completed', now() - interval '1 day', now()
from public.missions m where m.slug = 'vypestuj-prvni-rostlinu'
on conflict (id) do nothing;

insert into public.mission_runs (id, mission_id, user_id, status, started_at)
select '77777777-7777-4777-8777-777777777782', m.id,
  '77777777-7777-4777-8777-777777777772', 'in_progress', now()
from public.missions m where m.slug = 'vypestuj-prvni-rostlinu'
on conflict (id) do nothing;

insert into public.experience_evidence (id, run_id, owner_id, kind, description, metadata) values
  ('77777777-7777-4777-8777-777777777791', '77777777-7777-4777-8777-777777777781', '77777777-7777-4777-8777-777777777771', 'note', 'Rostlina reagovala lépe na více světla.', '{"source":"go_optional_note"}'::jsonb),
  ('77777777-7777-4777-8777-777777777792', '77777777-7777-4777-8777-777777777782', '77777777-7777-4777-8777-777777777772', 'note', 'Rozpracované pozorování.', '{"source":"go_optional_note"}'::jsonb)
on conflict (id) do nothing;

set local role authenticated;
set local request.jwt.claim.sub = '77777777-7777-4777-8777-777777777771';

select lives_ok(
  $$insert into public.skill_attestations (user_id, skill_id, evidence_id, level, attestation_type, attested_by)
    select '77777777-7777-4777-8777-777777777771', s.id,
      '77777777-7777-4777-8777-777777777791', 1, 'self', '77777777-7777-4777-8777-777777777771'
    from public.skills s where s.code = 'ecological_thinking'$$,
  'owner can self-attest ecological thinking from owned completed Grow evidence'
);

select throws_ok(
  $$insert into public.skill_attestations (user_id, skill_id, evidence_id, level, attestation_type, attested_by)
    select '77777777-7777-4777-8777-777777777771', s.id,
      '77777777-7777-4777-8777-777777777792', 1, 'self', '77777777-7777-4777-8777-777777777771'
    from public.skills s where s.code = 'ecological_thinking'$$,
  null::text, null::text,
  'owner cannot attest from another users in-progress evidence'
);

set local request.jwt.claim.sub = '77777777-7777-4777-8777-777777777772';
select throws_ok(
  $$insert into public.skill_attestations (user_id, skill_id, evidence_id, level, attestation_type, attested_by)
    select '77777777-7777-4777-8777-777777777772', s.id,
      '77777777-7777-4777-8777-777777777792', 1, 'self', '77777777-7777-4777-8777-777777777772'
    from public.skills s where s.code = 'ecological_thinking'$$,
  null::text, null::text,
  'in-progress evidence cannot create a skill attestation'
);

set local request.jwt.claim.sub = '77777777-7777-4777-8777-777777777771';
select lives_ok(
  $$insert into public.impact_observations (user_id, dimension, metric_key, value_numeric, unit, evidence_id, recorded_by)
    values ('77777777-7777-4777-8777-777777777771', 'nature', 'grow.documented_observation', 1,
      'documented_observation', '77777777-7777-4777-8777-777777777791', '77777777-7777-4777-8777-777777777771')$$,
  'owner can record one evidence-backed nature observation from completed Grow evidence'
);

select throws_ok(
  $$insert into public.impact_observations (user_id, dimension, metric_key, value_numeric, unit, recorded_by)
    values ('77777777-7777-4777-8777-777777777771', 'nature', 'grow.no_evidence', 1,
      'documented_observation', '77777777-7777-4777-8777-777777777771')$$,
  null::text, null::text,
  'ordinary impact insert cannot omit evidence'
);

set local request.jwt.claim.sub = '77777777-7777-4777-8777-777777777772';
select throws_ok(
  $$insert into public.impact_observations (user_id, dimension, metric_key, value_numeric, unit, evidence_id, recorded_by)
    values ('77777777-7777-4777-8777-777777777772', 'nature', 'grow.in_progress', 1,
      'documented_observation', '77777777-7777-4777-8777-777777777792', '77777777-7777-4777-8777-777777777772')$$,
  null::text, null::text,
  'in-progress evidence cannot create an impact observation'
);

set local request.jwt.claim.sub = '77777777-7777-4777-8777-777777777771';
select throws_ok(
  $$insert into public.impact_observations (user_id, dimension, metric_key, value_numeric, unit, evidence_id, recorded_by)
    values ('77777777-7777-4777-8777-777777777771', 'nature', 'grow.documented_observation', 1,
      'documented_observation', '77777777-7777-4777-8777-777777777791', '77777777-7777-4777-8777-777777777771')$$,
  null::text, null::text,
  'same evidence cannot create duplicate nature observation'
);

select results_eq(
  'select count(*) from public.skill_attestations where user_id = ''77777777-7777-4777-8777-777777777771''',
  array[1::bigint],
  'owner sees exactly one evidence-backed skill attestation'
);

select results_eq(
  'select count(*) from public.impact_observations where user_id = ''77777777-7777-4777-8777-777777777771''',
  array[1::bigint],
  'owner sees exactly one evidence-backed impact observation'
);

set local request.jwt.claim.sub = '77777777-7777-4777-8777-777777777772';
select results_eq(
  $$select (
      (select count(*) from public.skill_attestations where user_id = '77777777-7777-4777-8777-777777777771')
      +
      (select count(*) from public.impact_observations where user_id = '77777777-7777-4777-8777-777777777771')
    )$$,
  array[0::bigint],
  'other user cannot read another users skill or impact proof'
);

select * from finish();
rollback;
