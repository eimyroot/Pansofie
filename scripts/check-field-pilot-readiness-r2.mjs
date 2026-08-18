import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const [r2, dates, service, readinessUi, operationsUi] = await Promise.all([
  read("supabase/migrations/20260818181000_field_pilot_readiness_measurement_r2.sql"),
  read("supabase/migrations/20260818182000_field_pilot_readiness_dates_r2.sql"),
  read("src/lib/pansofieExperienceFlow.js"),
  read("src/components/pansofie/PilotReadinessPanel.jsx"),
  read("src/components/pansofie/PilotOperationsPanel.jsx"),
]);

const sql = `${r2}\n${dates}`.toLowerCase();

for (const table of [
  "pilot_cohort_experience_plan",
  "pilot_responsibilities",
  "pilot_teacher_load_entries",
  "pilot_incidents",
]) {
  assert.ok(sql.includes(`table if not exists public.${table}`), `missing R2 table ${table}`);
  assert.ok(sql.includes(`alter table public.${table} enable row level security`), `RLS missing for ${table}`);
}

for (const responsibility of [
  "pilot_lead",
  "safeguarding",
  "privacy_data",
  "technical_incident",
  "partner_contact",
  "pansofie_operator",
]) {
  assert.ok(sql.includes(`'${responsibility}'`), `missing required responsibility ${responsibility}`);
}

for (const fn of [
  "pansofie_seed_canonical_pilot_plan",
  "pansofie_set_pilot_responsibility",
  "pansofie_record_teacher_load",
  "pansofie_report_pilot_incident",
  "pansofie_set_pilot_incident_status",
  "pansofie_pilot_readiness",
  "pansofie_activate_pilot_cohort",
  "pansofie_pilot_metrics",
  "pansofie_set_pilot_cohort_dates",
]) {
  assert.ok(sql.includes(`function public.${fn}`), `missing governed R2 function ${fn}`);
  assert.ok(sql.includes(`grant execute on function public.${fn}`), `missing authenticated execute grant for ${fn}`);
}

for (const slug of ["zlepsi-svou-skolu", "digitalni-most", "circular-challenge"]) {
  assert.ok(sql.includes(slug), `canonical pilot plan missing ${slug}`);
}

assert.ok(sql.includes("plan_count = 3"), "readiness must require exactly 3 planned Experiences");
assert.ok(sql.includes("responsibility_count = 6"), "readiness must require all 6 responsibilities");
assert.ok(sql.includes("active_learners > 0"), "readiness must require real learners");
assert.ok(sql.includes("team_learners = active_learners"), "all active learners must be team-bound");
assert.ok(sql.includes("learners_missing_basis = 0"), "readiness must fail closed on missing assignment basis");
assert.ok(sql.includes("unresolved_s2_s3 = 0"), "readiness must fail closed on unresolved S2/S3");
assert.ok(sql.includes("dates_ready"), "readiness must require bounded pilot dates");

for (const metric of [
  "second_experience_rate_percent",
  "completion_2_of_3_rate_percent",
  "median_teacher_overhead_minutes_per_week",
  "unresolved_s2_s3",
]) {
  assert.ok(sql.includes(`'${metric}'`), `missing pilot evidence metric ${metric}`);
}
assert.ok(sql.includes("'automatic_go_stop_decision', false"), "metrics must not automate GO/STOP decision");
assert.ok(sql.includes("'second_experience_rate_percent', 60"), "SER candidate threshold drifted");
assert.ok(sql.includes("'completion_2_of_3_rate_percent', 70"), "2/3 completion candidate threshold drifted");
assert.ok(sql.includes("'median_teacher_overhead_minutes_per_week_max', 30"), "teacher-load threshold drifted");
assert.ok(sql.includes("'unresolved_s2_s3_max', 0"), "safety incident threshold drifted");

for (const rpc of [
  "pansofie_pilot_readiness",
  "pansofie_pilot_metrics",
  "pansofie_set_pilot_responsibility",
  "pansofie_record_teacher_load",
  "pansofie_report_pilot_incident",
  "pansofie_set_pilot_incident_status",
  "pansofie_activate_pilot_cohort",
]) {
  assert.ok(service.includes(`supabase.rpc(\"${rpc}\"`), `client missing governed RPC ${rpc}`);
}

assert.ok(readinessUi.includes("Field Pilot Readiness R2"), "readiness UI marker missing");
assert.ok(readinessUi.includes("Aktivovat field pilot"), "explicit activation action missing");
assert.ok(readinessUi.includes("Second Experience Rate"), "SER indicator missing from UI");
assert.ok(readinessUi.includes("Automatic GO/STOP"), "human review boundary missing from UI");
assert.ok(readinessUi.includes("nejsou skóre člověka"), "anti-human-scoring boundary missing from UI");
assert.ok(operationsUi.includes('type="date"'), "bounded pilot date inputs missing");
assert.ok(operationsUi.includes("Field pilot zůstává planned"), "planned-until-ready UX boundary missing");

console.log("FIELD_PILOT_READINESS_MEASUREMENT_R2=PASS");
