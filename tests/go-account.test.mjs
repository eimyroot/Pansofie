import test from "node:test";
import assert from "node:assert/strict";
import { normalizeGoAccountSnapshot } from "../src/domain/go-experience.js";

test("GO account snapshot prefers active mission as next action", () => {
  const state = normalizeGoAccountSnapshot({
    source: "account",
    activeMissions: [{ id: "r1", slug: "vypestuj-prvni-rostlinu", title: "Vypěstuj první rostlinu", href: "/go/mise-grow" }],
    activeProjects: [{ id: "p1", slug: "komunitni-zahrada", title: "Komunitní zahrada", href: "/go/projekt-green-grow", progress: { isComplete: false } }],
    portfolioCount: 2,
  });
  assert.equal(state.source, "account");
  assert.equal(state.nextAction.kind, "mission");
  assert.equal(state.nextAction.href, "/go/mise-grow");
  assert.equal(state.portfolioCount, 2);
});

test("GO account snapshot falls back to project, then mission discovery", () => {
  const project = normalizeGoAccountSnapshot({ activeProjects: [{ slug: "komunitni-zahrada", progress: { isComplete: false } }] });
  assert.equal(project.nextAction.kind, "project");
  assert.equal(project.nextAction.href, "/go/projekt-green-grow");
  const empty = normalizeGoAccountSnapshot();
  assert.deepEqual(empty.nextAction, { label: "Vybrat první misi", href: "/go/mise", kind: "discover" });
});

test("GO account snapshot keeps completed work, memberships and real profile context", () => {
  const state = normalizeGoAccountSnapshot({
    source: "account",
    profile: { displayName: "Ada", accountContext: "school", experience: "adult_school" },
    completedMissions: [{ id: "done-1", status: "completed" }],
    organizationMemberships: [{ id: "mem-1", role: "teacher", organization: { name: "Škola" } }],
    skillAttestations: [{ id: "att-1", level: 1, skill: { code: "ecological_thinking", titleCs: "Ekologické myšlení" } }],
    impactObservations: [{ id: "imp-1", dimension: "nature", metricKey: "grow.documented_observation", valueNumeric: 1 }],
  });
  assert.equal(state.profile.displayName, "Ada");
  assert.equal(state.profile.accountContext, "school");
  assert.equal(state.completedMissions.length, 1);
  assert.equal(state.organizationMemberships.length, 1);
  assert.equal(state.skillAttestations[0].skill.code, "ecological_thinking");
  assert.equal(state.impactObservations[0].dimension, "nature");
});
