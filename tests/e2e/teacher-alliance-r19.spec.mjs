import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PANSOFIE_LOCAL_URL || "http://127.0.0.1:5173";
const EVIDENCE_DIR = path.resolve("browser-evidence/teacher-alliance-r19");
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

const USER_ID = "11111111-1111-4111-8111-111111111111";
const ORG_ID = "22222222-2222-4222-8222-222222222222";
const USER = {
  id: USER_ID,
  aud: "authenticated",
  role: "authenticated",
  email: "ucitel@example.test",
  email_confirmed_at: new Date().toISOString(),
  user_metadata: { full_name: "Dana Učitelová" },
  app_metadata: {},
  created_at: new Date().toISOString(),
};

const session = () => ({
  access_token: "r19-test-access-token",
  token_type: "bearer",
  expires_in: 3600,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  refresh_token: "r19-test-refresh-token",
  user: USER,
});

const mission = (id, title, pathIds = []) => ({
  id,
  slug: id,
  title,
  summary: `Praktická Experience: ${title}`,
  why: `Smysl mise ${title}`,
  program_id: null,
  lab_id: null,
  path_ids: pathIds,
  age_min: null,
  age_max: null,
  estimated_minutes: 45,
  evidence_prompt: "Dolož výsledek.",
  reflection_prompt: "Co ses naučil/a?",
  transfer_prompt: null,
  contribution_prompt: null,
  safety_notes: null,
});

const submittedRun = {
  id: "run-submitted",
  user_id: "33333333-3333-4333-8333-333333333333",
  status: "submitted",
  started_at: "2026-08-23T08:00:00Z",
  submitted_at: "2026-08-24T08:30:00Z",
  completed_at: null,
  organization_id: ORG_ID,
  assigned_by: USER_ID,
  mission_version_id: "version-1",
  cohort_id: "cohort-1",
  team_id: null,
  created_at: "2026-08-23T07:00:00Z",
  missions: mission("labyrint-algoritmu", "Labyrint algoritmů", ["kriticky-rozum"]),
  organizations: { id: ORG_ID, slug: "zs-pansofie-test", name: "ZŠ Pansofie Test" },
};

const activeTeamRun = {
  id: "run-team-active",
  user_id: "44444444-4444-4444-8444-444444444444",
  status: "in_progress",
  started_at: "2026-08-24T07:00:00Z",
  submitted_at: null,
  completed_at: null,
  organization_id: ORG_ID,
  assigned_by: USER_ID,
  mission_version_id: "version-2",
  cohort_id: "cohort-1",
  team_id: "team-1",
  created_at: "2026-08-24T06:00:00Z",
  missions: mission("stavitele-mostu", "Stavitelé mostů", ["spoluprace"]),
  organizations: { id: ORG_ID, slug: "zs-pansofie-test", name: "ZŠ Pansofie Test" },
};

const completedRun = {
  id: "run-completed",
  user_id: "33333333-3333-4333-8333-333333333333",
  status: "completed",
  completed_at: "2026-08-22T14:00:00Z",
  organization_id: ORG_ID,
  cohort_id: "cohort-1",
  team_id: "team-2",
  missions: mission("digitalni-most", "Digitální most", ["spoluprace", "lokalni-dopad"]),
  organizations: { id: ORG_ID, slug: "zs-pansofie-test", name: "ZŠ Pansofie Test" },
};

async function teacherContext(browser, viewport) {
  const context = await browser.newContext({ viewport, locale: "cs-CZ" });
  await context.addInitScript((authSession) => {
    localStorage.setItem("sb-placeholder-auth-token", JSON.stringify(authSession));
  }, session());

  await context.route("https://placeholder.supabase.co/**", async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    const headers = {
      "content-type": "application/json",
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "authorization, apikey, content-type, x-client-info, prefer, accept-profile, content-profile, range",
      "access-control-allow-methods": "GET,POST,PATCH,HEAD,OPTIONS",
      "access-control-expose-headers": "Content-Range",
    };

    if (request.method() === "OPTIONS") {
      await route.fulfill({ status: 200, headers, body: "{}" });
      return;
    }

    if (url.pathname === "/auth/v1/user") {
      await route.fulfill({ status: 200, headers, body: JSON.stringify(USER) });
      return;
    }

    if (url.pathname.startsWith("/auth/v1/token")) {
      await route.fulfill({ status: 200, headers, body: JSON.stringify(session()) });
      return;
    }

    if (url.pathname === "/rest/v1/profiles") {
      await route.fulfill({ status: 200, headers, body: JSON.stringify({
        id: USER_ID,
        full_name: "Dana Učitelová",
        location: "Brno",
        bio: null,
        network_role: "educator",
        offers_text: null,
        seeks_text: null,
        onboarding_completed_at: "2026-08-23T12:00:00Z",
        onboarding_track: "education",
        terms_accepted_at: "2026-08-23T12:00:00Z",
        terms_accepted_version: "2026-08-24-r18",
        dialogue_code_accepted_at: "2026-08-23T12:00:00Z",
        dialogue_code_accepted_version: "2026-08-24-r18",
      }) });
      return;
    }

    if (url.pathname === "/rest/v1/user_roles") {
      await route.fulfill({ status: 200, headers, body: JSON.stringify({ role: "member" }) });
      return;
    }

    if (url.pathname === "/rest/v1/organization_memberships") {
      await route.fulfill({ status: 200, headers, body: JSON.stringify([{
        id: "membership-1",
        organization_id: ORG_ID,
        role: "teacher",
        status: "active",
        organizations: { id: ORG_ID, slug: "zs-pansofie-test", name: "ZŠ Pansofie Test", organization_type: "school", status: "active" },
      }]) });
      return;
    }

    if (url.pathname === "/rest/v1/missions") {
      await route.fulfill({ status: 200, headers, body: JSON.stringify([
        mission("labyrint-algoritmu", "Labyrint algoritmů", ["kriticky-rozum"]),
        mission("stavitele-mostu", "Stavitelé mostů", ["spoluprace"]),
        mission("materialovy-most", "Materiálový most v akci", ["cirkularni-jednani"]),
      ]) });
      return;
    }

    if (url.pathname === "/rest/v1/rpc/pansofie_list_assignable_school_learners") {
      await route.fulfill({ status: 200, headers, body: JSON.stringify([
        { id: "learner-membership-1", organization_id: ORG_ID, user_id: submittedRun.user_id, display_name: "Kyber Bára" },
        { id: "learner-membership-2", organization_id: ORG_ID, user_id: activeTeamRun.user_id, display_name: "Amos Skaut" },
      ]) });
      return;
    }

    if (url.pathname === "/rest/v1/mission_runs") {
      const select = url.searchParams.get("select");
      const status = url.searchParams.get("status");
      const teamId = url.searchParams.get("team_id");

      if (select === "id" && status) {
        let count = 0;
        if (status === "eq.completed" && teamId === "not.is.null") count = 5;
        else if (status === "eq.completed") count = 12;
        else if (status === "eq.submitted") count = 2;
        else if (status.includes("assigned") && status.includes("in_progress")) count = 4;
        await route.fulfill({
          status: 200,
          headers: { ...headers, "content-range": `0-${count ? count - 1 : 0}/${count}` },
          body: request.method() === "HEAD" ? "" : "[]",
        });
        return;
      }

      const query = url.search;
      if (query.includes("status=eq.completed")) {
        await route.fulfill({ status: 200, headers, body: JSON.stringify([completedRun]) });
        return;
      }
      if (query.includes("organization_id=in") && query.includes("status=in")) {
        await route.fulfill({ status: 200, headers, body: JSON.stringify([submittedRun, activeTeamRun]) });
        return;
      }
      if (query.includes("user_id=eq")) {
        await route.fulfill({ status: 200, headers, body: "[]" });
        return;
      }
      await route.fulfill({ status: 200, headers, body: "[]" });
      return;
    }

    if (["/rest/v1/pilot_cohorts", "/rest/v1/pilot_responsibilities", "/rest/v1/pilot_incidents"].includes(url.pathname)) {
      await route.fulfill({ status: 200, headers, body: "[]" });
      return;
    }

    if (url.pathname.startsWith("/rest/v1/rpc/")) {
      await route.fulfill({ status: 200, headers, body: "[]" });
      return;
    }

    await route.fulfill({ status: 200, headers, body: "[]" });
  });

  return context;
}

for (const scenario of [
  { label: "desktop", viewport: { width: 1366, height: 1000 } },
  { label: "mobile", viewport: { width: 390, height: 844 } },
]) {
  test(`R19 teacher alliance renders governed school reality on ${scenario.label}`, async ({ browser }) => {
    const context = await teacherContext(browser, scenario.viewport);
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/skola`, { waitUntil: "domcontentloaded" });

    const alliance = page.getByRole("region", { name: "Učitelský panel Aliance" });
    await expect(alliance).toBeVisible();
    await expect(alliance.getByRole("heading", { name: "ZŠ Pansofie Test" })).toBeVisible();
    await expect(alliance.getByText("Bez bodů, pořadí a skrytého hodnocení dětí.")).toBeVisible();

    const metrics = alliance.getByLabel("Faktický stav školy");
    await expect(metrics.getByText("12", { exact: true })).toBeVisible();
    await expect(metrics.getByText("2", { exact: true })).toBeVisible();
    await expect(metrics.getByText("4", { exact: true })).toBeVisible();

    await expect(alliance.getByRole("heading", { name: "Žádosti o stvrzení zkušeností" })).toBeVisible();
    await expect(alliance.getByText("Kyber Bára")).toBeVisible();
    await expect(alliance.getByText("Labyrint algoritmů", { exact: true })).toBeVisible();
    const reviewLink = alliance.getByRole("link", { name: /Posoudit důkaz a reflexi/ });
    await expect(reviewLink).toHaveAttribute("href", "/skola/mise/run-submitted");
    await expect(alliance.getByRole("button", { name: /stvrdit/i })).toHaveCount(0);

    await expect(alliance.getByRole("heading", { name: "Co už škola skutečně dokončila" })).toBeVisible();
    await expect(alliance.getByText("Digitální most", { exact: true })).toBeVisible();
    await expect(alliance.getByRole("heading", { name: "Vyvolat společnou týmovou Experience" })).toBeVisible();
    await expect(alliance.getByText("Stavitelé mostů", { exact: true })).toBeVisible();
    await expect(alliance.getByText(/Veřejný univerzální „kmenový kód“ zde záměrně nevystavujeme/)).toBeVisible();

    const allianceTitlePx = await alliance.getByRole("heading", { name: "ZŠ Pansofie Test" }).evaluate((node) => Number.parseFloat(getComputedStyle(node).fontSize));
    expect(allianceTitlePx).toBeLessThanOrEqual(scenario.label === "mobile" ? 33 : 38);

    const pageMetrics = await page.evaluate(() => ({ innerWidth: window.innerWidth, scrollWidth: document.documentElement.scrollWidth }));
    expect(pageMetrics.scrollWidth).toBeLessThanOrEqual(pageMetrics.innerWidth + 1);

    await page.screenshot({ path: path.join(EVIDENCE_DIR, `teacher-alliance-${scenario.label}.png`), fullPage: true });
    await context.close();
  });
}
