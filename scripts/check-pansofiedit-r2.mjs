import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const journey = read("src/components/pansofie/EntryJourney.jsx");
const composer = read("src/components/pansofie/ExperienceComposer.jsx");
const story = read("src/components/pansofie/ExperienceScrollStory.jsx");

const required = [
  [journey, "ExperienceComposer"],
  [journey, "ExperienceScrollStory"],
  [journey, "grid-cols-[minmax(0,1fr)_360px]"],
  [composer, "Živý Experience Composer"],
  [composer, "Pansofie se skládá podle vašich voleb."],
  [composer, "aria-label=\"Živý náhled vznikající Experience\""],
  [composer, "motion-reduce:transition-none"],
  [story, "Scroll storytelling"],
  [story, "Sledujte, jak se problém mění v Experience."],
  [story, "IntersectionObserver"],
  [story, "aria-pressed"],
  [story, "focus-visible:ring-2"],
  [story, "motion-reduce:transition-none"],
  [story, "Výstup není skóre člověka"],
];

const forbidden = [
  [composer, "fetch("],
  [composer, "supabase"],
  [composer, "localStorage"],
  [story, "fetch("],
  [story, "supabase"],
  [story, "localStorage"],
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
