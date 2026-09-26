begin;

create table if not exists public.school_mentor_usage_policy (
  id smallint primary key default 1 check (id = 1),
  subject_daily_request_limit integer not null check (subject_daily_request_limit between 1 and 500),
  school_daily_request_limit integer not null check (school_daily_request_limit between 1 and 5000),
  global_daily_budget_micro_usd bigint not null check (global_daily_budget_micro_usd > 0),
  per_request_budget_micro_usd bigint not null check (per_request_budget_micro_usd > 0),
  updated_at timestamptz not null default now()
);

insert into public.school_mentor_usage_policy (
  id, subject_daily_request_limit, school_daily_request_limit,
  global_daily_budget_micro_usd, per_request_budget_micro_usd
) values (1, 12, 120, 5000000, 30000)
on conflict (id) do nothing;

create table if not exists public.school_mentor_usage_daily (
  school_id uuid not null references public.organizations(id) on delete restrict,
  usage_date date not null default current_date,
  subject_hash text not null check (length(subject_hash) = 64),
  request_count integer not null default 0 check (request_count >= 0),
  budgeted_micro_usd bigint not null default 0 check (budgeted_micro_usd >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (school_id, usage_date, subject_hash)
);
create index if not exists school_mentor_usage_daily_date_idx
  on public.school_mentor_usage_daily(usage_date, school_id);

alter table public.school_mentor_usage_policy enable row level security;
alter table public.school_mentor_usage_daily enable row level security;

revoke all privileges on table public.school_mentor_usage_policy
  from public, anon, authenticated;
revoke all privileges on table public.school_mentor_usage_daily
  from public, anon, authenticated;

drop trigger if exists school_mentor_usage_policy_touch_updated_at
  on public.school_mentor_usage_policy;
create trigger school_mentor_usage_policy_touch_updated_at
  before update on public.school_mentor_usage_policy
  for each row execute procedure public.pansofie_touch_updated_at();

drop trigger if exists school_mentor_usage_daily_touch_updated_at
  on public.school_mentor_usage_daily;
create trigger school_mentor_usage_daily_touch_updated_at
  before update on public.school_mentor_usage_daily
  for each row execute procedure public.pansofie_touch_updated_at();

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
  global_budget bigint := 0;
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
    into global_budget
  from public.school_mentor_usage_daily usage
  where usage.usage_date = current_date;

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

  if global_budget + policy_row.per_request_budget_micro_usd
      > policy_row.global_daily_budget_micro_usd then
    raise exception 'mentor_global_daily_budget';
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
      policy_row.global_daily_budget_micro_usd - global_budget
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

comment on table public.school_mentor_usage_policy is
  'Server-governed mentor quotas and worst-case spend ceilings. No prompt or response content.';
comment on table public.school_mentor_usage_daily is
  'Daily pseudonymous mentor usage counters. Stores no prompt, response, profile or raw user id.';
comment on function public.reserve_school_mentor_usage(uuid) is
  'Atomically reserves one bounded mentor request for the authenticated learner assignment.';

commit;
