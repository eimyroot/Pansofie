import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PANSOFIE_LOCAL_URL || "http://127.0.0.1:5173";
const EVIDENCE_DIR = path.resolve("browser-evidence/living-motion-r4");
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

async function expectNoHorizontalOverflow(page) {
  const dimensions = await page.evaluate(() => ({ innerWidth: window.innerWidth, scrollWidth: document.documentElement.scrollWidth }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.innerWidth + 1);
}

function relativeCenter(box, containerBox) {
  return {
    x: box.x + box.width / 2 - containerBox.x,
    y: box.y + box.height / 2 - containerBox.y,
  };
}

test("desktop public shell has a real travelling network signal", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  const shell = page.locator('.public-network-shell--r4[data-network-route="home"]');
  const stage = page.locator('.reference-network-r5[data-network-key="home"]');
  await expect(shell).toBeVisible();
  await expect(stage).toBeVisible();
  await expect(page.locator(".route-network-orbit--r4")).toHaveCount(0);
  const signal = stage.locator(".reference-network-r5__svg-edge--signal").first();
  await expect(signal).toHaveCount(1);
  expect(await signal.evaluate((element) => getComputedStyle(element).animationName)).toContain("r5-svg-signal");
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
  expect(Number(await page.locator(".public-network-shell--r4").getAttribute("data-active-network-node"))).toBeGreaterThan(0);
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
  expect(await flow.locator('[aria-current="step"]').getAttribute("aria-label")).not.toEqual(initial);
  await flow.getByRole("button", { name: /Pozastavit tok/i }).click();
  await expect(flow).toHaveAttribute("data-auto-running", "false");
  await expect(flow.locator(".experience-progress-packet")).toHaveCount(0);
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, "experience-running-desktop.png"), fullPage: true });
});

test("role network keeps spatial context while active relationships change", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto(`${BASE_URL}/pro-koho`, { waitUntil: "networkidle" });
  const stage = page.locator('.reference-network-r5[data-network-key="roles"]');
  const canvas = stage.locator(".reference-network-r5__canvas");
  const partner = stage.locator('button[data-reference-node="Partner"]');
  await expect(stage).toBeVisible();
  await expect(partner).toBeVisible();

  const canvasBefore = await canvas.boundingBox();
  const before = await partner.boundingBox();
  expect(canvasBefore).not.toBeNull();
  expect(before).not.toBeNull();
  const beforeCenter = relativeCenter(before, canvasBefore);

  await partner.click();
  await expect(partner).toHaveAttribute("aria-pressed", "true");
  await page.waitForTimeout(700);
  const canvasAfter = await canvas.boundingBox();
  const after = await partner.boundingBox();
  expect(canvasAfter).not.toBeNull();
  expect(after).not.toBeNull();
  const afterCenter = relativeCenter(after, canvasAfter);
  expect(Math.abs(afterCenter.x - beforeCenter.x)).toBeLessThan(4);
  expect(Math.abs(afterCenter.y - beforeCenter.y)).toBeLessThan(4);

  expect(await stage.locator(".reference-network-r5__svg-edge--cross").count()).toBeGreaterThan(0);
  expect(await stage.locator(".reference-network-r5__svg-edge--signal").first().evaluate((element) => getComputedStyle(element).animationName)).toContain("r5-svg-signal");
  await expect(stage.locator(".reference-network-r5__details")).toContainText("Firma nekupuje pozitivní výsledek");
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, "roles-constellation-partner-desktop.png"), fullPage: true });
});

test("R4/R5 network remains bounded and usable on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE_URL}/pro-koho`, { waitUntil: "networkidle" });
  await expect(page.locator(".route-network-orbit--r4")).toHaveCount(0);
  const stage = page.locator('.reference-network-r5[data-network-key="roles"]');
  await expect(stage).toBeVisible();
  const school = stage.locator('button[data-reference-node="Škola"]');
  await school.click();
  await expect(school).toHaveAttribute("aria-pressed", "true");
  await page.waitForTimeout(700);
  await expect(stage.locator(".reference-network-r5__links")).toBeVisible();
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, "roles-constellation-mobile.png"), fullPage: true });
});

test("prefers-reduced-motion removes decorative R4/R5 motion and autoplay", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await expect(page.locator(".route-network-orbit--r4")).toHaveCount(0);
  const flow = page.getByLabel("Interaktivní průběh jedné Experience");
  await flow.scrollIntoViewIfNeeded();
  await expect(flow).toHaveAttribute("data-auto-running", "false");
  const stage = page.locator('.reference-network-r5[data-network-key="home"]');
  await expect(stage).toBeVisible();
  expect(["", "none"]).toContain(await stage.locator(".reference-network-r5__svg-edge--signal").first().evaluate((element) => getComputedStyle(element).animationName));
  const sectionDuration = await page.locator("main > section").first().locator(":scope > :first-child").evaluate((element) => Number.parseFloat(getComputedStyle(element).transitionDuration));
  expect(sectionDuration).toBeLessThanOrEqual(0.01);
  await context.close();
});
