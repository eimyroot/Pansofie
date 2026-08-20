import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PANSOFIE_LOCAL_URL || "http://127.0.0.1:5173";
const EVIDENCE_DIR = path.resolve("browser-evidence/luminous-network-r6");
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

async function expectNoHorizontalOverflow(page) {
  const dimensions = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.innerWidth + 1);
}

async function customProperty(locator, name) {
  return locator.evaluate((element, propertyName) => getComputedStyle(element).getPropertyValue(propertyName).trim(), name);
}

test("home network wakes up with a semantic luminous accent", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto(BASE_URL, { waitUntil: "networkidle" });

  const shell = page.locator('.public-network-shell[data-network-route="home"]');
  const stage = page.locator('.reference-network-r5[data-network-key="home"]');
  const need = stage.locator('button[data-reference-node="Potřeba"]');

  await expect(shell).toBeVisible();
  await expect(stage).toBeVisible();
  await expect(need).toHaveAttribute("data-active", "true");

  const coreAnimation = await stage.locator(".reference-network-r5__core").evaluate((element) => getComputedStyle(element).animationName);
  expect(coreAnimation).toContain("r6-awaken-core");

  const activeAccent = await customProperty(stage, "--r6-active");
  expect(activeAccent).not.toBe("");
  expect(activeAccent).not.toEqual("161 62% 24%");

  const signal = stage.locator(".reference-network-r5__svg-edge--signal").first();
  expect(await signal.count()).toBeGreaterThan(0);
  const signalAnimation = await signal.evaluate((element) => getComputedStyle(element).animationName);
  expect(signalAnimation).toContain("r5-svg-signal");

  const glowBackground = await shell.locator(".network-cursor-glow").evaluate((element) => getComputedStyle(element).backgroundImage);
  expect(glowBackground).toContain("radial-gradient");

  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, "home-luminous-awakening-desktop.png"), fullPage: true });
});

test("selecting a different semantic node changes the active light language", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto(BASE_URL, { waitUntil: "networkidle" });

  const stage = page.locator('.reference-network-r5[data-network-key="home"]');
  const before = await customProperty(stage, "--r6-active");

  const proof = stage.locator('button[data-reference-node="Důkaz"]');
  await proof.click();
  await expect(stage).toHaveAttribute("data-selected-node", "Důkaz");
  await expect(proof).toHaveAttribute("data-active", "true");

  const after = await customProperty(stage, "--r6-active");
  expect(after).not.toEqual(before);

  const activeBackground = await proof.evaluate((element) => getComputedStyle(element).backgroundImage);
  expect(activeBackground).toContain("linear-gradient");

  const activeEdge = stage.locator('.reference-network-r5__svg-edge[data-active="true"]').first();
  const activeStroke = await activeEdge.evaluate((element) => getComputedStyle(element).stroke);
  expect(activeStroke).not.toBe("none");

  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, "home-proof-cyan-desktop.png"), fullPage: true });
});

test("role network uses distinct luminous orientation colors without losing topology", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto(`${BASE_URL}/pro-koho`, { waitUntil: "networkidle" });

  const stage = page.locator('.reference-network-r5[data-network-key="roles"]');
  await expect(stage).toBeVisible();

  const labels = ["Žák", "Rodina", "Škola", "Mentor", "Partner", "Komunita"];
  const colors = [];
  for (const label of labels) {
    const node = stage.locator(`button[data-reference-node="${label}"]`);
    await expect(node).toBeVisible();
    colors.push(await customProperty(node, "--r6-node"));
  }
  expect(new Set(colors).size).toBe(6);

  const partner = stage.locator('button[data-reference-node="Partner"]');
  await partner.click();
  await expect(stage).toHaveAttribute("data-selected-node", "Partner");
  await expect(partner).toHaveAttribute("data-active", "true");
  await expect(stage.locator('button[data-reference-node="Škola"]')).toHaveAttribute("data-related", "true");
  await expect(stage.locator('button[data-reference-node="Komunita"]')).toHaveAttribute("data-related", "true");

  const boundaryBackground = await stage.locator(".reference-network-r5__detail-card--boundary").evaluate((element) => getComputedStyle(element).backgroundImage);
  expect(boundaryBackground).toContain("linear-gradient");

  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, "roles-partner-luminous-desktop.png"), fullPage: true });
});

test("mobile keeps luminous network restrained and bounded", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE_URL}/pro-koho`, { waitUntil: "networkidle" });

  const stage = page.locator('.reference-network-r5[data-network-key="roles"]');
  await expect(stage).toBeVisible();
  const school = stage.locator('button[data-reference-node="Škola"]');
  await school.click();
  await expect(school).toHaveAttribute("data-active", "true");

  const glowOpacity = Number.parseFloat(await page.locator(".network-cursor-glow").evaluate((element) => getComputedStyle(element).opacity));
  expect(glowOpacity).toBeLessThanOrEqual(0.4);

  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, "roles-school-luminous-mobile.png"), fullPage: true });
});

test("reduced motion keeps semantic color but disables awakening and travelling light", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(BASE_URL, { waitUntil: "networkidle" });

  const stage = page.locator('.reference-network-r5[data-network-key="home"]');
  await expect(stage).toBeVisible();

  const coreAnimation = await stage.locator(".reference-network-r5__core").evaluate((element) => getComputedStyle(element).animationName);
  expect(coreAnimation).toBe("none");

  const signal = stage.locator(".reference-network-r5__svg-edge--signal").first();
  const signalAnimation = await signal.evaluate((element) => getComputedStyle(element).animationName);
  expect(signalAnimation).toBe("none");

  expect(await customProperty(stage, "--r6-active")).not.toBe("");
  await context.close();
});
