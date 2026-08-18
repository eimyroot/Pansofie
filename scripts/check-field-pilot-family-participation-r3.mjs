import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const [migration, hardening, verification, service, page, app, layout, doc] = await Promise.all([
  read("supabase/migrations/20260818184500_field_pilot_family_participation_r3.sql"),
  read("supabase/migrations/20260818185000_field_pilot_family_execute_hardening_r3.sql"),
  read("supabase/verification/staging_field_pilot_family_participation_r3.sql"),
  read("src/lib/pansofieFamilyFlow.js"),
  read("src/pages/FamilyHub.jsx"),
  read("src/App.jsx"),
  read("src/layouts/MemberLayout.jsx"),
  read("docs/canonical/FIELD_PILOT_FAMILY_PARTICIPATION_R3.md"),
]);

const sql = `${migration}\n${hardening}`.toLowerCase();
const hardened = hardening.toLowerCase();

assert.ok(sql.includes("create table if not exists public.family_contributions"), "family_contributions table missing");
assert.ok(sql.includes("alter table public.family_contributions enable row level security"), "family_contributions RLS missing");
assert.ok(sql.includes("'guardian_family_participation'"), "purpose-specific guardian_family_participation missing");
assert.ok(hardened.includes("revoke all on table public.family_contributions from public"), "direct PUBLIC family table access must be revoked");
assert.ok(hardened.includes("revoke all on table public.family_contributions from authenticated"), "direct authenticated family table access must be revoked");

for (const kind of ["context", "contact", "resource", "observation"]) {
  assert.ok(sql.includes(`'${kind}'`), `family contribution kind missing: ${kind}`);
}

for (const projection of [
  "pansofie_family_access_summary",
  "pansofie_list_my_family_context",
  "pansofie_list_my_guardian_passport_summaries",
  "pansofie_add_family_contribution",
  "pansofie_list_my_family_contributions",
  "pansofie_withdraw_family_contribution",
  "pansofie_list_staff_family_contributions",
  "pansofie_enable_guardian_family_participation",
]) {
  assert.ok(sql.includes(`function public.${projection}`), `missing R3 function ${projection}`);
}

assert.ok(sql.includes("pansofie_is_verified_guardian(r.user_id, auth.uid())"), "verified guardian relationship gate missing");
assert.ok(sql.includes("'guardian_family_participation'"), "family participation basis gate missing");
assert.ok(hardened.includes("'school_mission_review'"), "staff family inbox must preserve school review basis");
assert.ok(hardened.includes("'guardian_family_participation'"), "staff family inbox must stop projecting after Family basis ends");
assert.ok(sql.includes("if not public.is_admin()"), "family legal-basis provisioning must remain admin-only");
assert.ok(sql.includes("target_legal_basis = 'consent' and target_consent_recorded_at is null"), "consent timestamp fail-closed gate missing");

assert.ok(!sql.includes("from public.experience_evidence"), "Family projection must not read raw evidence");
assert.ok(!sql.includes("join public.experience_evidence"), "Family projection must not join raw evidence");
assert.ok(!sql.includes("from public.experience_reflections"), "Family projection must not read private reflection");
assert.ok(!sql.includes("join public.experience_reflections"), "Family projection must not join private reflection");

assert.ok(hardened.includes("revoke all on function public.pansofie_can_guardian_participate_in_run(uuid) from public"), "private helper PUBLIC revoke missing");
assert.ok(hardened.includes("revoke execute on function public.pansofie_can_guardian_participate_in_run(uuid) from anon"), "private helper anon revoke missing");
assert.ok(hardened.includes("revoke execute on function public.pansofie_can_guardian_participate_in_run(uuid) from authenticated"), "private helper authenticated revoke missing");

for (const fn of [
  "pansofie_family_access_summary()",
  "pansofie_list_my_family_context()",
  "pansofie_list_my_guardian_passport_summaries()",
  "pansofie_add_family_contribution(uuid, text, text)",
  "pansofie_list_my_family_contributions()",
  "pansofie_withdraw_family_contribution(uuid)",
  "pansofie_list_staff_family_contributions()",
  "pansofie_enable_guardian_family_participation(uuid, uuid, text, text, text, timestamptz)",
]) {
  assert.ok(hardened.includes(`revoke all on function public.${fn} from public`), `PUBLIC execute revoke missing for ${fn}`);
  assert.ok(hardened.includes(`revoke execute on function public.${fn} from anon`), `anon execute revoke missing for ${fn}`);
  assert.ok(hardened.includes(`grant execute on function public.${fn} to authenticated`), `authenticated grant missing for ${fn}`);
}

for (const rpc of [
  "pansofie_family_access_summary",
  "pansofie_list_my_family_context",
  "pansofie_list_my_guardian_passport_summaries",
  "pansofie_add_family_contribution",
  "pansofie_list_my_family_contributions",
  "pansofie_withdraw_family_contribution",
  "pansofie_list_staff_family_contributions",
]) {
  assert.ok(service.includes(`supabase.rpc(\"${rpc}\"`), `client missing R3 RPC ${rpc}`);
}

for (const marker of [
  "PANSOFIE FAMILY · FIELD PILOT R3",
  "Rodina nevidí raw evidence ani soukromou reflexi",
  "guardian_family_participation",
  "Povolené Passport summary",
  "Rodinné podněty pro školu",
]) {
  assert.ok(page.includes(marker), `Family UI marker missing: ${marker}`);
}

assert.ok(app.includes('path="/rodina"'), "authenticated /rodina route missing");
assert.ok(layout.includes("getMyFamilyAccessSummary"), "Family nav must be access-aware");
assert.ok(layout.includes("teacher\", \"coordinator"), "Family nav must support school-side inbox roles");
assert.ok(doc.includes("A guardian relationship identifies a relationship. It does not itself grant content access."), "canonical Family boundary missing");
assert.ok(verification.includes("FIELD_PILOT_FAMILY_PARTICIPATION_R3=PASS"), "staging verification marker missing");

console.log("FIELD_PILOT_FAMILY_PARTICIPATION_R3=PASS");
