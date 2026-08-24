import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PANSOFIE_LOCAL_URL || "http://127.0.0.1:5173";
const EVIDENCE_DIR = path.resolve("browser-evidence/how-it-works-r20");
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

for (const viewport of [
  { label: "desktop", width: 1440, height: 1000, isMobile: false },
  { label: "mobile", width: 390, height: 844, isMobile: true },
]) {
  test(`R20 methodology page renders the full evidence cycle on ${viewport.label}`, async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.isMobile,
      locale: "cs-CZ",
    });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/jak-funguje`, { waitUntil: "networkidle" });

    await expect(page.getByRole("heading", { level: 1 })).toContainText("Od skutečného činu k");
    for (const step of ["Skutečná mise", "Akce a výstup", "Doložení důkazu", "Osobní reflexe", "Lidské ověření"]) {
      await expect(page.getByRole("heading", { name: step })).toBeVisible();
    }

    await expect(page.getByRole("heading", { name: "Vějíř zkušeností", exact: true }).first()).toBeVisible();
    await expect(page.getByText("Ukázková vizualizace — nejde o skutečný profil ani osobní data.")).toBeVisible();
    await expect(page.locator(".recharts-responsive-container")).toHaveCount(1);
    await expect(page.getByText("Veřejná samoobslužná registrace není otevřená. Pilotní účty se aktivují řízeně.")).toBeVisible();

    const metrics = await page.evaluate(() => ({
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth + 1);

    await page.screenshot({ path: path.join(EVIDENCE_DIR, `how-it-works-${viewport.label}.png`), fullPage: true });
    await context.close();
  });
}

test("R20 methodology page has explicit English copy", async ({ page }) => {
  await page.goto(`${BASE_URL}/jak-funguje?lang=en`, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toContainText("From a real action to a");
  await expect(page.getByRole("heading", { name: "Human verification" })).toBeVisible();
  await expect(page.getByText("Illustrative visualization — this is not a real profile or personal data.")).toBeVisible();
  await expect(page.getByText("Public self-service registration is not open. Pilot accounts are activated in a governed way.")).toBeVisible();
  expect(await page.getAttribute("html", "lang")).toBe("en");
});

test("R20 primary CTA opens the bounded public Taste flow", async ({ page }) => {
  await page.goto(`${BASE_URL}/jak-funguje`, { waitUntil: "networkidle" });
  await page.getByRole("link", { name: /Vyzkoušet celý cyklus/ }).click();
  await expect(page).toHaveURL(/\/pro-koho#ochutnejte$/);
  await expect(page.getByText("Vyzkoušejte si celý cyklus Pansofie bez registrace.")).toBeVisible();
});
