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

  const header = page.locator('[data-nav-release="r27"]');
  await expect(header).toBeVisible();
  const nav = header.getByRole("navigation", { name: "Veřejná navigace" });
  await expect(nav).toBeVisible();

  for (const label of ["Jak to funguje", "PansofieGO", "Pro koho", "Knihovna", "Pro školy", "Pro partnery", "O Pansofii", "Přidejte se"]) {
    await expect(nav.getByRole("link", { name: label, exact: true })).toBeVisible();
  }

  const navStyle = await nav.getByRole("link", { name: "Jak to funguje", exact: true }).evaluate((node) => {
    const style = getComputedStyle(node);
    return { color: style.color, family: style.fontFamily, weight: style.fontWeight };
  });
  const [r, g, b] = rgb(navStyle.color);
  expect(r).toBeGreaterThanOrEqual(220);
  expect(g).toBeGreaterThanOrEqual(225);
  expect(b).toBeGreaterThanOrEqual(235);
  expect(navStyle.family).toContain("Source Sans 3");
  expect(Number(navStyle.weight)).toBeGreaterThanOrEqual(600);

  const brand = header.getByText("Pansofie", { exact: true });
  const brandFamily = await brand.evaluate((node) => getComputedStyle(node).fontFamily);
  expect(brandFamily).toContain("EB Garamond");

  const hero = page.locator("main h1").first();
  await expect(hero).toContainText("Poznej sebe");
  const heroStyle = await hero.evaluate((node) => {
    const style = getComputedStyle(node);
    return { family: style.fontFamily, stroke: style.webkitTextStrokeWidth, shadow: style.textShadow };
  });
  expect(heroStyle.family).toContain("EB Garamond");
  expect(parseFloat(heroStyle.stroke)).toBeGreaterThan(0);
  expect(heroStyle.shadow).not.toBe("none");

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

  const header = page.locator('[data-nav-release="r27"]');
  const open = header.getByRole("button", { name: "Otevřít menu" });
  await expect(open).toBeVisible();
  await open.click();

  const menu = page.locator("#public-mobile-menu");
  await expect(menu).toBeVisible();
  await expect(menu.getByRole("link", { name: "Jak to funguje", exact: true })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Přidejte se", exact: true })).toBeVisible();

  const mobileStyle = await menu.getByRole("link", { name: "Jak to funguje", exact: true }).evaluate((node) => {
    const style = getComputedStyle(node);
    return { color: style.color, family: style.fontFamily };
  });
  const [r, g, b] = rgb(mobileStyle.color);
  expect(r).toBeGreaterThanOrEqual(225);
  expect(g).toBeGreaterThanOrEqual(230);
  expect(b).toBeGreaterThanOrEqual(240);
  expect(mobileStyle.family).toContain("Source Sans 3");

  const heroFamily = await page.locator("main h1").first().evaluate((node) => getComputedStyle(node).fontFamily);
  expect(heroFamily).toContain("EB Garamond");

  await assertNoOverflow(page);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, "home-mobile-menu.png"), fullPage: true });
  await context.close();
});
