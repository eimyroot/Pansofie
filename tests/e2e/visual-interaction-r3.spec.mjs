import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PANSOFIE_LOCAL_URL || "http://127.0.0.1:5173";
const EVIDENCE_DIR = path.resolve("browser-evidence/visual-interaction-r3");
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

async function expectNoHorizontalOverflow(page) {
  const dimensions = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.innerWidth + 1);
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

  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, "home-living-experience-desktop.png"), fullPage: true });
});

test("role relationship map reacts to selected role and preserves access boundary", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto(`${BASE_URL}/pro-koho`, { waitUntil: "networkidle" });

  const partner = page.getByRole("button", { name: /Partner/i }).first();
  await partner.click();
  await expect(partner).toHaveAttribute("aria-pressed", "true");

  const map = page.locator(".role-relationship-map");
  await expect(map).toBeVisible();
  await expect(map.locator(".role-map-core")).toContainText("EXPERIENCE");
  await expect(map.locator(".role-map-node--actor")).toContainText("reálnou výzvu a kontext");
  await expect(map.locator(".role-map-node--result")).toContainText("konkrétní týmový výstup k reálnému problému");
  await expect(map.locator(".role-map-boundary")).toContainText("Partner hodnotí výstup proti zadání, nikdy lidskou hodnotu");

  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, "roles-partner-map-desktop.png"), fullPage: true });
});

test("R3 role interaction remains usable on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE_URL}/pro-koho`, { waitUntil: "networkidle" });

  const school = page.getByRole("button", { name: /Škola/i }).first();
  await school.click();
  await expect(school).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".role-relationship-map .role-map-node--actor")).toContainText("pedagogický rámec a bezpečný dohled");

  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, "roles-school-map-mobile.png"), fullPage: true });
});

test("prefers-reduced-motion disables decorative R3 motion", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(BASE_URL, { waitUntil: "networkidle" });

  const duration = await page.locator(".experience-ambient").evaluate((element) => {
    const value = getComputedStyle(element).animationDuration;
    return Number.parseFloat(value);
  });
  expect(duration).toBeLessThanOrEqual(0.01);
  await context.close();
});
