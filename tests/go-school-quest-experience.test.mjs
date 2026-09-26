import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = async (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const [migration, hardening, cycle, schoolQuest, actions, route, workspace, schoolWorkspace, css, persistence] = await Promise.all([
  read("supabase/migrations/20260926120000_mission_learning_cycle.sql"),
  read("supabase/migrations/20260926121000_mission_learning_cycle_hardening.sql"),
  read("src/domain/mission-cycle.js"),
  read("src/domain/school-quest.js"),
  read("src/app/go/school/quest-actions.js"),
  read("src/app/go/school/quest/[assignmentId]/page.jsx"),
  read("src/components/experiences/SchoolQuestExperience.jsx"),
  read("src/components/experiences/SchoolGoWorkspace.jsx"),
  read("src/app/school-quest.css"),
  read("src/domain/mission-persistence.js"),
]);

test("mission cycle is canonical rather than school-specific duplication", () => {
  assert.match(migration, /create table if not exists public\.mission_run_cycle_progress/);
  assert.doesNotMatch(migration, /school_quest_steps|school_mission_cycle/i);
  assert.match(migration, /advance_mission_learning_cycle/);
  assert.match(migration, /LEARN → PLAY → DO → CREATE → SHARE → REFLECT/);
});

test("learning-cycle state is read-only to clients and RPC-only for mutation", () => {
  assert.match(hardening, /revoke insert, update, delete/);
  assert.match(hardening, /grant select on public\.mission_run_cycle_progress to authenticated/);
  assert.match(hardening, /drop policy if exists mission_cycle_insert_own_run_or_admin/);
  assert.match(hardening, /drop policy if exists mission_cycle_update_own_run_or_admin/);
});

test("starter school quest catalog covers AI, finance and cyber", () => {
  assert.match(migration, /'ai_education'/);
  assert.match(migration, /'financial_literacy'/);
  assert.match(migration, /'cyber_security'/);
  assert.match(migration, /'ai-detektiv-over-odpoved'/);
  assert.match(migration, /'rozpocet-pod-tlakem'/);
  assert.match(migration, /'phishing-pod-lupou'/);
});
test("six phase domain contract keeps the canonical order", () => {
  assert.match(cycle, /"learn",\s*"play",\s*"do",\s*"create",\s*"share",\s*"reflect"/s);
  assert.match(cycle, /normalizeMissionCycle/);
  assert.match(cycle, /normalizeCycleProgress/);
  assert.match(cycle, /QUEST_TOPIC_META/);
});

test("school quest loader is bound to the learners assignment-run link", () => {
  assert.match(schoolQuest, /school_mission_assignment_runs/);
  assert.match(schoolQuest, /\.eq\("user_id", userId\)/);
  assert.match(schoolQuest, /mission_run_cycle_progress/);
  assert.doesNotMatch(schoolQuest, /service_role|SUPABASE_SERVICE_ROLE_KEY/);
});

test("quest actions derive identity from auth and advance through database RPC", () => {
  assert.match(actions, /supabase\.auth\.getClaims\(\)/);
  assert.match(actions, /advance_mission_learning_cycle/);
  assert.match(actions, /loadOwnedSchoolQuestLink/);
  assert.doesNotMatch(actions, /input\.userId|input\.studentId|assigned_by/);
});

test("assigned canonical run becomes in_progress when the learner starts", () => {
  assert.match(persistence, /latest && latest\.status === "assigned"/);
  assert.match(persistence, /status: "in_progress"/);
  assert.match(persistence, /started_at: latest\.started_at \|\| now/);
});
test("student assignment opens the assignment-scoped quest route", () => {
  assert.match(schoolWorkspace, /`\/go\/school\/quest\/\$\{assignment\.id\}`/);
  assert.match(route, /requireUserContext/);
  assert.match(route, /loadSchoolQuestExperience/);
});

test("quest UI presents all six phases without public ranking", () => {
  assert.match(workspace, /CycleRail/);
  assert.match(workspace, /PrivateNotebook/);
  assert.match(workspace, /Dokončit misi/);
  assert.match(workspace, /Není to známka, osobní skóre/);
  assert.doesNotMatch(workspace, /leaderboard|žebříček/i);
});

test("quest visual system differentiates topics and protects accessibility basics", () => {
  for (const theme of ["ai", "finance", "cyber", "nature"]) {
    assert.match(css, new RegExp(`goq-theme-${theme}`));
    assert.match(css, new RegExp(`goq-theme-${theme} \.goq-visual`));
  }
  assert.match(workspace, /goq-cycle-head/);
  assert.match(workspace, /data-phase=\{phase\.id\}/);
  assert.equal(cycle.includes('glyph: "Kč/€"'), true);
  assert.equal(cycle.includes('glyph: "₿"'), false);
  assert.match(css, /font-size:12\.5px/);
  assert.match(css, /focus-visible/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /min-height:46px/);
  assert.match(css, /@media\(max-width:780px\)/);
});
