begin;

-- Project Core M4 adds project catalog, mission links and participation on top
-- of the existing identity + mission execution architecture. It deliberately
-- does NOT create project-specific mission runs, evidence or portfolio tables.

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  blueprint_key text unique,
  slug text not null unique check (slug ~ '^[a-z0-9][a-z0-9-]*$'),
  title text not null,
  summary text,
  program_id text not null,
  status text not null default 'prototype'
    check (status in ('prototype', 'active', 'paused', 'completed', 'archived')),
  model_only boolean not null default false,
  participation_policy text not null default 'open'
    check (participation_policy in ('open', 'invite_only', 'closed')),
  location_policy text not null default 'none'
    check (location_policy in ('none', 'coarse_only')),
  documentation_mode text not null default 'optional'
    check (documentation_mode in ('optional', 'guided')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_missions (
  project_id uuid not null references public.projects(id) on delete cascade,
  mission_id uuid not null references public.missions(id) on delete restrict,
  ordinal smallint not null default 1 check (ordinal > 0),
  created_at timestamptz not null default now(),
  primary key (project_id, mission_id),
  unique (project_id, ordinal)
);

create table if not exists public.project_impact_dimensions (
  project_id uuid not null references public.projects(id) on delete cascade,
  dimension text not null check (
    dimension in (
      'knowledge',
      'skills',
      'well_being',
      'family',
      'community',
      'nature',
      'entrepreneurship',
      'intergenerational_connection'
    )
  ),
  created_at timestamptz not null default now(),
  primary key (project_id, dimension)
);

create table if not exists public.project_participations (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete restrict,
  user_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete restrict,
  participation_mode text not null default 'individual'
    check (participation_mode in ('individual', 'team')),
  status text not null default 'joined'
    check (status in ('joined', 'left')),
  joined_at timestamptz not null default now(),
  left_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (project_id, user_id),
  constraint project_participations_context_check check (
    (participation_mode = 'individual' and organization_id is null)
    or (participation_mode = 'team' and organization_id is not null)
  ),
  constraint project_participations_left_at_check check (
    (status = 'joined' and left_at is null)
    or (status = 'left' and left_at is not null)
  )
);

create index if not exists projects_program_status_idx
  on public.projects(program_id, status);
create index if not exists project_missions_mission_id_idx
  on public.project_missions(mission_id);
create index if not exists project_participations_user_status_idx
  on public.project_participations(user_id, status);
create index if not exists project_participations_org_status_idx
  on public.project_participations(organization_id, status)
  where organization_id is not null;

-- Ensure the first canonical Green Hope mission exists locally without
-- overwriting any historically richer row that already owns the same slug.
insert into public.missions (
  slug,
  title,
  summary,
  program_id,
  path_ids,
  status,
  evidence_prompt,
  reflection_prompt,
  legacy_source,
  legacy_id
)
select
  'vypestuj-prvni-rostlinu',
  'Vypěstuj první rostlinu',
  'Vyber semeno nebo sazenici, pečuj o ni a sleduj, co potřebuje k růstu.',
  'green_hope',
  array['meaning']::text[],
  'published',
  'Volitelně zachyť poznámku, kresbu, fotografii nebo jiný vlastní výstup.',
  'Co rostlině pomáhalo, co nefungovalo a co příště uděláš jinak?',
  'pansofie-learning-core',
  'MISSION-GROW-001'
where not exists (
  select 1 from public.missions where slug = 'vypestuj-prvni-rostlinu'
);

insert into public.mission_learning_cycles (
  mission_id,
  development_level_min,
  development_level_max,
  difficulty,
  content_rating,
  supervision_requirement,
  learn_prompt,
  play_prompt,
  do_prompt,
  create_prompt,
  share_prompt,
  reflect_prompt
)
select
  m.id,
  1,
  4,
  1,
  'general',
  'recommended',
  'Zjisti, co rostlina potřebuje k růstu: světlo, vodu, živiny a čas.',
  'Vyber vhodné místo a porovnej, kde má rostlina nejlepší podmínky.',
  'Zasaď semeno nebo sazenici a pečuj o ni v průběhu růstu.',
  'Vytvoř jednoduchý záznam růstu pomocí poznámek, kresby nebo fotografie.',
  'Sdílej bezpečně výsledek s rodinou, týmem nebo skupinou, se kterou misi plníš.',
  'Popiš, co rostlině pomáhalo, co nefungovalo a co příště uděláš jinak.'
from public.missions m
where m.slug = 'vypestuj-prvni-rostlinu'
on conflict (mission_id) do nothing;

-- Seed the first model project as catalog data. Existing rows are preserved.
insert into public.projects (
  blueprint_key,
  slug,
  title,
  summary,
  program_id,
  status,
  model_only,
  participation_policy,
  location_policy,
  documentation_mode
)
select
  'PROJECT-GREEN-HOPE-GROW-001',
  'komunitni-zahrada',
  'Komunitní zahrada',
  'Modelový Green Hope projekt, který propojuje pěstování, učení a péči o konkrétní místo. Prvním krokem je vypěstovat vlastní rostlinu.',
  'green_hope',
  'prototype',
  true,
  'open',
  'coarse_only',
  'optional'
where not exists (
  select 1 from public.projects where slug = 'komunitni-zahrada'
);

insert into public.project_missions (project_id, mission_id, ordinal)
select p.id, m.id, 1
from public.projects p
join public.missions m on m.slug = 'vypestuj-prvni-rostlinu'
where p.slug = 'komunitni-zahrada'
on conflict (project_id, mission_id) do nothing;

insert into public.project_impact_dimensions (project_id, dimension)
select p.id, dimension
from public.projects p
cross join unnest(array['knowledge', 'skills', 'nature']::text[]) as dimension
where p.slug = 'komunitni-zahrada'
on conflict (project_id, dimension) do nothing;

-- Progress is derived from the canonical mission_runs table. No second project
-- progress ledger exists. security_invoker keeps the underlying RLS in force.
create or replace view public.user_project_progress
with (security_invoker = true)
as
select
  progress.project_id,
  progress.project_slug,
  progress.user_id,
  progress.total_missions,
  progress.completed_missions,
  (progress.total_missions > 0 and progress.completed_missions = progress.total_missions) as is_complete
from (
  select
    p.id as project_id,
    p.slug as project_slug,
    pp.user_id,
    count(distinct pm.mission_id)::integer as total_missions,
    count(distinct mr.mission_id)::integer as completed_missions
  from public.project_participations pp
  join public.projects p on p.id = pp.project_id
  left join public.project_missions pm on pm.project_id = p.id
  left join public.mission_runs mr
    on mr.mission_id = pm.mission_id
   and mr.user_id = pp.user_id
   and mr.status = 'completed'
  where pp.status = 'joined'
  group by p.id, p.slug, pp.user_id
) progress;

alter table public.projects enable row level security;
alter table public.project_missions enable row level security;
alter table public.project_impact_dimensions enable row level security;
alter table public.project_participations enable row level security;

drop trigger if exists projects_touch_updated_at on public.projects;
create trigger projects_touch_updated_at
  before update on public.projects
  for each row execute procedure public.pansofie_touch_updated_at();

drop trigger if exists project_participations_touch_updated_at on public.project_participations;
create trigger project_participations_touch_updated_at
  before update on public.project_participations
  for each row execute procedure public.pansofie_touch_updated_at();

drop policy if exists project_catalog_authenticated_read on public.projects;
create policy project_catalog_authenticated_read
  on public.projects
  for select to authenticated
  using (status in ('prototype', 'active', 'paused', 'completed'));

drop policy if exists project_missions_authenticated_read on public.project_missions;
create policy project_missions_authenticated_read
  on public.project_missions
  for select to authenticated
  using (
    exists (
      select 1
      from public.projects p
      where p.id = project_missions.project_id
        and p.status in ('prototype', 'active', 'paused', 'completed')
    )
  );

drop policy if exists project_impact_dimensions_authenticated_read on public.project_impact_dimensions;
create policy project_impact_dimensions_authenticated_read
  on public.project_impact_dimensions
  for select to authenticated
  using (
    exists (
      select 1
      from public.projects p
      where p.id = project_impact_dimensions.project_id
        and p.status in ('prototype', 'active', 'paused', 'completed')
    )
  );

drop policy if exists project_participations_owner_read on public.project_participations;
create policy project_participations_owner_read
  on public.project_participations
  for select to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists project_participations_owner_insert on public.project_participations;
create policy project_participations_owner_insert
  on public.project_participations
  for insert to authenticated
  with check (
    user_id = (select auth.uid())
    and status = 'joined'
    and left_at is null
    and exists (
      select 1
      from public.projects p
      where p.id = project_participations.project_id
        and p.status in ('prototype', 'active')
        and p.participation_policy = 'open'
    )
    and (
      (participation_mode = 'individual' and organization_id is null)
      or (
        participation_mode = 'team'
        and organization_id is not null
        and exists (
          select 1
          from public.organization_memberships om
          where om.organization_id = project_participations.organization_id
            and om.user_id = (select auth.uid())
            and om.status = 'active'
        )
      )
    )
  );

drop policy if exists project_participations_owner_update on public.project_participations;
create policy project_participations_owner_update
  on public.project_participations
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (
    user_id = (select auth.uid())
    and exists (
      select 1
      from public.projects p
      where p.id = project_participations.project_id
        and p.status in ('prototype', 'active', 'paused', 'completed')
    )
    and (
      (participation_mode = 'individual' and organization_id is null)
      or (
        participation_mode = 'team'
        and organization_id is not null
        and exists (
          select 1
          from public.organization_memberships om
          where om.organization_id = project_participations.organization_id
            and om.user_id = (select auth.uid())
            and om.status = 'active'
        )
      )
    )
  );

revoke all privileges on table public.projects from public, anon, authenticated;
revoke all privileges on table public.project_missions from public, anon, authenticated;
revoke all privileges on table public.project_impact_dimensions from public, anon, authenticated;
revoke all privileges on table public.project_participations from public, anon, authenticated;
revoke all privileges on table public.user_project_progress from public, anon, authenticated;

grant select on public.projects to authenticated;
grant select on public.project_missions to authenticated;
grant select on public.project_impact_dimensions to authenticated;
grant select, insert on public.project_participations to authenticated;
grant update (organization_id, participation_mode, status, left_at)
  on public.project_participations to authenticated;
grant select on public.user_project_progress to authenticated;

comment on table public.projects is 'Canonical PANSOFIE project catalog. Project execution reuses missions, evidence, experiences and portfolio.';
comment on table public.project_missions is 'Ordered links from a project to canonical missions; no duplicate mission execution state.';
comment on table public.project_participations is 'User participation in a project. Team context reuses existing organization membership.';
comment on view public.user_project_progress is 'Project progress derived from canonical completed mission_runs under security_invoker RLS.';

commit;
