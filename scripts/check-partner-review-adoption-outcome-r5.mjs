import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const [migration, flow, partnerUi, schoolUi, doc] = await Promise.all([
  read("supabase/migrations/20260819013000_partner_review_adoption_outcome_r5.sql"),
  read("src/lib/pansofiePartnerFlow.js"),
  read("src/components/pansofie/PartnerReviewPanel.jsx"),
  read("src/components/pansofie/SchoolDeliverablePanel.jsx"),
  read("docs/canonical/PANSOFIE_PARTNER_REVIEW_ADOPTION_OUTCOME_R5.md"),
]);

for (const table of ["challenge_deliverables", "partner_reviews", "adoption_decisions", "outcome_evidence"]) {
  assert.ok(migration.includes(`create table if not exists public.${table}`), `R5 table missing: ${table}`);
  assert.ok(migration.includes(`alter table public.${table} enable row level security`), `RLS missing: ${table}`);
  assert.ok(migration.includes(`revoke all on table public.${table} from public, anon, authenticated`), `direct browser ACL not denied: ${table}`);
}

for (const fn of [
  "pansofie_school_submit_challenge_deliverable",
  "pansofie_list_my_partner_deliverables",
  "pansofie_partner_review_deliverable",
  "pansofie_partner_report_outcome",
  "pansofie_list_school_challenge_outcomes",
]) {
  assert.ok(migration.includes(`function public.${fn}`), `R5 RPC missing: ${fn}`);
  assert.ok(flow.includes(fn), `frontend RPC binding missing: ${fn}`);
}

assert.ok(migration.includes("target_decision not in ('not_adopt','explore_further','pilot')"), "bounded adoption decision states missing");
assert.ok(migration.includes("stale deliverable revision cannot be reviewed"), "stale deliverable fail-closed gate missing");
assert.ok(migration.includes("Outcome evidence may be reported only after a PILOT decision"), "outcome/adoption separation missing");
assert.ok(migration.includes("'reported', 'unverified'"), "unverified outcome truth boundary missing");
assert.ok(!migration.includes("experience_reflections"), "Partner R5 migration must not project private reflections");
assert.ok(!migration.includes("experience_evidence"), "Partner R5 migration must not project learner raw evidence");
assert.ok(!migration.includes("passports"), "Partner R5 migration must not project Passport data");

assert.ok(partnerUi.includes("REVIEW OUTPUT"), "Partner Review next action missing");
assert.ok(partnerUi.includes("Výstup odpovídá zadání?"), "output-vs-brief review question missing");
assert.ok(partnerUi.includes("NOT ADOPT"), "NOT ADOPT UI missing");
assert.ok(partnerUi.includes("EXPLORE FURTHER"), "EXPLORE FURTHER UI missing");
assert.ok(partnerUi.includes("PILOT"), "PILOT UI missing");
assert.ok(partnerUi.includes("nehodnotí člověka"), "human-assessment boundary missing in Partner UI");
assert.ok(partnerUi.includes("REPORTED · UNVERIFIED"), "outcome truth label missing");

assert.ok(schoolUi.includes("Odeslat bezpečný výstup partnerovi"), "School deliverable projection action missing");
assert.ok(schoolUi.includes("raw evidence"), "School projection boundary missing");
assert.ok(schoolUi.includes("Rozhodnutí partnera"), "School adoption feedback view missing");

assert.ok(doc.includes("ACTIVITY != OUTPUT != ADOPTION != OUTCOME != IMPACT"), "R5 conceptual separation missing");
assert.ok(doc.includes("Partner reviews the **output**, never the human"), "R5 human boundary missing");
assert.ok(doc.includes("Production remains out of scope"), "production boundary missing");

console.log("PARTNER_REVIEW_ADOPTION_OUTCOME_R5=PASS");
