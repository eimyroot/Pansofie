import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const migration = await readFile(
  new URL("../supabase/migrations/20260926100000_go_school_mission_assignment.sql", import.meta.url),
  "utf8",
);
const domain = await readFile(
  new URL("../src/domain/school-mission-assignment.js", import.meta.url),
  "utf8",
);
const actions = await readFile(
  new URL("../src/app/go/school/actions.js", import.meta.url),
  "utf8",
);

test("school assignment stays a thin layer over canonical missions and runs", () => {
  assert.match(migration, /references public\.missions\(id\)/);
  assert.match(migration, /references public\.mission_runs\(id\)/);
  assert.match(migration, /insert into public\.mission_runs/);
  assert.doesNotMatch(migration, /create table[^;]+school_mission_runs/i);
  assert.doesNotMatch(migration, /create table[^;]+quest_assignments/i);
});

test("assignment RPC derives actor from auth and only accepts governed targets", () => {
  assert.match(migration, /actor_id uuid := auth\.uid\(\)/);
  assert.match(migration, /public\.can_assign_school_mission\(target_class_id\)/);
  assert.match(migration, /m\.status = 'published'/);
  assert.match(migration, /scm\.role = 'learner'/);
  assert.doesNotMatch(migration, /assigned_by uuid default/i);
});

test("learner assignment links are private from peer learners", () => {
  assert.match(
    migration,
    /user_id = \(select auth\.uid\(\)\)[\s\S]+public\.is_school_class_staff\(sma\.class_id\)/,
  );
  assert.doesNotMatch(
    migration,
    /school_mission_assignment_runs[\s\S]+can_view_school_mission_assignment\(assignment_id\)/,
  );
});

test("assignment cancellation preserves canonical learner work", () => {
  const cancelStart = migration.indexOf("create or replace function public.cancel_school_mission_assignment");
  const cancelEnd = migration.indexOf("revoke execute on function public.assign_school_mission", cancelStart);
  const cancelBody = migration.slice(cancelStart, cancelEnd);
  assert.match(cancelBody, /update public\.school_mission_assignments/);
  assert.doesNotMatch(cancelBody, /update public\.mission_runs/);
  assert.doesNotMatch(cancelBody, /delete from public\.mission_runs/);
});
test("server action keeps caller identity out of the client contract", () => {
  assert.match(actions, /supabase\.auth\.getClaims\(\)/);
  assert.match(actions, /assignSchoolMission\(auth\.supabase/);
  assert.doesNotMatch(actions, /input\.assignedBy/);
  assert.doesNotMatch(actions, /input\.actorId/);
  assert.match(domain, /rpc\("assign_school_mission"/);
  assert.match(domain, /target_learner_id: targetLearnerId \|\| null/);
});

test("assignment reuses an existing non-cancelled canonical run", () => {
  assert.match(
    migration,
    /mr\.mission_id = target_mission_id[\s\S]+mr\.user_id = learner_id[\s\S]+mr\.status <> 'cancelled'/,
  );
  assert.match(migration, /if resolved_run_id is null then[\s\S]+insert into public\.mission_runs/);
});
