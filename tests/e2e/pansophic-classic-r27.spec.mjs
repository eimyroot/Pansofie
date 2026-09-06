import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PANSOFIE_LOCAL_URL || "http://127.0.0.1:5173";
const EVIDENCE_DIR = path.resolve("browser-evidence/pansophic-classic-r27");
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

function rgb(value) {
  const match = String(value).match(/rgba?\((\d+)[, ]+(\d+)[, ]+(\d+)/i);
  return match ? match.slice(1, 4).map(Number) : [0, 0, 0];
}

async function assertNoOverflow(page) {
  const metrics = await page.evaluate(() => ({ innerWidth: window.innerWidth, scrollWidth: document.documentElement.scrollWidth }));
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth + 1);
}

test("R27 desktop shows the full navigation with classic pansophic typography", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, locale: "cs-CZ" });
  const page = await context.newPage();
  await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });

  const header = page.locator(".modern-header");
  await expect(header).toBeVisible();
  const nav = header.getByRole("navigation", { name: "Hlavní navigace" });
  await expect(nav).toBeVisible();

  for (const label of ["Domů", "O Pansofii", "Akce", "Komunita", "Zdroje", "Kompost", "Kontakt"]) {
    await expect(nav.getByRole("link", { name: label, exact: true })).toBeVisible();
  }

  const navStyle = await nav.getByRole("link", { name: "O Pansofii", exact: true }).evaluate((node) => {
    const style = getComputedStyle(node);
    return { color: style.color, family: style.fontFamily, weight: style.fontWeight };
  });
  const [r, g, b] = rgb(navStyle.color);
  expect(r).toBeGreaterThanOrEqual(45);
  expect(g).toBeGreaterThanOrEqual(70);
  expect(b).toBeGreaterThanOrEqual(65);
  expect(navStyle.family).toContain("Source Sans 3");
  expect(Number(navStyle.weight)).toBeGreaterThanOrEqual(600);

  const brand = header.getByText("PANSOFIE", { exact: true });
  const brandFamily = await brand.evaluate((node) => getComputedStyle(node).fontFamily);
  expect(brandFamily).toContain("Source Sans 3");

  const hero = page.locator("main h1").first();
  await expect(hero).toContainText("Lepší svět");
  const heroStyle = await hero.evaluate((node) => {
    const style = getComputedStyle(node);
    return { family: style.fontFamily, stroke: style.webkitTextStrokeWidth, shadow: style.textShadow };
  });
  expect(heroStyle.family).toContain("EB Garamond");
  expect(parseFloat(heroStyle.stroke || "0")).toBeGreaterThanOrEqual(0);

  const bodyFamily = await page.locator("body").evaluate((node) => getComputedStyle(node).fontFamily);
  expect(bodyFamily).toContain("Source Sans 3");

  await assertNoOverflow(page);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, "home-desktop.png"), fullPage: true });
  await context.close();
});

test("R27 mobile menu is readable and keeps the same typography", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, locale: "cs-CZ" });
  const page = await context.newPage();
  await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });

  const header = page.locator(".modern-header");
  await expect(header).toBeVisible();
  await expect(header.getByRole("link", { name: "Připojit se" })).toBeVisible();

  const mobileStyle = await header.getByRole("link", { name: "Připojit se" }).evaluate((node) => {
    const style = getComputedStyle(node);
    return { color: style.color, family: style.fontFamily, backgroundColor: style.backgroundColor };
  });
  const [r, g, b] = rgb(mobileStyle.color);
  expect(r).toBeGreaterThanOrEqual(245);
  expect(g).toBeGreaterThanOrEqual(245);
  expect(b).toBeGreaterThanOrEqual(245);
  expect(mobileStyle.family).toContain("Source Sans 3");
  expect(mobileStyle.backgroundColor).toContain("23, 63, 55");

  const heroFamily = await page.locator("main h1").first().evaluate((node) => getComputedStyle(node).fontFamily);
  expect(heroFamily).toContain("EB Garamond");

  await assertNoOverflow(page);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, "home-mobile-menu.png"), fullPage: true });
  await context.close();
});
