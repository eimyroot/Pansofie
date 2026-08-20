import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PANSOFIE_LOCAL_URL || "http://127.0.0.1:5173";
const EVIDENCE_DIR = path.resolve("browser-evidence/visual-interaction-r3");
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

const PUBLIC_NETWORK_ROUTES = [
  ["home", "/", "home"],
  ["method", "/jak-funguje", "method"],
  ["roles", "/pro-koho", "roles"],
  ["pilot", "/pilot", "pilot"],
  ["partner", "/partneri", "partner"],
  ["status", "/o-projektu", "status"],
  ["join", "/zapojit-se?mode=simulator", "join"],
  ["privacy", "/soukromi", "privacy"],
  ["safety", "/bezpecnost", "safety"],
  ["terms", "/podminky", "terms"],
];

async function expectNoHorizontalOverflow(page) {
  const dimensions = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.innerWidth + 1);
}

for (const [name, route, routeKey] of PUBLIC_NETWORK_ROUTES) {
  for (const viewport of [
    { label: "desktop", width: 1440, height: 1100 },
    { label: "mobile", width: 390, height: 844 },
  ]) {
    test(`${name} ${viewport.label} participates in the living public network without overflow`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      const response = await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });
      expect(response).not.toBeNull();
      expect(response.status()).toBeLessThan(400);

      const shell = page.locator(".public-network-shell");
      await expect(shell).toBeVisible();
      await expect(shell).toHaveAttribute("data-network-route", routeKey);

      const ribbon = page.getByLabel("Živá mapa aktuální stránky");
      await expect(ribbon).toBeVisible();
      await expect(ribbon.locator("button.route-network-ribbon-node")).toHaveCount(6);
      await expect(ribbon.locator('button[aria-pressed="true"]')).toHaveCount(1);

      const stage = page.locator(`.reference-network-r5[data-network-key="${routeKey}"]`);
      await expect(stage).toBeVisible();
      await expect(stage.locator("button[data-reference-node]")).toHaveCount(6);
      await expect(page.locator(".route-network-orbit")).toHaveCount(0);

      await expectNoHorizontalOverflow(page);
    });
  }
}

test("Living Experience Flow changes state without losing truth boundaries", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto(BASE_URL, { waitUntil: "networkidle" });

  const flow = page.getByLabel("Interaktivní průběh jedné Experience");
  await expect(flow).toBeVisible();
  await expect(flow.getByText("Living Experience Flow")).toBeVisible();

  const verification = flow.getByRole("button", { name: /05.*Ověření/i });
  await verification.click();
  await expect(verification).toHaveAttribute("aria-current", "step");
  await expect(flow.getByText("Oddělené ověření")).toBeVisible();
  await expect(flow).toContainText("Aktivita ≠ výstup ≠ outcome ≠ impact.");

  const ribbon = page.getByLabel("Živá mapa aktuální stránky");
  const passport = ribbon.getByRole("button", { name: /Passport/i });
  await passport.click();
  await expect(passport).toHaveAttribute("aria-pressed", "true");

  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, "home-living-network-desktop.png"), fullPage: true });
});

test("role relationship map reacts to selected role and preserves access boundary", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto(`${BASE_URL}/pro-koho`, { waitUntil: "networkidle" });

  const partner = page.locator('button[data-role="partner"]').first();
  await partner.click();
  await expect(partner).toHaveAttribute("aria-pressed", "true");

  const map = page.locator(".role-relationship-map");
  await expect(map).toBeVisible();
  await expect(map.locator(".role-map-core")).toContainText("EXPERIENCE");
  await expect(map.locator(".role-map-node--actor")).toContainText("reálnou výzvu a kontext");
  await expect(map.locator(".role-map-node--result")).toContainText("konkrétní týmový výstup k reálnému problému");
  await expect(map.locator(".role-map-boundary")).toContainText("Partner hodnotí výstup proti zadání, nikdy lidskou hodnotu");

  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, "roles-partner-network-desktop.png"), fullPage: true });
});

test("partner page exposes its relationship sequence as one network", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto(`${BASE_URL}/partneri`, { waitUntil: "networkidle" });

  const shell = page.locator('.public-network-shell[data-network-route="partner"]');
  const ribbon = shell.getByLabel("Živá mapa aktuální stránky");
  for (const node of ["Challenge", "Výstup", "Review", "Rozhodnutí", "Outcome", "Hranice"]) {
    await expect(ribbon.getByRole("button", { name: new RegExp(node, "i") })).toBeVisible();
  }

  const stage = page.locator('.reference-network-r5[data-network-key="partner"]');
  await expect(stage).toBeVisible();
  await expect(stage.locator("button[data-reference-node]")).toHaveCount(6);

  const activeNav = page.locator('a.public-nav-link[data-active="true"]');
  await expect(activeNav).toHaveAttribute("href", "/partneri");
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, "partner-living-network-desktop.png"), fullPage: true });
});

test("R3 role interaction remains usable on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE_URL}/pro-koho`, { waitUntil: "networkidle" });

  const school = page.locator('button[data-role="school"]').first();
  await school.click();
  await expect(school).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".role-relationship-map .role-map-node--actor")).toContainText("pedagogický rámec a bezpečný dohled");
  await expect(page.locator(".route-network-orbit")).toHaveCount(0);
  await expect(page.locator('.reference-network-r5[data-network-key="roles"]')).toBeVisible();

  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, "roles-school-network-mobile.png"), fullPage: true });
});

test("prefers-reduced-motion disables decorative R3/R5 network motion", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(BASE_URL, { waitUntil: "networkidle" });

  for (const selector of [".experience-ambient", ".route-network-ribbon-edge i"]) {
    const duration = await page.locator(selector).first().evaluate((element) => Number.parseFloat(getComputedStyle(element).animationDuration));
    expect(duration).toBeLessThanOrEqual(0.01);
  }

  const stage = page.locator('.reference-network-r5[data-network-key="home"]');
  await expect(stage).toBeVisible();
  const signals = stage.locator(".reference-network-r5__svg-edge--signal");
  expect(await signals.count()).toBeGreaterThan(0);
  const edgeAnimation = await signals.first().evaluate((element) => getComputedStyle(element).animationName);
  expect(edgeAnimation.includes("r5-svg-signal")).toBe(false);
  await expect(page.locator(".network-cursor-glow")).toBeHidden();
  await context.close();
});
