import test from "node:test";
import assert from "node:assert/strict";
import {
  DEVELOPMENT_PATHS,
  IMPACT_DIMENSIONS,
  LEARNING_CYCLE,
  LEARNING_DOMAINS,
  MISSION_GROW_001,
  PROGRAMS,
  validateMissionBlueprint,
} from "../src/domain/learning-core.js";
import { MISSIONS, PATHS } from "../src/domain/pansofie-content.js";

test("learning core exposes the canonical 16 domains", () => {
  assert.equal(LEARNING_DOMAINS.length, 16);
  assert.equal(new Set(LEARNING_DOMAINS.map((domain) => domain.id)).size, 16);
});

test("learning cycle is the six phase Pansofie method", () => {
  assert.deepEqual(LEARNING_CYCLE, ["learn", "play", "do", "create", "share", "reflect"]);
});

test("development paths match the seven source-defined Pansofie paths", () => {
  const expected = [
    ["body", "Tělo"], ["mind", "Mysl"], ["character", "Charakter"],
    ["relationships", "Vztahy"], ["creativity", "Tvořivost"],
    ["prosperity", "Prosperita"], ["meaning", "Smysl"],
  ];
  assert.deepEqual(DEVELOPMENT_PATHS.map(({ id, labelCs }) => [id, labelCs]), expected);
  assert.deepEqual(PATHS.map(([label]) => label), expected.map(([, label]) => label));
});

test("MISSION-GROW-001 is a valid Green Hope learning-core blueprint", () => {
  assert.equal(MISSION_GROW_001.program, "green_hope");
  assert.deepEqual(MISSION_GROW_001.domainIds, ["nature"]);
  assert.deepEqual(MISSION_GROW_001.pathIds, ["meaning"]);
  assert.equal(MISSION_GROW_001.documentationMode, "optional");
  assert.deepEqual(validateMissionBlueprint(MISSION_GROW_001), []);
  const growCard = MISSIONS.find((mission) => mission.id === "rostlina");
  assert.equal(growCard?.blueprintId, MISSION_GROW_001.id);
  assert.equal(growCard?.programId, "green_hope");
  assert.deepEqual(growCard?.learningCycle, MISSION_GROW_001);
  assert.match(
    validateMissionBlueprint({ ...MISSION_GROW_001, pathIds: ["collaboration"] })[0],
    /canonical development path ids/,
  );
});

test("impact model keeps eight independent dimensions", () => {
  assert.equal(IMPACT_DIMENSIONS.length, 8);
  assert.equal(new Set(IMPACT_DIMENSIONS).size, 8);
});

test("mission blueprints use development level rather than fixed age gates", () => {
  const valid = {
    program: PROGRAMS[0],
    difficulty: 2,
    developmentLevelMin: 2,
    developmentLevelMax: 4,
    learn: "Zjisti základní princip.",
    play: "Vyzkoušej krátkou hru.",
    do: "Udělej reálný krok.",
    create: "Vytvoř výsledek.",
    share: "Sdílej výsledek bezpečným způsobem.",
    reflect: "Zhodnoť, co ses naučil.",
  };
  assert.deepEqual(validateMissionBlueprint(valid), []);
  assert.match(validateMissionBlueprint({ ...valid, ageMin: 12 })[0], /not allowed/);
});
