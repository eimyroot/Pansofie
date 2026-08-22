import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const journey = read("src/components/pansofie/EntryJourney.jsx");
const composer = read("src/components/pansofie/ExperienceComposer.jsx");
const story = read("src/components/pansofie/ExperienceScrollStory.jsx");

const required = [
  [journey, "ExperienceComposer"],
  [journey, "ExperienceScrollStory"],
  [journey, "grid-cols-[minmax(0,1fr)_360px]"],
  [composer, "Průběžný náhled"],
  [composer, "Vaše modelová zkušenost se skládá podle voleb."],
  [composer, "aria-label=\"Živý náhled vznikající zkušenosti\""],
  [composer, "motion-reduce:transition-none"],
  [story, "Celá cesta krok za krokem"],
  [story, "Sledujte, jak se problém mění ve skutečnou zkušenost."],
  [story, "IntersectionObserver"],
  [story, "aria-pressed"],
  [story, "focus-visible:ring-2"],
  [story, "motion-reduce:transition-none"],
  [story, "Tato ukázka nehodnotí člověka"],
];

const forbidden = [
  [composer, "fetch("],
  [composer, "supabase"],
  [composer, "localStorage"],
  [story, "fetch("],
  [story, "supabase"],
  [story, "localStorage"],
  [composer, "Živý Experience Composer"],
  [story, "Scroll storytelling"],
];

const missing = required.filter(([content, token]) => !content.includes(token)).map(([, token]) => token);
const presentForbidden = forbidden.filter(([content, token]) => content.includes(token)).map(([, token]) => token);

if (missing.length || presentForbidden.length) {
  console.error("PANSOFIEDIT_R2=FAIL");
  if (missing.length) console.error(`Missing: ${missing.join(" | ")}`);
  if (presentForbidden.length) console.error(`Forbidden: ${presentForbidden.join(" | ")}`);
  process.exit(1);
}

console.log("PANSOFIEDIT_R2=PASS");
