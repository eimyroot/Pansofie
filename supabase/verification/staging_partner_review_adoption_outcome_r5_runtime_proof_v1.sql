-- STAGING-ONLY R5 RUNTIME PROOF V1
-- Tests bounded School output -> Partner review -> adoption decision -> outcome evidence.
-- Uses synthetic .invalid identities and removes all synthetic rows before commit.
-- Production: NEVER.

begin;

create temporary table r5_ctx(key text primary key, value uuid not null) on commit drop;

-- ---------------------------------------------------------------------------
-- Synthetic identities + minimal already-valid R4 context.
-- R4 itself has its own independent canonical runtime proof; this script focuses R5.
-- ---------------------------------------------------------------------------

with x as (
  insert into auth.users(id,aud,role,email,raw_app_meta_data,raw_user_meta_data,created_at,updated_at,is_sso_user,is_anonymous)
  values(gen_random_uuid(),'authenticated','authenticated','r5-proof-v1-teacher@example.invalid','{}','{"full_name":"R5 Proof Teacher"}',now(),now(),false,false)
  returning id
) insert into r5_ctx select 'teacher',id from x;
with x as (
  insert into auth.users(id,aud,role,email,raw_app_meta_data,raw_user_meta_data,created_at,updated_at,is_sso_user,is_anonymous)
  values(gen_random_uuid(),'authenticated','authenticated','r5-proof-v1-learner@example.invalid','{}','{"full_name":"R5 Proof Learner"}',now(),now(),false,false)
  returning id
) insert into r5_ctx select 'learner',id from x;
with x as (
  insert into auth.users(id,aud,role,email,raw_app_meta_data,raw_user_meta_data,created_at,updated_at,is_sso_user,is_anonymous)
  values(gen_random_uuid(),'authenticated','authenticated','r5-proof-v1-partner@example.invalid','{}','{"full_name":"R5 Proof Partner"}',now(),now(),false,false)
  returning id
) insert into r5_ctx select 'partner',id from x;

with x as (
  insert into public.organizations(slug,name,organization_type,country_code,status,created_by)
  values('r5-proof-v1-school','R5 Proof V1 School','school','CZ','active',(select value from r5_ctx where key='teacher')) returning id
) insert into r5_ctx select 'school_org',id from x;
with x as (
  insert into public.organizations(slug,name,organization_type,country_code,status,created_by)
  values('r5-proof-v1-partner','R5 Proof V1 Partner','company','CZ','active',(select value from r5_ctx where key='partner')) returning id
) insert into r5_ctx select 'partner_org',id from x;

insert into public.organization_memberships(organization_id,user_id,role,status,joined_at,created_by) values
((select value from r5_ctx where key='school_org'),(select value from r5_ctx where key='teacher'),'teacher','active',now(),(select value from r5_ctx where key='teacher')),
((select value from r5_ctx where key='school_org'),(select value from r5_ctx where key='learner'),'learner','active',now(),(select value from r5_ctx where key='teacher')),
((select value from r5_ctx where key='partner_org'),(select value from r5_ctx where key='partner'),'partner_contact','active',now(),(select value from r5_ctx where key='partner'));

insert into public.partner_organization_verification_events(organization_id,status,note,actor_user_id)
values((select value from r5_ctx where key='partner_org'),'verified','STAGING-ONLY R5 proof',(select value from r5_ctx where key='partner'));

with x as (
  insert into public.pilot_cohorts(organization_id,name,status,starts_on,ends_on,created_by)
  values((select value from r5_ctx where key='school_org'),'R5 Proof V1 Cohort','active',current_date,current_date+56,(select value from r5_ctx where key='teacher')) returning id
) insert into r5_ctx select 'cohort',id from x;
with x as (
  insert into public.experience_teams(cohort_id,name,status,created_by)
  values((select value from r5_ctx where key='cohort'),'R5 Proof V1 Team','active',(select value from r5_ctx where key='teacher')) returning id
) insert into r5_ctx select 'team',id from x;
insert into public.experience_team_members(team_id,user_id,role,created_by)
values((select value from r5_ctx where key='team'),(select value from r5_ctx where key='learner'),'learner',(select value from r5_ctx where key='teacher'));

insert into r5_ctx(key,value)
select 'mission',m.id from public.missions m where m.slug='circular-challenge' order by m.created_at desc limit 1;
insert into r5_ctx(key,value)
select 'mission_version',mv.id from public.mission_versions mv where mv.mission_id=(select value from r5_ctx where key='mission') order by mv.version_no desc limit 1;

do $$ begin
  if not exists(select 1 from r5_ctx where key='mission_version') then raise exception 'R5_PROOF_FAIL: circular-challenge Mission version missing'; end if;
end $$;

with x as (
  insert into public.partner_challenges(partner_organization_id,created_by,title,problem_statement,beneficiary,desired_output,feedback_commitment,adoption_possibility,status,revision_no,submitted_at,activated_at)
  values((select value from r5_ctx where key='partner_org'),(select value from r5_ctx where key='partner'),'R5 Proof V1 Circular Challenge','Synthetic bounded R5 problem','Synthetic beneficiary','A bounded team report for Partner review','Review the output, never the human','Possible bounded pilot','active',1,now(),now()) returning id
) insert into r5_ctx select 'challenge',id from x;

with x as (
  insert into public.partner_challenge_assignments(challenge_id,school_organization_id,cohort_id,team_id,mission_id,mission_version_id,status,proposed_by,proposed_at,accepted_by,accepted_at)
  values((select value from r5_ctx where key='challenge'),(select value from r5_ctx where key='school_org'),(select value from r5_ctx where key='cohort'),(select value from r5_ctx where key='team'),(select value from r5_ctx where key='mission'),(select value from r5_ctx where key='mission_version'),'active',(select value from r5_ctx where key='teacher'),now(),(select value from r5_ctx where key='teacher'),now()) returning id
) insert into r5_ctx select 'assignment',id from x;

-- ---------------------------------------------------------------------------
-- ACL / RLS fail-closed assertions.
-- ---------------------------------------------------------------------------

do $$
declare t text;
begin
  foreach t in array array['challenge_deliverables','partner_reviews','adoption_decisions','outcome_evidence'] loop
    if not (select c.relrowsecurity from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname=t) then raise exception 'R5_PROOF_FAIL: RLS disabled on %',t; end if;
    if has_table_privilege('anon','public.'||t,'SELECT') or has_table_privilege('authenticated','public.'||t,'SELECT') or has_table_privilege('authenticated','public.'||t,'INSERT') or has_table_privilege('authenticated','public.'||t,'UPDATE') or has_table_privilege('authenticated','public.'||t,'DELETE') then raise exception 'R5_PROOF_FAIL: direct browser privilege exists on %',t; end if;
  end loop;
  if has_function_privilege('anon','public.pansofie_partner_review_deliverable(uuid,text,text,text,text,text)','EXECUTE') then raise exception 'R5_PROOF_FAIL: anon can execute review RPC'; end if;
  if has_function_privilege('authenticated','public.pansofie_is_school_staff_for_assignment(uuid,uuid)','EXECUTE') then raise exception 'R5_PROOF_FAIL: private helper callable by authenticated'; end if;
end $$;

-- ---------------------------------------------------------------------------
-- Revision 1 -> NOT_ADOPT. School-only submit, Partner-only review.
-- ---------------------------------------------------------------------------

select set_config('request.jwt.claim.sub',(select value::text from r5_ctx where key='partner'),true);
do $$ begin
  begin
    perform public.pansofie_school_submit_challenge_deliverable((select value from r5_ctx where key='assignment'),'illegal','partner cannot submit','other',null);
    raise exception 'R5_PROOF_FAIL: Partner submitted School deliverable';
  exception when others then
    if sqlerrm='R5_PROOF_FAIL: Partner submitted School deliverable' then raise; end if;
    if position('School teacher/coordinator' in sqlerrm)=0 then raise; end if;
  end;
end $$;

select set_config('request.jwt.claim.sub',(select value::text from r5_ctx where key='teacher'),true);
with x as (select public.pansofie_school_submit_challenge_deliverable((select value from r5_ctx where key='assignment'),'R5 Output v1','Bounded output revision one. No learner evidence copied.','report',null) id)
insert into r5_ctx select 'deliverable1',id from x;

select set_config('request.jwt.claim.sub',(select value::text from r5_ctx where key='teacher'),true);
do $$ begin
  begin
    perform public.pansofie_partner_review_deliverable((select value from r5_ctx where key='deliverable1'),'yes','illegal teacher review',null,'not_adopt',null);
    raise exception 'R5_PROOF_FAIL: Teacher performed Partner review';
  exception when others then
    if sqlerrm='R5_PROOF_FAIL: Teacher performed Partner review' then raise; end if;
    if position('partner_contact' in sqlerrm)=0 then raise; end if;
  end;
end $$;

select set_config('request.jwt.claim.sub',(select value::text from r5_ctx where key='partner'),true);
with x as (select public.pansofie_partner_review_deliverable((select value from r5_ctx where key='deliverable1'),'partial','Useful structure','Needs stronger evidence','not_adopt','Not ready to use') id)
insert into r5_ctx select 'decision1',id from x;

do $$ begin
  begin
    perform public.pansofie_partner_report_outcome((select value from r5_ctx where key='decision1'),'should fail','n/a',current_date,'invalid',null);
    raise exception 'R5_PROOF_FAIL: Outcome allowed after NOT_ADOPT';
  exception when others then
    if sqlerrm='R5_PROOF_FAIL: Outcome allowed after NOT_ADOPT' then raise; end if;
    if position('only after a PILOT decision' in sqlerrm)=0 then raise; end if;
  end;
end $$;

-- ---------------------------------------------------------------------------
-- Revision 2 -> EXPLORE_FURTHER, revision 3 -> PILOT.
-- ---------------------------------------------------------------------------

select set_config('request.jwt.claim.sub',(select value::text from r5_ctx where key='teacher'),true);
with x as (select public.pansofie_school_submit_challenge_deliverable((select value from r5_ctx where key='assignment'),'R5 Output v2','Second bounded output revision.','prototype',null) id)
insert into r5_ctx select 'deliverable2',id from x;
select set_config('request.jwt.claim.sub',(select value::text from r5_ctx where key='partner'),true);
with x as (select public.pansofie_partner_review_deliverable((select value from r5_ctx where key='deliverable2'),'yes','Worth exploring','Clarify pilot scope','explore_further','Explore with School') id)
insert into r5_ctx select 'decision2',id from x;

select set_config('request.jwt.claim.sub',(select value::text from r5_ctx where key='teacher'),true);
with x as (select public.pansofie_school_submit_challenge_deliverable((select value from r5_ctx where key='assignment'),'R5 Output v3','Third bounded output revision for pilot decision.','prototype','https://example.invalid/r5-proof-v1') id)
insert into r5_ctx select 'deliverable3',id from x;

select set_config('request.jwt.claim.sub',(select value::text from r5_ctx where key='partner'),true);
do $$ begin
  begin
    perform public.pansofie_partner_review_deliverable((select value from r5_ctx where key='deliverable2'),'yes','stale',null,'pilot',null);
    raise exception 'R5_PROOF_FAIL: stale deliverable review allowed';
  exception when others then
    if sqlerrm='R5_PROOF_FAIL: stale deliverable review allowed' then raise; end if;
    if position('stale deliverable revision' in sqlerrm)=0 then raise; end if;
  end;
end $$;

with x as (select public.pansofie_partner_review_deliverable((select value from r5_ctx where key='deliverable3'),'yes','The bounded output addresses the brief','Define owner, scope and dates','pilot','Proceed to a bounded pilot') id)
insert into r5_ctx select 'decision3',id from x;
with x as (select public.pansofie_partner_report_outcome((select value from r5_ctx where key='decision3'),'The synthetic pilot changed one bounded process','Synthetic beneficiary',current_date,'STAGING-ONLY synthetic observation','https://example.invalid/r5-proof-v1-outcome') id)
insert into r5_ctx select 'outcome',id from x;

-- ---------------------------------------------------------------------------
-- Projection / semantic assertions.
-- ---------------------------------------------------------------------------

do $$
declare cnt int; payload jsonb; begin
  select count(*) into cnt from public.pansofie_list_my_partner_deliverables() where challenge_id=(select value from r5_ctx where key='challenge');
  if cnt<>3 then raise exception 'R5_PROOF_FAIL: Partner expected 3 bounded revisions, got %',cnt; end if;
  select to_jsonb(x) into payload from public.pansofie_list_my_partner_deliverables() x where x.deliverable_id=(select value from r5_ctx where key='deliverable3');
  if payload ? 'user_id' or payload ? 'learner_id' or payload ? 'reflection' or payload ? 'passport' then raise exception 'R5_PROOF_FAIL: Partner projection leaked learner/private field'; end if;
  if payload->>'adoption_decision'<>'pilot' then raise exception 'R5_PROOF_FAIL: PILOT decision missing'; end if;
  if payload->>'latest_outcome_status'<>'reported' or payload->>'latest_outcome_confidence'<>'unverified' then raise exception 'R5_PROOF_FAIL: outcome truth state mismatch'; end if;
end $$;

select set_config('request.jwt.claim.sub',(select value::text from r5_ctx where key='teacher'),true);
do $$ declare cnt int; begin
  select count(*) into cnt from public.pansofie_list_school_challenge_outcomes(array[(select value from r5_ctx where key='school_org')]) where challenge_id=(select value from r5_ctx where key='challenge');
  if cnt<>3 then raise exception 'R5_PROOF_FAIL: School R5 history mismatch'; end if;
end $$;

-- Immutable evidence must reject mutation.
do $$ begin
  begin
    update public.challenge_deliverables set title='mutated' where id=(select value from r5_ctx where key='deliverable3');
    raise exception 'R5_PROOF_FAIL: immutable deliverable mutation allowed';
  exception when others then
    if sqlerrm='R5_PROOF_FAIL: immutable deliverable mutation allowed' then raise; end if;
    if position('append-only' in sqlerrm)=0 then raise; end if;
  end;
end $$;

-- ---------------------------------------------------------------------------
-- Controlled staging cleanup. Immutable triggers disabled only for cleanup.
-- ---------------------------------------------------------------------------

alter table public.outcome_evidence disable trigger outcome_evidence_immutable;
delete from public.outcome_evidence where challenge_id=(select value from r5_ctx where key='challenge');
alter table public.outcome_evidence enable trigger outcome_evidence_immutable;
alter table public.adoption_decisions disable trigger adoption_decisions_immutable;
delete from public.adoption_decisions where challenge_id=(select value from r5_ctx where key='challenge');
alter table public.adoption_decisions enable trigger adoption_decisions_immutable;
alter table public.partner_reviews disable trigger partner_reviews_immutable;
delete from public.partner_reviews where challenge_id=(select value from r5_ctx where key='challenge');
alter table public.partner_reviews enable trigger partner_reviews_immutable;
alter table public.challenge_deliverables disable trigger challenge_deliverables_immutable;
delete from public.challenge_deliverables where challenge_id=(select value from r5_ctx where key='challenge');
alter table public.challenge_deliverables enable trigger challenge_deliverables_immutable;

delete from public.partner_challenge_assignments where id=(select value from r5_ctx where key='assignment');
delete from public.partner_challenges where id=(select value from r5_ctx where key='challenge');

alter table public.partner_organization_verification_events disable trigger partner_verification_events_immutable;
delete from public.partner_organization_verification_events where organization_id=(select value from r5_ctx where key='partner_org');
alter table public.partner_organization_verification_events enable trigger partner_verification_events_immutable;

delete from public.experience_team_members where team_id=(select value from r5_ctx where key='team');
delete from public.experience_teams where id=(select value from r5_ctx where key='team');
delete from public.pilot_cohorts where id=(select value from r5_ctx where key='cohort');
delete from public.organization_memberships where organization_id in ((select value from r5_ctx where key='school_org'),(select value from r5_ctx where key='partner_org'));
delete from public.organizations where id in ((select value from r5_ctx where key='school_org'),(select value from r5_ctx where key='partner_org'));
delete from public.user_roles where user_id in ((select value from r5_ctx where key='teacher'),(select value from r5_ctx where key='learner'),(select value from r5_ctx where key='partner'));
delete from public.profiles where id in ((select value from r5_ctx where key='teacher'),(select value from r5_ctx where key='learner'),(select value from r5_ctx where key='partner'));
delete from auth.users where id in ((select value from r5_ctx where key='teacher'),(select value from r5_ctx where key='learner'),(select value from r5_ctx where key='partner'));

-- Zero residue.
do $$ begin
  if exists(select 1 from auth.users where email like 'r5-proof-v1-%@example.invalid') then raise exception 'R5_PROOF_FAIL: synthetic user residue'; end if;
  if exists(select 1 from public.organizations where slug like 'r5-proof-v1-%') then raise exception 'R5_PROOF_FAIL: organization residue'; end if;
  if exists(select 1 from public.pilot_cohorts where name='R5 Proof V1 Cohort') then raise exception 'R5_PROOF_FAIL: cohort residue'; end if;
  if exists(select 1 from public.experience_teams where name='R5 Proof V1 Team') then raise exception 'R5_PROOF_FAIL: team residue'; end if;
  if exists(select 1 from public.partner_challenges where title='R5 Proof V1 Circular Challenge') then raise exception 'R5_PROOF_FAIL: Challenge residue'; end if;
  if exists(select 1 from public.challenge_deliverables d where d.challenge_title='R5 Proof V1 Circular Challenge') then raise exception 'R5_PROOF_FAIL: deliverable residue'; end if;
  if exists(select 1 from public.partner_reviews r join public.partner_challenges c on c.id=r.challenge_id where c.title='R5 Proof V1 Circular Challenge') then raise exception 'R5_PROOF_FAIL: review residue'; end if;
end $$;

commit;
-- SUCCESS means role boundaries, three adoption states, Outcome separation,
-- immutability and zero-residue cleanup all passed.