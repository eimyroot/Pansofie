import { IMPACT_DIMENSIONS, MISSION_GROW_001, PROGRAMS } from "./learning-core.js";

export const PROJECT_STATUSES = Object.freeze(["prototype", "active", "paused", "completed", "archived"]);
export const PROJECT_PARTICIPATION_MODES = Object.freeze(["individual", "team"]);
export const PROJECT_LOCATION_POLICIES = Object.freeze(["none", "coarse_only"]);

export const PROJECT_GREEN_HOPE_GROW_001 = Object.freeze({
  id: "PROJECT-GREEN-HOPE-GROW-001",
  slug: "komunitni-zahrada",
  titleCs: "Komunitní zahrada",
  program: "green_hope",
  status: "prototype",
  modelOnly: true,
  summaryCs: "Modelový Green Hope projekt, který propojuje pěstování, učení a péči o konkrétní místo. Prvním krokem je vypěstovat vlastní rostlinu.",
  missionIds: [MISSION_GROW_001.id],
  domainIds: ["nature"],
  pathIds: ["meaning"],
  participationModes: ["individual", "team"],
  documentationMode: "optional",
  locationPolicy: "coarse_only",
  impactDimensionIds: ["knowledge", "skills", "nature"],
  completionRule: "all_linked_missions_completed",
});

const MISSION_IDS = new Set([MISSION_GROW_001.id]);
const IMPACT_IDS = new Set(IMPACT_DIMENSIONS);
const PROJECT_STATUS_IDS = new Set(PROJECT_STATUSES);
const PARTICIPATION_MODE_IDS = new Set(PROJECT_PARTICIPATION_MODES);
const LOCATION_POLICY_IDS = new Set(PROJECT_LOCATION_POLICIES);

export function validateProjectBlueprint(project) {
  const errors = [];
  if (!project || typeof project !== "object") return ["project must be an object"];
  if (typeof project.id !== "string" || project.id.trim() === "") errors.push("id is required");
  if (!PROGRAMS.includes(project.program)) errors.push("program is invalid");
  if (!PROJECT_STATUS_IDS.has(project.status)) errors.push("status is invalid");
  if (!Array.isArray(project.missionIds) || project.missionIds.length === 0 || project.missionIds.some((id) => !MISSION_IDS.has(id))) {
    errors.push("missionIds must reference canonical mission blueprints");
  }
  if (!Array.isArray(project.participationModes) || project.participationModes.length === 0 || project.participationModes.some((id) => !PARTICIPATION_MODE_IDS.has(id))) {
    errors.push("participationModes are invalid");
  }
  if (!LOCATION_POLICY_IDS.has(project.locationPolicy)) errors.push("locationPolicy is invalid");
  if (!Array.isArray(project.impactDimensionIds) || project.impactDimensionIds.length === 0 || project.impactDimensionIds.some((id) => !IMPACT_IDS.has(id))) {
    errors.push("impactDimensionIds must contain canonical multidimensional impact ids");
  }
  if (project.documentationMode !== "optional") errors.push("project documentation must remain optional in this prototype");
  if (project.modelOnly !== true) errors.push("prototype project must be explicitly marked modelOnly");
  if (Object.hasOwn(project, "impactScore") || Object.hasOwn(project, "reputationScore") || Object.hasOwn(project, "leaderboard")) {
    errors.push("aggregate human/project scores and leaderboards are not allowed");
  }
  return errors;
}

export function deriveProjectProgress(project, missionState = {}) {
  const missionIds = Array.isArray(project?.missionIds) ? project.missionIds : [];
  const completed = missionIds.filter((missionId) => missionState[missionId]?.status === "completed").length;
  return Object.freeze({
    completed,
    total: missionIds.length,
    isComplete: missionIds.length > 0 && completed === missionIds.length,
  });
}
