import test from "node:test";
import assert from "node:assert/strict";
import {
  IMPACT_DIMENSIONS,
  LEARNING_CYCLE,
  LEARNING_DOMAINS,
  PROGRAMS,
  validateMissionBlueprint,
} from "../src/domain/learning-core.js";

test("learning core exposes the canonical 16 domains", () => {
  assert.equal(LEARNING_DOMAINS.length, 16);
  assert.equal(new Set(LEARNING_DOMAINS.map((domain) => domain.id)).size, 16);
});

test("learning cycle is the six phase Pansofie method", () => {
  assert.deepEqual(LEARNING_CYCLE, ["learn", "play", "do", "create", "share", "reflect"]);
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
