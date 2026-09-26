begin;

-- Minimal school read model for GO UX.
-- Staff may see class display names and mission-run status only inside governed classes.

create or replace function public.get_school_class_roster(target_class_id uuid)
returns table (
  user_id uuid,
  display_name text,
  class_role text,
  joined_at timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    scm.user_id,
    coalesce(nullif(p.display_name, ''), nullif(p.full_name, ''), 'Člen třídy') as display_name,
    scm.role as class_role,
    scm.joined_at
  from public.school_class_memberships scm
  join public.school_classes sc on sc.id = scm.class_id
  join public.organization_memberships om
    on om.organization_id = sc.school_id
   and om.user_id = scm.user_id
   and om.role = scm.role
   and om.status = 'active'
  left join public.profiles p on p.id = scm.user_id
  where scm.class_id = target_class_id
    and scm.status = 'active'
    and sc.status = 'active'
    and (
      public.is_admin()
      or public.is_school_class_coordinator(target_class_id)
      or public.is_school_class_staff(target_class_id)
    )
  order by
    case scm.role when 'teacher' then 0 when 'mentor' then 1 else 2 end,
    lower(coalesce(nullif(p.display_name, ''), nullif(p.full_name, ''), 'Člen třídy'));
$$;

create or replace function public.get_school_class_assignment_progress(target_class_id uuid)
returns table (
  assignment_id uuid,
  mission_id uuid,
  mission_title text,
  user_id uuid,
  display_name text,
  run_status text,
  started_at timestamptz,
  completed_at timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    sma.id as assignment_id,
    sma.mission_id,
    m.title as mission_title,
    sar.user_id,
    coalesce(nullif(p.display_name, ''), nullif(p.full_name, ''), 'Student') as display_name,
    mr.status as run_status,
    mr.started_at,
    mr.completed_at
  from public.school_mission_assignments sma
  join public.school_mission_assignment_runs sar on sar.assignment_id = sma.id
  join public.mission_runs mr on mr.id = sar.mission_run_id
  join public.missions m on m.id = sma.mission_id
  left join public.profiles p on p.id = sar.user_id
  where sma.class_id = target_class_id
    and sma.status = 'active'
    and (
      public.is_admin()
      or public.is_school_class_coordinator(target_class_id)
      or public.is_school_class_staff(target_class_id)
    )
  order by sma.created_at desc, lower(coalesce(nullif(p.display_name, ''), nullif(p.full_name, ''), 'Student'));
$$;

revoke execute on function public.get_school_class_roster(uuid) from public, anon;
revoke execute on function public.get_school_class_assignment_progress(uuid) from public, anon;
grant execute on function public.get_school_class_roster(uuid) to authenticated;
grant execute on function public.get_school_class_assignment_progress(uuid) to authenticated;

comment on function public.get_school_class_roster(uuid) is
  'Returns minimal class membership identity for authorized school staff only.';
comment on function public.get_school_class_assignment_progress(uuid) is
  'Returns minimal canonical mission-run progress for authorized school staff only.';

commit;
