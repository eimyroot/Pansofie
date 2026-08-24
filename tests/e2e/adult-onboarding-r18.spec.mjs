import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PANSOFIE_LOCAL_URL || "http://127.0.0.1:5173";
const EVIDENCE_DIR = path.resolve("browser-evidence/adult-onboarding-r18");
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

const USER = {
  id: "11111111-1111-4111-8111-111111111111",
  aud: "authenticated",
  role: "authenticated",
  email: "dana@example.test",
  email_confirmed_at: new Date().toISOString(),
  user_metadata: { full_name: "Dana Nováková" },
  app_metadata: {},
  created_at: new Date().toISOString(),
};

function authSession() {
  return {
    access_token: "r18-test-access-token",
    token_type: "bearer",
    expires_in: 3600,
    expires_at: Math.floor(Date.now() / 1000) + 3600,
    refresh_token: "r18-test-refresh-token",
    user: USER,
  };
}

async function invitedContext(browser, viewport) {
  const context = await browser.newContext({ viewport, locale: "cs-CZ" });
  const state = { completed: false, track: null };

  await context.addInitScript((session) => {
    localStorage.setItem("sb-placeholder-auth-token", JSON.stringify(session));
  }, authSession());

  await context.route("https://placeholder.supabase.co/**", async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    const headers = {
      "content-type": "application/json",
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "authorization, apikey, content-type, x-client-info, prefer, accept-profile, content-profile",
      "access-control-allow-methods": "GET,POST,PATCH,OPTIONS",
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
      await route.fulfill({ status: 200, headers, body: JSON.stringify(authSession()) });
      return;
    }

    if (url.pathname === "/rest/v1/profiles") {
      const profile = {
        id: USER.id,
        full_name: "Dana Nováková",
        location: "Praha",
        bio: null,
        network_role: null,
        offers_text: null,
        seeks_text: null,
        onboarding_completed_at: state.completed ? new Date().toISOString() : null,
        onboarding_track: state.track,
        terms_accepted_at: state.completed ? new Date().toISOString() : null,
        terms_accepted_version: state.completed ? "2026-08-24-r18" : null,
        dialogue_code_accepted_at: state.completed ? new Date().toISOString() : null,
        dialogue_code_accepted_version: state.completed ? "2026-08-24-r18" : null,
      };
      await route.fulfill({ status: 200, headers, body: JSON.stringify(profile) });
      return;
    }

    if (url.pathname === "/rest/v1/user_roles") {
      await route.fulfill({ status: 200, headers, body: JSON.stringify({ role: "member" }) });
      return;
    }

    if (url.pathname === "/rest/v1/rpc/pansofie_complete_adult_onboarding") {
      const payload = request.postDataJSON();
      state.completed = true;
      state.track = payload?.p_track || null;
      await route.fulfill({
        status: 200,
        headers,
        body: JSON.stringify([{
          id: USER.id,
          onboarding_track: state.track,
          network_role: state.track === "education" ? "educator" : state.track === "wise_business" ? "company" : "community",
          onboarding_completed_at: new Date().toISOString(),
          terms_accepted_at: new Date().toISOString(),
          dialogue_code_accepted_at: new Date().toISOString(),
        }]),
      });
      return;
    }

    await route.fulfill({ status: 404, headers, body: JSON.stringify({ message: `Unhandled R18 mock route: ${url.pathname}` }) });
  });

  return context;
}

async function reachRoleStep(page) {
  await page.goto(`${BASE_URL}/onboarding`, { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Tři kroky. Žádné body. Hned k prvnímu skutečnému kroku." })).toBeVisible();
  await expect(page.locator('input[type="password"]')).toHaveCount(0);
  await expect(page.getByLabel("E-mail pozvaného účtu")).toHaveValue("dana@example.test");
  await expect(page.getByLabel("E-mail pozvaného účtu")).toHaveAttribute("readonly", "");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Pokračovat do sítě" }).click();
  await expect(page.getByRole("heading", { name: "Jakým dílem chcete přispět k nápravě?" })).toBeVisible();
  await expect(page.locator(".r18-track")).toHaveCount(3);
}

const CASES = [
  {
    label: "education-mobile",
    viewport: { width: 390, height: 844 },
    choice: "Chci rozvíjet školy a žáky",
    welcome: /Vítejte v Dílně lidskosti, Dana!/
    , mission: "Nultá mise · Labyrint algoritmů",
    action: "Spustit ukázkový scénář",
  },
  {
    label: "business-desktop",
    viewport: { width: 1280, height: 900 },
    choice: "Chci budovat moudré podnikání",
    welcome: /Vítejte na cestě k moudrému podnikání, Dana!/
    , mission: "Nultá mise · Etický kompas",
    action: "Otevřít Etický kompas",
  },
  {
    label: "circular-desktop",
    viewport: { width: 1280, height: 900 },
    choice: "Chci zapojit cirkulární ekologii",
    welcome: /Vítejte v Materiálovém mostu, Dana!/
    , mission: "Nultá mise · První reálné propojení",
    action: "Otevřít Materiálový most",
  },
];

for (const scenario of CASES) {
  test(`R18 ${scenario.label} completes governed three-step onboarding`, async ({ browser }) => {
    const context = await invitedContext(browser, scenario.viewport);
    const page = await context.newPage();
    await reachRoleStep(page);
    await page.getByRole("button", { name: new RegExp(scenario.choice) }).click();
    await expect(page.getByRole("heading", { name: scenario.welcome })).toBeVisible();
    await expect(page.getByRole("heading", { name: scenario.mission })).toBeVisible();
    await expect(page.getByText(scenario.action, { exact: true })).toBeVisible();
    await expect(page.getByText(/Volba cesty není skóre člověka/)).toBeVisible();

    const metrics = await page.evaluate(() => ({
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth + 1);

    await page.screenshot({ path: path.join(EVIDENCE_DIR, `${scenario.label}.png`), fullPage: true });
    await context.close();
  });
}

test("R18 does not reopen public self-service registration", async ({ page }) => {
  await page.goto(`${BASE_URL}/register`, { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Registrace je nyní pouze na pozvání" })).toBeVisible();
  await expect(page.locator('input[type="password"]')).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Chci se zapojit" })).toHaveAttribute("href", "/zapojit-se");
});
