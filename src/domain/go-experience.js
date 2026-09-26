import { PROJECT_GREEN_HOPE_GROW_001 } from "./project-core.js";

function missionHref(slug) {
  return slug === "vypestuj-prvni-rostlinu" ? "/go/mise-grow" : "/go/mise";
}

function projectHref(slug) {
  return slug === PROJECT_GREEN_HOPE_GROW_001.slug ? "/go/projekt-green-grow" : "/go/projekty";
}

export function normalizeGoAccountSnapshot(input = {}) {
  const activeMissions = Array.isArray(input.activeMissions) ? input.activeMissions : [];
  const completedMissions = Array.isArray(input.completedMissions) ? input.completedMissions : [];
  const activeProjects = Array.isArray(input.activeProjects) ? input.activeProjects : [];
  const recentActivity = Array.isArray(input.recentActivity) ? input.recentActivity : [];
  const recentPortfolio = Array.isArray(input.recentPortfolio) ? input.recentPortfolio : [];
  const organizationMemberships = Array.isArray(input.organizationMemberships) ? input.organizationMemberships : [];
  const skillAttestations = Array.isArray(input.skillAttestations) ? input.skillAttestations : [];
  const impactObservations = Array.isArray(input.impactObservations) ? input.impactObservations : [];
  const profile = input.profile && typeof input.profile === "object" ? input.profile : {};
  const portfolioCount = Number.isFinite(Number(input.portfolioCount)) ? Number(input.portfolioCount) : recentPortfolio.length;
  const firstMission = activeMissions[0];
  const firstProject = activeProjects.find((project) => !project.progress?.isComplete) || activeProjects[0];
  const nextAction = firstMission
    ? { label: "Pokračovat v misi", href: firstMission.href || missionHref(firstMission.slug), kind: "mission" }
    : firstProject
      ? { label: "Pokračovat v projektu", href: firstProject.href || projectHref(firstProject.slug), kind: "project" }
      : { label: "Vybrat první misi", href: "/go/mise", kind: "discover" };

  return Object.freeze({
    source: input.source === "account" ? "account" : "limited",
    profile: Object.freeze({
      displayName: String(profile.displayName || "Můj prostor"),
      fullName: String(profile.fullName || ""),
      accountContext: String(profile.accountContext || "personal"),
      experience: String(profile.experience || ""),
    }),
    activeMissions: Object.freeze(activeMissions),
    completedMissions: Object.freeze(completedMissions),
    activeProjects: Object.freeze(activeProjects),
    organizationMemberships: Object.freeze(organizationMemberships),
    skillAttestations: Object.freeze(skillAttestations),
    impactObservations: Object.freeze(impactObservations),
    recentActivity: Object.freeze(recentActivity),
    recentPortfolio: Object.freeze(recentPortfolio),
    portfolioCount,
    nextAction: Object.freeze(nextAction),
  });
}
