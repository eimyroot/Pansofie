import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";

const css = readFileSync("src/app/mockup01.css", "utf8");
const art = readFileSync("src/components/public/PansofieArtPanel.jsx", "utf8");
const home = readFileSync("src/app/page.jsx", "utf8");
const homeFrame = readFileSync("src/components/public/PansofieHomeFrame.jsx", "utf8");
const feature = readFileSync("src/components/public/EditorialFeatureBand.jsx", "utf8");
const projectStory = readFileSync("src/components/public/ProjectVisualStoryPage.jsx", "utf8");
const layout = readFileSync("src/app/layout.jsx", "utf8");

test("Mockup 01 palette is a production contract", () => {
  for (const token of ["#1B4D3A","#6B8B58","#A7B99A","#D7B899","#FAF7EF","#2F2F2F"]) assert.match(css, new RegExp(token,"i"));
  assert.match(layout, /mockup01\.css/);
});

test("Adult public visuals use Pansofie art language instead of stock as the default", () => {
  assert.match(art, /pa-routes/);
  assert.match(art, /pa-botanical/);
  assert.match(home, /PansofieManifestHero/);
  assert.match(homeFrame, /p02-botanical|p02-hero__lines/);
  assert.match(feature, /PansofieArtPanel/);
  assert.match(projectStory, /PansofieArtPanel/);
  assert.doesNotMatch(feature, /<Image/);
});

test("Mockup 01 layer stays outside Pansofie GO implementation", () => {
  const go = readFileSync("src/components/experiences/GoWorkspace.jsx", "utf8");
  assert.doesNotMatch(go, /PansofieArtPanel|mockup01|pa-panel/);
});


test("approved Mockup 01 documentary masters are the only canonical photo family", () => {
  const documentary = readFileSync("src/components/public/PansofieDocumentary.jsx", "utf8");
  for (const photo of ["hero-ecosystem.webp","urban-farm.webp","green-hope.webp"]) assert.match(documentary, new RegExp(photo));
  assert.doesNotMatch(documentary, /community-garden|prague-sunset|partners-hands|volunteer-garden|school-prague/);
});

const ADULT_EXCLUDED_ROOTS = new Set(["app", "go", "young", "pansofie-go", "mise", "login", "onboarding", "profil", "kdo-jsem", "auth"]);

function adultPageSources() {
  const files = readdirSync("src/app", { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name === "page.jsx")
    .map((entry) => `${entry.parentPath}/${entry.name}`)
    .filter((file) => {
      const relative = file.replace(/^src\/app\//, "");
      const root = relative.split("/")[0];
      return !ADULT_EXCLUDED_ROOTS.has(root);
    });
  return files.map((file) => readFileSync(file, "utf8")).join("\n");
}

test("Adult public runtime cannot fall back to legacy Pansofie visual helpers", () => {
  const adult = adultPageSources();
  assert.doesNotMatch(adult, /pansofie(?:Photo|Scene|Illustration)\s*\(/);
  assert.doesNotMatch(adult, /\/assets\/current\/photos\//);
  assert.match(adult, /PansofieVisualEngine/);
  assert.match(adult, /PansofieVisualCard|PansofieArtPanel|EditorialFeatureBand/);
});

test("dark Mockup 01 surfaces preserve readable editorial contrast", () => {
  assert.match(css, /\.pw-site \.pw-editorial-band h2/);
  assert.match(css, /\.pw-site \.pw-future-bridge h2/);
  assert.match(css, /\.pw-site \.pw-paths h2/);
  assert.match(css, /color:#f8f4eb/);
});
