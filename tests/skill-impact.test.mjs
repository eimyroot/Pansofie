import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { GROW_IMPACT_DIMENSION, GROW_IMPACT_METRIC } from "../src/domain/skill-impact.js";
import { MISSION_GROW_001, SKILL_ECOLOGICAL_THINKING } from "../src/domain/learning-core.js";

const read = (path) => fs.readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("Grow has one canonical ecological thinking skill and nature observation contract", () => {
  assert.deepEqual(MISSION_GROW_001.skillCodes, ["ecological_thinking"]);
  assert.deepEqual(MISSION_GROW_001.impactDimensionIds, ["nature"]);
  assert.equal(SKILL_ECOLOGICAL_THINKING.domainId, "nature");
  assert.equal(GROW_IMPACT_DIMENSION, "nature");
  assert.equal(GROW_IMPACT_METRIC, "grow.documented_observation");
});

test("M8.4 persistence requires completed owned evidence and does not infer impact from completion", () => {
  const code = read("src/domain/skill-impact.js");
  assert.match(code, /\.eq\("status", "completed"\)/);
  assert.match(code, /metadata\?\.source === "go_optional_note"/);
  assert.match(code, /skill_attestations/);
  assert.match(code, /impact_observations/);
  assert.match(code, /attestation_type: "self"/);
  assert.match(code, /value_numeric: 1/);
  assert.doesNotMatch(code, /score|leaderboard|reputation/i);
});

test("M8.4 migration hardens self attestation and impact inserts", () => {
  const sql = read("supabase/migrations/20260920043000_grow_skill_impact.sql");
  assert.match(sql, /ecological_thinking/);
  assert.match(sql, /r\.status = 'completed'/);
  assert.match(sql, /evidence_id is not null/);
  assert.match(sql, /impact_observations_user_dimension_metric_evidence_uidx/);
  assert.match(sql, /on delete cascade/);
  assert.doesNotMatch(sql, /aggregate.*score|reputation score|leaderboard/i);
});
