import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const fail = (message) => {
  console.error(`PANSOFIE_VISION_R5=FAIL: ${message}`);
  process.exit(1);
};

const app = read("src/App.jsx");
const vision = read("src/pages/Vision.jsx");
const nav = read("src/components/Nav.jsx");
const context = read("src/state/PansofieContext.jsx");
const profile = read("src/pages/Profile.jsx");

for (const marker of [
  'path="/vize"',
  "Vševěda · Pansofia",
  "Vševýchova · Pampaedia",
  "Všenáprava · Panorthosia",
  "Přijmout misi lokálně",
  "Potvrdit dokončení mise",
  "Reciprocita je vztah, ne dluhové skóre",
]) {
  if (!(app + vision).includes(marker)) fail(`missing vision marker: ${marker}`);
}

if (!nav.includes('["/vize", "Vize"]')) fail("Czech Vision nav missing");
if (!nav.includes('["/vize", "Vision"]')) fail("English Vision nav missing");
if (!context.includes("acceptMission") || !context.includes("completeMission")) fail("mission state actions missing");
if (!profile.includes("Aktivní mise")) fail("mission profile snapshot missing");

for (const forbidden of [
  "alert(",
  "onclick=",
  "Garantovaná návratnost",
  "reálný ESG certifikát",
  "Zákon vratnosti splněn",
]) {
  if (vision.includes(forbidden)) fail(`unsafe or misleading vision marker: ${forbidden}`);
}

console.log("PANSOFIE_VISION_R5=PASS");
