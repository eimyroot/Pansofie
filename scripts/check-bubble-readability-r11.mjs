import fs from "node:fs";

const css = fs.readFileSync("src/bubble-readability-r11.css", "utf8");
const main = fs.readFileSync("src/main.jsx", "utf8");

const required = [
  ".route-network-ribbon-node",
  ".route-orbit-node text",
  ".reference-network-r5__node",
  ".reference-network-r5__node span",
  ".role-map-node",
  ".role-map-copy",
  "--r11-bubble-ink: #14211b",
  "background: #ffffff !important",
  "@media (max-width: 620px)",
];

for (const marker of required) {
  if (!css.includes(marker)) throw new Error(`R11 marker missing: ${marker}`);
}

for (const forbidden of [/@keyframes/i, /animation\s*:/i, /transition\s*:/i, /transform\s*:/i]) {
  if (forbidden.test(css)) throw new Error(`R11 must not alter motion behavior: ${forbidden}`);
}

const r9Index = main.indexOf('import "@/public-visual-r9.css";');
const r11Index = main.indexOf('import "@/bubble-readability-r11.css";');
if (r9Index < 0 || r11Index < 0 || r11Index <= r9Index) {
  throw new Error("R11 readability CSS must load after R9 visual CSS");
}

console.log("R11_BUBBLE_READABILITY_STATIC=PASS");
