-- PANSOFIE pilot cohort creation runtime fix discovered by R4 end-to-end proof.
--
-- The R2 function used a local variable named `cohort_id` and then referenced
-- `cohort_id` inside INSERT ... ON CONFLICT for pilot_cohort_members. PostgreSQL
-- resolves that reference ambiguously between the PL/pgSQL variable and table
-- column and aborts runtime cohort creation.
--
-- This additive fix preserves all R2 behavior and only renames/qualifies the
-- local identifier. It is required by the Partner Challenge R4 managed-match
-- runtime, but fixes the existing School pilot flow generally.

create or replace function public.pansofie_create_pilot_cohort(
  target_org_id uuid,
  target_name text,
  target_starts_on date default null,
  target_ends_on date default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  new_cohort_id uuid;
  caller_role text;
begin
  if nullif(btrim(coalesce(target_name, '')), '') is null then
    raise exception 'cohort name is required';
  end if;

  select om.role into caller_role
  from public.organization_memberships om
  where om.organization_id = target_org_id
    and om.user_id = auth.uid()
    and om.status = 'active'
    and om.role in ('coordinator', 'teacher')
  order by case om.role when 'coordinator' then 1 else 2 end
  limit 1;

  if caller_role is null and not public.is_admin() then
    raise exception 'teacher/coordinator membership required';
  end if;

  if target_starts_on is not null and target_ends_on is not null and target_ends_on < target_starts_on then
    raise exception 'pilot end date must be on or after start date';
  end if;

  insert into public.pilot_cohorts (
    organization_id, name, status, starts_on, ends_on, created_by
  ) values (
    target_org_id, btrim(target_name), 'planned', target_starts_on, target_ends_on, auth.uid()
  ) returning id into new_cohort_id;

  if caller_role is not null then
    insert into public.pilot_cohort_members (
      cohort_id, user_id, role, status, created_by
    ) values (
      new_cohort_id, auth.uid(), caller_role, 'active', auth.uid()
    ) on conflict (cohort_id, user_id, role) do nothing;
  end if;

  perform public.pansofie_seed_canonical_pilot_plan(new_cohort_id);
  return new_cohort_id;
end;
$$;

revoke execute on function public.pansofie_create_pilot_cohort(uuid, text, date, date) from public, anon;
grant execute on function public.pansofie_create_pilot_cohort(uuid, text, date, date) to authenticated;
