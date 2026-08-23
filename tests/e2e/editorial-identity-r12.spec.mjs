import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PANSOFIE_LOCAL_URL || "http://127.0.0.1:5173";
const EVIDENCE_DIR = path.resolve("browser-evidence/editorial-identity-r12");
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

async function expectNoHorizontalOverflow(page) {
  const dimensions = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.innerWidth + 1);
}

test("R12 gives the public home a stronger editorial hierarchy", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto(BASE_URL, { waitUntil: "networkidle" });

  const h1 = page.locator("main h1").first();
  await expect(h1).toBeVisible();
  const typography = await h1.evaluate((el) => {
    const s = getComputedStyle(el);
    return { fontFamily: s.fontFamily, fontWeight: s.fontWeight, color: s.color, fontSize: s.fontSize };
  });
  expect(typography.fontFamily).toContain("Syne");
  expect(Number.parseInt(typography.fontWeight, 10)).toBeGreaterThanOrEqual(700);
  expect(Number.parseFloat(typography.fontSize)).toBeGreaterThanOrEqual(44);
  expect(typography.color).toBe("rgb(255, 255, 255)");

  const hero = page.locator("main > section").first();
  const heroBackground = await hero.evaluate((el) => getComputedStyle(el).backgroundImage);
  expect(heroBackground).toContain("linear-gradient");

  const secondSection = page.locator("main > section").nth(1);
  const borderTop = await secondSection.evaluate((el) => getComputedStyle(el).borderTopWidth);
  expect(Number.parseFloat(borderTop)).toBeGreaterThanOrEqual(4);

  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, "home-r12-desktop.png"), fullPage: true });
});

test("About Pansofie explains history, boundaries and named sources in Czech", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto(`${BASE_URL}/o-projektu`, { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { name: /Název Pansofie není dekorace/ })).toBeVisible();
  await expect(page.getByText("OMNES · OMNIA · OMNINO", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Historickou inspiraci opíráme/ })).toBeVisible();
  await expect(page.locator(".r12-source-card")).toHaveCount(4);
  await expect(page.getByText("PANSOFIE Product Constitution V1.0", { exact: true })).toBeVisible();

  const hrefs = await page.locator(".r12-source-card__link").evaluateAll((links) => links.map((link) => link.href));
  expect(hrefs.some((href) => href.includes("cupress.cuni.cz"))).toBeTruthy();
  expect(hrefs.some((href) => href.includes("pages.pedf.cuni.cz"))).toBeTruthy();
  expect(hrefs.some((href) => href.includes("ojs.cuni.cz"))).toBeTruthy();
  expect(hrefs.some((href) => href.includes("github.com/nulleimy/PANSOFIE"))).toBeTruthy();

  const boundary = page.locator(".r12-boundary-section");
  const boundaryStyle = await boundary.evaluate((el) => {
    const sectionStyle = getComputedStyle(el);
    const headingStyle = getComputedStyle(el.querySelector("h2"));
    return {
      backgroundColor: sectionStyle.backgroundColor,
      backgroundImage: sectionStyle.backgroundImage,
      headingColor: headingStyle.color,
    };
  });
  expect(boundaryStyle.backgroundColor).toBe("rgb(13, 22, 34)");
  expect(boundaryStyle.backgroundImage).toContain("linear-gradient");
  expect(boundaryStyle.headingColor).toBe("rgb(255, 255, 255)");

  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, "about-history-r12-desktop.png"), fullPage: true });
});

test("About Pansofie is explicitly bilingual and remains bounded on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE_URL}/o-projektu?lang=en`, { waitUntil: "networkidle" });

  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { name: /The name Pansofie is not decoration/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /We ground the historical inspiration/ })).toBeVisible();
  await expect(page.getByText("History ≠ today’s product", { exact: true })).toBeVisible();

  const h1 = page.locator("main h1").first();
  const mobileFontSize = await h1.evaluate((el) => Number.parseFloat(getComputedStyle(el).fontSize));
  expect(mobileFontSize).toBeGreaterThanOrEqual(38);

  const boundaryHeading = page.locator(".r12-boundary-section h2");
  await expect(boundaryHeading).toBeVisible();
  expect(await boundaryHeading.evaluate((el) => getComputedStyle(el).color)).toBe("rgb(255, 255, 255)");

  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, "about-history-r12-mobile-en.png"), fullPage: true });
});
