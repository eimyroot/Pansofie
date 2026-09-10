begin;

-- Production post-deploy hardening: Supabase default privileges can grant
-- table access to anon/public even when RLS policies only target authenticated.
-- Keep the Learning Core explicit: anon/public get no direct table/view grants.

revoke all privileges on table public.learning_domains from public, anon;
revoke all privileges on table public.skills from public, anon;
revoke all privileges on table public.mission_learning_cycles from public, anon;
revoke all privileges on table public.mission_skills from public, anon;
revoke all privileges on table public.skill_attestations from public, anon;
revoke all privileges on table public.impact_observations from public, anon;
revoke all privileges on table public.user_skill_evidence_summary from public, anon;

grant select on public.learning_domains to authenticated;
grant select on public.skills to authenticated;
grant select on public.mission_learning_cycles to authenticated;
grant select on public.mission_skills to authenticated;
grant select, insert on public.skill_attestations to authenticated;
grant select, insert on public.impact_observations to authenticated;
grant select on public.user_skill_evidence_summary to authenticated;

commit;
