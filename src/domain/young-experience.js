import { ageOn } from "./experience.js";

export const YOUNG_PRESENTATION_MODES = Object.freeze(["explore", "quest", "impact"]);

export const YOUNG_PRESENTATIONS = Object.freeze({
  explore: Object.freeze({
    id: "explore",
    label: "Explore",
    ageLabel: "6–9 let",
    eyebrow: "PANSOFIE YOUNG · EXPLORE",
    title: "Objevuj svět po malých krocích.",
    lead: "Krátké výpravy, otázky a tvoření, které se dají zvládnout s rodinou, školou nebo průvodcem.",
    actionLabel: "Vybrat výpravu",
  }),
  quest: Object.freeze({
    id: "quest",
    label: "Quest",
    ageLabel: "10–13 let",
    eyebrow: "PANSOFIE YOUNG · QUEST",
    title: "Zkus něco skutečného. Pak zjisti proč to funguje.",
    lead: "Mise propojují poznání, experiment a vlastní nápad. Tempo si volíš ty, ne tabulka odměn.",
    actionLabel: "Otevřít misi",
  }),
  impact: Object.freeze({
    id: "impact",
    label: "Impact",
    ageLabel: "14–20 let",
    eyebrow: "PANSOFIE YOUNG · IMPACT",
    title: "Tvoje nápady mají cenu. Dej jim skutečný tvar.",
    lead: "Projekty, spolupráce a portfolio zkušeností bez veřejného skóre člověka a bez tlaku na povinné dokazování všeho.",
    actionLabel: "Pokračovat v projektu",
  }),
});

export function resolveYoungPresentation({ dateOfBirth, today = new Date() } = {}) {
  const age = ageOn(dateOfBirth, today);
  if (age === null || age < 6 || age > 20) return null;
  if (age <= 9) return YOUNG_PRESENTATIONS.explore;
  if (age <= 13) return YOUNG_PRESENTATIONS.quest;
  return YOUNG_PRESENTATIONS.impact;
}

export function youngRouteForPresentation(presentation) {
  if (presentation?.id === "impact") return "/young/teens";
  return "/young/kids";
}
export function normalizeYoungAccountSnapshot(input = {}) {
  const guardianStatuses = Array.isArray(input.guardianStatuses) ? input.guardianStatuses : [];
  const verifiedGuardian = guardianStatuses.includes("verified");
  const pendingGuardian = guardianStatuses.includes("pending");
  const projectProgress = input.projectProgress || { completed: 0, total: 0, isComplete: false };

  return Object.freeze({
    source: input.source === "account" ? "account" : "limited",
    organization: input.organization
      ? Object.freeze({ name: input.organization.name || "Můj tým", role: input.organization.role || null })
      : null,
    guardianState: verifiedGuardian ? "verified" : pendingGuardian ? "pending" : "none",
    missionStatus: ["assigned", "in_progress", "submitted", "completed", "cancelled"].includes(input.missionStatus)
      ? input.missionStatus
      : "not_started",
    project: Object.freeze({
      joined: Boolean(input.projectJoined),
      completed: Number(projectProgress.completed || 0),
      total: Number(projectProgress.total || 0),
      isComplete: Boolean(projectProgress.isComplete),
    }),
    portfolioCount: Number.isFinite(Number(input.portfolioCount)) ? Math.max(0, Number(input.portfolioCount)) : 0,
  });
}
