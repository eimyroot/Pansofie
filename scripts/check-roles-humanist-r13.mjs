import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const roles = read("src/pages/Roles.jsx");
const detail = read("src/pages/PillarDetail.jsx");
const css = read("src/roles-humanist-r13.css");
const app = read("src/App.jsx");
const main = read("src/main.jsx");

const required = [
  [roles, "Pro koho je Pansofie?"],
  [roles, "Internet a vzdělání musí být zdarma"],
  [roles, "Technologie nesmí sloužit jen byznysu"],
  [roles, "Digitální gramotnost bez morální gramotnosti"],
  [roles, "POZNAT SEBE"],
  [roles, "TVOŘIT S DRUHÝMI"],
  [roles, "ZLEPŠOVAT SVĚT"],
  [roles, "Pro studenty a mladé lidi"],
  [roles, "Pro pedagogy a školy"],
  [roles, "Pro firmy a lídry"],
  [roles, "Pro ochránce přírody a vizionáře"],
  [detail, "Circular Challenge"],
  [detail, "Digitální most"],
  [app, 'path="/pro-koho/:pillar"'],
  [main, 'import "@/roles-humanist-r13.css"'],
  [css, 'font-family: "Fraunces"'],
  [css, ".r13-principles"],
  [css, ".r13-pillar-grid"],
];

const missing = required.filter(([content, marker]) => !content.includes(marker)).map(([, marker]) => marker);
const forbiddenMotion = [
  /(^|[;{\n]\s*)animation\s*:/im,
  /@keyframes/i,
  /(^|[;{\n]\s*)transition\s*:/im,
  /(^|[;{\n]\s*)transform\s*:/im,
];
const motionViolations = forbiddenMotion.filter((pattern) => pattern.test(css)).map((pattern) => pattern.toString());

if (missing.length || motionViolations.length) {
  console.error("ROLES_HUMANIST_R13=FAIL");
  if (missing.length) console.error(`Missing markers: ${missing.join(" | ")}`);
  if (motionViolations.length) console.error(`Motion declarations forbidden in R13 CSS: ${motionViolations.join(" | ")}`);
  process.exit(1);
}

console.log("ROLES_HUMANIST_R13=PASS");
