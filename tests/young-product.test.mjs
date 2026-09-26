import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");

test("M7 Young removes fake profile, nearby people discovery and local-only safety toggles", () => {
  const workspace = read("src/components/experiences/YoungWorkspace.jsx");
  assert.doesNotMatch(workspace, /Káťa|FRIENDS|Najdi parťáky ve svém okolí/i);
  assert.doesNotMatch(workspace, /navigator\.geolocation|localStorage|parentMode|Rodičovský režim/i);
  assert.doesNotMatch(workspace, /850\s*\/\s*1\s*000|28.*odznak|120.*hodin/is);
  assert.match(workspace, /Bez přesné veřejné polohy/i);
  assert.match(workspace, /nenabízí přímé zprávy neznámým dospělým/i);
  assert.match(workspace, /Portfolio soukromě/i);
});

test("M7 Young reuses canonical mission and project cores", () => {
  const workspace = read("src/components/experiences/YoungWorkspace.jsx");
  assert.match(workspace, /MISSION_GROW_001/);
  assert.match(workspace, /PROJECT_GREEN_HOPE_GROW_001/);
  assert.match(workspace, /\/go\/mise-grow/);
  assert.match(workspace, /\/go\/projekt-green-grow/);
  assert.match(workspace, /Dokumentace: <strong>dobrovolná<\/strong>/);
});
test("M7 presentation is derived on the server while canonical route guards remain 6–13 and 14–20", () => {
  const kidsPage = read("src/app/young/kids/page.jsx");
  const teensPage = read("src/app/young/teens/page.jsx");
  const kidsLayout = read("src/app/young/kids/layout.jsx");
  const teensLayout = read("src/app/young/teens/layout.jsx");
  assert.match(kidsPage, /YoungAuthenticatedPage expectedExperience="young_kids"/);
  assert.match(teensPage, /YoungAuthenticatedPage expectedExperience="young_teens"/);
  assert.match(kidsLayout, /requireUserContext\("young_kids"\)/);
  assert.match(teensLayout, /requireUserContext\("young_teens"\)/);
  assert.match(kidsLayout, /resolveYoungPresentation/);
  assert.match(teensLayout, /resolveYoungPresentation/);
});

test("M7 account loader exposes guardian state, not guardian identity, and reads real account progress", () => {
  const loader = read("src/domain/young-account.js");
  assert.match(loader, /guardian_relationships/);
  assert.match(loader, /select\("status"\)/);
  assert.doesNotMatch(loader, /guardian_user_id|full_name|display_name/);
  assert.match(loader, /portfolio_items/);
  assert.match(loader, /mission_runs/);
  assert.match(loader, /loadProjectAccountState/);
});
test("M7 adapts authenticated navigation to Explore, Quest and Impact", () => {
  const workspace = read("src/components/experiences/YoungWorkspace.jsx");
  assert.match(workspace, /explore:[\s\S]*Výpravy[\s\S]*Tvořím/);
  assert.match(workspace, /quest:[\s\S]*Můj tým/);
  assert.match(workspace, /impact:[\s\S]*Komunita[\s\S]*Mentor/);
  assert.match(workspace, /\/assets\/current\/photos\/community-garden\.webp/);
  assert.doesNotMatch(workspace, /\/assets\/brand\//);
  assert.match(workspace, /MISE → POKUS → TVORBA/);
});
