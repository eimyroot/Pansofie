import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PANSOFIE_LOCAL_URL || "http://127.0.0.1:5173";
const EVIDENCE_DIR = path.resolve("browser-evidence/public-i18n-r10");
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

const PUBLIC_ROUTES = [
  ["home", "/"],
  ["how", "/jak-funguje"],
  ["go", "/pansofiego"],
  ["roles", "/pro-koho"],
  ["pilot", "/pilot"],
  ["partner", "/partneri"],
  ["about", "/o-projektu"],
  ["join", "/zapojit-se"],
  ["simulator", "/zapojit-se?mode=simulator"],
  ["privacy", "/soukromi"],
  ["safety", "/bezpecnost"],
  ["terms", "/podminky"],
  ["login", "/login"],
  ["register", "/register"],
  ["forgot", "/forgot-password"],
];

const CZECH_DIACRITICS = /[áčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]/;
const ALLOWED_PROPER_NAMES = [
  /Jan Amos Komenský/gi,
  /Komenský/gi,
  /Tomáš Baťa/gi,
  /Baťa/gi,
];

function englishUrl(route) {
  const url = new URL(route, BASE_URL);
  url.searchParams.set("lang", "en");
  return url.toString();
}

async function czechResidue(page) {
  return page.evaluate(({ source, allowedSources }) => {
    const pattern = new RegExp(source);
    const allowed = allowedSources.map((value) => new RegExp(value, "gi"));
    const found = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();

    while (node) {
      const parent = node.parentElement;
      if (parent && !["SCRIPT", "STYLE", "CODE", "PRE", "NOSCRIPT"].includes(parent.tagName) && !parent.closest("[data-i18n-ignore='true']")) {
        let value = (node.nodeValue || "").trim();
        for (const properName of allowed) value = value.replace(properName, "PROPER_NAME");
        if (value && pattern.test(value)) found.push(value);
      }
      node = walker.nextNode();
    }

    return [...new Set(found)];
  }, {
    source: CZECH_DIACRITICS.source,
    allowedSources: ALLOWED_PROPER_NAMES.map((item) => item.source),
  });
}

for (const viewport of [
  { label: "desktop", width: 1440, height: 1100, isMobile: false },
  { label: "mobile", width: 390, height: 844, isMobile: true },
]) {
  test(`R10 English public coverage ${viewport.label}`, async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.isMobile,
      locale: "en-US",
    });
    const page = await context.newPage();
    const allResidue = {};

    for (const [name, route] of PUBLIC_ROUTES) {
      const response = await page.goto(englishUrl(route), { waitUntil: "networkidle" });
      expect(response).not.toBeNull();
      expect(response.status()).toBeLessThan(400);
      await page.waitForTimeout(80);

      expect(await page.locator("html").getAttribute("lang"), `${name}: html lang`).toBe("en");
      const residue = await czechResidue(page);
      if (residue.length) {
        allResidue[name] = residue;
        console.error(`I18N_CZECH_RESIDUE ${name}: ${JSON.stringify(residue)}`);
      }

      const metrics = await page.evaluate(() => ({
        innerWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(metrics.scrollWidth, `${name}: horizontal overflow`).toBeLessThanOrEqual(metrics.innerWidth + 1);
    }

    fs.writeFileSync(
      path.join(EVIDENCE_DIR, `residue-${viewport.label}.json`),
      JSON.stringify(allResidue, null, 2),
    );
    expect(allResidue, `untranslated Czech text remains: ${JSON.stringify(allResidue)}`).toEqual({});

    await page.goto(englishUrl("/"), { waitUntil: "networkidle" });
    await page.waitForTimeout(80);
    await expect(page.getByRole("heading", { name: /Know yourself.*Create with others.*Improve the world/i })).toBeVisible();
    await page.screenshot({ path: path.join(EVIDENCE_DIR, `home-en-${viewport.label}.png`), fullPage: true });

    await context.close();
  });
}

test("R10 language switch persists and preserves shareable locale during navigation", async ({ page }) => {
  await page.goto(`${BASE_URL}/?lang=en`, { waitUntil: "networkidle" });
  await page.waitForTimeout(80);
  await expect(page.getByRole("heading", { name: /Know yourself.*Improve the world/i })).toBeVisible();

  const languageGroup = page.getByRole("group", { name: "Website language" });
  await expect(languageGroup.getByRole("button", { name: "EN", exact: true })).toHaveAttribute("aria-pressed", "true");

  await languageGroup.getByRole("button", { name: "CZ", exact: true }).click();
  await page.waitForTimeout(80);
  await expect(page.getByRole("heading", { name: /Poznej sebe.*Zlepšuj svět/i })).toBeVisible();
  expect(new URL(page.url()).searchParams.has("lang")).toBe(false);
  expect(await page.evaluate(() => localStorage.getItem("pansofie.locale"))).toBe("cs");
  expect(await page.locator("html").getAttribute("lang")).toBe("cs");

  const czechGroup = page.getByRole("group", { name: "Jazyk webu" });
  await czechGroup.getByRole("button", { name: "EN", exact: true }).click();
  await page.waitForTimeout(80);
  await page.getByRole("link", { name: "How it works", exact: true }).first().click();
  await page.waitForTimeout(80);
  const navigated = new URL(page.url());
  expect(navigated.pathname).toBe("/jak-funguje");
  expect(navigated.searchParams.get("lang")).toBe("en");
  expect(await page.locator("html").getAttribute("lang")).toBe("en");
  await expect(page.getByRole("heading", { name: /From a real need to a verified experience/i })).toBeVisible();
});
