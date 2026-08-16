import assert from "node:assert/strict";
import {
  CANONICAL_DOMAIN_VERSION,
  PATHS,
  LABS,
  PROGRAMS,
  LEGACY_PATHS,
  LEGACY_LABS,
  LEGACY_PROGRAMS,
  getPath,
  getLab,
  getProgram,
  getCanonicalPathTargets,
  getCanonicalLabTargets,
  getCanonicalProgramTargets,
  requiresManualPathMigration,
} from "../src/lib/pansofieDomain.js";

const unique = (items) => new Set(items.map((item) => item.id)).size === items.length;

assert.equal(CANONICAL_DOMAIN_VERSION, "1.0");
assert.equal(PATHS.length, 7, "PANSOFIE V1.0 must expose exactly seven canonical development paths");
assert.equal(LABS.length, 5, "PANSOFIE V1.0 must expose exactly five canonical labs");
assert.equal(PROGRAMS.length, 4, "PANSOFIE V1.0 must expose exactly four canonical top-level programs");
assert.ok(unique(PATHS), "canonical path ids must be unique");
assert.ok(unique(LABS), "canonical lab ids must be unique");
assert.ok(unique(PROGRAMS), "canonical program ids must be unique");

assert.ok(!PATHS.some((item) => item.id === "charakter"), "legacy Charakter must not remain a canonical human scoring axis");
assert.ok(!PROGRAMS.some((item) => item.id === "generations"), "Generations is no longer a top-level canonical program");
assert.ok(!LABS.some((item) => item.id === "food-nature"), "legacy labs must not appear in the canonical list");

for (const legacy of LEGACY_PATHS) {
  assert.ok(getPath(legacy.id), `legacy path ${legacy.id} must remain resolvable`);
}
for (const legacy of LEGACY_LABS) {
  assert.ok(getLab(legacy.id), `legacy lab ${legacy.id} must remain resolvable`);
}
for (const legacy of LEGACY_PROGRAMS) {
  assert.ok(getProgram(legacy.id), `legacy program ${legacy.id} must remain resolvable`);
}

assert.deepEqual(getCanonicalPathTargets("zdravi"), ["ja-wellbeing"]);
assert.deepEqual(getCanonicalPathTargets("poznaní"), ["poznani-mysleni"]);
assert.equal(requiresManualPathMigration("charakter"), true, "ambiguous legacy character data must not be silently reclassified");
assert.deepEqual(getCanonicalLabTargets("food-nature"), ["nature"]);
assert.deepEqual(getCanonicalProgramTargets("generations"), ["community"]);

console.log("PANSOFIE canonical domain contract: PASS");
