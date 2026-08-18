-- PANSOFIE PARTNER CHALLENGE R4 EXECUTE HARDENING
-- PostgreSQL grants EXECUTE on new functions to PUBLIC by default. The main R4
-- migration revokes role-specific grants, but PUBLIC must also be removed to
-- make the browser boundary actually fail closed.

-- Internal / trigger / authorization helpers: no direct browser execution.
revoke execute on function public.pansofie_reject_partner_evidence_mutation() from public, anon, authenticated;
revoke execute on function public.pansofie_partner_verification_status(uuid) from public, anon, authenticated;
revoke execute on function public.pansofie_is_active_partner_contact(uuid, uuid) from public, anon, authenticated;
revoke execute on function public.pansofie_validate_challenge_dimensions(jsonb) from public, anon, authenticated;

-- Governed browser RPC entrypoints: clear inherited/default execution first.
revoke execute on function public.pansofie_admin_register_partner_organization(text, text, text, text) from public, anon, authenticated;
revoke execute on function public.pansofie_admin_set_partner_verification(uuid, text, text) from public, anon, authenticated;
revoke execute on function public.pansofie_partner_create_challenge(uuid, text, text, text, text, text) from public, anon, authenticated;
revoke execute on function public.pansofie_partner_update_challenge(uuid, text, text, text, text, text, text, text, integer, integer, text, text, text, text, text) from public, anon, authenticated;
revoke execute on function public.pansofie_partner_submit_challenge(uuid) from public, anon, authenticated;
revoke execute on function public.pansofie_admin_screen_partner_challenge(uuid, text, jsonb, text) from public, anon, authenticated;
revoke execute on function public.pansofie_admin_propose_challenge_assignment(uuid, uuid, uuid, uuid) from public, anon, authenticated;
revoke execute on function public.pansofie_school_accept_challenge_assignment(uuid) from public, anon, authenticated;
revoke execute on function public.pansofie_school_decline_challenge_assignment(uuid, text) from public, anon, authenticated;
revoke execute on function public.pansofie_list_my_partner_challenges() from public, anon, authenticated;
revoke execute on function public.pansofie_list_school_challenge_assignments(uuid[]) from public, anon, authenticated;
revoke execute on function public.pansofie_admin_list_partner_challenges() from public, anon, authenticated;
revoke execute on function public.pansofie_admin_list_partner_organizations() from public, anon, authenticated;
revoke execute on function public.pansofie_admin_list_challenge_assignment_candidates() from public, anon, authenticated;

-- Authenticated gets only intended RPC entrypoints; each function performs its
-- own admin/partner/school authorization checks at execution time.
grant execute on function public.pansofie_admin_register_partner_organization(text, text, text, text) to authenticated;
grant execute on function public.pansofie_admin_set_partner_verification(uuid, text, text) to authenticated;
grant execute on function public.pansofie_partner_create_challenge(uuid, text, text, text, text, text) to authenticated;
grant execute on function public.pansofie_partner_update_challenge(uuid, text, text, text, text, text, text, text, integer, integer, text, text, text, text, text) to authenticated;
grant execute on function public.pansofie_partner_submit_challenge(uuid) to authenticated;
grant execute on function public.pansofie_admin_screen_partner_challenge(uuid, text, jsonb, text) to authenticated;
grant execute on function public.pansofie_admin_propose_challenge_assignment(uuid, uuid, uuid, uuid) to authenticated;
grant execute on function public.pansofie_school_accept_challenge_assignment(uuid) to authenticated;
grant execute on function public.pansofie_school_decline_challenge_assignment(uuid, text) to authenticated;
grant execute on function public.pansofie_list_my_partner_challenges() to authenticated;
grant execute on function public.pansofie_list_school_challenge_assignments(uuid[]) to authenticated;
grant execute on function public.pansofie_admin_list_partner_challenges() to authenticated;
grant execute on function public.pansofie_admin_list_partner_organizations() to authenticated;
grant execute on function public.pansofie_admin_list_challenge_assignment_candidates() to authenticated;
