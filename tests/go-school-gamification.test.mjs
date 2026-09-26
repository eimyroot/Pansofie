import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { summarizeClassMilestones } from "../src/domain/school-gamification.js";

const read = async (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("cooperative class milestones aggregate completion without ranking people", () => {
  const none = summarizeClassMilestones([]);
  assert.equal(none.achievedCount, 0);

  const first = summarizeClassMilestones([
    { status: "completed" }, { status: "in_progress" }, { status: "assigned" }, { status: "assigned" },
  ]);
  assert.deepEqual(first.milestones.map((item) => item.achieved), [true, false, false]);

  const half = summarizeClassMilestones([
    { status: "completed" }, { status: "completed" }, { status: "in_progress" }, { status: "assigned" },
  ]);
  assert.deepEqual(half.milestones.map((item) => item.achieved), [true, true, false]);

  const all = summarizeClassMilestones([
    { status: "completed" }, { status: "completed" },
  ]);
  assert.deepEqual(all.milestones.map((item) => item.achieved), [true, true, true]);
});

test("private XP is derived once per completed canonical mission, not from a mutable user ledger", async () => {
  const domain = await read("src/domain/school-gamification.js");
  assert.match(domain, /school_mission_assignment_runs/);
  assert.match(domain, /mission_runs/);
  assert.match(domain, /\.eq\("status", "completed"\)/);
  assert.match(domain, /new Set/);
  assert.match(domain, /mission_game_rewards/);
  assert.doesNotMatch(domain, /insert|update|upsert/i);
});
test("gamification metadata stays private and contains no leaderboard schema", async () => {
  const migration = await read("supabase/migrations/20260926140000_private_go_gamification.sql");
  assert.match(migration, /visibility text not null default 'private'/);
  assert.match(migration, /mission_game_rewards/);
  assert.match(migration, /xp_reward/);
  assert.doesNotMatch(migration, /user_xp|student_leaderboard|reputation_scores/i);
  assert.doesNotMatch(migration, /grant insert|grant update|grant delete/i);
});

test("school UX shows private game progress while staff roster never gains per-student XP", async () => {
  const [workspace, schoolDomain, questUi] = await Promise.all([
    read("src/components/experiences/SchoolGoWorkspace.jsx"),
    read("src/domain/school-go.js"),
    read("src/components/experiences/SchoolQuestExperience.jsx"),
  ]);
  assert.match(workspace, /SOUKROMÝ HERNÍ POSTUP/);
  assert.match(workspace, /Milníky třídy/);
  assert.match(workspace, /Neurčuje nejlepšího studenta ani osobní reputaci/);
  const roster = workspace.slice(workspace.indexOf("function StudentRoster"), workspace.indexOf("function PrivateGamification"));
  assert.doesNotMatch(roster, /XP|badge|odznak/i);
  assert.match(schoolDomain, /loadLearnerSchoolGamification/);
  assert.match(schoolDomain, /summarizeClassMilestones/);
  assert.match(questUi, /Soukromá herní odměna/);
  assert.match(questUi, /jen herní postup/);
  assert.doesNotMatch(workspace, /leaderboard|žebříček třídy|rank/i);
});
