import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const pages = ["o-nas", "7-cest", "16-oblasti", "blog"].map((route) => read(`src/app/${route}/page.jsx`));
const component = read("src/components/public/PansofieDiscoverFrame.jsx");
const css = read("src/app/discover-frame02.css");

test("Discover Frame 02 is one family with four distinct visual grammars", () => {
  for (const page of pages) assert.match(page, /DiscoverFamilyNav/);
  assert.match(pages[0], /variant="about"/);
  assert.match(pages[1], /variant="paths"/);
  assert.match(pages[2], /variant="domains"/);
  assert.match(pages[3], /variant="articles"/);
  assert.match(component, /d02-about-field/);
  assert.match(component, /d02-path-hero/);
  assert.match(component, /d02-domain-hero/);
  assert.match(component, /d02-articles-hero/);
});

test("Discover Frame 02 retires repeated orbit and card surfaces on Discover pages", () => {
  const joined = pages.join("\n");
  assert.doesNotMatch(joined, /PansofieVisualEngine|EditorialFeatureBand|PansofieArtPanel/);
  assert.doesNotMatch(joined, /pw-discover-icon-card|pw-resource-card|pw-visual-hero/);
});

test("paths and domains remain canonical and browse-first", () => {
  assert.match(pages[1], /PUBLIC_PATHS\.map/);
  assert.match(pages[1], /RŮST BEZ ŽEBŘÍČKU/);
  assert.match(pages[2], /PUBLIC_DOMAINS\.map/);
  assert.match(pages[2], /Šestnáct oblastí není šestnáct šuplíků/);
  assert.doesNotMatch(pages[1] + pages[2], /score člověka|ideální profil|pořadí lidí/i);
});

test("articles stay transparent about unpublished material", () => {
  assert.match(pages[3], /nevydáváme tematický návrh za hotový článek/);
  assert.match(pages[3], /transparentně témata a směry, ne předstírané publikované články/);
});

test("Discover Frame 02 has explicit mobile composition without GO leakage", () => {
  assert.match(css, /@media\(max-width:700px\)/);
  assert.match(css, /grid-template-columns:1fr 1fr/);
  const go = read("src/components/experiences/GoWorkspace.jsx");
  assert.doesNotMatch(go, /PansofieDiscoverFrame|d02-/);
});
