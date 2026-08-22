import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PANSOFIE_LOCAL_URL || "http://127.0.0.1:5173";
const EVIDENCE_DIR = path.resolve("browser-evidence/public-copy-r8");
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

const JOURNEY = [
  ["home", "/", /Poznej sebe.*Tvoř s druhými.*Zlepšuj svět/i],
  ["how", "/jak-funguje", /Od skutečné potřeby k.*ověřené zkušenosti/i],
  ["roles", "/pro-koho", /Jedna zkušenost propojí více lidí/i],
  ["pilot", "/pilot", /Ne další školní aplikace/i],
  ["partner", "/partneri", /Přineste skutečný problém/i],
  ["about", "/o-projektu", /Učení má větší smysl, když se propojí se skutečným životem/i],
  ["join", "/zapojit-se", /Pansofie potřebuje lidi, kteří přinesou něco skutečného/i],
  ["simulator", "/zapojit-se?mode=simulator", /Vyzkoušejte Pansofii/i],
];

const FORBIDDEN_RENDERED = [
  /bounded output/i,
  /bounded partner deliverable/i,
  /learner raw evidence/i,
  /field pilot/i,
  /safeguarding/i,
  /adoption decision/i,
  /willingness-to-pay/i,
  /Living Experience Flow/i,
  /Experience Simulator/i,
  /\bOutcome\b/,
  /\bImpact\b/,
  /\bReview\b/,
];

function runtimeErrors(page) {
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("response", (response) => {
    try {
      const url = new URL(response.url());
      if (url.origin === new URL(BASE_URL).origin && response.status() >= 500) {
        errors.push(`http ${response.status()}: ${response.url()}`);
      }
    } catch {}
  });
  return errors;
}

async function assertPublicSurface(page, marker) {
  await expect(page.getByRole("heading", { name: marker }).first()).toBeVisible();
  const metrics = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyText: document.body.innerText,
  }));
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth + 1);
  for (const forbidden of FORBIDDEN_RENDERED) {
    expect(metrics.bodyText, `rendered jargon matched ${forbidden}`).not.toMatch(forbidden);
  }
}

for (const viewport of [
  { label: "desktop", width: 1440, height: 1100, isMobile: false },
  { label: "mobile", width: 390, height: 844, isMobile: true },
]) {
  test(`R8 visitor journey ${viewport.label} is human-first and bounded`, async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.isMobile,
    });
    const page = await context.newPage();
    const errors = runtimeErrors(page);

    for (const [name, route, marker] of JOURNEY) {
      const response = await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });
      expect(response).not.toBeNull();
      expect(response.status()).toBeLessThan(400);
      await assertPublicSurface(page, marker);
      await page.screenshot({
        path: path.join(EVIDENCE_DIR, `${String(JOURNEY.findIndex((item) => item[0] === name) + 1).padStart(2, "0")}-${name}-${viewport.label}.png`),
        fullPage: true,
      });
    }

    expect(errors, `runtime errors:\n${errors.join("\n")}`).toEqual([]);
    await context.close();
  });
}

test("R8 About page preserves historical versus product truth boundary", async ({ page }) => {
  await page.goto(`${BASE_URL}/o-projektu`, { waitUntil: "networkidle" });
  await expect(page.getByText(/Pansofie se inspiruje pansofickou snahou Jana Amose Komenského/i)).toBeVisible();
  await expect(page.getByText(/Dnešní Pansofie je ale náš současný produkt/i)).toBeVisible();
  await expect(page.getByText(/Komenskému nepřipisujeme software, AI, herní mechaniky, skóre ani dnešní architekturu Pansofie/i)).toBeVisible();
});

test("R8 join surface remains truthful and does not fake lead submission", async ({ page }) => {
  await page.goto(`${BASE_URL}/zapojit-se`, { waitUntil: "networkidle" });
  await expect(page.locator("form")).toHaveCount(0);
  await expect(page.getByText(/Veřejný web zatím nesbírá kontaktní údaje/i)).toBeVisible();
});

test("R8 public network translates internal domain keys before display", async ({ page }) => {
  await page.goto(`${BASE_URL}/partneri`, { waitUntil: "networkidle" });
  const ribbon = page.getByLabel("Živá mapa aktuální stránky");
  for (const label of ["Výzva", "Výstup", "Zpětná vazba", "Rozhodnutí", "Co se stalo potom", "Hranice"]) {
    await expect(ribbon.getByRole("button", { name: new RegExp(label, "i") })).toBeVisible();
  }
  await expect(page.locator('.reference-network-r5[data-network-key="partner"]')).toContainText("JAK SPOLU ČÁSTI SOUVISEJÍ");
});
