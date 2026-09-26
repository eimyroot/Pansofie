begin;

alter table public.school_mentor_usage_policy
  add column if not exists global_monthly_budget_micro_usd bigint
  not null default 25000000;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'school_mentor_usage_policy_monthly_budget_check'
      and conrelid = 'public.school_mentor_usage_policy'::regclass
  ) then
    alter table public.school_mentor_usage_policy
      add constraint school_mentor_usage_policy_monthly_budget_check
      check (global_monthly_budget_micro_usd > 0);
  end if;
end;
$$;

create or replace function public.reserve_school_mentor_usage(
  target_assignment_id uuid
)
returns table (
  subject_remaining integer,
  school_remaining integer,
  global_remaining_micro_usd bigint,
  request_budget_micro_usd bigint
)language plpgsql
security definer
set search_path = ''
as $$
declare
  actor_id uuid := auth.uid();
  resolved_school_id uuid;
  daily_subject_hash text;
  policy_row public.school_mentor_usage_policy%rowtype;
  subject_requests integer := 0;
  school_requests integer := 0;
  global_daily_budget bigint := 0;
  global_monthly_budget bigint := 0;
  month_start date := date_trunc('month', current_date)::date;
  next_month_start date := (date_trunc('month', current_date) + interval '1 month')::date;
begin
  if actor_id is null then
    raise exception 'authentication_required';
  end if;

  select sma.school_id
    into resolved_school_id
  from public.school_mission_assignments sma
  join public.school_mission_assignment_runs smar
    on smar.assignment_id = sma.id
   and smar.user_id = actor_id
  where sma.id = target_assignment_id
    and sma.status = 'active'
  limit 1;
  if resolved_school_id is null then
    raise exception 'mentor_assignment_not_owned';
  end if;

  if not exists (
    select 1
    from public.organization_memberships om
    where om.organization_id = resolved_school_id
      and om.user_id = actor_id
      and om.role = 'learner'
      and om.status = 'active'
  ) then
    raise exception 'mentor_learner_membership_required';
  end if;

  select * into policy_row
  from public.school_mentor_usage_policy
  where id = 1;

  if policy_row.id is null then
    raise exception 'mentor_usage_policy_missing';
  end if;

  daily_subject_hash := encode(
    extensions.digest(actor_id::text || ':' || current_date::text, 'sha256'),
    'hex'
  );

  perform pg_advisory_xact_lock(
    hashtextextended('pansofie-school-mentor:' || current_date::text, 0)
  );
  select coalesce(sum(usage.request_count), 0)::integer
    into school_requests
  from public.school_mentor_usage_daily usage
  where usage.school_id = resolved_school_id
    and usage.usage_date = current_date;

  select coalesce(sum(usage.budgeted_micro_usd), 0)::bigint
    into global_daily_budget
  from public.school_mentor_usage_daily usage
  where usage.usage_date = current_date;

  select coalesce(sum(usage.budgeted_micro_usd), 0)::bigint
    into global_monthly_budget
  from public.school_mentor_usage_daily usage
  where usage.usage_date >= month_start
    and usage.usage_date < next_month_start;

  select coalesce((
    select usage.request_count
    from public.school_mentor_usage_daily usage
    where usage.school_id = resolved_school_id
      and usage.usage_date = current_date
      and usage.subject_hash = daily_subject_hash
  ), 0)
    into subject_requests;

  if subject_requests >= policy_row.subject_daily_request_limit then
    raise exception 'mentor_subject_daily_limit';
  end if;

  if school_requests >= policy_row.school_daily_request_limit then
    raise exception 'mentor_school_daily_limit';
  end if;
  if global_daily_budget + policy_row.per_request_budget_micro_usd
      > policy_row.global_daily_budget_micro_usd then
    raise exception 'mentor_global_daily_budget';
  end if;

  if global_monthly_budget + policy_row.per_request_budget_micro_usd
      > policy_row.global_monthly_budget_micro_usd then
    raise exception 'mentor_global_monthly_budget';
  end if;

  insert into public.school_mentor_usage_daily (
    school_id, usage_date, subject_hash, request_count, budgeted_micro_usd
  ) values (
    resolved_school_id, current_date, daily_subject_hash, 1,
    policy_row.per_request_budget_micro_usd
  )
  on conflict (school_id, usage_date, subject_hash)
  do update set
    request_count = public.school_mentor_usage_daily.request_count + 1,
    budgeted_micro_usd = public.school_mentor_usage_daily.budgeted_micro_usd
      + policy_row.per_request_budget_micro_usd,
    updated_at = now();

  return query select
    greatest(policy_row.subject_daily_request_limit - subject_requests - 1, 0),
    greatest(policy_row.school_daily_request_limit - school_requests - 1, 0),
    greatest(
      policy_row.global_daily_budget_micro_usd - global_daily_budget
        - policy_row.per_request_budget_micro_usd,
      0::bigint
    ),
    policy_row.per_request_budget_micro_usd;
end;
$$;
revoke all on function public.reserve_school_mentor_usage(uuid)
  from public, anon, authenticated;
grant execute on function public.reserve_school_mentor_usage(uuid)
  to authenticated;

comment on column public.school_mentor_usage_policy.global_monthly_budget_micro_usd is
  'Independent application-level monthly reservation ceiling for school mentor API spend.';
comment on function public.reserve_school_mentor_usage(uuid) is
  'Atomically reserves one mentor request under subject, school, daily and monthly spend ceilings.';

commit;
