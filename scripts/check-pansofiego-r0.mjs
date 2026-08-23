import assert from "node:assert/strict";
import { IMPACT_LAYERS, QUESTS, computeScenarioHarmony } from "../src/lib/pansofieQuestEngine.js";

const expectedLayers = ["priroda", "spolecnost", "technologie", "vedomi"];
assert.deepEqual(IMPACT_LAYERS.map((layer) => layer.id), expectedLayers, "PansofieGO impact layers drifted");
assert.ok(QUESTS.length >= 1, "PansofieGO must contain at least one bounded scenario");

const serialized = JSON.stringify(QUESTS);
for (const forbidden of ["personalityType", "playerLevel", "consciousnessLevel", "xpByTrait", "humanWorth", "diagnosis"]) {
  assert.equal(serialized.includes(forbidden), false, `forbidden person-scoring field present: ${forbidden}`);
}

for (const quest of QUESTS) {
  assert.ok(quest.id, "quest id missing");
  assert.ok(quest.missionId, `quest ${quest.id} must bind to an existing mission id`);
  assert.equal(quest.choices.length >= 2, true, `quest ${quest.id} must expose real trade-offs`);
  assert.equal(quest.reflectionPrompts.length >= 3, true, `quest ${quest.id} must end in reflection`);

  for (const choice of quest.choices) {
    for (const layer of expectedLayers) {
      assert.equal(typeof choice.impact[layer], "number", `${quest.id}/${choice.id}: ${layer} missing`);
      assert.ok(choice.impact[layer] >= 0 && choice.impact[layer] <= 100, `${quest.id}/${choice.id}: ${layer} out of range`);
    }
  }
}

assert.equal(
  computeScenarioHarmony({ priroda: 80, spolecnost: 80, technologie: 80, vedomi: 80 }),
  80,
  "balanced scenario should preserve its mean",
);
assert.ok(
  computeScenarioHarmony({ priroda: 80, spolecnost: 80, technologie: 80, vedomi: 80 }) >
    computeScenarioHarmony({ priroda: 100, spolecnost: 10, technologie: 100, vedomi: 10 }),
  "imbalance must reduce scenario harmony",
);

console.log("PANSOFIEGO_R0=PASS");
