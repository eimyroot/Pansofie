begin;

-- GO School Foundation adds school/class scoping on top of the canonical
-- auth.users + organizations + organization_memberships identity model.
-- It deliberately does not create Student, Teacher or SchoolAdmin identities.

create table if not exists public.school_classes (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.organizations(id) on delete restrict,
  name text not null check (char_length(trim(name)) between 1 and 80),
  academic_year text not null check (academic_year ~ '^[0-9]{4}/[0-9]{4}$'),
  status text not null default 'active' check (status in ('active', 'archived')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (school_id, name, academic_year)
);

create table if not exists public.school_class_memberships (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.school_classes(id) on delete restrict,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('learner', 'teacher', 'mentor')),
  status text not null default 'active' check (status in ('active', 'ended')),
  joined_at timestamptz not null default now(),
  ended_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (class_id, user_id, role),
  constraint school_class_memberships_ended_at_check check (
    (status = 'active' and ended_at is null)
    or (status = 'ended' and ended_at is not null)
  )
);

create index if not exists school_classes_school_status_idx
  on public.school_classes(school_id, status);
create index if not exists school_class_memberships_user_status_idx
  on public.school_class_memberships(user_id, status);
create index if not exists school_class_memberships_class_status_idx
  on public.school_class_memberships(class_id, status);

alter table public.school_classes enable row level security;
alter table public.school_class_memberships enable row level security;

drop trigger if exists school_classes_touch_updated_at on public.school_classes;
create trigger school_classes_touch_updated_at
  before update on public.school_classes
  for each row execute procedure public.pansofie_touch_updated_at();

drop trigger if exists school_class_memberships_touch_updated_at on public.school_class_memberships;
create trigger school_class_memberships_touch_updated_at
  before update on public.school_class_memberships
  for each row execute procedure public.pansofie_touch_updated_at();

create or replace function public.is_school_coordinator(target_school_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select (select auth.uid()) is not null and exists (
    select 1
    from public.organizations o
    join public.organization_memberships om on om.organization_id = o.id
    where o.id = target_school_id
      and o.organization_type = 'school'
      and o.status = 'active'
      and om.user_id = (select auth.uid())
      and om.role = 'coordinator'
      and om.status = 'active'
  );
$$;

create or replace function public.is_school_class_coordinator(target_class_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.school_classes sc
    where sc.id = target_class_id
      and public.is_school_coordinator(sc.school_id)
  );
$$;

create or replace function public.is_school_class_member(target_class_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select (select auth.uid()) is not null and exists (
    select 1
    from public.school_class_memberships scm
    join public.school_classes sc on sc.id = scm.class_id
    join public.organizations o on o.id = sc.school_id
    join public.organization_memberships om
      on om.organization_id = sc.school_id
     and om.user_id = scm.user_id
     and om.role = scm.role
    where scm.class_id = target_class_id
      and scm.user_id = (select auth.uid())
      and scm.status = 'active'
      and om.status = 'active'
      and o.organization_type = 'school'
      and o.status = 'active'
  );
$$;

create or replace function public.is_school_class_staff(target_class_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select (select auth.uid()) is not null and exists (
    select 1
    from public.school_class_memberships scm
    join public.school_classes sc on sc.id = scm.class_id
    join public.organizations o on o.id = sc.school_id
    join public.organization_memberships om
      on om.organization_id = sc.school_id
     and om.user_id = scm.user_id
     and om.role = scm.role
    where scm.class_id = target_class_id
      and scm.user_id = (select auth.uid())
      and scm.role in ('teacher', 'mentor')
      and scm.status = 'active'
      and om.status = 'active'
      and o.organization_type = 'school'
      and o.status = 'active'
  );
$$;

create or replace function public.can_manage_school(target_school_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.organizations o
    where o.id = target_school_id
      and o.organization_type = 'school'
      and o.status = 'active'
  ) and (
    public.is_admin()
    or public.is_school_coordinator(target_school_id)
  );
$$;

create or replace function public.can_manage_school_class_member(
  target_class_id uuid,
  target_user_id uuid,
  target_role text
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.school_classes sc
    join public.organizations o on o.id = sc.school_id
    join public.organization_memberships target_membership
      on target_membership.organization_id = sc.school_id
     and target_membership.user_id = target_user_id
     and target_membership.role = target_role
     and target_membership.status = 'active'
    where sc.id = target_class_id
      and sc.status = 'active'
      and o.organization_type = 'school'
      and o.status = 'active'
      and target_role in ('learner', 'teacher', 'mentor')
      and (
        public.is_admin()
        or public.is_school_coordinator(sc.school_id)
        or (
          target_role = 'learner'
          and public.is_school_class_staff(sc.id)
        )
      )
  );
$$;

revoke execute on function public.is_school_coordinator(uuid) from public, anon;
revoke execute on function public.is_school_class_coordinator(uuid) from public, anon;
revoke execute on function public.is_school_class_member(uuid) from public, anon;
revoke execute on function public.is_school_class_staff(uuid) from public, anon;
revoke execute on function public.can_manage_school(uuid) from public, anon;
revoke execute on function public.can_manage_school_class_member(uuid, uuid, text) from public, anon;

grant execute on function public.is_school_coordinator(uuid) to authenticated;
grant execute on function public.is_school_class_coordinator(uuid) to authenticated;
grant execute on function public.is_school_class_member(uuid) to authenticated;
grant execute on function public.is_school_class_staff(uuid) to authenticated;
grant execute on function public.can_manage_school(uuid) to authenticated;
grant execute on function public.can_manage_school_class_member(uuid, uuid, text) to authenticated;

drop policy if exists school_classes_read_scoped on public.school_classes;
create policy school_classes_read_scoped
  on public.school_classes
  for select to authenticated
  using (
    public.is_admin()
    or public.is_school_coordinator(school_id)
    or public.is_school_class_member(id)
  );

drop policy if exists school_classes_insert_managed_school on public.school_classes;
create policy school_classes_insert_managed_school
  on public.school_classes
  for insert to authenticated
  with check (
    created_by = (select auth.uid())
    and public.can_manage_school(school_id)
  );

drop policy if exists school_classes_update_managed_school on public.school_classes;
create policy school_classes_update_managed_school
  on public.school_classes
  for update to authenticated
  using (public.can_manage_school(school_id))
  with check (public.can_manage_school(school_id));

drop policy if exists school_class_memberships_read_scoped on public.school_class_memberships;
create policy school_class_memberships_read_scoped
  on public.school_class_memberships
  for select to authenticated
  using (
    user_id = (select auth.uid())
    or public.is_admin()
    or public.is_school_class_coordinator(class_id)
    or public.is_school_class_staff(class_id)
  );

drop policy if exists school_class_memberships_insert_scoped on public.school_class_memberships;
create policy school_class_memberships_insert_scoped
  on public.school_class_memberships
  for insert to authenticated
  with check (
    created_by = (select auth.uid())
    and public.can_manage_school_class_member(class_id, user_id, role)
  );

drop policy if exists school_class_memberships_update_scoped on public.school_class_memberships;
create policy school_class_memberships_update_scoped
  on public.school_class_memberships
  for update to authenticated
  using (
    public.is_admin()
    or public.is_school_class_coordinator(class_id)
    or (role = 'learner' and public.is_school_class_staff(class_id))
  )
  with check (
    (
      status = 'ended'
      and (
        public.is_admin()
        or public.is_school_class_coordinator(class_id)
        or (role = 'learner' and public.is_school_class_staff(class_id))
      )
    )
    or (
      status = 'active'
      and public.can_manage_school_class_member(class_id, user_id, role)
    )
  );

revoke all privileges on table public.school_classes from public, anon, authenticated;
revoke all privileges on table public.school_class_memberships from public, anon, authenticated;

grant select on public.school_classes to authenticated;
grant insert (school_id, name, academic_year, status, created_by)
  on public.school_classes to authenticated;
grant update (name, status)
  on public.school_classes to authenticated;

grant select on public.school_class_memberships to authenticated;
grant insert (class_id, user_id, role, status, joined_at, ended_at, created_by)
  on public.school_class_memberships to authenticated;
grant update (status, ended_at)
  on public.school_class_memberships to authenticated;

comment on table public.school_classes is
  'School/class context for PansofieGO. Identity remains in auth.users and organization_memberships.';
comment on table public.school_class_memberships is
  'Class-scoped membership for existing school identities. Learners cannot enumerate peer memberships.';

commit;
