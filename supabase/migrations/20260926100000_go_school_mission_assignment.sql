begin;

-- GO School Mission Assignment is a thin school orchestration layer over the
-- canonical missions + mission_runs engine. It never duplicates mission state.

alter table public.school_classes
  add constraint school_classes_id_school_unique unique (id, school_id);

create table public.school_mission_assignments (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.organizations(id) on delete restrict,
  class_id uuid not null,
  mission_id uuid not null references public.missions(id) on delete restrict,
  scope text not null check (scope in ('class', 'learner')),
  target_user_id uuid references auth.users(id) on delete restrict,
  status text not null default 'active' check (status in ('active', 'cancelled')),
  available_from timestamptz not null default now(),
  due_at timestamptz,
  assigned_by uuid not null references auth.users(id) on delete restrict,
  cancelled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (class_id, school_id)
    references public.school_classes(id, school_id) on delete restrict,
  constraint school_mission_assignments_target_scope_check check (
    (scope = 'class' and target_user_id is null)
    or (scope = 'learner' and target_user_id is not null)
  ),
  constraint school_mission_assignments_schedule_check check (
    due_at is null or due_at > available_from
  ),
  constraint school_mission_assignments_cancelled_at_check check (
    (status = 'active' and cancelled_at is null)
    or (status = 'cancelled' and cancelled_at is not null)
  )
);

create table public.school_mission_assignment_runs (
  assignment_id uuid not null references public.school_mission_assignments(id) on delete restrict,
  user_id uuid not null references auth.users(id) on delete cascade,
  mission_run_id uuid not null references public.mission_runs(id) on delete restrict,
  created_at timestamptz not null default now(),
  primary key (assignment_id, user_id)
);

create unique index school_mission_assignments_active_class_unique
  on public.school_mission_assignments(class_id, mission_id)
  where status = 'active' and scope = 'class';
create unique index school_mission_assignments_active_learner_unique
  on public.school_mission_assignments(class_id, mission_id, target_user_id)
  where status = 'active' and scope = 'learner';

create index school_mission_assignments_school_status_idx
  on public.school_mission_assignments(school_id, status, created_at desc);
create index school_mission_assignments_class_status_idx
  on public.school_mission_assignments(class_id, status, created_at desc);
create index school_mission_assignment_runs_user_idx
  on public.school_mission_assignment_runs(user_id, created_at desc);
create index school_mission_assignment_runs_run_idx
  on public.school_mission_assignment_runs(mission_run_id);

alter table public.school_mission_assignments enable row level security;
alter table public.school_mission_assignment_runs enable row level security;

drop trigger if exists school_mission_assignments_touch_updated_at
  on public.school_mission_assignments;
create trigger school_mission_assignments_touch_updated_at
  before update on public.school_mission_assignments
  for each row execute procedure public.pansofie_touch_updated_at();

create or replace function public.can_assign_school_mission(target_class_id uuid)
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
    where sc.id = target_class_id
      and sc.status = 'active'
      and o.organization_type = 'school'
      and o.status = 'active'
      and (
        public.is_admin()
        or public.is_school_class_coordinator(sc.id)
        or public.is_school_class_staff(sc.id)
      )
  );
$$;

create or replace function public.can_view_school_mission_assignment(
  target_assignment_id uuid
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.school_mission_assignments sma
    where sma.id = target_assignment_id
      and (
        public.is_admin()
        or public.is_school_class_coordinator(sma.class_id)
        or public.is_school_class_staff(sma.class_id)
        or sma.target_user_id = (select auth.uid())
        or (
          sma.scope = 'class'
          and public.is_school_class_member(sma.class_id)
        )
      )
  );
$$;

revoke execute on function public.can_assign_school_mission(uuid)
  from public, anon;
revoke execute on function public.can_view_school_mission_assignment(uuid)
  from public, anon;
grant execute on function public.can_assign_school_mission(uuid)
  to authenticated;
grant execute on function public.can_view_school_mission_assignment(uuid)
  to authenticated;

create or replace function public.assign_school_mission(
  target_class_id uuid,
  target_mission_id uuid,
  target_learner_id uuid default null,
  target_available_from timestamptz default now(),
  target_due_at timestamptz default null
)
returns table (
  assignment_id uuid,
  assigned_count integer,
  reused_run_count integer
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor_id uuid := auth.uid();
  resolved_school_id uuid;
  resolved_scope text;
  new_assignment_id uuid;
  learner_id uuid;
  resolved_run_id uuid;
  created_run boolean;
  total_assigned integer := 0;
  total_reused integer := 0;
begin
  if actor_id is null then
    raise exception 'Přihlášení je povinné.';
  end if;

  if not public.can_assign_school_mission(target_class_id) then
    raise exception 'Nemáš oprávnění zadávat mise této třídě.';
  end if;

  select sc.school_id
    into resolved_school_id
  from public.school_classes sc
  where sc.id = target_class_id
    and sc.status = 'active';
  if not exists (
    select 1
    from public.missions m
    where m.id = target_mission_id
      and m.status = 'published'
  ) then
    raise exception 'Mise není dostupná pro školní zadání.';
  end if;

  if target_due_at is not null
     and target_due_at <= target_available_from then
    raise exception 'Termín musí být později než dostupnost zadání.';
  end if;

  resolved_scope := case
    when target_learner_id is null then 'class'
    else 'learner'
  end;

  if target_learner_id is not null and not exists (
    select 1
    from public.school_class_memberships scm
    join public.organization_memberships om
      on om.organization_id = resolved_school_id
     and om.user_id = scm.user_id
     and om.role = 'learner'
     and om.status = 'active'
    where scm.class_id = target_class_id
      and scm.user_id = target_learner_id
      and scm.role = 'learner'
      and scm.status = 'active'
  ) then
    raise exception 'Student není aktivním learnerem této třídy.';
  end if;

  if exists (
    select 1
    from public.school_mission_assignments sma
    where sma.class_id = target_class_id
      and sma.mission_id = target_mission_id
      and sma.status = 'active'
      and (
        target_learner_id is null
        or sma.scope = 'class'
        or sma.target_user_id = target_learner_id
      )
  ) then
    raise exception 'Pro tento cíl už existuje aktivní zadání stejné mise.';
  end if;

  insert into public.school_mission_assignments (
    school_id,
    class_id,
    mission_id,
    scope,
    target_user_id,
    available_from,
    due_at,
    assigned_by
  ) values (
    resolved_school_id,
    target_class_id,
    target_mission_id,
    resolved_scope,
    target_learner_id,
    target_available_from,
    target_due_at,
    actor_id
  )
  returning id into new_assignment_id;

  for learner_id in
    select scm.user_id
    from public.school_class_memberships scm
    join public.organization_memberships om
      on om.organization_id = resolved_school_id
     and om.user_id = scm.user_id
     and om.role = 'learner'
     and om.status = 'active'
    where scm.class_id = target_class_id
      and scm.role = 'learner'
      and scm.status = 'active'
      and (target_learner_id is null or scm.user_id = target_learner_id)
  loop
    resolved_run_id := null;
    created_run := false;

    select mr.id
      into resolved_run_id
    from public.mission_runs mr
    where mr.mission_id = target_mission_id
      and mr.user_id = learner_id
      and mr.status <> 'cancelled'
    order by mr.updated_at desc
    limit 1;

    if resolved_run_id is null then
      insert into public.mission_runs (
        mission_id,
        user_id,
        status
      ) values (
        target_mission_id,
        learner_id,
        'assigned'
      )
      returning id into resolved_run_id;
      created_run := true;
    end if;

    insert into public.school_mission_assignment_runs (
      assignment_id,
      user_id,
      mission_run_id
    ) values (
      new_assignment_id,
      learner_id,
      resolved_run_id
    );
    total_assigned := total_assigned + 1;
    if not created_run then
      total_reused := total_reused + 1;
    end if;
  end loop;

  if total_assigned = 0 then
    raise exception 'Třída nemá aktivního studenta pro toto zadání.';
  end if;

  return query
  select new_assignment_id, total_assigned, total_reused;
end;
$$;

create or replace function public.cancel_school_mission_assignment(
  target_assignment_id uuid
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  target_class_id uuid;
begin
  if auth.uid() is null then
    raise exception 'Přihlášení je povinné.';
  end if;

  select sma.class_id
    into target_class_id
  from public.school_mission_assignments sma
  where sma.id = target_assignment_id
    and sma.status = 'active';
  if target_class_id is null then
    return false;
  end if;

  if not public.can_assign_school_mission(target_class_id) then
    raise exception 'Nemáš oprávnění zrušit toto zadání.';
  end if;

  update public.school_mission_assignments
  set status = 'cancelled',
      cancelled_at = now()
  where id = target_assignment_id
    and status = 'active';

  return found;
end;
$$;

revoke execute on function public.assign_school_mission(
  uuid, uuid, uuid, timestamptz, timestamptz
) from public, anon;
revoke execute on function public.cancel_school_mission_assignment(uuid)
  from public, anon;
grant execute on function public.assign_school_mission(
  uuid, uuid, uuid, timestamptz, timestamptz
) to authenticated;
grant execute on function public.cancel_school_mission_assignment(uuid)
  to authenticated;

drop policy if exists school_mission_assignments_read_scoped
  on public.school_mission_assignments;
create policy school_mission_assignments_read_scoped
  on public.school_mission_assignments
  for select to authenticated
  using (public.can_view_school_mission_assignment(id));

drop policy if exists school_mission_assignment_runs_read_scoped
  on public.school_mission_assignment_runs;
create policy school_mission_assignment_runs_read_scoped
  on public.school_mission_assignment_runs
  for select to authenticated
  using (
    user_id = (select auth.uid())
    or public.is_admin()
    or exists (
      select 1
      from public.school_mission_assignments sma
      where sma.id = school_mission_assignment_runs.assignment_id
        and (
          public.is_school_class_coordinator(sma.class_id)
          or public.is_school_class_staff(sma.class_id)
        )
    )
  );

revoke all privileges on table public.school_mission_assignments
  from public, anon, authenticated;
revoke all privileges on table public.school_mission_assignment_runs
  from public, anon, authenticated;

grant select on public.school_mission_assignments to authenticated;
grant select on public.school_mission_assignment_runs to authenticated;

comment on table public.school_mission_assignments is
  'School assignment intent over canonical missions. Mutation is RPC-only.';
comment on table public.school_mission_assignment_runs is
  'Audit link from school assignments to canonical learner mission_runs.';
comment on function public.assign_school_mission(uuid, uuid, uuid, timestamptz, timestamptz) is
  'Assigns a published canonical mission to one learner or every active learner in a governed class.';
comment on function public.cancel_school_mission_assignment(uuid) is
  'Cancels school assignment intent without deleting or cancelling canonical learner work.';

commit;
