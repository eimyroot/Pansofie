import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PANSOFIE_LOCAL_URL || "http://127.0.0.1:5173";
const EVIDENCE_DIR = path.resolve("browser-evidence/footer-manifest-r24");
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

const principles = [
  ["omnes", "Všem", "Internet a vzdělání musí být zdarma, bez bariér a dostupné i v nejchudších koutech světa."],
  ["omnia", "Všemu", "Technologie nesmí sloužit jen byznysu, ale musí pomáhat léčit nemoci, chránit přírodu a rozvíjet kulturu."],
  ["omnino", "Všestranně", "Digitální gramotnost bez morální gramotnosti je nebezpečná zbraň. Učit se musíme rozumu, jazyku i srdci zároveň."],
];

const canonicalHrefs = [
  "/pro-koho/skoly",
  "/pro-koho/firmy",
  "/materialovy-most",
  "/pilot",
  "/partneri",
  "/bezpecnost",
  "/zapojit-se",
  "/soukromi",
  "/podminky",
  "/login",
];

for (const scenario of [
  { label: "desktop", viewport: { width: 1440, height: 1000 } },
  { label: "mobile", viewport: { width: 390, height: 844 } },
]) {
  test(`R24 footer is compact, canonical and readable on ${scenario.label}`, async ({ browser }) => {
    const context = await browser.newContext({ viewport: scenario.viewport, locale: "cs-CZ" });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/pro-koho`, { waitUntil: "networkidle" });

    const footer = page.locator('footer[data-footer-release="r24"]');
    await expect(footer).toBeVisible();
    await footer.scrollIntoViewIfNeeded();

    const region = footer.getByRole("region", { name: "Principy Pansofie: všem, všemu, všestranně" });
    await expect(region).toBeVisible();
    for (const [key, label, text] of principles) {
      const item = region.locator(`[data-principle="${key}"]`);
      await expect(item.locator("strong")).toHaveText(label);
      await expect(item).toContainText(text);
    }

    for (const href of canonicalHrefs) {
      await expect(footer.locator(`a[href="${href}"]`).first()).toBeVisible();
    }

    await expect(footer.locator('a[href^="/young"]')).toHaveCount(0);
    await expect(footer.locator('a[href="/pro-skoly"], a[href="/pro-firmy"], a[href="/kodex"]')).toHaveCount(0);
    await expect(footer.getByText("Veřejný dětský login ani registrace zatím nejsou otevřené.")).toBeVisible();

    const metrics = await page.evaluate(() => {
      const footerNode = document.querySelector('footer[data-footer-release="r24"]');
      const fontSizes = footerNode
        ? Array.from(footerNode.querySelectorAll("*")).map((node) => Number.parseFloat(getComputedStyle(node).fontSize) || 0)
        : [];
      return {
        innerWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        headerHeight: document.querySelector(".pansofie-public-header")?.getBoundingClientRect().height || 0,
        ribbonTop: document.querySelector(".route-network-ribbon")?.getBoundingClientRect().top || 0,
        footerBackground: footerNode ? getComputedStyle(footerNode).backgroundColor : "",
        footerFontFamily: footerNode ? getComputedStyle(footerNode).fontFamily : "",
        maxFooterFontSize: Math.max(0, ...fontSizes),
      };
    });

    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth + 1);
    expect(Math.round(metrics.headerHeight)).toBe(74);
    expect(Math.round(metrics.ribbonTop)).toBe(74);
    expect(metrics.footerBackground).toBe("rgb(11, 16, 22)");
    expect(metrics.footerFontFamily).toContain("Plus Jakarta Sans");
    expect(metrics.maxFooterFontSize).toBeLessThanOrEqual(18);

    await page.screenshot({ path: path.join(EVIDENCE_DIR, `footer-${scenario.label}.png`), fullPage: true });
    await context.close();
  });
}

test("R24 footer preserves explicit English public copy", async ({ page }) => {
  await page.goto(`${BASE_URL}/pro-koho?lang=en`, { waitUntil: "networkidle" });
  const footer = page.locator('footer[data-footer-release="r24"]');
  await expect(footer.getByRole("region", { name: "Pansofie principles: for all, for the whole, in every way" })).toBeVisible();
  await expect(footer.getByText("Adult pathways")).toBeVisible();
  await expect(footer.getByText("These age worlds are in preparation. Public child login and registration are not open yet.")).toBeVisible();
  expect(await page.getAttribute("html", "lang")).toBe("en");
});
