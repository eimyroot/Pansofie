import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const journey = read("src/components/pansofie/EntryJourney.jsx");
const map = read("src/components/pansofie/EcosystemMap.jsx");
const data = read("src/lib/pansofieditJourney.js");
const story = read("src/components/pansofie/ExperienceStory.jsx");
const home = read("src/pages/Home.jsx");

const required = [
  [journey, "Vyzkoušejte Pansofii"],
  [journey, "Jak vstupujete do Pansofie?"],
  [journey, "Co můžete do Experience skutečně přinést?"],
  [journey, "Vyberte skutečný problém."],
  [journey, "Kdo může být součástí řešení?"],
  [journey, "Právě jste prošli principem Pansofie"],
  [journey, "nic neodesílá ani neukládá na server"],
  [journey, "motion-reduce:transition-none"],
  [journey, "focus-visible:ring-2"],
  [map, "Experience je střed"],
  [map, "aria-pressed"],
  [data, "school:"],
  [data, "family:"],
  [data, "partner:"],
  [data, "community:"],
  [data, "mentor:"],
  [data, "learner:"],
  [data, "CIRCULAR CHALLENGE"],
  [story, "Vyzkoušet Pansofii za 60 sekund"],
  [home, 'to="/zapojit-se?mode=simulator"'],
  [home, "Vyzkoušet Pansofii za 60 sekund"],
  [home, "Interaktivní ukázka nic neodesílá ani neukládá na server"],
];

const forbidden = [
  [journey, "supabase"],
  [journey, "fetch("],
  [journey, "localStorage"],
  [journey, "sessionStorage"],
  [journey, "navigator.sendBeacon"],
];

const missing = required.filter(([content, token]) => !content.includes(token)).map(([, token]) => token);
const presentForbidden = forbidden.filter(([content, token]) => content.includes(token)).map(([, token]) => token);

if (missing.length || presentForbidden.length) {
  console.error("PANSOFIEDIT_R1=FAIL");
  if (missing.length) console.error(`Missing: ${missing.join(" | ")}`);
  if (presentForbidden.length) console.error(`Forbidden: ${presentForbidden.join(" | ")}`);
  process.exit(1);
}

console.log("PANSOFIEDIT_R1=PASS");
