begin;

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
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists skills_domain_id_idx on public.skills(domain_id);
create index if not exists skills_status_idx on public.skills(status);

create table if not exists public.mission_definitions (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9][a-z0-9_-]*$'),
  program text not null default 'pansofie' check (program in ('pansofie', 'pansofiego', 'green_hope', 'urban_family_farm')),
  title_cs text not null,
  title_en text not null,
  summary_cs text,
  summary_en text,
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
  status text not null default 'draft' check (status in ('draft', 'active', 'retired')),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint mission_development_level_order_check check (development_level_min <= development_level_max)
);

create index if not exists mission_definitions_program_idx on public.mission_definitions(program);
create index if not exists mission_definitions_status_idx on public.mission_definitions(status);

create table if not exists public.mission_skills (
  mission_id uuid not null references public.mission_definitions(id) on delete cascade,
  skill_id uuid not null references public.skills(id) on delete restrict,
  contribution_weight numeric(4,3) not null default 1 check (contribution_weight > 0 and contribution_weight <= 1),
  primary key (mission_id, skill_id)
);

create table if not exists public.mission_participations (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references public.mission_definitions(id) on delete restrict,
  user_id uuid not null references public.profiles(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete set null,
  status text not null default 'accepted' check (status in ('accepted', 'in_progress', 'submitted', 'completed', 'cancelled')),
  accepted_at timestamptz not null default now(),
  started_at timestamptz,
  submitted_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists mission_participations_user_id_idx on public.mission_participations(user_id);
create index if not exists mission_participations_organization_id_idx on public.mission_participations(organization_id);
create index if not exists mission_participations_status_idx on public.mission_participations(status);

create table if not exists public.evidence_items (
  id uuid primary key default gen_random_uuid(),
  participation_id uuid not null references public.mission_participations(id) on delete cascade,
  submitted_by uuid not null references public.profiles(id) on delete cascade,
  kind text not null check (kind in ('reflection', 'photo', 'file', 'link', 'guardian_confirmation', 'mentor_confirmation', 'project_output')),
  text_content text,
  storage_path text,
  external_url text,
  metadata jsonb not null default '{}'::jsonb,
  visibility text not null default 'private' check (visibility in ('private', 'team')),
  review_status text not null default 'pending' check (review_status in ('pending', 'accepted', 'rejected', 'not_required')),
  reviewed_by uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists evidence_items_participation_id_idx on public.evidence_items(participation_id);
create index if not exists evidence_items_submitted_by_idx on public.evidence_items(submitted_by);

create table if not exists public.skill_attestations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  skill_id uuid not null references public.skills(id) on delete restrict,
  evidence_id uuid not null references public.evidence_items(id) on delete cascade,
  level smallint not null check (level between 1 and 5),
  attestation_type text not null check (attestation_type in ('self', 'guardian', 'mentor', 'teacher', 'system')),
  attested_by uuid references public.profiles(id) on delete set null,
  note text,
  created_at timestamptz not null default now()
);

create index if not exists skill_attestations_user_id_idx on public.skill_attestations(user_id);
create index if not exists skill_attestations_skill_id_idx on public.skill_attestations(skill_id);

create table if not exists public.impact_observations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete cascade,
  dimension text not null check (dimension in ('knowledge', 'skills', 'well_being', 'family', 'community', 'nature', 'entrepreneurship', 'intergenerational_connection')),
  metric_key text not null check (metric_key ~ '^[a-z0-9][a-z0-9_.-]*$'),
  value_numeric numeric,
  unit text,
  evidence_id uuid references public.evidence_items(id) on delete set null,
  occurred_at timestamptz not null default now(),
  recorded_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  constraint impact_observations_subject_check check (user_id is not null or organization_id is not null)
);

create index if not exists impact_observations_user_id_idx on public.impact_observations(user_id);
create index if not exists impact_observations_organization_id_idx on public.impact_observations(organization_id);
create index if not exists impact_observations_dimension_idx on public.impact_observations(dimension);

create or replace view public.user_skill_portfolio
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
alter table public.mission_definitions enable row level security;
alter table public.mission_skills enable row level security;
alter table public.mission_participations enable row level security;
alter table public.evidence_items enable row level security;
alter table public.skill_attestations enable row level security;
alter table public.impact_observations enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'learning_domains' and policyname = 'learning_domains_authenticated_read') then
    create policy learning_domains_authenticated_read on public.learning_domains for select to authenticated using (true);
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'skills' and policyname = 'skills_authenticated_read') then
    create policy skills_authenticated_read on public.skills for select to authenticated using (status = 'active' or created_by = (select auth.uid()));
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'skills' and policyname = 'skills_creator_insert') then
    create policy skills_creator_insert on public.skills for insert to authenticated with check (created_by = (select auth.uid()));
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'skills' and policyname = 'skills_creator_update') then
    create policy skills_creator_update on public.skills for update to authenticated using (created_by = (select auth.uid())) with check (created_by = (select auth.uid()));
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'mission_definitions' and policyname = 'mission_definitions_authenticated_read') then
    create policy mission_definitions_authenticated_read on public.mission_definitions for select to authenticated using (status = 'active' or created_by = (select auth.uid()));
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'mission_definitions' and policyname = 'mission_definitions_creator_insert') then
    create policy mission_definitions_creator_insert on public.mission_definitions for insert to authenticated with check (created_by = (select auth.uid()));
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'mission_definitions' and policyname = 'mission_definitions_creator_update') then
    create policy mission_definitions_creator_update on public.mission_definitions for update to authenticated using (created_by = (select auth.uid())) with check (created_by = (select auth.uid()));
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'mission_skills' and policyname = 'mission_skills_authenticated_read') then
    create policy mission_skills_authenticated_read on public.mission_skills for select to authenticated using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'mission_skills' and policyname = 'mission_skills_creator_write') then
    create policy mission_skills_creator_write on public.mission_skills for all to authenticated
      using (exists (select 1 from public.mission_definitions m where m.id = mission_id and m.created_by = (select auth.uid())))
      with check (exists (select 1 from public.mission_definitions m where m.id = mission_id and m.created_by = (select auth.uid())));
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'mission_participations' and policyname = 'mission_participations_owner_read') then
    create policy mission_participations_owner_read on public.mission_participations for select to authenticated using (user_id = (select auth.uid()));
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'mission_participations' and policyname = 'mission_participations_owner_insert') then
    create policy mission_participations_owner_insert on public.mission_participations for insert to authenticated with check (user_id = (select auth.uid()));
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'mission_participations' and policyname = 'mission_participations_owner_update') then
    create policy mission_participations_owner_update on public.mission_participations for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'evidence_items' and policyname = 'evidence_items_owner_read') then
    create policy evidence_items_owner_read on public.evidence_items for select to authenticated
      using (submitted_by = (select auth.uid()) or exists (select 1 from public.mission_participations p where p.id = participation_id and p.user_id = (select auth.uid())));
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'evidence_items' and policyname = 'evidence_items_owner_insert') then
    create policy evidence_items_owner_insert on public.evidence_items for insert to authenticated
      with check (submitted_by = (select auth.uid()) and exists (select 1 from public.mission_participations p where p.id = participation_id and p.user_id = (select auth.uid())));
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'evidence_items' and policyname = 'evidence_items_owner_update') then
    create policy evidence_items_owner_update on public.evidence_items for update to authenticated
      using (submitted_by = (select auth.uid())) with check (submitted_by = (select auth.uid()));
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'skill_attestations' and policyname = 'skill_attestations_owner_read') then
    create policy skill_attestations_owner_read on public.skill_attestations for select to authenticated using (user_id = (select auth.uid()));
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'skill_attestations' and policyname = 'skill_attestations_self_insert') then
    create policy skill_attestations_self_insert on public.skill_attestations for insert to authenticated
      with check (user_id = (select auth.uid()) and attested_by = (select auth.uid()) and attestation_type = 'self');
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'impact_observations' and policyname = 'impact_observations_owner_read') then
    create policy impact_observations_owner_read on public.impact_observations for select to authenticated using (user_id = (select auth.uid()));
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'impact_observations' and policyname = 'impact_observations_owner_insert') then
    create policy impact_observations_owner_insert on public.impact_observations for insert to authenticated
      with check (user_id = (select auth.uid()) and recorded_by = (select auth.uid()));
  end if;
end
$$;

grant select on public.learning_domains to authenticated;
grant select, insert, update on public.skills to authenticated;
grant select, insert, update on public.mission_definitions to authenticated;
grant select, insert, update, delete on public.mission_skills to authenticated;
grant select, insert, update on public.mission_participations to authenticated;
grant select, insert, update on public.evidence_items to authenticated;
grant select, insert on public.skill_attestations to authenticated;
grant select, insert on public.impact_observations to authenticated;
grant select on public.user_skill_portfolio to authenticated;

commit;
