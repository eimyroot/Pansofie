begin;

create extension if not exists pgtap with schema extensions;

select plan(17);

select is(
  (select count(*)::integer from public.learning_domains),
  16,
  'all 16 PANSOFIE learning domains are seeded'
);

select ok(
  (
    select bool_and(c.relrowsecurity)
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public'
      and c.relname = any(array[
        'learning_domains',
        'skills',
        'mission_learning_cycles',
        'mission_skills',
        'skill_attestations',
        'impact_observations'
      ])
  ),
  'RLS is enabled on every Learning Core table'
);

select ok(
  to_regclass('public.mission_definitions') is null
  and to_regclass('public.mission_participations') is null
  and to_regclass('public.evidence_items') is null,
  'Learning Core does not create a parallel mission/execution/evidence engine'
);

select ok(
  not has_function_privilege(
    'anon',
    'public.complete_onboarding(text,text,text,date)',
    'EXECUTE'
  ),
  'anon cannot execute complete_onboarding'
);

select ok(
  has_function_privilege(
    'authenticated',
    'public.complete_onboarding(text,text,text,date)',
    'EXECUTE'
  ),
  'authenticated can execute complete_onboarding'
);

select ok(
  case
    when to_regprocedure('public.pansofie_materialize_mission_version(uuid)') is null then true
    else not has_function_privilege(
      'anon',
      'public.pansofie_materialize_mission_version(uuid)',
      'EXECUTE'
    )
  end,
  'legacy mission-version helper is absent or not executable by anon'
);

select ok(
  not has_function_privilege('anon', 'public.is_admin()', 'EXECUTE'),
  'restored baseline admin predicate is not executable by anon'
);

insert into auth.users (id, email) values
  ('11111111-1111-4111-8111-111111111111', 'adult@pansofie.test'),
  ('22222222-2222-4222-8222-222222222222', 'child@pansofie.test'),
  ('33333333-3333-4333-8333-333333333333', 'unrelated@pansofie.test')
on conflict (id) do nothing;

update public.profiles
set display_name = case id
      when '11111111-1111-4111-8111-111111111111' then 'Adult'
      when '22222222-2222-4222-8222-222222222222' then 'Child'
      else 'Unrelated'
    end,
    date_of_birth = case id
      when '11111111-1111-4111-8111-111111111111' then date '1990-01-01'
      when '22222222-2222-4222-8222-222222222222' then date '2015-01-01'
      else date '1995-01-01'
    end,
    account_context = case id
      when '22222222-2222-4222-8222-222222222222' then 'young'
      else 'personal'
    end
where id in (
  '11111111-1111-4111-8111-111111111111',
  '22222222-2222-4222-8222-222222222222',
  '33333333-3333-4333-8333-333333333333'
);

insert into public.organizations (id, slug, name, organization_type, status, created_by)
values (
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  'pansofie-test-community',
  'Pansofie Test Community',
  'community',
  'active',
  '11111111-1111-4111-8111-111111111111'
)
on conflict (id) do nothing;

insert into public.organization_memberships (
  id,
  organization_id,
  user_id,
  role,
  status,
  joined_at,
  created_by
)
values (
  'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  '11111111-1111-4111-8111-111111111111',
  'coordinator',
  'active',
  now(),
  '11111111-1111-4111-8111-111111111111'
)
on conflict (organization_id, user_id, role) do nothing;

insert into public.missions (
  id,
  slug,
  title,
  summary,
  program_id,
  status,
  created_by
)
values (
  'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
  'local-learning-core-test',
  'Local Learning Core Test',
  'Canonical mission used by local RLS tests',
  'pansofie',
  'published',
  '11111111-1111-4111-8111-111111111111'
)
on conflict (id) do nothing;

insert into public.mission_learning_cycles (
  mission_id,
  development_level_min,
  development_level_max,
  difficulty,
  learn_prompt,
  play_prompt,
  do_prompt,
  create_prompt,
  share_prompt,
  reflect_prompt
)
values (
  'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
  2,
  4,
  2,
  'learn',
  'play',
  'do',
  'create',
  'share',
  'reflect'
)
on conflict (mission_id) do nothing;

insert into public.skills (
  id,
  code,
  domain_id,
  title_cs,
  title_en,
  status,
  created_by
)
values (
  '44444444-4444-4444-8444-444444444444',
  'local_observation',
  'mind',
  'Pozorování',
  'Observation',
  'active',
  '11111111-1111-4111-8111-111111111111'
)
on conflict (id) do nothing;

insert into public.mission_skills (mission_id, skill_id, contribution_weight)
values (
  'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
  '44444444-4444-4444-8444-444444444444',
  1
)
on conflict (mission_id, skill_id) do nothing;

insert into public.mission_runs (id, mission_id, user_id, status) values
  (
    'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
    'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    '11111111-1111-4111-8111-111111111111',
    'in_progress'
  ),
  (
    'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
    'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    '22222222-2222-4222-8222-222222222222',
    'in_progress'
  )
on conflict (id) do nothing;

insert into public.experience_evidence (id, run_id, owner_id, kind, description) values
  (
    '55555555-5555-4555-8555-555555555555',
    'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
    '11111111-1111-4111-8111-111111111111',
    'note',
    'adult-owned evidence'
  ),
  (
    'ffffffff-ffff-4fff-8fff-ffffffffffff',
    'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
    '22222222-2222-4222-8222-222222222222',
    'note',
    'child-owned evidence'
  )
on conflict (id) do nothing;

set local role authenticated;
set local request.jwt.claim.sub = '11111111-1111-4111-8111-111111111111';

select results_eq(
  'select count(*) from public.mission_runs',
  array[1::bigint],
  'adult sees only their own canonical mission run'
);

set local request.jwt.claim.sub = '22222222-2222-4222-8222-222222222222';

select results_eq(
  'select count(*) from public.mission_runs',
  array[1::bigint],
  'child sees only their own canonical mission run'
);

set local request.jwt.claim.sub = '33333333-3333-4333-8333-333333333333';

select results_eq(
  'select count(*) from public.mission_runs',
  array[0::bigint],
  'unrelated user cannot see another users canonical mission run'
);

set local request.jwt.claim.sub = '22222222-2222-4222-8222-222222222222';

select results_eq(
  'select count(*) from public.experience_evidence',
  array[1::bigint],
  'child can read their own canonical evidence'
);

select lives_ok(
  $$
    insert into public.skill_attestations (
      user_id,
      skill_id,
      evidence_id,
      level,
      attestation_type,
      attested_by
    ) values (
      '22222222-2222-4222-8222-222222222222',
      '44444444-4444-4444-8444-444444444444',
      'ffffffff-ffff-4fff-8fff-ffffffffffff',
      2,
      'self',
      '22222222-2222-4222-8222-222222222222'
    )
  $$,
  'child can self-attest a skill with owned evidence mapped to the run mission'
);

select results_eq(
  'select count(*) from public.user_skill_evidence_summary',
  array[1::bigint],
  'child skill evidence summary contains their own attestation'
);

set local request.jwt.claim.sub = '11111111-1111-4111-8111-111111111111';

select results_eq(
  'select count(*) from public.experience_evidence where owner_id = ''22222222-2222-4222-8222-222222222222''',
  array[0::bigint],
  'adult without a governed reviewer relationship cannot read child evidence'
);

select lives_ok(
  $$
    insert into public.impact_observations (
      user_id,
      organization_id,
      dimension,
      metric_key,
      value_numeric,
      unit,
      evidence_id,
      recorded_by
    ) values (
      '11111111-1111-4111-8111-111111111111',
      'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      'knowledge',
      'local.test',
      1,
      'observation',
      '55555555-5555-4555-8555-555555555555',
      '11111111-1111-4111-8111-111111111111'
    )
  $$,
  'active organization member can record their own evidence-backed impact observation'
);

set local request.jwt.claim.sub = '33333333-3333-4333-8333-333333333333';

select throws_ok(
  $$
    insert into public.impact_observations (
      user_id,
      organization_id,
      dimension,
      metric_key,
      value_numeric,
      recorded_by
    ) values (
      '33333333-3333-4333-8333-333333333333',
      'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      'knowledge',
      'local.test.denied',
      1,
      '33333333-3333-4333-8333-333333333333'
    )
  $$,
  null::text,
  null::text,
  'non-member cannot create an organization-scoped impact observation'
);

select results_eq(
  'select count(*) from public.skill_attestations',
  array[0::bigint],
  'unrelated user cannot see child skill attestations'
);

select * from finish();
rollback;
