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
  const slots = JSON.parse(read("public/assets/brand/asset-slots.json"));
  assert.match(publicYoung, /mobileImage/);
  assert.match(publicYoung, /hero-rooftop-left-safe-4x5\.webp/);
  assert.match(publicYoung, /creative-studio-4x5\.webp/);
  assert.match(publicYoung, /explorers-nature-4x5\.webp/);
  assert.match(authYoung, /heroImageMobile/);
  assert.equal(slots.principle.startsWith("context-first"), true);
  assert.ok(slots.go.find((slot) => slot.id === "G-MISSION-JIDLO"));
  assert.ok(slots.go.find((slot) => slot.id === "G-PROJECT-CARDS"));
  const go = read("src/components/experiences/GoWorkspace.jsx");
  assert.doesNotMatch(go, /missionMedia\[/);
  assert.match(go, /src=\{m\.thumbnailImage \|\| m\.image/);
  assert.match(go, /src=\{p\.image/);
});

test("M7.5 replaces generic GO imagery with context-specific production scenes", () => {
  const content = read("src/domain/pansofie-content.js");
  const workspace = read("src/components/experiences/GoWorkspace.jsx");
  const css = read("src/app/go-v2.css");
  for (const asset of ["video-call-help.svg","family-cooking.svg","food-origin.svg","upcycle-build.svg","safe-help.svg","community-project.svg","micro-enterprise.svg","teach-younger.svg","green-hope-project.svg","urban-farm-project.svg","family-team-project.svg","microgreens-work.svg","compost-center.svg"]) {
    assert.ok(content.includes(asset), `missing context asset binding ${asset}`);
  }
  assert.match(workspace, /m\.image\?\.endsWith\("\.svg"\)/);
  assert.match(css, /go2-list article>img\.is-scene/);
});


test("M7.6 binds GO next-action media and gives Young topics, play and missions their own context scenes", () => {
  const content = read("src/domain/pansofie-content.js");
  const go = read("src/components/experiences/GoWorkspace.jsx");
  const publicYoung = read("src/components/public/YoungPublicExperience.jsx");
  const authYoung = read("src/components/experiences/YoungWorkspace.jsx");
  const slots = JSON.parse(read("public/assets/brand/asset-slots.json"));
  assert.match(go, /resolveNextActionMedia/);
  assert.match(go, /nextMedia\.src/);
  assert.doesNotMatch(go, /PROJECTS\.slice\(0,6\)/);
  assert.match(go, /green-hope-project\.svg/);
  assert.match(content, /knowledge-exchange-project\.svg/);
  assert.match(content, /makerspace-project\.svg/);
  for (const asset of ["topic-ai.svg","topic-relationships.svg","topic-society.svg","topic-climate.svg","topic-future.svg","topic-learning.svg","play-quiz.svg","play-debate.svg","play-series.svg","mission-grow.svg","mission-video-call.svg","mission-family-cooking.svg","mission-food-origin.svg","mission-upcycle.svg","mission-safe-help.svg"]) {
    assert.ok(publicYoung.includes(asset) || authYoung.includes(asset), `missing Young context scene ${asset}`);
  }
  assert.equal(slots.go.find((slot) => slot.id === "G-HOME-NEXT-ACTION").verdict, "CONTEXT_BINDING_IMPLEMENTED");
  assert.equal(slots.young.find((slot) => slot.id === "Y-MISSION-SET").verdict, "IMPLEMENTED_CONTEXT_SCENES");
});


test("M7.7 adds context imagery for Young safe contexts and GO evidence/reflection flows", () => {
  const young = read("src/components/experiences/YoungWorkspace.jsx");
  const go = read("src/components/experiences/GoWorkspace.jsx");
  const ycss = read("src/app/young-experience-final.css");
  const gcss = read("src/app/go-v2.css");
  const slots = JSON.parse(read("public/assets/brand/asset-slots.json"));
  for (const asset of ["map-safe-places.svg","team-safe-context.svg","community-circles.svg","mentor-guide.svg","profile-private.svg","portfolio-private.svg","empty-gentle.svg"]) {
    assert.ok(young.includes(asset), `missing Young safe-context scene ${asset}`);
  }
  for (const asset of ["evidence-context.svg","reflection-context.svg","portfolio-context.svg","matching-context.svg","checkpoints-context.svg","labs-context.svg"]) {
    assert.ok(go.includes(asset), `missing GO context scene ${asset}`);
  }
  assert.match(ycss, /young-context-visual/);
  assert.match(gcss, /go2-context-scene/);
  assert.equal(slots.young.find((slot) => slot.id === "Y-AUTH-MAPA").verdict, "IMPLEMENTED_CONTEXT_SCENE");
  assert.equal(slots.go.find((slot) => slot.id === "G-EVIDENCE").verdict, "IMPLEMENTED_CONTEXT_SCENE");
});


test("M7.8 classifies deployed imagery by final art-direction decision and upgrades the grow photo crop", () => {
  const slots = JSON.parse(read("public/assets/brand/asset-slots.json"));
  const allowed = new Set(["KEEP ILLUSTRATION", "UPGRADE", "PHOTO MASTER REQUIRED", "REGENERATE"]);
  for (const group of ["go", "young"]) for (const slot of slots[group]) assert.ok(allowed.has(slot.masterDecision), `missing master decision ${slot.id}`);
  const youngHome = slots.young.find((slot) => slot.id === "Y-HOME-HERO");
  const youngMissions = slots.young.find((slot) => slot.id === "Y-MISSION-SET");
  const goGrow = slots.go.find((slot) => slot.id === "G-MISSION-ROSTLINA");
  assert.equal(youngHome.masterDecision, "PHOTO MASTER REQUIRED");
  assert.equal(youngMissions.masterDecision, "PHOTO MASTER REQUIRED");
  assert.equal(goGrow.masterDecision, "UPGRADE");
  const content = read("src/domain/pansofie-content.js");
  const workspace = read("src/components/experiences/GoWorkspace.jsx");
  assert.match(content, /grow-1x1\.webp/);
  assert.match(workspace, /m\.thumbnailImage \|\| m\.image/);
});
