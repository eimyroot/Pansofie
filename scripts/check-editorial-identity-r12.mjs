import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const cssBase = read("src/editorial-identity-r12.css");
const cssContrast = read("src/editorial-identity-r12-contrast.css");
const css = `${cssBase}\n${cssContrast}`;
const about = read("src/pages/AboutR12.jsx");
const app = read("src/App.jsx");
const main = read("src/main.jsx");
const html = read("index.html");

const requiredCss = [
  "--r12-cobalt: #1746d1",
  "--r12-orange: #df4d2c",
  "--r12-teal: #007b6d",
  'font-family: "Syne"',
  ".r12-history-section",
  ".r12-source-grid",
  ".r12-boundary-section",
  "section.r12-boundary-section",
];

for (const marker of requiredCss) {
  if (!css.includes(marker)) throw new Error(`R12 CSS marker missing: ${marker}`);
}

const declarationsOnly = css
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => !line.startsWith("/*") && !line.startsWith("*") && !line.startsWith("//"));

for (const [name, pattern] of [
  ["@keyframes", /@keyframes/i],
  ["animation", /^animation\s*:/i],
  ["transition", /^transition\s*:/i],
  ["transform", /^transform\s*:/i],
]) {
  const offending = declarationsOnly.find((line) => pattern.test(line));
  if (offending) throw new Error(`R12 must remain static and motion-neutral: ${name} -> ${offending}`);
}

const requiredAbout = [
  "Komenského pansofický projekt",
  "OMNES · OMNIA · OMNINO",
  "Historie ≠ dnešní produkt",
  "PANSOFIE Product Constitution V1.0",
  "https://www.cupress.cuni.cz/",
  "https://pages.pedf.cuni.cz/pedagogika/",
  "https://ojs.cuni.cz/dejinyteoriekritika/",
  "Primary historical basis / critical edition",
  "History ≠ today’s product",
  "Nestačí znát jednotlivé věci. Potřebujeme vidět, jak spolu souvisejí.",
  "Jsme ve fázi, kdy se produkt musí potkat s realitou.",
];

for (const marker of requiredAbout) {
  if (!about.includes(marker)) throw new Error(`R12 About marker missing: ${marker}`);
}

if (!app.includes('import AboutR12 from "@/pages/AboutR12"')) throw new Error("R12 About page is not imported");
if (!app.includes('path="/o-projektu" element={publicSurface(<AboutR12 />)}')) throw new Error("/o-projektu is not routed to AboutR12");
if (!main.includes('import "@/editorial-identity-r12.css"')) throw new Error("R12 stylesheet is not loaded");
if (!main.includes('import "@/editorial-identity-r12-contrast.css"')) throw new Error("R12 contrast closure is not loaded");
if (!html.includes("family=Syne:wght@600;700;800")) throw new Error("Syne display font is not declared");

console.log("R12_EDITORIAL_IDENTITY=PASS");
