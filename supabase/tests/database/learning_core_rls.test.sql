begin;

create extension if not exists pgtap with schema extensions;

select plan(14);

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
        'mission_definitions',
        'mission_skills',
        'mission_participations',
        'evidence_items',
        'skill_attestations',
        'impact_observations'
      ])
  ),
  'RLS is enabled on every Learning Core table'
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
  case
    when to_regprocedure('public.pansofie_materialize_mission_version(uuid)') is null then true
    else not has_function_privilege(
      'authenticated',
      'public.pansofie_materialize_mission_version(uuid)',
      'EXECUTE'
    )
  end,
  'legacy mission-version helper is absent or not directly executable by authenticated users'
);

insert into auth.users (id, email) values
  ('11111111-1111-4111-8111-111111111111', 'adult@pansofie.test'),
  ('22222222-2222-4222-8222-222222222222', 'child@pansofie.test'),
  ('33333333-3333-4333-8333-333333333333', 'unrelated@pansofie.test')
on conflict (id) do nothing;

insert into public.profiles (id, full_name, display_name, date_of_birth, account_context) values
  ('11111111-1111-4111-8111-111111111111', 'Adult Test', 'Adult', '1990-01-01', 'personal'),
  ('22222222-2222-4222-8222-222222222222', 'Child Test', 'Child', '2015-01-01', 'young'),
  ('33333333-3333-4333-8333-333333333333', 'Unrelated Test', 'Unrelated', '1995-01-01', 'personal')
on conflict (id) do nothing;

insert into public.organizations (id, slug, name, organization_type, status, created_by)
values (
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  'pansofie-test-family',
  'Pansofie Test Family',
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

insert into public.mission_definitions (
  id,
  slug,
  program,
  title_cs,
  title_en,
  learn_prompt,
  play_prompt,
  do_prompt,
  create_prompt,
  share_prompt,
  reflect_prompt,
  status
)
values (
  'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
  'local-rls-test',
  'pansofie',
  'Lokální RLS test',
  'Local RLS test',
  'learn',
  'play',
  'do',
  'create',
  'share',
  'reflect',
  'active'
)
on conflict (id) do nothing;

insert into public.mission_participations (id, mission_id, user_id, status) values
  (
    'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
    'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    '11111111-1111-4111-8111-111111111111',
    'accepted'
  ),
  (
    'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
    'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    '22222222-2222-4222-8222-222222222222',
    'accepted'
  )
on conflict (id) do nothing;

insert into public.evidence_items (
  id,
  participation_id,
  submitted_by,
  kind,
  text_content
)
values (
  'ffffffff-ffff-4fff-8fff-ffffffffffff',
  'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
  '22222222-2222-4222-8222-222222222222',
  'reflection',
  'child-owned evidence'
)
on conflict (id) do nothing;

set local role authenticated;
set local request.jwt.claim.sub = '11111111-1111-4111-8111-111111111111';

select results_eq(
  'select count(*) from public.mission_participations',
  array[1::bigint],
  'adult sees only their own mission participation'
);

set local request.jwt.claim.sub = '22222222-2222-4222-8222-222222222222';

select results_eq(
  'select count(*) from public.mission_participations',
  array[1::bigint],
  'child sees only their own mission participation'
);

set local request.jwt.claim.sub = '33333333-3333-4333-8333-333333333333';

select results_eq(
  'select count(*) from public.mission_participations',
  array[0::bigint],
  'unrelated user cannot see another users participation'
);

set local request.jwt.claim.sub = '11111111-1111-4111-8111-111111111111';

select lives_ok(
  $$
    insert into public.mission_participations (
      mission_id,
      user_id,
      organization_id,
      status
    ) values (
      'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      '11111111-1111-4111-8111-111111111111',
      'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      'accepted'
    )
  $$,
  'active organization member can create an organization-scoped participation'
);

set local request.jwt.claim.sub = '33333333-3333-4333-8333-333333333333';

select throws_ok(
  $$
    insert into public.mission_participations (
      mission_id,
      user_id,
      organization_id,
      status
    ) values (
      'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      '33333333-3333-4333-8333-333333333333',
      'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      'accepted'
    )
  $$,
  null::text,
  null::text,
  'non-member cannot create an organization-scoped participation'
);

set local request.jwt.claim.sub = '22222222-2222-4222-8222-222222222222';

select results_eq(
  'select count(*) from public.evidence_items',
  array[1::bigint],
  'child can read their own evidence'
);

set local request.jwt.claim.sub = '11111111-1111-4111-8111-111111111111';

select results_eq(
  'select count(*) from public.evidence_items',
  array[0::bigint],
  'adult without a relationship cannot read child evidence'
);

set local request.jwt.claim.sub = '33333333-3333-4333-8333-333333333333';

select results_eq(
  'select count(*) from public.evidence_items',
  array[0::bigint],
  'unrelated user cannot read child evidence'
);

select * from finish();
rollback;
