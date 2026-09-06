import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const fail = (message) => {
  console.error(`PANSOFIE_COMPOST_GAME_R4=FAIL: ${message}`);
  process.exit(1);
};

const compost = read("src/pages/Compost.jsx");
const pkg = JSON.parse(read("package.json"));

for (const marker of [
  "Můj trakař",
  "Sousedský radar",
  "navigator.geolocation",
  "distanceKm",
  'type="range"',
  "toggleCart",
  "reserveCart",
  "selectedWeight",
  "Bez falešného dopadu",
]) {
  if (!compost.includes(marker)) fail(`missing marker: ${marker}`);
}

for (const forbidden of [
  "simulateGPS",
  "checkoutLoop",
  "alert(",
  "onclick=",
  "eco-co2",
  "eco-soil",
  "Zákon vratnosti splněn",
]) {
  if (compost.includes(forbidden)) fail(`unsafe or misleading marker present: ${forbidden}`);
}

if (!pkg.scripts?.["check:compost-game-r4"]) fail("R4 check script not wired");

console.log("PANSOFIE_COMPOST_GAME_R4=PASS");
