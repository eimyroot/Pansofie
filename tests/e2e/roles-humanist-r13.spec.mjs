import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PANSOFIE_LOCAL_URL || "http://127.0.0.1:5173";
const EVIDENCE_DIR = path.resolve("browser-evidence/roles-humanist-r13");
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

function runtimeErrors(page) {
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  return errors;
}

for (const viewport of [
  { label: "desktop", width: 1440, height: 1100, isMobile: false },
  { label: "mobile", width: 390, height: 844, isMobile: true },
]) {
  test(`R13 Pro koho is readable and scannable on ${viewport.label}`, async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.isMobile,
      locale: "cs-CZ",
    });
    const page = await context.newPage();
    const errors = runtimeErrors(page);

    const response = await page.goto(`${BASE_URL}/pro-koho`, { waitUntil: "networkidle" });
    expect(response?.status()).toBeLessThan(400);

    const h1 = page.getByRole("heading", { name: "Pro koho je Pansofie?", exact: true });
    await expect(h1).toBeVisible();

    // R17 intentionally repeats these principles in the persistent header.
    // R13 continues to verify the original manifesto inside the page itself.
    const pageManifest = page.locator('[aria-label="Principy Pansofie"]');
    await expect(pageManifest).toHaveCount(1);
    await expect(pageManifest.getByText("Internet a vzdělání musí být zdarma", { exact: false })).toBeVisible();
    await expect(pageManifest.getByText("Technologie nesmí sloužit jen byznysu", { exact: false })).toBeVisible();
    await expect(pageManifest.getByText("Digitální gramotnost bez morální gramotnosti", { exact: false })).toBeVisible();

    for (const label of ["POZNAT SEBE", "TVOŘIT S DRUHÝMI", "ZLEPŠOVAT SVĚT"]) {
      await expect(page.getByText(label, { exact: true })).toBeVisible();
    }

    for (const target of ["Pro studenty a mladé lidi", "Pro pedagogy a školy", "Pro firmy a lídry", "Pro ochránce přírody a vizionáře"]) {
      await expect(page.getByRole("heading", { name: target, exact: true })).toBeVisible();
    }

    const heroMetrics = await h1.evaluate((element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return {
        height: rect.height,
        width: rect.width,
        fontFamily: style.fontFamily,
        fontSize: parseFloat(style.fontSize),
        lineHeight: parseFloat(style.lineHeight),
      };
    });

    expect(heroMetrics.fontFamily).toMatch(/EB Garamond|Cormorant Garamond|Fraunces/i);
    expect(heroMetrics.fontSize).toBeLessThanOrEqual(viewport.isMobile ? 64 : 84);
    expect(heroMetrics.height / Math.max(heroMetrics.lineHeight, 1)).toBeLessThanOrEqual(viewport.isMobile ? 2.3 : 2.05);

    const pageMetrics = await page.evaluate(() => ({
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(pageMetrics.scrollWidth).toBeLessThanOrEqual(pageMetrics.innerWidth + 1);
    expect(errors).toEqual([]);

    await page.screenshot({
      path: path.join(EVIDENCE_DIR, `pro-koho-r13-${viewport.label}.png`),
      fullPage: true,
    });
    await context.close();
  });
}

test("R13 pillar cards open real detail routes", async ({ page }) => {
  await page.goto(`${BASE_URL}/pro-koho`, { waitUntil: "networkidle" });
  const routes = [
    ["Otevřít kapitolu", "/pro-koho/poznej-sebe", /Pro ty, kteří chtějí hlouběji poznat sebe/i],
    ["Otevřít kapitolu", "/pro-koho/tvor-s-druhymi", /Pro ty, kteří chtějí tvořit s druhými/i],
    ["Otevřít kapitolu", "/pro-koho/zlepsuj-svet", /Pro ty, kteří touží zlepšovat svět/i],
  ];

  const links = page.getByText("Otevřít kapitolu", { exact: true });
  await expect(links).toHaveCount(3);

  for (let i = 0; i < routes.length; i += 1) {
    await page.goto(`${BASE_URL}${routes[i][1]}`, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: routes[i][2] })).toBeVisible();
    await expect(page.getByText(/Příklady misí/i)).toBeVisible();
  }
});

test("R13 English Pro koho and detail route are explicit and overflow-safe", async ({ page }) => {
  await page.goto(`${BASE_URL}/pro-koho?lang=en`, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Who is Pansofie for?", exact: true })).toBeVisible();
  await expect(page.getByText("For everyone", { exact: true })).toBeVisible();
  await expect(page.getByText("KNOW YOURSELF", { exact: true })).toBeVisible();

  await page.goto(`${BASE_URL}/pro-koho/zlepsuj-svet?lang=en`, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: /For people who want to improve the world/i })).toBeVisible();
  await expect(page.getByText("Mission examples", { exact: true })).toBeVisible();

  const metrics = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth + 1);

  await page.screenshot({ path: path.join(EVIDENCE_DIR, "pillar-r13-en.png"), fullPage: true });
});
