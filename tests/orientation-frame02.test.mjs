import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const pages = ["jak-to-funguje", "vize", "pro-koho", "knihovna"];

test("Orientation Frame 02 is one family with four distinct reading models", () => {
  const component = read("src/components/public/PansofieOrientationFrame.jsx");
  for (const variant of ["how", "vision", "who", "library"]) {
    assert.match(component, new RegExp(`variant===\\"${variant}\\"`));
  }
  for (const page of pages) assert.match(read(`src/app/${page}/page.jsx`), /OrientationFamilyNav/);
});

test("Orientation Frame 02 retires repeated visual-engine and feature-band surfaces", () => {
  const source = pages.map((page) => read(`src/app/${page}/page.jsx`)).join("\n");
  assert.doesNotMatch(source, /PansofieVisualEngine|EditorialFeatureBand|PansofieArtPanel/);
  assert.match(read("src/app/orientation-frame02.css"), /\.or02-hero/);
});

test("Orientation Frame 02 preserves key Pansofie truth boundaries", () => {
  const how = read("src/app/jak-to-funguje/page.jsx");
  const library = read("src/app/knihovna/page.jsx");
  assert.match(how, /Příležitost, ne povinnost|Nevytváří povinnost/i);
  assert.match(how, /Pansofie Young je samostatná zkušenost/i);
  assert.match(how, /Pansofie GO je aplikace pro celý ekosystém/i);
  assert.match(library, /Dokud konkrétní materiál není publikovaný a ověřený/i);
});

test("Orientation Frame 02 has explicit responsive composition and no GO implementation leakage", () => {
  const css = read("src/app/orientation-frame02.css");
  assert.match(css, /@media\(max-width:1050px\)/);
  assert.match(css, /@media\(max-width:700px\)/);
  const changed = pages.map((page) => read(`src/app/${page}/page.jsx`)).join("\n") + read("src/components/public/PansofieOrientationFrame.jsx");
  assert.doesNotMatch(changed, /src\/app\/go|GoWorkspace|watchPosition|navigator\.geolocation/);
});
