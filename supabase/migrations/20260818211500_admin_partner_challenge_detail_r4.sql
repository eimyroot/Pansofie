-- PANSOFIE R4 admin-only Challenge detail projection.

create or replace function public.pansofie_admin_get_partner_challenge(target_challenge_id uuid)
returns table(
  challenge_id uuid,
  partner_organization_id uuid,
  partner_organization_name text,
  verification_status text,
  title text,
  problem_statement text,
  beneficiary text,
  context text,
  desired_output text,
  available_resources text,
  data_requirements text,
  age_min smallint,
  age_max smallint,
  timeframe text,
  ip_expectations text,
  safety_notes text,
  feedback_commitment text,
  adoption_possibility text,
  challenge_status text,
  revision_no integer,
  submitted_at timestamptz,
  screening_decision text,
  screening_dimensions jsonb,
  screening_note text,
  screened_at timestamptz,
  assignment_id uuid,
  assignment_status text,
  school_name text,
  cohort_name text,
  team_name text
)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if auth.uid() is null or not public.is_admin() then raise exception 'admin access required'; end if;
  return query
  select
    c.id,
    c.partner_organization_id,
    partner.name,
    public.pansofie_partner_verification_status(partner.id),
    c.title,
    c.problem_statement,
    c.beneficiary,
    c.context,
    c.desired_output,
    c.available_resources,
    c.data_requirements,
    c.age_min,
    c.age_max,
    c.timeframe,
    c.ip_expectations,
    c.safety_notes,
    c.feedback_commitment,
    c.adoption_possibility,
    c.status,
    c.revision_no,
    c.submitted_at,
    s.decision,
    s.dimensions,
    s.note,
    s.screened_at,
    a.id,
    a.status,
    school.name,
    pc.name,
    t.name
  from public.partner_challenges c
  join public.organizations partner on partner.id = c.partner_organization_id
  left join lateral (
    select x.decision, x.dimensions, x.note, x.screened_at
    from public.partner_challenge_screenings x
    where x.challenge_id = c.id
    order by x.challenge_revision desc, x.screened_at desc
    limit 1
  ) s on true
  left join lateral (
    select x.*
    from public.partner_challenge_assignments x
    where x.challenge_id = c.id
    order by x.proposed_at desc
    limit 1
  ) a on true
  left join public.organizations school on school.id = a.school_organization_id
  left join public.pilot_cohorts pc on pc.id = a.cohort_id
  left join public.experience_teams t on t.id = a.team_id
  where c.id = target_challenge_id;
end;
$$;

revoke execute on function public.pansofie_admin_get_partner_challenge(uuid) from public, anon, authenticated;
grant execute on function public.pansofie_admin_get_partner_challenge(uuid) to authenticated;
