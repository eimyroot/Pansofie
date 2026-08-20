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

function center(box) {
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
}

function relativeCenter(box, containerBox) {
  const point = center(box);
  return { x: point.x - containerBox.x, y: point.y - containerBox.y };
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

test("roles stage matches reference geometry: fixed role positions, stable hover, changing links and details", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto(`${BASE_URL}/pro-koho`, { waitUntil: "networkidle" });

  const stage = page.locator('.reference-network-r5[data-network-key="roles"]');
  const canvas = stage.locator(".reference-network-r5__canvas");
  const core = stage.locator(".reference-network-r5__core");
  const partner = stage.locator('button[data-reference-node="Partner"]');
  const school = stage.locator('button[data-reference-node="Škola"]');
  const community = stage.locator('button[data-reference-node="Komunita"]');
  const mentor = stage.locator('button[data-reference-node="Mentor"]');

  await expect(stage).toBeVisible();
  await expect(stage).toHaveAttribute("data-selected-node", "Žák");

  await partner.hover();
  await page.waitForTimeout(250);
  await expect(stage).toHaveAttribute("data-selected-node", "Žák");

  const canvasBefore = await canvas.boundingBox();
  const partnerBeforeBox = await partner.boundingBox();
  const coreBox = await core.boundingBox();
  const mentorBox = await mentor.boundingBox();
  const schoolBox = await school.boundingBox();
  expect(canvasBefore).not.toBeNull();
  expect(partnerBeforeBox).not.toBeNull();
  expect(coreBox).not.toBeNull();
  expect(mentorBox).not.toBeNull();
  expect(schoolBox).not.toBeNull();

  const partnerBefore = relativeCenter(partnerBeforeBox, canvasBefore);
  const coreCenter = relativeCenter(coreBox, canvasBefore);
  const mentorCenter = relativeCenter(mentorBox, canvasBefore);
  const schoolCenter = relativeCenter(schoolBox, canvasBefore);
  expect(Math.abs(partnerBefore.x - coreCenter.x)).toBeLessThan(15);
  expect(partnerBefore.y).toBeGreaterThan(coreCenter.y + 120);
  expect(mentorCenter.x).toBeLessThan(coreCenter.x - 120);
  expect(mentorCenter.y).toBeLessThan(coreCenter.y - 60);
  expect(schoolCenter.x).toBeGreaterThan(coreCenter.x + 120);
  expect(schoolCenter.y).toBeGreaterThan(coreCenter.y + 60);

  await partner.focus();
  await expect(partner).toHaveAttribute("aria-pressed", "true");
  await expect(stage).toHaveAttribute("data-selected-node", "Partner");
  await page.waitForTimeout(700);

  const canvasAfter = await canvas.boundingBox();
  const partnerAfterBox = await partner.boundingBox();
  expect(canvasAfter).not.toBeNull();
  expect(partnerAfterBox).not.toBeNull();
  const partnerAfter = relativeCenter(partnerAfterBox, canvasAfter);
  expect(Math.abs(partnerAfter.x - partnerBefore.x)).toBeLessThan(4);
  expect(Math.abs(partnerAfter.y - partnerBefore.y)).toBeLessThan(4);

  await expect(school).toHaveAttribute("data-related", "true");
  await expect(community).toHaveAttribute("data-related", "true");
  expect(await stage.locator(".reference-network-r5__svg-edge--cross").count()).toBeGreaterThanOrEqual(2);
  await expect(stage.locator(".reference-network-r5__details")).toContainText("Firma nekupuje pozitivní výsledek");

  const activeEdgeAnimation = await stage.locator(".reference-network-r5__svg-edge--signal").first().evaluate((element) => getComputedStyle(element).animationName);
  expect(activeEdgeAnimation).toContain("r5-svg-signal");
  const nodeAnimation = await partner.evaluate((element) => getComputedStyle(element).animationName);
  expect(nodeAnimation).toContain("r5-node-land");

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

test("mobile keeps fixed nodes, SVG links and detail cards aligned without overlap", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE_URL}/pro-koho`, { waitUntil: "networkidle" });

  const stage = page.locator('.reference-network-r5[data-network-key="roles"]');
  await expect(stage).toBeVisible();
  await expect(stage.locator("button[data-reference-node]")).toHaveCount(6);
  await expect(stage.locator(".reference-network-r5__links")).toBeVisible();
  const mentor = stage.locator('button[data-reference-node="Mentor"]');
  await mentor.focus();
  await expect(mentor).toHaveAttribute("aria-pressed", "true");
  await page.waitForTimeout(700);
  expect(await stage.locator(".reference-network-r5__svg-edge--cross").count()).toBeGreaterThan(0);

  const overlapCount = await stage.locator("button[data-reference-node]").evaluateAll((nodes) => {
    const boxes = nodes.map((node) => node.getBoundingClientRect());
    let overlaps = 0;
    for (let i = 0; i < boxes.length; i += 1) {
      for (let j = i + 1; j < boxes.length; j += 1) {
        const a = boxes[i];
        const b = boxes[j];
        if (Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1) overlaps += 1;
      }
    }
    return overlaps;
  });
  expect(overlapCount).toBe(0);

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
  expect(["", "none"]).toContain(activeEdgeAnimation);

  const proof = stage.locator('button[data-reference-node="Důkaz"]');
  await proof.focus();
  await expect(proof).toHaveAttribute("aria-pressed", "true");
  await context.close();
});
