import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");

test("M7.0 gives every public Young section a shared photo-led visual hero", () => {
  const source = read("src/components/public/YoungPublicExperience.jsx");
  assert.match(source, /function YoungSubHero/);
  for (const name of ["explore","missions","projects","community","how"]) assert.match(source, new RegExp(`y2-subpage--${name}`));
  assert.match(read("src/board-v2.css"), /M7\.0 Young visual completion/);
});

test("M7.0 visually completes identity entry and adult account shell", () => {
  assert.match(read("src/app/login/page.jsx"), /auth-visual/);
  assert.match(read("src/app/onboarding/page.jsx"), /auth-visual--onboarding/);
  assert.match(read("src/components/experiences/CoreWorkspace.jsx"), /workspace-brand/);
  assert.match(read("src/app/experience.css"), /M7\.0 visual completion/);
});

test("M7.0 keeps GO mobile-first while making all screens reachable in its visual dock", () => {
  const source = read("src/components/experiences/GoWorkspace.jsx");
  const css = read("src/app/go-v2.css");
  for (const view of ["domov","mise","mapa","projekty","tymy","portfolio","mentor","profil","nastaveni"]) assert.ok(source.includes(`["${view}"`), `missing GO view ${view}`);
  assert.match(css, /M7\.0 GO visual completion/);
  assert.match(css, /overflow-x:auto/);
});


test("M7.1 exposes the complete visual board map for planned GO surfaces without pretending they are live", () => {
  const source = read("src/components/experiences/GoWorkspace.jsx");
  for (const view of ["moje-cesta","moje-projekty","impact","matching","sit","checkpointy","labs","evidence","reflexe","xp","odznaky","notifikace","soukromi","opravneni","family-team","school-class","partner","admin","system-states"]) assert.ok(source.includes(view), `missing visual GO board ${view}`);
  assert.match(source, /VIZUÁLNÍ PROTOTYP/);
  assert.match(source, /Neaktivuje novou datovou funkci/);
  assert.match(read("src/app/go-v2.css"), /M7\.1 complete GO visual board map/);
});


test("M7.2 exposes the complete Young visual board map without unsafe discovery or fake progress", () => {
  const source = read("src/components/experiences/YoungWorkspace.jsx");
  for (const view of ["Objevuj","Hraj","Mapa","Tým","Profil"]) assert.ok(source.includes(`active === \"${view}\"`), `missing Young visual state ${view}`);
  assert.match(source, /MAPA MÍST, NE DĚTÍ/);
  assert.match(source, /Potřeba projektu ↔ bezpečný kontext/);
  assert.match(source, /bez fake hodnoty/);
  assert.match(read("src/app/young-experience-final.css"), /M7\.2 complete Young visual board map/);
});


test("M7.4 makes Young image art direction responsive and context-first", () => {
  const publicYoung = read("src/components/public/YoungPublicExperience.jsx");
  const authYoung = read("src/components/experiences/YoungWorkspace.jsx");
  const slots = JSON.parse(read("public/assets/current/asset-slots.json"));
  assert.match(publicYoung, /mobileImage/);
  assert.match(publicYoung, /\/assets\/current\/photos\//);
  assert.doesNotMatch(publicYoung, /\/assets\/brand\//);
  assert.match(authYoung, /heroImageMobile/);
  assert.match(authYoung, /\/assets\/current\/photos\//);
  assert.equal(slots.principle.startsWith("context-first"), true);
  assert.ok(slots.go.find((slot) => slot.id === "G-MISSION-JIDLO"));
  assert.ok(slots.go.find((slot) => slot.id === "G-PROJECT-CARDS"));
  const go = read("src/components/experiences/GoWorkspace.jsx");
  assert.doesNotMatch(go, /missionMedia\[/);
  assert.match(go, /src=\{m\.thumbnailImage \|\| m\.image/);
  assert.match(go, /src=\{p\.image/);
});

test("M7.5 replaces legacy GO imagery with current context media", () => {
  const content = read("src/domain/pansofie-content.js");
  const workspace = read("src/components/experiences/GoWorkspace.jsx");
  const css = read("src/app/current-visual-system.css");
  for (const asset of ["school-prague.webp","community-garden.webp","garden-produce.webp","labs-workshop.webp","partners-hands.webp"]) {
    assert.ok(content.includes(asset), `missing current context media ${asset}`);
  }
  assert.doesNotMatch(content + workspace, /\/assets\/brand\//);
  assert.match(workspace, /m\.thumbnailImage \|\| m\.image/);
  assert.match(css, /go2-list img/);
});

test("M7.6 binds GO next-action media and gives Young current context media", () => {
  const content = read("src/domain/pansofie-content.js");
  const go = read("src/components/experiences/GoWorkspace.jsx");
  const publicYoung = read("src/components/public/YoungPublicExperience.jsx");
  const authYoung = read("src/components/experiences/YoungWorkspace.jsx");
  const slots = JSON.parse(read("public/assets/current/asset-slots.json"));
  assert.match(go, /resolveNextActionMedia/);
  assert.match(go, /nextMedia\.src/);
  assert.doesNotMatch(go, /PROJECTS\.slice\(0,6\)/);
  assert.match(content, /creative-workshop\.webp/);
  assert.match(content, /labs-workshop\.webp/);
  assert.match(publicYoung + authYoung, /\/assets\/current\/photos\//);
  assert.doesNotMatch(publicYoung + authYoung + go + content, /\/assets\/brand\//);
  assert.equal(slots.go.find((slot) => slot.id === "G-HOME-NEXT-ACTION").verdict, "CURRENT_CONTEXT_BINDING");
  assert.equal(slots.young.find((slot) => slot.id === "Y-MISSION-SET").verdict, "CURRENT_CONTEXT_MEDIA");
});

test("M7.7 adds current context media for Young safe contexts and GO evidence/reflection flows", () => {
  const young = read("src/components/experiences/YoungWorkspace.jsx");
  const go = read("src/components/experiences/GoWorkspace.jsx");
  const css = read("src/app/current-visual-system.css");
  const slots = JSON.parse(read("public/assets/current/asset-slots.json"));
  assert.match(young, /YOUNG_CONTEXT_SCENES/);
  assert.match(young, /prague-sunset\.webp/);
  assert.match(young, /community-garden\.webp/);
  assert.match(go, /GO_VISUAL_SCENES/);
  assert.match(go, /creative-workshop\.webp/);
  assert.match(css, /young-context-visual/);
  assert.match(css, /go2-context-scene/);
  assert.equal(slots.young.find((slot) => slot.id === "Y-AUTH-MAPA").verdict, "CURRENT_CONTEXT_MEDIA");
  assert.equal(slots.go.find((slot) => slot.id === "G-EVIDENCE").verdict, "CURRENT_CONTEXT_MEDIA");
});

test("M7.8 classifies deployed imagery as the current visual system", () => {
  const slots = JSON.parse(read("public/assets/current/asset-slots.json"));
  for (const group of ["go", "young"]) for (const slot of slots[group]) {
    assert.equal(slot.masterDecision, "CURRENT PHOTO");
    assert.doesNotMatch(String(slot.current), /\/assets\/brand\//);
  }
  const content = read("src/domain/pansofie-content.js");
  const workspace = read("src/components/experiences/GoWorkspace.jsx");
  assert.match(content, /thumbnailImage: "\/assets\/current\/photos\/garden-produce\.webp"/);
  assert.match(workspace, /m\.thumbnailImage \|\| m\.image/);
});
