import test from "node:test";
import assert from "node:assert/strict";
import { resolveYoungPresentation, youngRouteForPresentation, normalizeYoungAccountSnapshot } from "../src/domain/young-experience.js";

const today = new Date("2026-09-19T12:00:00Z");
const dobForAge = (age) => `${today.getUTCFullYear() - age}-09-19`;

test("Young presentation splits stay inside canonical protected age routes", () => {
  assert.equal(resolveYoungPresentation({ dateOfBirth: dobForAge(6), today }).id, "explore");
  assert.equal(resolveYoungPresentation({ dateOfBirth: dobForAge(9), today }).id, "explore");
  assert.equal(resolveYoungPresentation({ dateOfBirth: dobForAge(10), today }).id, "quest");
  assert.equal(resolveYoungPresentation({ dateOfBirth: dobForAge(13), today }).id, "quest");
  assert.equal(resolveYoungPresentation({ dateOfBirth: dobForAge(14), today }).id, "impact");
  assert.equal(resolveYoungPresentation({ dateOfBirth: dobForAge(20), today }).id, "impact");
  assert.equal(resolveYoungPresentation({ dateOfBirth: dobForAge(21), today }), null);
});

test("presentation modes do not invent new authorization routes", () => {
  assert.equal(youngRouteForPresentation({ id: "explore" }), "/young/kids");
  assert.equal(youngRouteForPresentation({ id: "quest" }), "/young/kids");
  assert.equal(youngRouteForPresentation({ id: "impact" }), "/young/teens");
});
test("Young account snapshot exposes bounded progress without a person score", () => {
  const snapshot = normalizeYoungAccountSnapshot({
    source: "account",
    guardianStatuses: ["pending", "verified"],
    missionStatus: "completed",
    projectJoined: true,
    projectProgress: { completed: 1, total: 1, isComplete: true },
    portfolioCount: 3,
    organization: { name: "Třída A", role: "learner" },
    reputationScore: 999,
    xp: 9999,
  });
  assert.equal(snapshot.guardianState, "verified");
  assert.equal(snapshot.missionStatus, "completed");
  assert.deepEqual(snapshot.project, { joined: true, completed: 1, total: 1, isComplete: true });
  assert.equal(snapshot.portfolioCount, 3);
  assert.equal(snapshot.organization.name, "Třída A");
  assert.equal(Object.hasOwn(snapshot, "reputationScore"), false);
  assert.equal(Object.hasOwn(snapshot, "xp"), false);
});
