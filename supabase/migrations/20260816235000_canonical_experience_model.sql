-- PANSOFIE R0.1 canonical experience model
--
-- NON-DESTRUCTIVE migration:
-- - does not alter/drop profiles or user_roles
-- - does not rewrite existing auth data
-- - creates new canonical tables alongside the existing auth foundation
-- - includes legacy_source/legacy_id fields for later controlled imports

create extension if not exists pgcrypto;

create table if not exists public.missions (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text,
  why text,
  program_id text,
  lab_id text,
  path_ids text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  age_min smallint check (age_min is null or age_min >= 0),
  age_max smallint check (age_max is null or age_max >= 0),
  estimated_minutes integer check (estimated_minutes is null or estimated_minutes > 0),
  evidence_prompt text,
  reflection_prompt text,
  transfer_prompt text,
  contribution_prompt text,
  safety_notes text,
  curriculum_mapping jsonb not null default '{}'::jsonb,
  teacher_load jsonb not null default '{}'::jsonb,
  legacy_source text,
  legacy_id text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (legacy_source, legacy_id)
);

create table if not exists public.mission_runs (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references public.missions(id) on delete restrict,
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'assigned' check (status in ('assigned', 'in_progress', 'submitted', 'completed', 'cancelled')),
  started_at timestamptz,
  submitted_at timestamptz,
  completed_at timestamptz,
  legacy_source text,
  legacy_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.experience_evidence (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null references public.mission_runs(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  kind text not null default 'note' check (kind in ('note', 'photo', 'video', 'document', 'link', 'artifact', 'verification')),
  uri text,
  description text,
  metadata jsonb not null default '{}'::jsonb,
  legacy_source text,
  legacy_id text,
  created_at timestamptz not null default now()
);

create table if not exists public.experience_reflections (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null unique references public.mission_runs(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  what_happened text,
  what_worked text,
  what_failed text,
  what_learned text,
  transfer text,
  contribution text,
  legacy_source text,
  legacy_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null unique references public.mission_runs(id) on delete restrict,
  mission_id uuid not null references public.missions(id) on delete restrict,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  path_ids text[] not null default '{}',
  program_id text,
  lab_id text,
  impact_summary text,
  occurred_at timestamptz not null default now(),
  legacy_source text,
  legacy_id text,
  created_at timestamptz not null default now(),
  unique (legacy_source, legacy_id)
);

create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  experience_id uuid not null unique references public.experiences(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  summary text,
  visibility text not null default 'private' check (visibility in ('private', 'school', 'public')),
  verified_by uuid references auth.users(id) on delete set null,
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists missions_status_idx on public.missions(status);
create index if not exists mission_runs_user_status_idx on public.mission_runs(user_id, status);
create index if not exists mission_runs_mission_idx on public.mission_runs(mission_id);
create index if not exists experience_evidence_run_idx on public.experience_evidence(run_id);
create index if not exists experiences_user_idx on public.experiences(user_id, occurred_at desc);
create index if not exists portfolio_items_user_idx on public.portfolio_items(user_id, created_at desc);

create or replace function public.pansofie_touch_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists missions_touch_updated_at on public.missions;
create trigger missions_touch_updated_at
  before update on public.missions
  for each row execute procedure public.pansofie_touch_updated_at();

drop trigger if exists mission_runs_touch_updated_at on public.mission_runs;
create trigger mission_runs_touch_updated_at
  before update on public.mission_runs
  for each row execute procedure public.pansofie_touch_updated_at();

drop trigger if exists experience_reflections_touch_updated_at on public.experience_reflections;
create trigger experience_reflections_touch_updated_at
  before update on public.experience_reflections
  for each row execute procedure public.pansofie_touch_updated_at();

drop trigger if exists portfolio_items_touch_updated_at on public.portfolio_items;
create trigger portfolio_items_touch_updated_at
  before update on public.portfolio_items
  for each row execute procedure public.pansofie_touch_updated_at();

alter table public.missions enable row level security;
alter table public.mission_runs enable row level security;
alter table public.experience_evidence enable row level security;
alter table public.experience_reflections enable row level security;
alter table public.experiences enable row level security;
alter table public.portfolio_items enable row level security;

-- Mission catalog: authenticated users can read published missions; admins can
-- read and manage all states. No browser client can self-promote to admin.
drop policy if exists "missions_select_published_or_admin" on public.missions;
create policy "missions_select_published_or_admin"
  on public.missions for select
  to authenticated
  using (status = 'published' or public.is_admin());

drop policy if exists "missions_insert_admin_only" on public.missions;
create policy "missions_insert_admin_only"
  on public.missions for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "missions_update_admin_only" on public.missions;
create policy "missions_update_admin_only"
  on public.missions for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "missions_delete_admin_only" on public.missions;
create policy "missions_delete_admin_only"
  on public.missions for delete
  to authenticated
  using (public.is_admin());

-- Runs remain private to the participant and admins in R0.1. School/guardian
-- delegation is intentionally NOT guessed here; it requires a dedicated
-- consent/organization model before access can be expanded.
drop policy if exists "mission_runs_select_own_or_admin" on public.mission_runs;
create policy "mission_runs_select_own_or_admin"
  on public.mission_runs for select
  to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists "mission_runs_insert_own_or_admin" on public.mission_runs;
create policy "mission_runs_insert_own_or_admin"
  on public.mission_runs for insert
  to authenticated
  with check (user_id = auth.uid() or public.is_admin());

drop policy if exists "mission_runs_update_own_or_admin" on public.mission_runs;
create policy "mission_runs_update_own_or_admin"
  on public.mission_runs for update
  to authenticated
  using (user_id = auth.uid() or public.is_admin())
  with check (user_id = auth.uid() or public.is_admin());

drop policy if exists "mission_runs_delete_admin_only" on public.mission_runs;
create policy "mission_runs_delete_admin_only"
  on public.mission_runs for delete
  to authenticated
  using (public.is_admin());

-- Evidence must belong to a run owned by the same participant. Admin can review.
drop policy if exists "evidence_select_own_or_admin" on public.experience_evidence;
create policy "evidence_select_own_or_admin"
  on public.experience_evidence for select
  to authenticated
  using (owner_id = auth.uid() or public.is_admin());

drop policy if exists "evidence_insert_own_run_or_admin" on public.experience_evidence;
create policy "evidence_insert_own_run_or_admin"
  on public.experience_evidence for insert
  to authenticated
  with check (
    public.is_admin()
    or (
      owner_id = auth.uid()
      and exists (
        select 1 from public.mission_runs r
        where r.id = run_id and r.user_id = auth.uid()
      )
    )
  );

drop policy if exists "evidence_delete_own_or_admin" on public.experience_evidence;
create policy "evidence_delete_own_or_admin"
  on public.experience_evidence for delete
  to authenticated
  using (owner_id = auth.uid() or public.is_admin());

-- Reflections are participant-owned. They are not public social content.
drop policy if exists "reflections_select_own_or_admin" on public.experience_reflections;
create policy "reflections_select_own_or_admin"
  on public.experience_reflections for select
  to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists "reflections_insert_own_run_or_admin" on public.experience_reflections;
create policy "reflections_insert_own_run_or_admin"
  on public.experience_reflections for insert
  to authenticated
  with check (
    public.is_admin()
    or (
      user_id = auth.uid()
      and exists (
        select 1 from public.mission_runs r
        where r.id = run_id and r.user_id = auth.uid()
      )
    )
  );

drop policy if exists "reflections_update_own_or_admin" on public.experience_reflections;
create policy "reflections_update_own_or_admin"
  on public.experience_reflections for update
  to authenticated
  using (user_id = auth.uid() or public.is_admin())
  with check (user_id = auth.uid() or public.is_admin());

-- Completed Experience records and Passport items are private by default.
-- A later school/guardian consent model may add carefully scoped access.
drop policy if exists "experiences_select_own_or_admin" on public.experiences;
create policy "experiences_select_own_or_admin"
  on public.experiences for select
  to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists "experiences_insert_own_or_admin" on public.experiences;
create policy "experiences_insert_own_or_admin"
  on public.experiences for insert
  to authenticated
  with check (user_id = auth.uid() or public.is_admin());

drop policy if exists "experiences_update_admin_only" on public.experiences;
create policy "experiences_update_admin_only"
  on public.experiences for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "portfolio_select_own_or_admin" on public.portfolio_items;
create policy "portfolio_select_own_or_admin"
  on public.portfolio_items for select
  to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists "portfolio_insert_own_or_admin" on public.portfolio_items;
create policy "portfolio_insert_own_or_admin"
  on public.portfolio_items for insert
  to authenticated
  with check (user_id = auth.uid() or public.is_admin());

drop policy if exists "portfolio_update_own_or_admin" on public.portfolio_items;
create policy "portfolio_update_own_or_admin"
  on public.portfolio_items for update
  to authenticated
  using (user_id = auth.uid() or public.is_admin())
  with check (user_id = auth.uid() or public.is_admin());

drop policy if exists "portfolio_delete_own_or_admin" on public.portfolio_items;
create policy "portfolio_delete_own_or_admin"
  on public.portfolio_items for delete
  to authenticated
  using (user_id = auth.uid() or public.is_admin());

comment on table public.missions is 'Canonical PANSOFIE mission catalog. Legacy imports retain legacy_source/legacy_id.';
comment on table public.mission_runs is 'Participant-specific mission execution state; auth foundation remains unchanged.';
comment on table public.experience_evidence is 'Evidence attached to real-world mission execution; private to participant/admin in R0.1.';
comment on table public.experience_reflections is 'Reflection that turns activity into a documented learning Experience.';
comment on table public.experiences is 'Completed real-world Experience records. A person is never represented by one aggregate score.';
comment on table public.portfolio_items is 'Experience Passport entries; private by default and not a popularity/social profile.';
