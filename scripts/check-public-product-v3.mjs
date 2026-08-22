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
  [files.app, 'path="/pro-koho"'],
  [files.home, "Pansofie propojuje učení se skutečnou zkušeností"],
  [files.home, "<ExperienceStory />"],
  [files.home, "<RoleEntry />"],
  [files.home, "<PublicMaturity />"],
  [files.home, "Dokončená aktivita ještě není důkaz skutečného dopadu."],
  [files.home, "Pansofie nehodnotí hodnotu člověka."],
  [files.roles, "Jedna zkušenost. Šest různých rolí."],
  [files.roles, "Partner hodnotí výstup podle zadání, nikdy lidskou hodnotu"],
  [files.roles, "neveřejné podklady a důkazy žáka"],
  [files.roles, "Digitální postup je připravený"],
  [files.story, "modelový pilotní scénář"],
  [files.story, "ne o zveřejněnou případovou studii"],
  [files.how, "Experience je naše označení pro skutečnou zkušenost"],
  [files.how, "samotnou činností, vytvořeným výstupem, jeho pozdějším použitím a skutečným dlouhodobým dopadem"],
  [files.how, 'to="/pro-koho"'],
  [files.how, 'to="/pilot"'],
  [files.pilot, "Pilot v reálné škole ale ještě neproběhl"],
  [files.partner, "nekupuje pozitivní hodnocení"],
  [files.partner, "Výstup se nestává automaticky vlastnictvím partnera"],
  [files.program, "Rodina se zatím zapojuje kolem konkrétní zkušenosti"],
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
  [files.roles, "human-worth score"],
  [files.roles, "hireability score"],
  [files.home, "Aktivita ≠ výstup ≠ outcome ≠ impact"],
  [files.roles, "learner raw evidence"],
  [files.pilot, "field pilot"],
  [files.program, "runtime ještě není live"],
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
