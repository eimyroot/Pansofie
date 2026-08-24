import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PANSOFIE_LOCAL_URL || "http://127.0.0.1:5173";
const EVIDENCE_DIR = path.resolve("browser-evidence/partner-alliance-r25");
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

const USER_ID = "11111111-1111-4111-8111-111111111111";
const ORG_ID = "22222222-2222-4222-8222-222222222222";
const USER = {
  id: USER_ID,
  aud: "authenticated",
  role: "authenticated",
  email: "partner@example.test",
  email_confirmed_at: new Date().toISOString(),
  user_metadata: { full_name: "Partner Test" },
  app_metadata: {},
  created_at: new Date().toISOString(),
};

const session = () => ({
  access_token: "r25-test-access-token",
  token_type: "bearer",
  expires_in: 3600,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  refresh_token: "r25-test-refresh-token",
  user: USER,
});

const organizations = [{
  organization_id: ORG_ID,
  organization_name: "Circular Lab s.r.o.",
  organization_type: "company",
  organization_status: "active",
  verification_status: "verified",
}];

const challenges = [
  {
    challenge_id: "challenge-needs-work",
    partner_organization_id: ORG_ID,
    title: "Snížit jednorázové obaly",
    challenge_status: "needs_work",
    revision_no: 2,
    screening_note: "Doplňte přesnější safeguarding hranice.",
  },
  {
    challenge_id: "challenge-active",
    partner_organization_id: ORG_ID,
    title: "Druhý život monitorů",
    challenge_status: "active",
    revision_no: 3,
    assignment_id: "assignment-1",
    assignment_status: "accepted",
  },
  {
    challenge_id: "challenge-submitted",
    partner_organization_id: ORG_ID,
    title: "Audit materiálových toků",
    challenge_status: "submitted",
    revision_no: 1,
  },
  {
    challenge_id: "challenge-completed",
    partner_organization_id: ORG_ID,
    title: "Mapa opravitelnosti",
    challenge_status: "completed",
    revision_no: 4,
  },
];

const deliverables = [
  {
    deliverable_id: "deliverable-waiting",
    challenge_title: "Druhý život monitorů",
    deliverable_title: "Návrh lokálního reuse toku",
    deliverable_revision: 1,
    agreed_deliverable: "Praktický návrh reuse toku.",
    deliverable_summary: "Tým popsal sběr, kontrolu a předání monitorů.",
    team_label: "Tým A",
    reviewed_at: null,
    adoption_decision: null,
    adoption_decision_id: null,
    latest_outcome_status: null,
    latest_outcome_confidence: null,
  },
  {
    deliverable_id: "deliverable-reviewed",
    challenge_title: "Mapa opravitelnosti",
    deliverable_title: "Mapa servisních možností",
    deliverable_revision: 2,
    agreed_deliverable: "Mapa lokálních servisních možností.",
    deliverable_summary: "Výstup byl odevzdán jako bounded partner deliverable.",
    team_label: "Tým B",
    reviewed_at: "2026-08-23T12:00:00Z",
    addressed_brief: "yes",
    useful_text: "Použitelné pro pilot.",
    changes_needed: null,
    adoption_decision: "pilot",
    adoption_decision_id: "adoption-1",
    latest_outcome_status: "reported",
    latest_outcome_confidence: "unverified",
  },
];

async function partnerContext(browser, viewport) {
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
        full_name: "Partner Test",
        location: "Praha",
        bio: null,
        network_role: "partner",
        offers_text: null,
        seeks_text: null,
        onboarding_completed_at: "2026-08-23T12:00:00Z",
        onboarding_track: "partner",
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
        id: "membership-partner",
        organization_id: ORG_ID,
        role: "partner_contact",
        status: "active",
        organizations: { id: ORG_ID, slug: "circular-lab", name: "Circular Lab s.r.o.", organization_type: "company", status: "active" },
      }]) });
      return;
    }

    if (url.pathname === "/rest/v1/rpc/pansofie_list_my_partner_organizations") {
      await route.fulfill({ status: 200, headers, body: JSON.stringify(organizations) });
      return;
    }

    if (url.pathname === "/rest/v1/rpc/pansofie_list_my_partner_challenges") {
      await route.fulfill({ status: 200, headers, body: JSON.stringify(challenges) });
      return;
    }

    if (url.pathname === "/rest/v1/rpc/pansofie_list_my_partner_deliverables") {
      await route.fulfill({ status: 200, headers, body: JSON.stringify(deliverables) });
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
  test(`R25 company dashboard renders bounded partner reality on ${scenario.label}`, async ({ browser }) => {
    const context = await partnerContext(browser, scenario.viewport);
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/partner-workspace`, { waitUntil: "domcontentloaded" });

    const dashboard = page.getByRole("region", { name: "Firemní panel Aliance" });
    await expect(dashboard).toBeVisible();
    await expect(dashboard.getByRole("heading", { name: "Od reálného problému k doloženému použití." })).toBeVisible();
    await expect(dashboard.getByText("Partner vidí výsledek spolupráce, ne profil člověka.")).toBeVisible();

    const metrics = dashboard.getByLabel("Faktický stav partnera");
    await expect(metrics.getByRole("article").filter({ hasText: "ověřených organizací" }).getByRole("strong")).toHaveText("1");
    await expect(metrics.getByRole("article").filter({ hasText: "otevřených Challenges" }).getByRole("strong")).toHaveText("3");
    await expect(metrics.getByRole("article").filter({ hasText: "výstupů čeká review" }).getByRole("strong")).toHaveText("1");
    await expect(metrics.getByRole("article").filter({ hasText: "rozhodnutí PILOT" }).getByRole("strong")).toHaveText("1");

    const nextAction = dashboard.getByLabel("Další partner akce");
    await expect(nextAction.getByRole("heading", { name: "1 výstup čeká na partner review" })).toBeVisible();
    await expect(nextAction.getByRole("link", { name: "Otevřít review frontu" })).toHaveAttribute("href", "#partner-r5-review");

    const pipeline = dashboard.getByLabel("Challenge pipeline");
    await expect(pipeline.getByText("DOPRACOVAT · 1")).toBeVisible();
    await expect(pipeline.getByText("QUALITY GATE · 1")).toBeVisible();
    await expect(pipeline.getByText("AKTIVNÍ · 1")).toBeVisible();
    await expect(pipeline.getByText("DOKONČENO · 1")).toBeVisible();

    const review = dashboard.getByLabel("Partner review fronta");
    await expect(review.getByText("Návrh lokálního reuse toku")).toBeVisible();
    await expect(review.getByText("OUTPUT READY")).toBeVisible();
    await expect(review.getByText(/reported outcome není automaticky ověřený Impact/)).toBeVisible();

    const titlePx = await dashboard.getByRole("heading", { name: "Od reálného problému k doloženému použití." }).evaluate((node) => Number.parseFloat(getComputedStyle(node).fontSize));
    expect(titlePx).toBeLessThanOrEqual(scenario.label === "mobile" ? 32 : 40);

    const pageMetrics = await page.evaluate(() => ({ innerWidth: window.innerWidth, scrollWidth: document.documentElement.scrollWidth }));
    expect(pageMetrics.scrollWidth).toBeLessThanOrEqual(pageMetrics.innerWidth + 1);

    await page.screenshot({ path: path.join(EVIDENCE_DIR, `partner-alliance-${scenario.label}.png`), fullPage: true });
    await context.close();
  });
}
