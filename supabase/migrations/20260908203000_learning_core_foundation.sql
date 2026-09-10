begin;

-- Learning Core V1 extends the canonical PANSOFIE execution chain already
-- present in the live backend:
--   missions -> mission_runs -> experience_evidence -> experiences -> portfolio_items
-- It deliberately does NOT create a second mission, participation, evidence,
-- or portfolio subsystem.

create table if not exists public.learning_domains (
  id text primary key,
  ordinal smallint not null unique check (ordinal between 1 and 16),
  label_cs text not null,
  label_en text not null,
  description_cs text,
  description_en text,
  created_at timestamptz not null default now()
);

insert into public.learning_domains (id, ordinal, label_cs, label_en)
values
  ('self', 1, 'Já', 'Self'),
  ('body', 2, 'Tělo', 'Body'),
  ('mind', 3, 'Mysl', 'Mind'),
  ('emotions', 4, 'Emoce', 'Emotions'),
  ('relationships', 5, 'Vztahy', 'Relationships'),
  ('family', 6, 'Rodina', 'Family'),
  ('society', 7, 'Společnost', 'Society'),
  ('nature', 8, 'Příroda', 'Nature'),
  ('technology', 9, 'Technologie', 'Technology'),
  ('finance', 10, 'Finance', 'Finance'),
  ('work', 11, 'Práce', 'Work'),
  ('creation', 12, 'Tvorba', 'Creation'),
  ('culture', 13, 'Kultura', 'Culture'),
  ('ethics', 14, 'Etika', 'Ethics'),
  ('citizenship', 15, 'Občanství', 'Citizenship'),
  ('meaning', 16, 'Smysl života', 'Meaning of life')
on conflict (id) do update
set ordinal = excluded.ordinal,
    label_cs = excluded.label_cs,
    label_en = excluded.label_en;

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  code text not null unique check (code ~ '^[a-z0-9][a-z0-9_-]*$'),
  domain_id text not null references public.learning_domains(id) on delete restrict,
  title_cs text not null,
  title_en text not null,
  description_cs text,
  description_en text,
  status text not null default 'draft' check (status in ('draft', 'active', 'retired')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists skills_domain_id_idx on public.skills(domain_id);
create index if not exists skills_status_idx on public.skills(status);

-- Pedagogical metadata is one-to-one with the existing canonical mission.
-- Legacy age_min/age_max columns remain untouched for backward compatibility;
-- new suitability logic uses development level, difficulty, content rating,
-- and supervision instead.
create table if not exists public.mission_learning_cycles (
  mission_id uuid primary key references public.missions(id) on delete cascade,
  development_level_min smallint not null default 1 check (development_level_min between 1 and 10),
  development_level_max smallint not null default 10 check (development_level_max between 1 and 10),
  difficulty smallint not null default 1 check (difficulty between 1 and 5),
  content_rating text not null default 'general' check (content_rating in ('general', 'guided', 'mature')),
  supervision_requirement text not null default 'none' check (supervision_requirement in ('none', 'recommended', 'required')),
  learn_prompt text not null,
  play_prompt text not null,
  do_prompt text not null,
  create_prompt text not null,
  share_prompt text not null,
  reflect_prompt text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint mission_learning_cycles_level_order_check
    check (development_level_min <= development_level_max)
);

create table if not exists public.mission_skills (
  mission_id uuid not null references public.missions(id) on delete cascade,
  skill_id uuid not null references public.skills(id) on delete restrict,
  contribution_weight numeric(4,3) not null default 1
    check (contribution_weight > 0 and contribution_weight <= 1),
  primary key (mission_id, skill_id)
);

create index if not exists mission_skills_skill_id_idx on public.mission_skills(skill_id);

-- A skill attestation always points at evidence from the existing canonical
-- experience_evidence table. V1 exposes only self-attestation to ordinary
-- authenticated clients; guardian/mentor/teacher/system flows stay governed.
create table if not exists public.skill_attestations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  skill_id uuid not null references public.skills(id) on delete restrict,
  evidence_id uuid not null references public.experience_evidence(id) on delete cascade,
  level smallint not null check (level between 1 and 5),
  attestation_type text not null
    check (attestation_type in ('self', 'guardian', 'mentor', 'teacher', 'system')),
  attested_by uuid references auth.users(id) on delete set null,
  note text,
  created_at timestamptz not null default now(),
  unique (user_id, skill_id, evidence_id, attestation_type)
);

create index if not exists skill_attestations_user_id_idx on public.skill_attestations(user_id);
create index if not exists skill_attestations_skill_id_idx on public.skill_attestations(skill_id);
create index if not exists skill_attestations_evidence_id_idx on public.skill_attestations(evidence_id);

-- Impact stays multidimensional. There is intentionally no aggregate human
-- score, reputation score, XP rank, or leaderboard.
create table if not exists public.impact_observations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete cascade,
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
  metric_key text not null check (metric_key ~ '^[a-z0-9][a-z0-9_.-]*$'),
  value_numeric numeric,
  unit text,
  evidence_id uuid references public.experience_evidence(id) on delete set null,
  occurred_at timestamptz not null default now(),
  recorded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  constraint impact_observations_subject_check
    check (user_id is not null or organization_id is not null)
);

create index if not exists impact_observations_user_id_idx on public.impact_observations(user_id);
create index if not exists impact_observations_organization_id_idx on public.impact_observations(organization_id);
create index if not exists impact_observations_dimension_idx on public.impact_observations(dimension);
create index if not exists impact_observations_evidence_id_idx on public.impact_observations(evidence_id);

create or replace view public.user_skill_evidence_summary
with (security_invoker = true)
as
select
  user_id,
  skill_id,
  count(*)::integer as evidence_count,
  max(level)::smallint as demonstrated_level,
  max(created_at) as last_demonstrated_at
from public.skill_attestations
group by user_id, skill_id;

alter table public.learning_domains enable row level security;
alter table public.skills enable row level security;
alter table public.mission_learning_cycles enable row level security;
alter table public.mission_skills enable row level security;
alter table public.skill_attestations enable row level security;
alter table public.impact_observations enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'learning_domains'
      and policyname = 'learning_domains_authenticated_read'
  ) then
    create policy learning_domains_authenticated_read
      on public.learning_domains
      for select to authenticated
      using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'skills'
      and policyname = 'skills_authenticated_read'
  ) then
    create policy skills_authenticated_read
      on public.skills
      for select to authenticated
      using (status = 'active');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'mission_learning_cycles'
      and policyname = 'mission_learning_cycles_published_read'
  ) then
    create policy mission_learning_cycles_published_read
      on public.mission_learning_cycles
      for select to authenticated
      using (
        exists (
          select 1
          from public.missions m
          where m.id = mission_learning_cycles.mission_id
            and m.status = 'published'
        )
      );
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'mission_skills'
      and policyname = 'mission_skills_published_read'
  ) then
    create policy mission_skills_published_read
      on public.mission_skills
      for select to authenticated
      using (
        exists (
          select 1
          from public.missions m
          where m.id = mission_skills.mission_id
            and m.status = 'published'
        )
        and exists (
          select 1
          from public.skills s
          where s.id = mission_skills.skill_id
            and s.status = 'active'
        )
      );
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'skill_attestations'
      and policyname = 'skill_attestations_owner_read'
  ) then
    create policy skill_attestations_owner_read
      on public.skill_attestations
      for select to authenticated
      using (user_id = (select auth.uid()));
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'skill_attestations'
      and policyname = 'skill_attestations_self_insert'
  ) then
    create policy skill_attestations_self_insert
      on public.skill_attestations
      for insert to authenticated
      with check (
        user_id = (select auth.uid())
        and attested_by = (select auth.uid())
        and attestation_type = 'self'
        and exists (
          select 1
          from public.experience_evidence e
          join public.mission_runs r on r.id = e.run_id
          join public.mission_skills ms
            on ms.mission_id = r.mission_id
           and ms.skill_id = skill_attestations.skill_id
          where e.id = skill_attestations.evidence_id
            and e.owner_id = (select auth.uid())
            and r.user_id = (select auth.uid())
        )
      );
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'impact_observations'
      and policyname = 'impact_observations_owner_read'
  ) then
    create policy impact_observations_owner_read
      on public.impact_observations
      for select to authenticated
      using (user_id = (select auth.uid()));
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'impact_observations'
      and policyname = 'impact_observations_owner_insert'
  ) then
    create policy impact_observations_owner_insert
      on public.impact_observations
      for insert to authenticated
      with check (
        user_id = (select auth.uid())
        and recorded_by = (select auth.uid())
        and (
          organization_id is null
          or exists (
            select 1
            from public.organization_memberships om
            where om.organization_id = impact_observations.organization_id
              and om.user_id = (select auth.uid())
              and om.status = 'active'
          )
        )
        and (
          evidence_id is null
          or exists (
            select 1
            from public.experience_evidence e
            join public.mission_runs r on r.id = e.run_id
            where e.id = impact_observations.evidence_id
              and e.owner_id = (select auth.uid())
              and r.user_id = (select auth.uid())
          )
        )
      );
  end if;
end
$$;

grant select on public.learning_domains to authenticated;
grant select on public.skills to authenticated;
grant select on public.mission_learning_cycles to authenticated;
grant select on public.mission_skills to authenticated;
grant select, insert on public.skill_attestations to authenticated;
grant select, insert on public.impact_observations to authenticated;
grant select on public.user_skill_evidence_summary to authenticated;

commit;
