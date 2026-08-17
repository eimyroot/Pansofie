import fs from "node:fs";

const files = {
  app: fs.readFileSync("src/App.jsx", "utf8"),
  nav: fs.readFileSync("src/components/pansofie/PublicNav.jsx", "utf8"),
  pilot: fs.readFileSync("src/pages/Pilot.jsx", "utf8"),
};

const required = [
  [files.app, 'path="/pilot"'],
  [files.nav, '["/pilot", "Pilot školy"]'],
  [files.pilot, "Zlepši svou školu"],
  [files.pilot, "Digitální most"],
  [files.pilot, "Circular Challenge"],
  [files.pilot, "Důkaz"],
  [files.pilot, "Reflexe"],
  [files.pilot, "Učitelský review"],
  [files.pilot, "Passport"],
  [files.pilot, "/login?returnTo=%2Fskola"],
  [files.pilot, "Žádné AI hodnocení člověka"],
  [files.pilot, "Výstup, adopce, outcome a impact"],
];

const missing = required.filter(([content, token]) => !content.includes(token)).map(([, token]) => token);

if (missing.length) {
  console.error("PILOT_VISIBLE_CONTRACT=FAIL");
  console.error(`Missing: ${missing.join(" | ")}`);
  process.exit(1);
}

console.log("PILOT_VISIBLE_CONTRACT=PASS");
