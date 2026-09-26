import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { MISSION_GROW_001 } from "../src/domain/learning-core.js";
import { PROJECTS } from "../src/domain/pansofie-content.js";
import {
  PROJECT_GREEN_HOPE_GROW_001,
  deriveProjectProgress,
  validateProjectBlueprint,
} from "../src/domain/project-core.js";

test("Green Hope project core references the canonical grow mission", () => {
  assert.deepEqual(validateProjectBlueprint(PROJECT_GREEN_HOPE_GROW_001), []);
  assert.deepEqual(PROJECT_GREEN_HOPE_GROW_001.missionIds, [MISSION_GROW_001.id]);
  assert.equal(PROJECT_GREEN_HOPE_GROW_001.program, "green_hope");
  assert.equal(PROJECT_GREEN_HOPE_GROW_001.modelOnly, true);
  assert.equal(PROJECT_GREEN_HOPE_GROW_001.documentationMode, "optional");
  assert.equal(PROJECT_GREEN_HOPE_GROW_001.locationPolicy, "coarse_only");
});

test("project impact remains multidimensional and contains no aggregate score", () => {
  assert.deepEqual(PROJECT_GREEN_HOPE_GROW_001.impactDimensionIds, ["knowledge", "skills", "nature"]);
  assert.equal(Object.hasOwn(PROJECT_GREEN_HOPE_GROW_001, "impactScore"), false);
  assert.equal(Object.hasOwn(PROJECT_GREEN_HOPE_GROW_001, "reputationScore"), false);
  assert.equal(Object.hasOwn(PROJECT_GREEN_HOPE_GROW_001, "leaderboard"), false);
});

test("project progress is derived from canonical mission state", () => {
  assert.deepEqual(deriveProjectProgress(PROJECT_GREEN_HOPE_GROW_001, {}), { completed: 0, total: 1, isComplete: false });
  assert.deepEqual(
    deriveProjectProgress(PROJECT_GREEN_HOPE_GROW_001, { [MISSION_GROW_001.id]: { status: "completed" } }),
    { completed: 1, total: 1, isComplete: true },
  );
});

test("public content card maps the model project to the project blueprint", () => {
  const card = PROJECTS.find((project) => project.blueprintId === PROJECT_GREEN_HOPE_GROW_001.id);
  assert.equal(card?.title, PROJECT_GREEN_HOPE_GROW_001.titleCs);
  assert.equal(card?.modelOnly, true);
  assert.deepEqual(card?.missionIds, [MISSION_GROW_001.id]);
});

test("Green Hope public page and GO expose the same project core", () => {
  const publicPage = readFileSync("src/legacy-pages/PublicProductPage.jsx", "utf8");
  const go = readFileSync("src/components/experiences/GoWorkspace.jsx", "utf8");
  const actions = readFileSync("src/app/go/actions.js", "utf8");
  assert.match(publicPage, /\/go\/projekt-green-grow/);
  assert.match(go, /screen==="projekt-green-grow"/);
  assert.match(go, /loadProjectStateAction/);
  assert.match(actions, /loadProjectAccountState/);
  assert.match(go, /DIMENZE, KTERÉ PROJEKT MŮŽE SLEDOVAT/);
  assert.match(go, /accountJoined/);
  assert.match(go, /progress/);
});
