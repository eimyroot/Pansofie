import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { PROJECT_GREEN_HOPE_GROW_001 } from "../src/domain/project-core.js";
import {
  normalizeProjectProgress,
  validateProjectParticipationDraft,
} from "../src/domain/project-persistence.js";

test("project participation draft keeps individual and team contexts explicit", () => {
  assert.deepEqual(validateProjectParticipationDraft({
    slug: PROJECT_GREEN_HOPE_GROW_001.slug,
    participationMode: "individual",
    organizationId: null,
  }), []);
  assert.match(validateProjectParticipationDraft({
    slug: PROJECT_GREEN_HOPE_GROW_001.slug,
    participationMode: "team",
    organizationId: null,
  })[0], /requires organizationId/);
  assert.match(validateProjectParticipationDraft({
    slug: PROJECT_GREEN_HOPE_GROW_001.slug,
    participationMode: "individual",
    organizationId: "org-1",
  })[0], /cannot carry organizationId/);
});

test("persisted project progress normalizes without inventing an aggregate score", () => {
  assert.deepEqual(normalizeProjectProgress(null), { completed: 0, total: 0, isComplete: false });
  assert.deepEqual(normalizeProjectProgress({
    completed_missions: 1,
    total_missions: 1,
    is_complete: true,
  }), { completed: 1, total: 1, isComplete: true });
});

test("Project Core migration reuses canonical mission execution and RLS", () => {
  const migration = readFileSync("supabase/migrations/20260919070000_project_core_foundation.sql", "utf8");
  assert.match(migration, /create table if not exists public\.projects/);
  assert.match(migration, /create table if not exists public\.project_participations/);
  assert.match(migration, /create or replace view public\.user_project_progress/);
  assert.match(migration, /security_invoker = true/);
  assert.match(migration, /left join public\.mission_runs mr/);
  assert.doesNotMatch(migration, /create table if not exists public\.project_mission_runs/);
  assert.doesNotMatch(migration, /create table if not exists public\.project_evidence/);
  assert.match(migration, new RegExp(PROJECT_GREEN_HOPE_GROW_001.id));
  assert.match(migration, new RegExp(PROJECT_GREEN_HOPE_GROW_001.slug));
});

test("GO project persistence derives account identity on the server", () => {
  const actions = readFileSync("src/app/go/actions.js", "utf8");
  const workspace = readFileSync("src/components/experiences/GoWorkspace.jsx", "utf8");
  const state = readFileSync("src/state/PansofieContext.jsx", "utf8");
  assert.match(actions, /supabase\.auth\.getClaims\(\)/);
  assert.match(actions, /claims\?\.sub/);
  assert.match(actions, /export async function joinProjectAction\(slug\)/);
  assert.doesNotMatch(actions, /joinProjectAction\(slug, userId/);
  assert.match(workspace, /joinProjectAction\(project\.slug\)/);
  assert.match(workspace, /loadProjectStateAction\(project\.slug\)/);
  assert.match(state, /syncProjectParticipation\(project, participation\)/);
  assert.match(state, /storage: "account"/);
});

test("account rejoin updates state without upserting immutable participation identity", () => {
  const persistence = readFileSync("src/domain/project-persistence.js", "utf8");
  assert.match(persistence, /\.update\(\{/);
  assert.match(persistence, /\.insert\(\{/);
  assert.doesNotMatch(persistence, /\.upsert\(/);
  assert.match(persistence, /\.eq\("id", existing\.id\)/);
});
