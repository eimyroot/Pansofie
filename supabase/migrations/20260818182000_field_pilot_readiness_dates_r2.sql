-- PANSOFIE FIELD PILOT READINESS R2 — cohort dates completion
-- Additive follow-up so an existing planned cohort can satisfy the readiness
-- dates gate without direct browser table mutation.

create or replace function public.pansofie_set_pilot_cohort_dates(
  target_cohort_id uuid,
  target_starts_on date,
  target_ends_on date
)
returns public.pilot_cohorts
language plpgsql
security definer
set search_path = public
as $$
declare
  cohort_row public.pilot_cohorts%rowtype;
  row_out public.pilot_cohorts%rowtype;
begin
  select * into cohort_row
  from public.pilot_cohorts
  where id = target_cohort_id;

  if cohort_row.id is null then
    raise exception 'cohort not found';
  end if;

  if not public.pansofie_is_active_org_member(
    cohort_row.organization_id,
    array['teacher', 'coordinator']::text[],
    auth.uid()
  ) and not public.is_admin() then
    raise exception 'teacher/coordinator membership required';
  end if;

  if target_starts_on is null or target_ends_on is null then
    raise exception 'pilot start and end dates are required';
  end if;

  if target_ends_on < target_starts_on then
    raise exception 'pilot end date must be on or after start date';
  end if;

  if cohort_row.status not in ('planned', 'active') then
    raise exception 'pilot dates can only be changed for planned or active cohort';
  end if;

  update public.pilot_cohorts
  set starts_on = target_starts_on,
      ends_on = target_ends_on
  where id = target_cohort_id
  returning * into row_out;

  return row_out;
end;
$$;

revoke all on function public.pansofie_set_pilot_cohort_dates(uuid, date, date) from public;
grant execute on function public.pansofie_set_pilot_cohort_dates(uuid, date, date) to authenticated;

comment on function public.pansofie_set_pilot_cohort_dates(uuid, date, date)
  is 'Purpose-bounded teacher/coordinator update of field-pilot cohort dates required by readiness gate.';
