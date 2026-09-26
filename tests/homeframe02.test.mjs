import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const page = readFileSync("src/app/page.jsx", "utf8");
const frame = readFileSync("src/components/public/PansofieHomeFrame.jsx", "utf8");
const css = readFileSync("src/app/homeframe02.css", "utf8");
const layout = readFileSync("src/app/layout.jsx", "utf8");

test("Homepage Frame 02 replaces the rejected photo hero with a living atlas", () => {
  assert.match(page, /PansofieManifestHero/);
  assert.match(frame, /Učení, které/);
  assert.match(frame, /Všechno<br\/>souvisí se vším/);
  assert.doesNotMatch(frame, /<Image|hero-ecosystem|MOCKUP01_PHOTOS/);
  assert.doesNotMatch(page, /p01-home-hero|MOCKUP01_PHOTOS/);
  assert.doesNotMatch(page, /pve-identity-strip/);
});

test("First ecosystem view separates 16 areas from 7 paths instead of another orbit", () => {
  assert.match(page, /PansofieEcosystemAtlas/);
  assert.match(frame, /16.*oblastí/s);
  assert.match(frame, /7.*cest/s);
  assert.match(frame, /p02-area-index/);
  assert.match(frame, /p02-path-ribbon/);
  assert.doesNotMatch(frame, /PansofieVisualEngine|pve-stage|orbit/i);
});
test("Homepage Frame 02 has explicit desktop and mobile composition rules", () => {
  assert.match(layout, /homeframe02\.css/);
  assert.match(css, /\.p02-hero\{/);
  assert.match(css, /grid-template-columns:minmax\(0,.82fr\) minmax\(0,1.18fr\)/);
  assert.match(css, /@media\(max-width:700px\)/);
  assert.match(css, /\.p02-area-index\{grid-template-columns:1fr 1fr/);
});

test("Homepage Frame 02 remains outside GO implementation", () => {
  const go = readFileSync("src/components/experiences/GoWorkspace.jsx", "utf8");
  assert.doesNotMatch(go, /PansofieHomeFrame|p02-hero|homeframe02/);
});

test("Homepage gateway is editorial navigation, not four equal cards", () => {
  assert.match(page, /PansofieEditorialGateway/);
  assert.match(frame, /Začni tam, kde ti to dává smysl/);
  assert.match(frame, /Objevuj svět/);
  assert.match(frame, /Projekty/);
  assert.match(frame, /Komunita/);
  assert.match(frame, /Zapoj se/);
  assert.doesNotMatch(page, /pw-home-gateway|VISUAL_ENTRY_POINTS/);
  assert.match(css, /\.p02-gateway__feature/);
  assert.match(css, /\.p02-gateway__secondary/);
  assert.match(css, /\.p02-gateway__route--zapoj-se/);
});

test("Dark Zapoj se route keeps readable heading contrast", () => {
  assert.match(css, /\.pw-site \.p02-gateway__route--zapoj-se h3\{color:#faf7ef\}/);
});

test("Everyday contexts use one perspective field instead of three repeated art panels", () => {
  assert.match(page, /PansofiePerspectiveField/);
  assert.match(frame, /Stejný svět/);
  assert.match(frame, /Vzdělávání pro život/);
  assert.match(frame, /Zdroje v souvislostech/);
  assert.match(frame, /Generace si mají co předat/);
  assert.doesNotMatch(page, /pw-editorial-doors|pw-editorial-door/);
  assert.match(css, /\.p02-perspectives/);
  assert.match(css, /\.p02-perspective/);
});

test("Homepage avoids repeating the 16-area and 7-path catalog below the atlas", () => {
  assert.match(page, /PansofieLearningSequence/);
  assert.doesNotMatch(page, /pw-manifest|pw-domain-grid|pw-path-grid|pw-section pw-domains|pw-section pw-paths/);
  assert.match(frame, /Poznej/);
  assert.match(frame, /Reflektuj/);
  assert.match(frame, /Cyklus není hodnocení člověka/);
  assert.match(css, /\.p02-method__track/);
});

test("Homepage projects use editorial hierarchy instead of a repeated program-card grid", () => {
  assert.match(page, /PansofieProjectStories programs=\{PROGRAMS\}/);
  assert.doesNotMatch(page, /pw-program-grid|className="pw-program"/);
  assert.match(frame, /p02-projects__lead/);
  assert.match(frame, /p02-projects__farm/);
  assert.match(frame, /p02-projects__minor/);
  assert.match(page, /Green Hope/);
  assert.match(page, /Urban Family Farm/);
});

test("Lower homepage uses the new editorial system end to end", () => {
  assert.match(page, /PansofieKnowledgeBridge/);
  assert.match(page, /PansofieCityPractices/);
  assert.match(page, /PansofieWorlds/);
  assert.doesNotMatch(page, /pw-future-bridge|pw-circular-world|pw-project-feature|pw-products/);
  for (const phrase of ["OD KOMENSKÉHO K AI", "AI jako nástroj", "Mikrogreens a městské pěstování", "Druhá šance pro materiál", "MODELOVÝ PROJEKT", "Pansofie Young", "Pansofie GO"]) assert.match(frame, new RegExp(phrase, "i"));
  assert.match(css, /\.p02-knowledge/);
  assert.match(css, /\.p02-practices/);
  assert.match(css, /\.p02-worlds/);
});
