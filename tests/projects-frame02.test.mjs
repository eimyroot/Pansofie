import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(file, "utf8");
const routes = ["projekty", "green-hope", "urban-family-farm", "digitalni-kompost", "labs"];

test("Projects Frame 02 gives five project entries one family and distinct visual grammars", () => {
  const component = read("src/components/public/PansofieProjectsFrame.jsx");
  assert.match(component, /ProjectFamilyNav/);
  for (const variant of ["overview", "green", "farm", "compost", "labs"]) assert.match(component, new RegExp(`variant===\\"${variant}\\"`));
  assert.match(read("src/app/projects-frame02.css"), /\.pr02-green-field/);
  assert.match(read("src/app/projects-frame02.css"), /\.pr02-farm-field/);
  assert.match(read("src/app/projects-frame02.css"), /\.pr02-compost-field/);
  assert.match(read("src/app/projects-frame02.css"), /\.pr02-labs-field/);
});

test("project pages retire repeated Visual Engine, art panels and documentary hero photos", () => {
  const combined = routes.map((route)=>read(`src/app/${route}/page.jsx`)).join("\n");
  assert.doesNotMatch(combined, /PansofieVisualEngine|PansofieArtPanel|EditorialFeatureBand|ProjectVisualStoryPage|documentaryImage|mockup01\/green-hope|mockup01\/urban-farm/);
  for (const route of routes) assert.match(read(`src/app/${route}/page.jsx`), /ProjectFamilyNav/);
});

test("project overview preserves transparent state and model boundaries", () => {
  const projects = read("src/app/projekty/page.jsx");
  assert.match(projects, /Transparentně podle skutečného stavu/);
  assert.match(projects, /Modelový projekt/);
  assert.doesNotMatch(projects, /1000\+|garantovan|ověřený partner|prokázaný ekologický dopad/i);
});

test("project details preserve their product-specific truth boundaries", () => {
  assert.match(read("src/app/green-hope/page.jsx"), /naměřený ekologický dopad/);
  assert.match(read("src/app/urban-family-farm/page.jsx"), /Herní postup není peněžní hodnota/);
  assert.match(read("src/app/digitalni-kompost/page.jsx"), /není živá materiálová banka/);
  assert.match(read("src/app/labs/page.jsx"), /nevydává za ověřený dopad/);
});

test("Projects Frame 02 has explicit mobile composition and stays outside GO", () => {
  const css = read("src/app/projects-frame02.css");
  const component = read("src/components/public/PansofieProjectsFrame.jsx");
  assert.match(css, /@media\(max-width:700px\)/);
  assert.match(css, /grid-template-columns:1fr 1fr/);
  assert.doesNotMatch(component + css, /GoWorkspace|pansofie-go|go-v2|PANSOFIE GO/);
});
