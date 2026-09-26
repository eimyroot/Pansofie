export const MISSION_CYCLE = Object.freeze([
  "learn",
  "play",
  "do",
  "create",
  "share",
  "reflect",
]);

export const MISSION_CYCLE_META = Object.freeze({
  learn: { label: "Poznej", kicker: "LEARN", symbol: "01" },
  play: { label: "Zkus", kicker: "PLAY", symbol: "02" },
  do: { label: "Udělej", kicker: "DO", symbol: "03" },
  create: { label: "Vytvoř", kicker: "CREATE", symbol: "04" },
  share: { label: "Sdílej", kicker: "SHARE", symbol: "05" },
  reflect: { label: "Reflektuj", kicker: "REFLECT", symbol: "06" },
});

export const QUEST_TOPIC_META = Object.freeze({
  ai_education: { label: "AI VE ŠKOLE", theme: "ai", glyph: "AI" },
  financial_literacy: { label: "FINANČNÍ GRAMOTNOST", theme: "finance", glyph: "Kč/€" },
  cyber_security: { label: "KYBERBEZPEČNOST", theme: "cyber", glyph: "⌾" },
  nature: { label: "PŘÍRODA", theme: "nature", glyph: "✦" },
});
export function normalizeMissionCycle(mission = {}) {
  const source = mission.learning_cycle && typeof mission.learning_cycle === "object"
    ? mission.learning_cycle
    : {};
  return MISSION_CYCLE.map((id) => ({
    id,
    ...MISSION_CYCLE_META[id],
    text: String(source[id] || fallbackPhaseText(id, mission)).trim(),
  }));
}

function fallbackPhaseText(id, mission) {
  const title = mission.title || "tuto misi";
  const summary = mission.summary || "Prozkoumej zadání a udělej další konkrétní krok.";
  return {
    learn: mission.why || summary,
    play: `Vyzkoušej si bezpečně jeden malý způsob, jak se v tématu „${title}“ zorientovat.`,
    do: `Proveď hlavní praktický krok mise „${title}“ a sleduj, co se opravdu stane.`,
    create: mission.evidence_prompt || "Vytvoř jednoduchý výstup, který zachytí, co jsi udělal/a nebo zjistil/a.",
    share: mission.contribution_prompt || "Sdílej bezpečně to, co je užitečné pro ostatní, bez osobních nebo citlivých údajů.",
    reflect: mission.reflection_prompt || "Pojmenuj, co ses naučil/a, co nefungovalo a co bys příště udělal/a jinak.",
  }[id];
}
export function normalizeCycleProgress(row) {
  const completed = Array.isArray(row?.completed_phases)
    ? row.completed_phases.filter((id) => MISSION_CYCLE.includes(id))
    : [];
  const current = MISSION_CYCLE.includes(row?.current_phase)
    ? row.current_phase
    : MISSION_CYCLE[Math.min(completed.length, MISSION_CYCLE.length - 1)];
  return {
    currentPhase: current || "learn",
    completedPhases: completed,
    completedCount: completed.length,
    percent: Math.round((completed.length / MISSION_CYCLE.length) * 100),
    isCycleComplete: completed.length === MISSION_CYCLE.length,
  };
}

export function topicMeta(topicKey) {
  return QUEST_TOPIC_META[topicKey] || {
    label: String(topicKey || "PANSOFIE GO").replaceAll("_", " ").toUpperCase(),
    theme: "default",
    glyph: "GO",
  };
}
