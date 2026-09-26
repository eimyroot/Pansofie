import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path) => fs.readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("M8.1 GO routes are authenticated and account-backed", () => {
  const proxy = read("src/lib/supabase/proxy.js");
  const page = read("src/components/experiences/GoAuthenticatedPage.jsx");
  const account = read("src/domain/go-account.js");
  assert.match(proxy, /path === "\/go"/);
  assert.match(proxy, /path\.startsWith\("\/go\/"\)/);
  assert.match(page, /requireUserContext\(/);
  assert.match(page, /loadGoAccountSnapshot/);
  assert.match(account, /mission_runs/);
  assert.match(account, /project_participations/);
  assert.match(account, /experiences/);
  assert.match(account, /portfolio_items/);
});

test("M8.1 GO home removes fake identity and fake weekly progress", () => {
  const workspace = read("src/components/experiences/GoWorkspace.jsx");
  const home = workspace.slice(workspace.indexOf("function Home"), workspace.indexOf("function GrowMission"));
  assert.doesNotMatch(home, /Káťo|3 z 5|Týden pro čistší okolí/);
  assert.match(home, /activeMissions/);
  assert.match(home, /activeProjects/);
  assert.match(home, /portfolioCount/);
  assert.match(home, /recentActivity/);
  assert.match(home, /nextAction/);
});

test("login preserves a safe internal next destination for GO", () => {
  const page = read("src/app/login/page.jsx");
  const actions = read("src/app/login/actions.js");
  assert.match(page, /name="next"/);
  assert.match(actions, /next\.startsWith\("\/"\)/);
  assert.match(actions, /!next\.startsWith\("\/\/"\)/);
});


test("M8.2 GO mission lifecycle is account-backed and optional documentation stays optional", () => {
  const workspace = read("src/components/experiences/GoWorkspace.jsx");
  const actions = read("src/app/go/actions.js");
  const persistence = read("src/domain/mission-persistence.js");
  assert.match(actions, /startMissionAction/);
  assert.match(actions, /completeMissionAction/);
  assert.match(actions, /saveMissionDocumentationAction/);
  assert.match(persistence, /mission_runs/);
  assert.match(persistence, /experience_evidence/);
  assert.match(persistence, /experience_reflections/);
  assert.match(persistence, /portfolio_items/);
  assert.match(workspace, /VOLITELNÉ · SOUKROMÉ V ÚČTU/);
  assert.doesNotMatch(workspace.slice(workspace.indexOf("function GrowMission"), workspace.indexOf("function Missions")), /Uloženo lokálně|saveMissionDocumentation\(/);
});

test("M8.2 portfolio renders account data instead of fabricated XP and badge totals", () => {
  const workspace = read("src/components/experiences/GoWorkspace.jsx");
  const portfolio = workspace.slice(workspace.indexOf("function Portfolio"), workspace.indexOf("function Mentor"));
  assert.match(portfolio, /recentPortfolio/);
  assert.match(portfolio, /recentActivity/);
  assert.match(portfolio, /portfolioCount/);
  assert.doesNotMatch(portfolio, /Level 5|850 \/ 1 000|28|120/);
});

test("M8.2 hardens experience and portfolio ownership through canonical runs", () => {
  const migration = read("supabase/migrations/20260920033000_go_mission_persistence_hardening.sql");
  assert.match(migration, /r\.id = run_id/);
  assert.match(migration, /r\.mission_id = mission_id/);
  assert.match(migration, /r\.status = 'completed'/);
  assert.match(migration, /e\.id = experience_id and e\.user_id = auth\.uid\(\)/);
});

test("M8.3 GO lists and profile use account state instead of invented progress", () => {
  const workspace = read("src/components/experiences/GoWorkspace.jsx");
  const account = read("src/domain/go-account.js");
  assert.match(account, /organization_memberships/);
  assert.match(account, /completedMissions/);
  assert.match(workspace, /MOJE PRÁCE · CANONICAL MISE/);
  assert.match(workspace, /MOJE PROJEKTY A MODELOVÝ KATALOG/);
  assert.match(workspace, /SKUTEČNÝ ÚČET · SOUKROMÝ PŘEHLED/);
  assert.doesNotMatch(workspace.slice(workspace.indexOf("function Profile"), workspace.indexOf("function Settings")), /Káťa|kacenovakova|28|120/);
});

test("M8.3 teams separate real memberships from explicit demo examples", () => {
  const workspace = read("src/components/experiences/GoWorkspace.jsx");
  const teams = workspace.slice(workspace.indexOf("function Teams"), workspace.indexOf("function Portfolio"));
  assert.match(teams, /organizationMemberships/);
  assert.match(teams, /DEMO · POUZE UKÁZKA MOŽNÝCH KONTEXTŮ/);
  assert.match(teams, /Tyto názvy nejsou tvoje členství ani ověření partneři/);
  assert.doesNotMatch(teams, /Rodina Novákových/);
});

test("M8.3 mentor does not pretend to be a live AI chat", () => {
  const workspace = read("src/components/experiences/GoWorkspace.jsx");
  const mentor = workspace.slice(workspace.indexOf("function Mentor"), workspace.indexOf("function Profile"));
  assert.match(mentor, /NEJDE O ŽIVÝ CHAT/);
  assert.match(mentor, /neodesílá zprávy AI ani člověku/);
  assert.doesNotMatch(mentor, /<input|Napiš otázku/);
});


test("M8.4 Grow uses explicit evidence-backed skill and nature observation without person score", () => {
  const workspace = read("src/components/experiences/GoWorkspace.jsx");
  const actions = read("src/app/go/actions.js");
  const account = read("src/domain/go-account.js");
  assert.match(actions, /recordGrowSkillImpactAction/);
  assert.match(workspace, /Použít tento záznam jako důkaz/);
  assert.match(workspace, /Sebedoložení není certifikace ani hodnocení člověka/);
  assert.match(workspace, /Doložená pozorování dopadu/);
  assert.match(account, /skill_attestations/);
  assert.match(account, /impact_observations/);
  assert.doesNotMatch(workspace, /globální skóre|reputační skóre|impact score/i);
});

test("M8.5 GO home makes map-first real-world play the primary entry without inventing location state", () => {
  const workspace = read("src/components/experiences/GoWorkspace.jsx");
  const home = workspace.slice(workspace.indexOf("function Home"), workspace.indexOf("function GrowMission"));
  assert.match(home, /MAPA · MISE · MÍSTA/);
  assert.match(home, /location-based hra/i);
  assert.match(home, /onNavigate\("mapa"\)/);
  assert.match(workspace, /Svět je herní mapa/);
  assert.doesNotMatch(home, /\b[0-9]+\s?km\b|nejbližší mise je/i);
});
test("M8.6 GO map uses opt-in ephemeral browser geolocation and never persists precise location", () => {
  const workspace = read("src/components/experiences/GoWorkspace.jsx");
  const map = workspace.slice(workspace.indexOf("const GO_DEMO_CHECKPOINT_COORDS"), workspace.indexOf("function Projects"));
  assert.match(workspace, /import \{ distanceKm \} from "\.\.\/\.\.\/lib\/metabolism"/);
  assert.match(map, /navigator\.geolocation\.getCurrentPosition/);
  assert.match(map, /enableHighAccuracy:false/);
  assert.match(map, /maximumAge:300000/);
  assert.match(map, /distanceKm\(geo,coords\)/);
  assert.match(map, /Poloha se načte až po kliknutí a nikam se neodesílá/);
  assert.match(map, /Poloha zůstává jen v paměti této obrazovky/);
  assert.doesNotMatch(map, /watchPosition|localStorage|sessionStorage|fetch\(|supabase|Lidé/);
});
