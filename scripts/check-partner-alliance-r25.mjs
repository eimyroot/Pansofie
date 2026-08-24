import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const dashboard = read("src/components/pansofie/PartnerAllianceDashboard.jsx");
const workspace = read("src/pages/PartnerWorkspace.jsx");
const partnerFlow = read("src/lib/pansofiePartnerFlow.js");

const required = [
  [dashboard, "data-company-dashboard=\"r25\""],
  [dashboard, "Firemní panel Aliance"],
  [dashboard, "listMyPartnerOrganizations"],
  [dashboard, "listMyPartnerChallenges"],
  [dashboard, "listMyPartnerDeliverables"],
  [dashboard, "ověřených organizací"],
  [dashboard, "otevřených Challenges"],
  [dashboard, "výstupů čeká review"],
  [dashboard, "rozhodnutí PILOT"],
  [dashboard, "Partner vidí výsledek spolupráce, ne profil člověka."],
  [dashboard, "bez person score"],
  [dashboard, "bez „hireability“"],
  [dashboard, "reported outcome není automaticky ověřený Impact"],
  [workspace, "<PartnerAllianceDashboard />"],
  [workspace, "id=\"partner-challenge-workflow\""],
  [workspace, "id=\"partner-r5-review\""],
  [partnerFlow, "pansofie_list_my_partner_organizations"],
  [partnerFlow, "pansofie_list_my_partner_challenges"],
  [partnerFlow, "pansofie_list_my_partner_deliverables"],
];

const forbidden = [
  [dashboard, "Math.random"],
  [dashboard, "localStorage"],
  [dashboard, "raw learner evidence:"],
  [dashboard, "isVerified = true"],
  [dashboard, "adoption_decision === \"adopted\""],
  [workspace, "DemoCompany"],
];

const missing = required.filter(([content, token]) => !content.includes(token)).map(([, token]) => token);
const presentForbidden = forbidden.filter(([content, token]) => content.includes(token)).map(([, token]) => token);

if (missing.length || presentForbidden.length) {
  console.error("PARTNER_ALLIANCE_R25=FAIL");
  if (missing.length) console.error(`Missing: ${missing.join(" | ")}`);
  if (presentForbidden.length) console.error(`Forbidden: ${presentForbidden.join(" | ")}`);
  process.exit(1);
}

console.log("PARTNER_ALLIANCE_R25=PASS");
