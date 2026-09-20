import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { MISSION_GROW_001 } from "../src/domain/learning-core.js";
import {
  GROW_ROUTE_ID,
  GROW_MISSION_PRESENTATIONS,
  getGrowMissionCard,
  getGrowMissionPresentation,
  missionLearningSteps,
} from "../src/domain/mission-presentation.js";

test("grow mission has one canonical blueprint across presentation surfaces", () => {
  assert.equal(GROW_ROUTE_ID, "rostlina");
  assert.equal(getGrowMissionCard().blueprintId, MISSION_GROW_001.id);
  assert.equal(getGrowMissionCard().documentationMode, "optional");
  assert.deepEqual(Object.keys(GROW_MISSION_PRESENTATIONS), ["public", "kids", "teens", "go"]);
  assert.equal(getGrowMissionPresentation("public").title, MISSION_GROW_001.titleCs);
  assert.equal(getGrowMissionPresentation("teens").title, MISSION_GROW_001.titleCs);
  assert.equal(getGrowMissionPresentation("go").title, MISSION_GROW_001.titleCs);
});

test("grow mission presentation preserves the six phase learning cycle", () => {
  const steps = missionLearningSteps();
  assert.deepEqual(steps.map((step) => step.id), ["learn", "play", "do", "create", "share", "reflect"]);
  assert.deepEqual(steps.map((step) => step.textCs), [
    MISSION_GROW_001.learn, MISSION_GROW_001.play, MISSION_GROW_001.do,
    MISSION_GROW_001.create, MISSION_GROW_001.share, MISSION_GROW_001.reflect,
  ]);
});

test("public, Young and GO surfaces link the same first mission", () => {
  const root = process.cwd();
  const files = {
    public: readFileSync(join(root, "src/legacy-pages/PublicProductPage.jsx"), "utf8"),
    publicMission: readFileSync(join(root, "src/legacy-pages/MissionDetail.jsx"), "utf8"),
    young: readFileSync(join(root, "src/components/experiences/YoungWorkspace.jsx"), "utf8"),
    go: readFileSync(join(root, "src/components/experiences/GoWorkspace.jsx"), "utf8"),
  };
  assert.match(files.public, /\/mise\/\$\{GROW_ROUTE_ID\}/);
  assert.match(files.publicMission, /getGrowMissionCard/);
  assert.match(files.young, /\/go\/mise-grow/);
  assert.match(files.go, /screen==="mise-grow"/);
  assert.match(files.go, /Záznam volitelný/);
});
