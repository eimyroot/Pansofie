import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");

test("Trust Frame 02 gives impact and institutions distinct evidence grammars", () => {
  const component = read("src/components/public/PansofieTrustFrame.jsx");
  assert.match(component, /EvidenceField/);
  assert.match(component, /MatchingField/);
  assert.match(read("src/app/impact/page.jsx"), /TrustHero variant="impact"/);
  assert.match(read("src/app/instituce/page.jsx"), /TrustHero variant="institutions"/);
});

test("Trust Frame 02 retires repeated engine and feature-band surfaces", () => {
  const source = read("src/app/impact/page.jsx") + read("src/app/instituce/page.jsx");
  assert.doesNotMatch(source, /PansofieVisualEngine|EditorialFeatureBand|PansofieArtPanel/);
  assert.match(read("src/app/trust-frame02.css"), /\.tr02-evidence-field/);
  assert.match(read("src/app/trust-frame02.css"), /\.tr02-matching-field/);
});

test("impact preserves evidence-first and no-person-score boundaries", () => {
  const impact = read("src/app/impact/page.jsx");
  assert.match(impact, /Dopad není jedno číslo/);
  assert.match(impact, /DŮKAZ PŘED PŘÍBĚHEM/);
  assert.match(impact, /Bez podkladů nevzniká automatické číslo/i);
  assert.match(impact, /nevyrábí veřejnou reputaci ani celkové skóre osobnosti/i);
  assert.doesNotMatch(impact, /1000\+|ověřený dopad|garantovaný dopad/i);
});

test("institutions stays a bounded matching concept, not a fake live exchange", () => {
  const institutions = read("src/app/instituce/page.jsx");
  assert.match(institutions, /nepředstírá živou materiálovou banku ani ověřené partnery/i);
  assert.match(institutions, /Matching nevyrábí automatické ESG zásluhy/i);
  assert.doesNotMatch(institutions, /[0-9]+\s*(kg|t|CO2|CO₂)|[0-9]+%.*ESG/i);
});

test("Trust Frame 02 has explicit mobile composition and no GO redesign", () => {
  const css = read("src/app/trust-frame02.css");
  assert.match(css, /@media\(max-width:1050px\)/);
  assert.match(css, /@media\(max-width:700px\)/);
  const source = read("src/components/public/PansofieTrustFrame.jsx") + read("src/app/impact/page.jsx") + read("src/app/instituce/page.jsx");
  assert.doesNotMatch(source, /GoWorkspace|watchPosition|navigator\.geolocation/);
});
