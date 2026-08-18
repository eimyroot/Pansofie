import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const migration = read("supabase/migrations/20260818173000_field_pilot_operationalization_r1.sql");
const verification = read("supabase/verification/staging_field_pilot_operationalization_r1.sql");
const flow = read("src/lib/pansofieExperienceFlow.js");
const panel = read("src/components/pansofie/PilotOperationsPanel.jsx");
const hub = read("src/pages/SchoolHub.jsx");
const adr = read("docs/canonical/ADR-0002_FIRST_FIELD_PILOT_EXPERIENCES.md");

const required = [
  [migration, "create table if not exists public.mission_versions"],
  [migration, "mission_versions are immutable"],
  [migration, "create table if not exists public.pilot_cohorts"],
  [migration, "create table if not exists public.experience_teams"],
  [migration, "create table if not exists public.experience_team_artifacts"],
  [migration, "add column if not exists mission_version_id"],
  [migration, "add column if not exists cohort_id"],
  [migration, "add column if not exists team_id"],
  [migration, "pansofie_assign_pilot_team_mission"],
  [migration, "zlepsi-svou-skolu"],
  [migration, "digitalni-most"],
  [migration, "circular-challenge"],
  [verification, "FIELD_PILOT_OPERATIONALIZATION_R1=PASS"],
  [flow, "listPilotCohorts"],
  [flow, "listExperienceTeams"],
  [flow, "assignPilotTeamMission"],
  [panel, "Kohorta → tým → canonical Experience"],
  [panel, "Přiřadit celému týmu"],
  [hub, "PilotOperationsPanel"],
  [adr, "Zlepši svou školu"],
  [adr, "Digitální most"],
  [adr, "Circular Challenge"],
  [adr, "PANSOFIE GO"],
];

const forbidden = [
  [migration, "human_score"],
  [migration, "public_child_profile"],
  [panel, "Síť"],
  [panel, "Zprávy"],
];

const missing = required.filter(([content, token]) => !content.includes(token)).map(([, token]) => token);
const presentForbidden = forbidden.filter(([content, token]) => content.includes(token)).map(([, token]) => token);

if (missing.length || presentForbidden.length) {
  console.error("FIELD_PILOT_OPERATIONALIZATION_R1=FAIL");
  if (missing.length) console.error(`Missing: ${missing.join(" | ")}`);
  if (presentForbidden.length) console.error(`Forbidden: ${presentForbidden.join(" | ")}`);
  process.exit(1);
}

console.log("FIELD_PILOT_OPERATIONALIZATION_R1=PASS");
