import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PANSOFIE_LOCAL_URL || "http://127.0.0.1:5173";
const EVIDENCE_DIR = path.resolve("browser-evidence/living-motion-r4");
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

async function expectNoHorizontalOverflow(page) {
  const dimensions = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.innerWidth + 1);
}

test("desktop public shell has a real travelling network signal", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto(BASE_URL, { waitUntil: "networkidle" });

  const shell = page.locator('.public-network-shell--r4[data-network-route="home"]');
  await expect(shell).toBeVisible();
  await expect(page.locator(".route-network-orbit--r4")).toBeVisible();
  await expect(page.locator(".route-orbit-traveller animateMotion")).toHaveCount(2);

  const ringAnimation = await page.locator(".route-orbit-r4-ring--outer").evaluate((element) => getComputedStyle(element).animationName);
  expect(ringAnimation).toContain("r4-orbit-spin");
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, "home-motion-desktop.png"), fullPage: true });
});

test("scroll choreography changes section state and network focus", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(BASE_URL, { waitUntil: "networkidle" });

  const hero = page.locator("main > section").first();
  const experience = page.locator("#experience");
  await expect(hero).toHaveAttribute("data-motion-state", "active");

  await experience.scrollIntoViewIfNeeded();
  await expect(experience).toHaveAttribute("data-motion-state", "active", { timeout: 4000 });
  await expect(hero).toHaveAttribute("data-motion-state", "passed");

  const activeNode = await page.locator(".public-network-shell--r4").getAttribute("data-active-network-node");
  expect(Number(activeNode)).toBeGreaterThan(0);
  await expectNoHorizontalOverflow(page);
});

test("Living Experience Flow visibly advances and user can pause it", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(BASE_URL, { waitUntil: "networkidle" });

  const flow = page.getByLabel("Interaktivní průběh jedné Experience");
  await flow.scrollIntoViewIfNeeded();
  await expect(flow).toHaveAttribute("data-auto-running", "true", { timeout: 4000 });

  const initial = await flow.locator('[aria-current="step"]').getAttribute("aria-label");
  await page.waitForTimeout(2100);
  const advanced = await flow.locator('[aria-current="step"]').getAttribute("aria-label");
  expect(advanced).not.toEqual(initial);

  const pause = flow.getByRole("button", { name: /Pozastavit tok/i });
  await pause.click();
  await expect(flow).toHaveAttribute("data-auto-running", "false");
  await expect(flow.locator(".experience-progress-packet")).toHaveCount(0);

  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, "experience-running-desktop.png"), fullPage: true });
});

test("role constellation physically reorganizes around Experience", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto(`${BASE_URL}/pro-koho`, { waitUntil: "networkidle" });

  const stage = page.locator(".living-role-constellation-stage");
  const partner = page.locator('button[data-constellation-role="partner"]');
  await expect(stage).toBeVisible();
  await expect(partner).toBeVisible();

  const before = await partner.boundingBox();
  expect(before).not.toBeNull();
  await partner.click();
  await expect(stage).toHaveAttribute("data-selected-role", "partner");
  await page.waitForTimeout(900);
  const after = await partner.boundingBox();
  expect(after).not.toBeNull();
  expect(Math.abs(after.y - before.y)).toBeGreaterThan(60);
  await expect(partner).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".living-role-constellation-summary")).toContainText("Hodnotí výstup, nikdy člověka.");
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, "roles-constellation-partner-desktop.png"), fullPage: true });
});

test("R4 remains bounded and usable on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE_URL}/pro-koho`, { waitUntil: "networkidle" });

  await expect(page.locator(".route-network-orbit--r4")).toBeHidden();
  await expect(page.locator(".living-role-constellation")).toBeVisible();
  await page.locator('button[data-constellation-role="school"]').click();
  await expect(page.locator(".living-role-constellation-stage")).toHaveAttribute("data-selected-role", "school");
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, "roles-constellation-mobile.png"), fullPage: true });
});

test("prefers-reduced-motion removes decorative R4 motion and autoplay", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(BASE_URL, { waitUntil: "networkidle" });

  await expect(page.locator(".route-orbit-traveller animateMotion")).toHaveCount(0);
  const flow = page.getByLabel("Interaktivní průběh jedné Experience");
  await flow.scrollIntoViewIfNeeded();
  await expect(flow).toHaveAttribute("data-auto-running", "false");

  const sectionDuration = await page.locator("main > section").first().locator(":scope > :first-child").evaluate((element) => Number.parseFloat(getComputedStyle(element).transitionDuration));
  expect(sectionDuration).toBeLessThanOrEqual(0.01);
  await context.close();
});
