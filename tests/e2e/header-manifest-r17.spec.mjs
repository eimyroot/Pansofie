import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PANSOFIE_LOCAL_URL || "http://127.0.0.1:5173";
const EVIDENCE_DIR = path.resolve("browser-evidence/header-manifest-r17");
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

const exactCz = [
  ["omnes", "Všem", "Internet a vzdělání musí být zdarma, bez bariér a dostupné i v nejchudších koutech světa."],
  ["omnia", "Všemu", "Technologie nesmí sloužit jen byznysu, ale musí pomáhat léčit nemoci, chránit přírodu a rozvíjet kulturu."],
  ["omnino", "Všestranně", "Digitální gramotnost bez morální gramotnosti je nebezpečná zbraň. Učit se musíme rozumu, jazyku i srdci zároveň."],
];

for (const viewport of [
  { label: "desktop", width: 1440, height: 1000, isMobile: false },
  { label: "mobile", width: 390, height: 844, isMobile: true },
]) {
  test(`R17 manifesto header is readable and bounded on ${viewport.label}`, async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, isMobile: viewport.isMobile, locale: "cs-CZ" });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/pro-koho`, { waitUntil: "networkidle" });

    const region = page.getByRole("region", { name: "Principy Pansofie: všem, všemu, všestranně" });
    await expect(region).toBeVisible();

    for (const [key, label, text] of exactCz) {
      const item = region.locator(`.pansofie-header-manifest__item[data-principle="${key}"]`);
      await expect(item).toHaveCount(1);
      await expect(item.locator("strong")).toHaveText(label);
      await expect(item).toContainText(text);
      await item.scrollIntoViewIfNeeded();
    }

    const metrics = await page.evaluate(() => ({
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      headerHeight: document.querySelector(".pansofie-public-header")?.getBoundingClientRect().height,
      ribbonTop: document.querySelector(".route-network-ribbon")?.getBoundingClientRect().top,
    }));

    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth + 1);
    expect(Math.round(metrics.headerHeight || 0)).toBe(118);
    expect(Math.round(metrics.ribbonTop || 0)).toBe(118);

    await page.screenshot({ path: path.join(EVIDENCE_DIR, `manifest-${viewport.label}.png`), fullPage: false });
    await context.close();
  });
}

test("R17 manifesto has explicit English copy", async ({ page }) => {
  await page.goto(`${BASE_URL}/pro-koho?lang=en`, { waitUntil: "networkidle" });
  const region = page.getByRole("region", { name: "Pansofie principles: for all, for the whole, in every way" });
  await expect(region).toBeVisible();
  await expect(region.locator('[data-principle="omnes"] strong')).toHaveText("For all");
  await expect(region.locator('[data-principle="omnia"] strong')).toHaveText("For the whole");
  await expect(region.locator('[data-principle="omnino"] strong')).toHaveText("In every way");
  await expect(region).toContainText("Digital literacy without moral literacy is a dangerous weapon.");
  expect(await page.getAttribute("html", "lang")).toBe("en");
});
