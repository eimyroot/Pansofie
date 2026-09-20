import { LEARNING_CYCLE, MISSION_GROW_001 } from "./learning-core.js";

export const GROW_ROUTE_ID = "rostlina";

const STEP_LABELS = Object.freeze({
  learn: "Poznej",
  play: "Zkus",
  do: "Udělej",
  create: "Vytvoř",
  share: "Sdílej",
  reflect: "Reflektuj",
});

export function missionLearningSteps(blueprint = MISSION_GROW_001) {
  return LEARNING_CYCLE.map((id) => Object.freeze({
    id,
    labelCs: STEP_LABELS[id],
    textCs: blueprint[id],
  }));
}

const PUBLIC = Object.freeze({
  eyebrow: "GREEN HOPE · PŘÍRODA",
  title: MISSION_GROW_001.titleCs,
  heading: "Malý konkrétní krok, který propojí poznání s péčí o něco živého.",
  description: "Zasaď semeno nebo sazenici, sleduj podmínky růstu a rozhodni se, jestli si chceš zkušenost také zdokumentovat.",
  actionLabel: "Zkusit první misi",
  goHref: "/go/mise-grow",
  youngHref: "/young/mise",
});
const KIDS = Object.freeze({
  eyebrow: "DNEŠNÍ VÝPRAVA · GREEN HOPE",
  title: "Vypěstuj něco živého",
  summary: "Zasaď semínko a zjisti, co potřebuje k růstu.",
  actionLabel: "Otevřít výpravu",
});

const TEENS = Object.freeze({
  eyebrow: "PRAKTICKÁ MISE · GREEN HOPE",
  title: MISSION_GROW_001.titleCs,
  summary: "Naplánuj jednoduchý pěstitelský pokus, sleduj růst a vyhodnoť, co výsledek ovlivnilo.",
  actionLabel: "Otevřít misi",
});

const GO = Object.freeze({
  eyebrow: "GREEN HOPE · PŘÍRODA",
  title: MISSION_GROW_001.titleCs,
  summary: "Vyber semena, zasaď je a sleduj, co rostlina opravdu potřebuje.",
  actionLabel: "Začít",
});

export const GROW_MISSION_PRESENTATIONS = Object.freeze({ public: PUBLIC, kids: KIDS, teens: TEENS, go: GO });

export function getGrowMissionPresentation(surface = "public") {
  return GROW_MISSION_PRESENTATIONS[surface] || PUBLIC;
}

export function getGrowMissionCard() {
  return Object.freeze({
    id: GROW_ROUTE_ID,
    blueprintId: MISSION_GROW_001.id,
    title: MISSION_GROW_001.titleCs,
    program: "Green Hope",
    programId: MISSION_GROW_001.program,
    area: "Příroda",
    domainIds: MISSION_GROW_001.domainIds,
    pathIds: MISSION_GROW_001.pathIds,
    detail: PUBLIC.description,
    documentationMode: MISSION_GROW_001.documentationMode,
  });
}
