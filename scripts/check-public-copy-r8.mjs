import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");

const paths = [
  "src/pages/Home.jsx",
  "src/pages/JakFunguje.jsx",
  "src/pages/Roles.jsx",
  "src/pages/Pilot.jsx",
  "src/pages/Partner.jsx",
  "src/pages/About.jsx",
  "src/pages/PublicInfoPage.jsx",
  "src/pages/ProgramDetail.jsx",
  "src/pages/Join.jsx",
  "src/pages/Login.jsx",
  "src/pages/Register.jsx",
  "src/pages/ForgotPassword.jsx",
  "src/pages/ResetPassword.jsx",
  "src/pages/PageNotFound.jsx",
  "src/components/pansofie/PublicNav.jsx",
  "src/components/pansofie/PublicFooter.jsx",
  "src/components/pansofie/PublicMaturity.jsx",
  "src/components/pansofie/PublicNetworkShell.jsx",
  "src/components/pansofie/ReferenceNetworkStage.jsx",
  "src/components/pansofie/ExperienceStory.jsx",
  "src/components/pansofie/RoleEntry.jsx",
  "src/components/pansofie/EntryJourney.jsx",
  "src/components/pansofie/JoinNetwork.jsx",
  "src/components/pansofie/ExperienceComposer.jsx",
  "src/components/pansofie/ExperienceScrollStory.jsx",
  "src/components/pansofie/EcosystemMap.jsx",
  "src/lib/pansofieDomain.js",
  "src/lib/pansofieditJourney.js",
];

const files = paths.map((path) => [path, read(path)]);

const forbiddenPublicPhrases = [
  "bounded output",
  "bounded Partner deliverable",
  "Partner deliverable",
  "adoption decision",
  "Outcome evidence",
  "field pilot",
  "willingness-to-pay",
  "safeguarding",
  "role-aware",
  "privacy-by-default",
  "Partner interaction",
  "human-worth score",
  "learner raw evidence",
  "Reciprocity principle",
  "Reciprocity & safety boundary",
  "Living Experience Flow",
  "Experience Simulator",
  "Knowledge role",
  "Partner Challenge preview",
  "Supervidovaná knowledge role",
  "impact claim",
  "reviewuje",
  "self-signup",
];

const violations = [];
for (const [path, content] of files) {
  for (const phrase of forbiddenPublicPhrases) {
    if (content.includes(phrase)) violations.push(`${path}: ${phrase}`);
  }
}

const about = read("src/pages/About.jsx");
const requiredHumanFirstMarkers = [
  "Pansofie se inspiruje",
  "současný produkt",
  "Komenskému nepřipisujeme",
  "pilot v reálné škole",
];
const missingMarkers = requiredHumanFirstMarkers.filter((marker) => !about.includes(marker));

const shell = read("src/components/pansofie/PublicNetworkShell.jsx");
const stage = read("src/components/pansofie/ReferenceNetworkStage.jsx");
const labels = read("src/lib/publicCopyLabels.js");
const requiredNetworkGuards = [
  [shell, "publicLabel(network.core)"],
  [shell, "publicLabel(node)"],
  [stage, "publicLabel(item.label)"],
  [stage, "JAK SPOLU ČÁSTI SOUVISEJÍ"],
  [labels, 'Experience: "Zkušenost"'],
  [labels, 'Challenge: "Výzva"'],
  [labels, 'Review: "Zpětná vazba"'],
  [labels, 'Outcome: "Co se stalo potom"'],
  [labels, 'Impact: "Dlouhodobý dopad"'],
];
const missingNetworkGuards = requiredNetworkGuards
  .filter(([content, marker]) => !content.includes(marker))
  .map(([, marker]) => marker);

if (violations.length || missingMarkers.length || missingNetworkGuards.length) {
  console.error("PUBLIC_COPY_R8=FAIL");
  if (violations.length) console.error(`Public jargon: ${violations.join(" | ")}`);
  if (missingMarkers.length) console.error(`Missing human-first markers: ${missingMarkers.join(" | ")}`);
  if (missingNetworkGuards.length) console.error(`Missing public-network guards: ${missingNetworkGuards.join(" | ")}`);
  process.exit(1);
}

console.log("PUBLIC_COPY_R8=PASS");
