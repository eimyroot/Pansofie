import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) {
    console.error(`R20 FAIL: ${message}`);
    process.exit(1);
  }
};

const page = read("src/pages/JakFunguje.jsx");
const fan = read("src/components/pansofie/ExperienceFan.jsx");

for (const marker of [
  "Pět kroků pansofického cyklu",
  "Skutečná mise",
  "Akce a výstup",
  "Doložení důkazu",
  "Osobní reflexe",
  "Lidské ověření",
  "Vějíř zkušeností",
  "Digitální pozornost · Kritický rozum",
  "Respektující dialog · Spolupráce",
  "Cirkulární jednání · Lokální dopad",
  "Ukázková vizualizace — nejde o skutečný profil ani osobní data.",
  "Veřejná samoobslužná registrace není otevřená.",
  'to="/pro-koho#ochutnejte"',
  'to="/zapojit-se"',
  "useLanguage",
  "ExperienceFan",
]) {
  assert(page.includes(marker), `missing R20 marker: ${marker}`);
}

for (const marker of [
  "First documented Experience",
  "Documented follow-up impact",
  "Public self-service registration is not open.",
  "The concrete Experience is reviewed, never the value of the person.",
]) {
  assert(page.includes(marker), `missing explicit EN marker: ${marker}`);
}

for (const marker of [
  "Zatím žádná evidence",
  "První doložená zkušenost",
  "Opakovaná zkušenost",
  "Zkušenost v různých kontextech",
  "Doložené použití výsledku",
  "Doložený následný dopad",
]) {
  assert(fan.includes(marker), `canonical ExperienceFan semantics missing: ${marker}`);
}

assert(!page.includes("next/link"), "R20 must stay in the canonical React Router stack");
assert(!page.includes("framer-motion"), "R20 must not introduce a second motion runtime");
assert(!page.includes("chart.js"), "R20 must reuse the canonical Recharts ExperienceFan");
assert(!page.includes('to="/register"'), "R20 must not advertise closed public registration");
assert(!page.includes('to="/registrace"'), "R20 must not invent a registration route");
assert(!page.includes("Mise byla úspěšně ověřena svědky sítě"), "public methodology page must not fabricate verification");
assert(!page.includes("zrnka moudrosti"), "R20 must not reintroduce gamified currency");

console.log("HOW_IT_WORKS_R20=PASS");
