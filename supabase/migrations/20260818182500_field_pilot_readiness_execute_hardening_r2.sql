-- PANSOFIE FIELD PILOT READINESS R2 — function execute hardening
-- Supabase default privileges explicitly grant EXECUTE on new functions to
-- anon/authenticated. REVOKE FROM PUBLIC alone is therefore insufficient.
-- This migration makes the intended browser boundary explicit.

-- Internal helper: callable only from trusted server-side/security-definer flow.
revoke execute on function public.pansofie_seed_canonical_pilot_plan(uuid) from anon;
revoke execute on function public.pansofie_seed_canonical_pilot_plan(uuid) from authenticated;

-- Authenticated operator RPCs: never callable by anon.
revoke execute on function public.pansofie_set_pilot_responsibility(uuid, text, text, text, uuid) from anon;
revoke execute on function public.pansofie_record_teacher_load(uuid, date, integer, text) from anon;
revoke execute on function public.pansofie_report_pilot_incident(uuid, text, text, text) from anon;
revoke execute on function public.pansofie_set_pilot_incident_status(uuid, text) from anon;
revoke execute on function public.pansofie_pilot_readiness(uuid) from anon;
revoke execute on function public.pansofie_activate_pilot_cohort(uuid) from anon;
revoke execute on function public.pansofie_pilot_metrics(uuid) from anon;
revoke execute on function public.pansofie_set_pilot_cohort_dates(uuid, date, date) from anon;

-- Reassert intended authenticated grants after hardening.
grant execute on function public.pansofie_set_pilot_responsibility(uuid, text, text, text, uuid) to authenticated;
grant execute on function public.pansofie_record_teacher_load(uuid, date, integer, text) to authenticated;
grant execute on function public.pansofie_report_pilot_incident(uuid, text, text, text) to authenticated;
grant execute on function public.pansofie_set_pilot_incident_status(uuid, text) to authenticated;
grant execute on function public.pansofie_pilot_readiness(uuid) to authenticated;
grant execute on function public.pansofie_activate_pilot_cohort(uuid) to authenticated;
grant execute on function public.pansofie_pilot_metrics(uuid) to authenticated;
grant execute on function public.pansofie_set_pilot_cohort_dates(uuid, date, date) to authenticated;

comment on function public.pansofie_seed_canonical_pilot_plan(uuid)
  is 'Internal canonical pilot-plan pinning helper. No anon/authenticated direct execute.';
