import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const css = read("src/public-typography-density-r22.css");
const main = read("src/main.jsx");

const required = [
  [main, 'import "@/public-typography-density-r22.css"'],
  [css, "--public-type-hero"],
  [css, "--public-type-display"],
  [css, '[class*="text-7xl"]'],
  [css, '[class*="text-6xl"]'],
  [css, '[class*="text-5xl"]'],
  [css, ".r13-roles-page h2"],
  [css, 'p[class*="text-xl"]'],
];

const missing = required.filter(([content, marker]) => !content.includes(marker)).map(([, marker]) => marker);
const importIndex = main.indexOf('import "@/public-typography-density-r22.css"');
const previousPublicStyleIndex = main.indexOf('import "@/onboarding-library-r14.css"');
const importOrderInvalid = importIndex < 0 || importIndex < previousPublicStyleIndex;

const forbiddenMotion = [
  /(^|[;{\n]\s*)animation\s*:/im,
  /@keyframes/i,
  /(^|[;{\n]\s*)transition\s*:/im,
  /(^|[;{\n]\s*)transform\s*:/im,
];
const motionViolations = forbiddenMotion.filter((pattern) => pattern.test(css)).map((pattern) => pattern.toString());

if (missing.length || importOrderInvalid || motionViolations.length) {
  console.error("PUBLIC_TYPOGRAPHY_DENSITY_R22=FAIL");
  if (missing.length) console.error(`Missing markers: ${missing.join(" | ")}`);
  if (importOrderInvalid) console.error("R22 typography stylesheet must load after the existing public visual layers.");
  if (motionViolations.length) console.error(`Motion declarations forbidden in R22 CSS: ${motionViolations.join(" | ")}`);
  process.exit(1);
}

console.log("PUBLIC_TYPOGRAPHY_DENSITY_R22=PASS");
