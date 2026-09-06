import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const fail = (message) => {
  console.error(`PANSOFIE_VISUAL_STORY_R3=FAIL: ${message}`);
  process.exit(1);
};

const home = read("src/pages/Home.jsx");
const trainer = read("src/components/CycleTrainer.jsx");
const css = read("src/index.css");
const nav = read("src/components/Nav.jsx");

for (const marker of [
  "CycleTrainer",
  "Interaktivní prototyp je připraven",
  "Tři větve",
  "Začněte svou rolí",
]) {
  if (!home.includes(marker)) fail(`home marker missing: ${marker}`);
}

for (const marker of [
  "Interactive cycle trainer",
  "Interaktivní trenažér koloběhu",
  "Modelový tok reciprocity",
  "DEMO",
  "aria-pressed",
]) {
  if (!trainer.includes(marker)) fail(`trainer marker missing: ${marker}`);
}

for (const token of ["--sage: #2c5e3b", "--terracotta: #d37a5a", "--cream: #f4f1ea", ".organic-card", ".trainer-result"]) {
  if (!css.includes(token)) fail(`visual token missing: ${token}`);
}

if (!nav.includes("rounded-2xl") || !nav.includes("backdrop-blur-xl")) {
  fail("floating organic navigation styling missing");
}

for (const forbidden of [
  "Ekosystém je online",
  "Zákon vratnosti splněn",
  "onclick=",
  "alert(",
]) {
  if (home.includes(forbidden) || trainer.includes(forbidden)) {
    fail(`misleading or unsafe marker present: ${forbidden}`);
  }
}

console.log("PANSOFIE_VISUAL_STORY_R3=PASS");
