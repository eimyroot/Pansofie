begin;

-- M8.4 adds one canonical, evidence-backed skill path for the Grow mission.
insert into public.skills (code, domain_id, title_cs, title_en, description_cs, description_en, status)
values (
  'ecological_thinking',
  'nature',
  'Ekologické myšlení',
  'Ecological thinking',
  'Pozorovat vztahy mezi živými organismy, podmínkami prostředí a vlastní péčí a vyvozovat z nich praktické závěry.',
  'Observe relationships between living organisms, environmental conditions and care, and draw practical conclusions from them.',
  'active'
)
on conflict (code) do nothing;

insert into public.mission_skills (mission_id, skill_id, contribution_weight)
select m.id, s.id, 1
from public.missions m
join public.skills s on s.code = 'ecological_thinking'
where m.slug = 'vypestuj-prvni-rostlinu'
on conflict (mission_id, skill_id) do nothing;

-- A self-attestation is valid only when its evidence belongs to the same user,
-- comes from a completed canonical run, and the skill is mapped to that mission.
drop policy if exists skill_attestations_self_insert on public.skill_attestations;
create policy skill_attestations_self_insert
  on public.skill_attestations
  for insert to authenticated
  with check (
    user_id = (select auth.uid())
    and attested_by = (select auth.uid())
    and attestation_type = 'self'
    and exists (
      select 1
      from public.experience_evidence e
      join public.mission_runs r on r.id = e.run_id
      join public.mission_skills ms
        on ms.mission_id = r.mission_id
       and ms.skill_id = skill_attestations.skill_id
      join public.skills s on s.id = ms.skill_id and s.status = 'active'
      where e.id = skill_attestations.evidence_id
        and e.owner_id = (select auth.uid())
        and r.user_id = (select auth.uid())
        and r.status = 'completed'
    )
  );

-- Ordinary account-created impact observations must remain evidence-backed.
-- Existing rows are preserved; this tightens only future authenticated inserts.
drop policy if exists impact_observations_owner_insert on public.impact_observations;
create policy impact_observations_owner_insert
  on public.impact_observations
  for insert to authenticated
  with check (
    user_id = (select auth.uid())
    and recorded_by = (select auth.uid())
    and evidence_id is not null
    and (
      organization_id is null
      or exists (
        select 1 from public.organization_memberships om
        where om.organization_id = impact_observations.organization_id
          and om.user_id = (select auth.uid())
          and om.status = 'active'
      )
    )
    and exists (
      select 1
      from public.experience_evidence e
      join public.mission_runs r on r.id = e.run_id
      where e.id = impact_observations.evidence_id
        and e.owner_id = (select auth.uid())
        and r.user_id = (select auth.uid())
        and r.status = 'completed'
    )
  );

-- Idempotence for one concrete observation type per evidence item.
create unique index if not exists impact_observations_user_dimension_metric_evidence_uidx
  on public.impact_observations(user_id, dimension, metric_key, evidence_id)
  where user_id is not null and evidence_id is not null;

-- If the source evidence is removed, evidence-backed impact must disappear too.
alter table public.impact_observations
  drop constraint if exists impact_observations_evidence_id_fkey;
alter table public.impact_observations
  add constraint impact_observations_evidence_id_fkey
  foreign key (evidence_id) references public.experience_evidence(id) on delete cascade;

commit;
