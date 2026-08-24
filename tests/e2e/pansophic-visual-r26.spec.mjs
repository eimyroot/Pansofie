import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PANSOFIE_LOCAL_URL || "http://127.0.0.1:5173";
const EVIDENCE_DIR = path.resolve("browser-evidence/pansophic-visual-r26");
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

async function assertNoOverflow(page) {
  const metrics = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth + 1);
}

function expectPansophicDisplayFamily(fontFamily) {
  expect(fontFamily.includes("Cormorant Garamond") || fontFamily.includes("EB Garamond")).toBe(true);
}

for (const scenario of [
  { label: "desktop", viewport: { width: 1366, height: 1000 } },
  { label: "mobile", viewport: { width: 390, height: 844 } },
]) {
  test(`R26 pansophic visual system is readable on ${scenario.label}`, async ({ browser }) => {
    const context = await browser.newContext({ viewport: scenario.viewport, locale: "cs-CZ" });
    const page = await context.newPage();

    await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
    const hero = page.locator("main h1").first();
    await expect(hero).toContainText("Poznej sebe");

    const heroStyle = await hero.evaluate((node) => {
      const style = getComputedStyle(node);
      return {
        fontFamily: style.fontFamily,
        color: style.color,
        textShadow: style.textShadow,
        stroke: style.webkitTextStrokeWidth,
        fontSize: Number.parseFloat(style.fontSize),
      };
    });
    expectPansophicDisplayFamily(heroStyle.fontFamily);
    expect(Number.parseFloat(heroStyle.stroke)).toBeGreaterThan(0);
    expect(heroStyle.textShadow).not.toBe("none");
    expect(heroStyle.fontSize).toBeLessThanOrEqual(scenario.label === "mobile" ? 44 : 61);

    const accent = hero.locator(".text-primary").first();
    await expect(accent).toContainText("Zlepšuj svět");
    const accentStyle = await accent.evaluate((node) => {
      const style = getComputedStyle(node);
      return { color: style.color, shadow: style.textShadow, stroke: style.webkitTextStrokeWidth };
    });
    expect(accentStyle.color).toContain("102, 227, 154");
    expect(accentStyle.shadow).not.toBe("none");
    expect(Number.parseFloat(accentStyle.stroke)).toBeGreaterThan(0);

    const bodyStyle = await page.locator("body").evaluate((node) => {
      const style = getComputedStyle(node);
      return { backgroundImage: style.backgroundImage, overflowX: style.overflowX };
    });
    expect(bodyStyle.backgroundImage).toContain("linear-gradient");
    expect(["clip", "hidden"]).toContain(bodyStyle.overflowX);
    await assertNoOverflow(page);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, `home-${scenario.label}.png`), fullPage: true });

    await page.goto(`${BASE_URL}/login`, { waitUntil: "domcontentloaded" });
    const loginTitle = page.getByRole("heading", { level: 1, name: "Vítejte zpět" });
    await expect(loginTitle).toBeVisible();
    const loginStyle = await loginTitle.evaluate((node) => getComputedStyle(node).fontFamily);
    expectPansophicDisplayFamily(loginStyle);

    const input = page.locator("input").first();
    await expect(input).toBeVisible();
    const inputStyle = await input.evaluate((node) => {
      const style = getComputedStyle(node);
      return { backgroundColor: style.backgroundColor, color: style.color };
    });
    expect(inputStyle.backgroundColor).not.toBe("rgb(255, 255, 255)");
    expect(inputStyle.color).not.toBe("rgb(0, 0, 0)");
    await assertNoOverflow(page);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, `login-${scenario.label}.png`), fullPage: true });

    await context.close();
  });
}
