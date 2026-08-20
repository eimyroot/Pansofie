import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PANSOFIE_LOCAL_URL || "http://127.0.0.1:5173";
const EVIDENCE_DIR = path.resolve("browser-evidence/reference-network-r5");
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

const ROUTES = [
  ["home", "/"],
  ["method", "/jak-funguje"],
  ["roles", "/pro-koho"],
  ["pilot", "/pilot"],
  ["partner", "/partneri"],
  ["status", "/o-projektu"],
  ["join", "/zapojit-se?mode=simulator"],
  ["privacy", "/soukromi"],
  ["safety", "/bezpecnost"],
  ["terms", "/podminky"],
];

async function expectNoHorizontalOverflow(page) {
  const dimensions = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.innerWidth + 1);
}

for (const [key, route] of ROUTES) {
  test(`${key} mounts the shared six-node reference network`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1100 });
    await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });

    const stage = page.locator(`.reference-network-r5[data-network-key="${key}"]`);
    await expect(stage).toBeVisible();
    await expect(stage.locator(".reference-network-r5__core")).toBeVisible();
    await expect(stage.locator("button[data-reference-node]")).toHaveCount(6);
    expect(await stage.locator('.reference-network-r5__svg-edge[data-active="true"]').count()).toBeGreaterThan(0);
    await expect(stage.locator(".reference-network-r5__details")).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });
}

test("roles stage matches the reference interaction: click/focus moves nodes, hover stays stable, links and details change", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto(`${BASE_URL}/pro-koho`, { waitUntil: "networkidle" });

  const stage = page.locator('.reference-network-r5[data-network-key="roles"]');
  const partner = stage.locator('button[data-reference-node="Partner"]');
  const school = stage.locator('button[data-reference-node="Škola"]');
  const community = stage.locator('button[data-reference-node="Komunita"]');

  await expect(stage).toBeVisible();
  await expect(stage).toHaveAttribute("data-selected-node", "Žák");

  await partner.hover();
  await page.waitForTimeout(250);
  await expect(stage).toHaveAttribute("data-selected-node", "Žák");

  const before = await partner.boundingBox();
  expect(before).not.toBeNull();

  await partner.focus();
  await expect(partner).toHaveAttribute("aria-pressed", "true");
  await expect(stage).toHaveAttribute("data-selected-node", "Partner");
  await page.waitForTimeout(850);

  const after = await partner.boundingBox();
  expect(after).not.toBeNull();
  expect(Math.abs(after.y - before.y)).toBeGreaterThan(60);
  await expect(school).toHaveAttribute("data-related", "true");
  await expect(community).toHaveAttribute("data-related", "true");
  expect(await stage.locator(".reference-network-r5__svg-edge--cross").count()).toBeGreaterThanOrEqual(2);
  await expect(stage.locator(".reference-network-r5__details")).toContainText("Firma nekupuje pozitivní výsledek");

  const activeEdgeAnimation = await stage.locator(".reference-network-r5__svg-edge--signal").first().evaluate((element) => getComputedStyle(element).animationName);
  expect(activeEdgeAnimation).toContain("r5-svg-signal");

  await page.screenshot({ path: path.join(EVIDENCE_DIR, "roles-partner-reference-desktop.png"), fullPage: true });
});

test("partner route turns business flow into the same connected graph grammar", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto(`${BASE_URL}/partneri`, { waitUntil: "networkidle" });

  const stage = page.locator('.reference-network-r5[data-network-key="partner"]');
  const review = stage.locator('button[data-reference-node="Review"]');
  await review.focus();
  await expect(review).toHaveAttribute("aria-pressed", "true");
  await expect(stage.locator(".reference-network-r5__details")).toContainText("Partner hodnotí výstup, nikdy lidskou hodnotu");
  await expect(stage.locator(".reference-network-r5__flowline")).toContainText("REVIEW");
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, "partner-review-reference-desktop.png"), fullPage: true });
});

test("mobile keeps nodes, SVG links and detail cards aligned and bounded", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE_URL}/pro-koho`, { waitUntil: "networkidle" });

  const stage = page.locator('.reference-network-r5[data-network-key="roles"]');
  await expect(stage).toBeVisible();
  await expect(stage.locator("button[data-reference-node]")).toHaveCount(6);
  await expect(stage.locator(".reference-network-r5__links")).toBeVisible();
  const mentor = stage.locator('button[data-reference-node="Mentor"]');
  await mentor.focus();
  await expect(mentor).toHaveAttribute("aria-pressed", "true");
  expect(await stage.locator(".reference-network-r5__svg-edge--cross").count()).toBeGreaterThan(0);
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, "roles-reference-mobile.png"), fullPage: true });
});

test("reduced motion keeps the graph stateful but removes travelling animation", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto(BASE_URL, { waitUntil: "networkidle" });

  const stage = page.locator('.reference-network-r5[data-network-key="home"]');
  await expect(stage).toBeVisible();
  const activeEdgeAnimation = await stage.locator(".reference-network-r5__svg-edge--signal").first().evaluate((element) => getComputedStyle(element).animationName);
  expect(activeEdgeAnimation).toBe("none");

  const proof = stage.locator('button[data-reference-node="Důkaz"]');
  await proof.focus();
  await expect(proof).toHaveAttribute("aria-pressed", "true");
  await context.close();
});
