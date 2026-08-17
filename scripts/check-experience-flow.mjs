import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const [flowSql, hardeningSql, learnerDirectorySql, service, app, hub, detail, portfolio] = await Promise.all([
  read("supabase/migrations/20260817003000_school_experience_flow.sql"),
  read("supabase/migrations/20260817003100_school_experience_integrity.sql"),
  read("supabase/migrations/20260817053000_school_assignable_learner_directory.sql"),
  read("src/lib/pansofieExperienceFlow.js"),
  read("src/App.jsx"),
  read("src/pages/SchoolHub.jsx"),
  read("src/pages/SchoolRunDetail.jsx"),
  read("src/pages/Portfolio.jsx"),
]);

const lowerSql = `${flowSql}\n${hardeningSql}\n${learnerDirectorySql}`.toLowerCase();

for (const fn of [
  "pansofie_assign_school_mission",
  "pansofie_start_mission",
  "pansofie_submit_mission",
  "pansofie_review_school_run",
  "pansofie_finalize_school_experience",
]) {
  assert.ok(lowerSql.includes(`function public.${fn}`), `missing governed SQL function ${fn}`);
  assert.ok(lowerSql.includes(`grant execute on function public.${fn}`), `missing authenticated grant for ${fn}`);
}

assert.ok(lowerSql.includes("school_mission_assignment"), "assignment must be purpose-gated");
assert.ok(lowerSql.includes("school_mission_review"), "final review must be purpose-gated");
assert.ok(lowerSql.includes("school_evidence_review"), "evidence review purpose must stay distinct");
assert.ok(lowerSql.includes("school_reflection_review"), "reflection review purpose must stay distinct");
assert.ok(lowerSql.includes("at least one evidence item is required"), "submission must require evidence");
assert.ok(lowerSql.includes("reflection with what_learned is required"), "submission must require reflection");
assert.ok(lowerSql.includes("confirmed mission review required"), "finalization must require independent confirmed review");
assert.ok(lowerSql.includes("'private'"), "new Passport entries must remain private by default");

assert.ok(lowerSql.includes("evidence_freeze_after_submission"), "evidence freeze trigger missing");
assert.ok(lowerSql.includes("reflection_freeze_after_submission"), "reflection freeze trigger missing");
assert.ok(lowerSql.includes("experience_review_events"), "append-only review event evidence missing");
assert.ok(lowerSql.includes("reset because mission was reopened for revision"), "reopen must invalidate stale confirmed reviews");
assert.ok(lowerSql.includes("set status = 'in_progress'"), "needs_revision must reopen submitted mission");
assert.ok(lowerSql.includes("non-pending review decisions require submitted run"), "teacher decision lifecycle guard missing");

assert.ok(lowerSql.includes("function public.pansofie_list_assignable_school_learners"), "assignable learner directory RPC missing");
assert.ok(lowerSql.includes("school_mission_assignment"), "assignable learner directory must remain purpose-scoped");
assert.ok(lowerSql.includes("array['teacher', 'coordinator']"), "assignable learner directory must require teacher/coordinator role");
assert.ok(lowerSql.includes("revoke execute on function public.pansofie_list_assignable_school_learners(uuid[]) from anon"), "assignable learner directory must deny anon execute");

for (const destructive of [
  "drop table public.profiles",
  "drop table public.user_roles",
  "alter table public.profiles",
  "alter table public.user_roles",
  "delete from public.profiles",
  "delete from public.user_roles",
]) {
  assert.ok(!lowerSql.includes(destructive), `R0.3 must not mutate auth foundation: ${destructive}`);
}

assert.ok(service.includes('supabase.rpc("pansofie_list_assignable_school_learners"'), "client must use governed learner-directory RPC");
assert.ok(service.includes('supabase.rpc("pansofie_assign_school_mission"'), "client must use governed assignment RPC");
assert.ok(service.includes('supabase.rpc("pansofie_submit_mission"'), "client must use governed submission RPC");
assert.ok(service.includes('supabase.rpc("pansofie_review_school_run"'), "client must use governed review RPC");
assert.ok(service.includes('supabase.rpc("pansofie_finalize_school_experience"'), "client must use governed finalization RPC");

assert.ok(app.includes('path="/skola"'), "School hub route missing");
assert.ok(app.includes('path="/skola/mise/:runId"'), "School run detail route missing");
assert.ok(hub.includes("PANSOFIE SCHOOL"), "School hub must identify canonical program");
assert.ok(hub.includes("Přiřadit misi"), "Teacher assignment UI missing");
assert.ok(detail.includes("Odeslat ke kontrole"), "learner submission UI missing");
assert.ok(detail.includes("Kontrola zkušenosti"), "teacher review UI missing");
assert.ok(detail.includes("Důkazy žáka"), "teacher must be able to inspect purpose-scoped evidence");
assert.ok(detail.includes("Reflexe žáka"), "teacher must be able to inspect purpose-scoped reflection");
assert.ok(detail.includes("Co doplnit"), "learner revision feedback UI missing");
assert.ok(detail.includes("Dokončit a zapsat do Passportu"), "final Experience/Passport action missing");
assert.ok(portfolio.includes("Nezobrazujeme náhradní nebo smyšlené položky"), "Passport must not fake user evidence when DB is unavailable");

console.log("PANSOFIE R0.3 school Experience flow contract: PASS");
