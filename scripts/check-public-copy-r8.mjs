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
  "src/components/pansofie/ExperienceStory.jsx",
  "src/components/pansofie/RoleEntry.jsx",
  "src/components/pansofie/EntryJourney.jsx",
  "src/components/pansofie/JoinNetwork.jsx",
  "src/components/pansofie/PublicFooter.jsx",
  "src/components/pansofie/PublicMaturity.jsx",
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

if (violations.length || missingMarkers.length) {
  console.error("PUBLIC_COPY_R8=FAIL");
  if (violations.length) console.error(`Public jargon: ${violations.join(" | ")}`);
  if (missingMarkers.length) console.error(`Missing human-first markers: ${missingMarkers.join(" | ")}`);
  process.exit(1);
}

console.log("PUBLIC_COPY_R8=PASS");
