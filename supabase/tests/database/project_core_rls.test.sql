begin;

create extension if not exists pgtap with schema extensions;

select plan(22);

select is(
  (select count(*)::integer from public.projects where slug = 'komunitni-zahrada'),
  1,
  'canonical model project is seeded exactly once'
);

select is(
  (
    select count(*)::integer
    from public.project_missions pm
    join public.projects p on p.id = pm.project_id
    join public.missions m on m.id = pm.mission_id
    where p.slug = 'komunitni-zahrada'
      and m.slug = 'vypestuj-prvni-rostlinu'
  ),
  1,
  'project links to the canonical grow mission'
);

select is(
  (
    select count(*)::integer
    from public.project_impact_dimensions pid
    join public.projects p on p.id = pid.project_id
    where p.slug = 'komunitni-zahrada'
  ),
  3,
  'model project exposes three independent impact dimensions'
);

select ok(
  to_regclass('public.project_mission_runs') is null
  and to_regclass('public.project_evidence') is null
  and to_regclass('public.project_portfolio_items') is null,
  'Project Core creates no parallel mission/evidence/portfolio execution subsystem'
);

select ok(
  (
    select bool_and(c.relrowsecurity)
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public'
      and c.relname = any(array[
        'projects',
        'project_missions',
        'project_impact_dimensions',
        'project_participations'
      ])
  ),
  'RLS is enabled on every Project Core table'
);

select ok(
  not has_table_privilege('anon', 'public.projects', 'SELECT'),
  'anon cannot read the persisted project catalog directly'
);

select ok(
  not has_table_privilege('anon', 'public.project_participations', 'SELECT')
  and not has_table_privilege('anon', 'public.project_participations', 'INSERT'),
  'anon has no direct project participation privileges'
);

insert into auth.users (id, email) values
  ('61111111-1111-4111-8111-111111111111', 'project-one@pansofie.test'),
  ('62222222-2222-4222-8222-222222222222', 'project-team@pansofie.test'),
  ('63333333-3333-4333-8333-333333333333', 'project-other@pansofie.test')
on conflict (id) do nothing;

update public.profiles
set display_name = case id
      when '61111111-1111-4111-8111-111111111111' then 'Project One'
      when '62222222-2222-4222-8222-222222222222' then 'Project Team'
      else 'Project Other'
    end,
    date_of_birth = date '1990-01-01',
    account_context = 'personal'
where id in (
  '61111111-1111-4111-8111-111111111111',
  '62222222-2222-4222-8222-222222222222',
  '63333333-3333-4333-8333-333333333333'
);

insert into public.organizations (id, slug, name, organization_type, status, created_by)
values (
  '6aaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  'project-core-team',
  'Project Core Team',
  'community',
  'active',
  '62222222-2222-4222-8222-222222222222'
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
  '6bbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
  '6aaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  '62222222-2222-4222-8222-222222222222',
  'coordinator',
  'active',
  now(),
  '62222222-2222-4222-8222-222222222222'
)
on conflict (organization_id, user_id, role) do nothing;

set local role authenticated;
set local request.jwt.claim.sub = '61111111-1111-4111-8111-111111111111';

select is(
  (select count(*)::integer from public.projects where slug = 'komunitni-zahrada'),
  1,
  'authenticated participant can read the visible model project'
);

select lives_ok(
  $$
    insert into public.project_participations (project_id, user_id, participation_mode)
    select id, '61111111-1111-4111-8111-111111111111', 'individual'
    from public.projects
    where slug = 'komunitni-zahrada'
  $$,
  'participant can join an open project as themselves'
);

select results_eq(
  'select count(*) from public.project_participations',
  array[1::bigint],
  'participant sees only their own project participation'
);

select is(
  (
    select completed_missions
    from public.user_project_progress
    where project_slug = 'komunitni-zahrada'
  ),
  0,
  'project progress starts at zero before canonical mission completion'
);

set local request.jwt.claim.sub = '63333333-3333-4333-8333-333333333333';

select results_eq(
  'select count(*) from public.project_participations',
  array[0::bigint],
  'unrelated user cannot read another participants project membership'
);

select throws_ok(
  $$
    insert into public.project_participations (project_id, user_id, participation_mode)
    select id, '61111111-1111-4111-8111-111111111111', 'individual'
    from public.projects
    where slug = 'komunitni-zahrada'
  $$,
  null::text,
  null::text,
  'user cannot create a participation for another user'
);

select throws_ok(
  $$
    insert into public.project_participations (
      project_id,
      user_id,
      organization_id,
      participation_mode
    )
    select
      id,
      '63333333-3333-4333-8333-333333333333',
      '6aaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      'team'
    from public.projects
    where slug = 'komunitni-zahrada'
  $$,
  null::text,
  null::text,
  'non-member cannot join a project in a team organization context'
);

set local request.jwt.claim.sub = '62222222-2222-4222-8222-222222222222';

select lives_ok(
  $$
    insert into public.project_participations (
      project_id,
      user_id,
      organization_id,
      participation_mode
    )
    select
      id,
      '62222222-2222-4222-8222-222222222222',
      '6aaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      'team'
    from public.projects
    where slug = 'komunitni-zahrada'
  $$,
  'active organization member can join the project in team mode'
);

set local request.jwt.claim.sub = '61111111-1111-4111-8111-111111111111';

select lives_ok(
  $$
    insert into public.mission_runs (mission_id, user_id, status, started_at, completed_at)
    select
      id,
      '61111111-1111-4111-8111-111111111111',
      'completed',
      now(),
      now()
    from public.missions
    where slug = 'vypestuj-prvni-rostlinu'
  $$,
  'participant completes the existing canonical mission run, not a project-specific run'
);

select is(
  (
    select total_missions
    from public.user_project_progress
    where project_slug = 'komunitni-zahrada'
  ),
  1,
  'project progress total is derived from linked canonical missions'
);

select is(
  (
    select completed_missions
    from public.user_project_progress
    where project_slug = 'komunitni-zahrada'
  ),
  1,
  'project progress completion is derived from canonical mission_runs'
);

select ok(
  (
    select is_complete
    from public.user_project_progress
    where project_slug = 'komunitni-zahrada'
  ),
  'project becomes complete when all linked canonical missions are complete'
);

set local request.jwt.claim.sub = '63333333-3333-4333-8333-333333333333';

select results_eq(
  'select count(*) from public.user_project_progress',
  array[0::bigint],
  'unrelated user cannot read another users derived project progress'
);

select ok(
  not has_table_privilege('authenticated', 'public.project_participations', 'DELETE'),
  'ordinary authenticated clients cannot hard-delete project participation history'
);

select ok(
  has_column_privilege('authenticated', 'public.project_participations', 'status', 'UPDATE')
  and not has_column_privilege('authenticated', 'public.project_participations', 'project_id', 'UPDATE')
  and not has_column_privilege('authenticated', 'public.project_participations', 'user_id', 'UPDATE'),
  'ordinary clients may update participation state but not immutable project or user identity'
);

select * from finish();
rollback;
