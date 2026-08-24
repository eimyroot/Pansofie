import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PANSOFIE_LOCAL_URL || "http://127.0.0.1:5173";
const EVIDENCE_DIR = path.resolve("browser-evidence/public-typography-r22");
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

const ROUTES = ["/", "/jak-funguje", "/pro-koho", "/o-projektu", "/materialovy-most", "/knihovna"];
const VIEWPORTS = [
  { label: "desktop", width: 1440, height: 1000, maxH1: 61, maxH2: 46 },
  { label: "mobile", width: 390, height: 844, maxH1: 44, maxH2: 36 },
];

for (const viewport of VIEWPORTS) {
  test(`R22 public typography stays dense on ${viewport.label}`, async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, locale: "cs-CZ" });
    const page = await context.newPage();

    for (const route of ROUTES) {
      await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });

      const metrics = await page.evaluate(() => {
        const px = (el) => Number.parseFloat(getComputedStyle(el).fontSize || "0");
        const h1 = [...document.querySelectorAll("main h1")].map(px);
        const h2 = [...document.querySelectorAll("main h2")].map(px);
        return {
          h1,
          h2,
          innerWidth: window.innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
        };
      });

      expect(metrics.h1.length, `${route} should expose an H1`).toBeGreaterThan(0);
      expect(Math.max(...metrics.h1), `${route} H1 is still billboard-sized`).toBeLessThanOrEqual(viewport.maxH1);
      if (metrics.h2.length) {
        expect(Math.max(...metrics.h2), `${route} H2 is still billboard-sized`).toBeLessThanOrEqual(viewport.maxH2);
      }
      expect(metrics.scrollWidth, `${route} must not overflow horizontally`).toBeLessThanOrEqual(metrics.innerWidth + 1);
    }

    for (const route of ["/", "/jak-funguje", "/pro-koho"]) {
      await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });
      const slug = route === "/" ? "home" : route.slice(1);
      await page.screenshot({ path: path.join(EVIDENCE_DIR, `${slug}-${viewport.label}.png`), fullPage: true });
    }

    await context.close();
  });
}
