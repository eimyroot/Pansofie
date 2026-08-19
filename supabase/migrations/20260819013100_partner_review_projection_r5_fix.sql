-- R5 projection follow-up: expose the adoption decision identifier needed only to
-- attach later bounded OutcomeEvidence. No learner/private data is added.

create or replace function public.pansofie_list_my_partner_deliverables()
returns table (
  deliverable_id uuid,
  assignment_id uuid,
  challenge_id uuid,
  challenge_revision integer,
  deliverable_revision integer,
  challenge_title text,
  agreed_deliverable text,
  team_label text,
  deliverable_title text,
  deliverable_summary text,
  deliverable_kind text,
  deliverable_uri text,
  submitted_at timestamptz,
  addressed_brief text,
  useful_text text,
  changes_needed text,
  reviewed_at timestamptz,
  adoption_decision_id uuid,
  adoption_decision text,
  adoption_note text,
  decided_at timestamptz,
  latest_outcome_status text,
  latest_outcome_confidence text,
  latest_outcome_text text,
  latest_outcome_observed_on date
)
language sql
stable
security definer
set search_path = public
as $$
  select
    d.id,
    d.assignment_id,
    d.challenge_id,
    d.challenge_revision,
    d.revision_no,
    d.challenge_title,
    d.agreed_deliverable,
    d.team_label,
    d.title,
    d.summary,
    d.deliverable_kind,
    d.deliverable_uri,
    d.submitted_at,
    r.addressed_brief,
    r.useful_text,
    r.changes_needed,
    r.reviewed_at,
    ad.id,
    ad.decision,
    ad.note,
    ad.decided_at,
    oe.status,
    oe.confidence,
    oe.what_changed,
    oe.observed_on
  from public.challenge_deliverables d
  join public.partner_challenges c on c.id = d.challenge_id
  join public.organization_memberships m
    on m.organization_id = c.partner_organization_id
   and m.user_id = auth.uid()
   and m.role = 'partner_contact'
   and m.status = 'active'
  join public.organizations o
    on o.id = c.partner_organization_id
   and o.status = 'active'
  left join public.partner_reviews r on r.deliverable_id = d.id
  left join public.adoption_decisions ad on ad.review_id = r.id
  left join lateral (
    select x.status, x.confidence, x.what_changed, x.observed_on
    from public.outcome_evidence x
    where x.adoption_decision_id = ad.id
    order by x.reported_at desc, x.id desc
    limit 1
  ) oe on true
  where public.pansofie_partner_verification_status(c.partner_organization_id) = 'verified'
  order by d.submitted_at desc, d.revision_no desc;
$$;

revoke execute on function public.pansofie_list_my_partner_deliverables() from public, anon;
grant execute on function public.pansofie_list_my_partner_deliverables() to authenticated, service_role;
