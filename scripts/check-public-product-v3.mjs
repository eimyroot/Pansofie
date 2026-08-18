import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");

const files = {
  app: read("src/App.jsx"),
  home: read("src/pages/Home.jsx"),
  roles: read("src/components/pansofie/RoleEntry.jsx"),
  story: read("src/components/pansofie/ExperienceStory.jsx"),
  how: read("src/pages/JakFunguje.jsx"),
  pilot: read("src/pages/Pilot.jsx"),
  partner: read("src/pages/Partner.jsx"),
  program: read("src/pages/ProgramDetail.jsx"),
};

const required = [
  [files.app, 'path="/partneri"'],
  [files.home, "Mladí lidé se učí spoustu důležitých věcí"],
  [files.home, "<ExperienceStory />"],
  [files.home, "Přínos není skóre člověka."],
  [files.roles, "Experience je centrum"],
  [files.roles, "Připraveno pro první pilot"],
  [files.story, "pilotní scénář"],
  [files.story, "ne zveřejněná případová studie"],
  [files.how, "Experience je jádro"],
  [files.how, 'to="/pilot"'],
  [files.pilot, "Reálný field pilot ve škole ještě neproběhl"],
  [files.partner, "nekupuje pozitivní hodnocení"],
  [files.partner, "automaticky převedené vlastnictví"],
  [files.program, "Samostatný Family runtime ještě není live"],
];

const missing = required
  .filter(([content, token]) => !content.includes(token))
  .map(([, token]) => token);

const forbidden = [
  [files.home, "PILOT NOW"],
  [files.roles, "PILOT NOW"],
  [files.program, "PILOT NOW"],
  [files.how, 'to="/dashboard"'],
  [files.program, "impact reporting"],
];

const presentForbidden = forbidden
  .filter(([content, token]) => content.includes(token))
  .map(([, token]) => token);

if (missing.length || presentForbidden.length) {
  console.error("PUBLIC_PRODUCT_V3_CONTRACT=FAIL");
  if (missing.length) console.error(`Missing: ${missing.join(" | ")}`);
  if (presentForbidden.length) console.error(`Forbidden: ${presentForbidden.join(" | ")}`);
  process.exit(1);
}

console.log("PUBLIC_PRODUCT_V3_CONTRACT=PASS");
