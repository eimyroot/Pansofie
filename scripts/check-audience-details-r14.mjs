import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const detail = read("src/pages/AudienceDetail.jsx");
const roles = read("src/pages/Roles.jsx");
const app = read("src/App.jsx");
const main = read("src/main.jsx");
const css = read("src/audience-detail-r14.css");

const required = [
  [app, 'path="/pro-koho/skoly"'],
  [app, 'path="/pro-koho/firmy"'],
  [app, 'path="/pro-koho/ekologie"'],
  [roles, 'slug: "skoly"'],
  [roles, 'slug: "firmy"'],
  [roles, 'slug: "ekologie"'],
  [detail, "Školy jako dílny lidskosti, ne továrny na fakta"],
  [detail, "Podnikání s vyšším smyslem a morální kotvou"],
  [detail, "Uzdravení světa skrze porozumění přírodě"],
  [detail, "Zlepši svou školu"],
  [detail, "Digitální most"],
  [detail, "Circular Challenge"],
  [detail, "Chci Pansofii do školy"],
  [detail, "Chci přinést skutečnou výzvu"],
  [detail, "Chci rozjet zelený projekt"],
  [detail, "not a finished HR programme"],
  [detail, "candidates for future missions"],
  [main, 'import "@/audience-detail-r14.css"'],
  [css, ".r14-benefit-grid"],
  [css, ".r14-mission-grid"],
];

const missing = required.filter(([content, marker]) => !content.includes(marker)).map(([, marker]) => marker);
const forbiddenClaims = [
  "Vybavíme vaše týmy",
  "Poskytujeme praktické metodiky",
  "Nabízíme konkrétní hry",
  "transformaci pracoviště",
];
const claimViolations = forbiddenClaims.filter((phrase) => detail.includes(phrase));
const forbiddenMotion = [/(^|[;{]\s*)animation\s*:/im, /@keyframes/i, /(^|[;{]\s*)transition\s*:/im, /(^|[;{]\s*)transform\s*:/im];
const motionViolations = forbiddenMotion.filter((pattern) => pattern.test(css)).map((pattern) => pattern.toString());

if (missing.length || claimViolations.length || motionViolations.length) {
  console.error("AUDIENCE_DETAILS_R14=FAIL");
  if (missing.length) console.error(`Missing markers: ${missing.join(" | ")}`);
  if (claimViolations.length) console.error(`Overclaim copy: ${claimViolations.join(" | ")}`);
  if (motionViolations.length) console.error(`Motion declarations forbidden in R14 CSS: ${motionViolations.join(" | ")}`);
  process.exit(1);
}

console.log("AUDIENCE_DETAILS_R14=PASS");
