import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PANSOFIE_LOCAL_URL || "http://127.0.0.1:5173";
const EVIDENCE_DIR = path.resolve("browser-evidence/public-delivery-r2");
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

function runtimeErrors(page) {
  const errors = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(`console: ${message.text()}`); });
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("response", (response) => {
    try {
      const url = new URL(response.url());
      if (url.origin === new URL(BASE_URL).origin && response.status() >= 500) errors.push(`http ${response.status()}: ${response.url()}`);
    } catch {}
  });
  return errors;
}

const ROUTES = [
  ["home", "/"],
  ["how", "/jak-funguje"],
  ["roles", "/pro-koho"],
  ["pilot", "/pilot"],
  ["partner", "/partneri"],
  ["status", "/o-projektu"],
  ["join", "/zapojit-se?mode=simulator"],
];

for (const [name, route] of ROUTES) {
  for (const viewport of [
    { label: "desktop", width: 1440, height: 1100, isMobile: false },
    { label: "mobile", width: 390, height: 844, isMobile: true },
  ]) {
    test(`${name} ${viewport.label} renders without overflow`, async ({ browser }) => {
      const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, isMobile: viewport.isMobile });
      const page = await context.newPage();
      const errors = runtimeErrors(page);
      const response = await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });
      expect(response).not.toBeNull();
      expect(response.status()).toBeLessThan(400);
      const dimensions = await page.evaluate(() => ({ innerWidth: window.innerWidth, scrollWidth: document.documentElement.scrollWidth }));
      expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.innerWidth + 1);
      await page.screenshot({ path: path.join(EVIDENCE_DIR, `${name}-${viewport.label}.png`), fullPage: true });
      expect(errors, `${name} ${viewport.label} runtime errors:\n${errors.join("\n")}`).toEqual([]);
      await context.close();
    });
  }
}

test("homepage has one coherent public narrative", async ({ page }) => {
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: /Poznej sebe.*Tvoř s druhými.*Zlepšuj svět/i })).toBeVisible();
  await expect(page.getByText(/01 · JAK VYPADÁ JEDNA SKUTEČNÁ ZKUŠENOST/i)).toBeVisible();
  await expect(page.getByText(/02 · KDO JE SOUČÁSTÍ JEDNÉ ZKUŠENOSTI/i)).toBeVisible();
  await expect(page.getByText(/03 · METODA PANSOFIE/i)).toBeVisible();
  await expect(page.getByText(/04 · KDE PANSOFIE OPRAVDU JE/i)).toBeVisible();
  await expect(page.getByRole("heading", { name: /Říkáme otevřeně, co už funguje/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Vyzkoušet Pansofii za 60 sekund/i }).first()).toHaveAttribute("href", "/zapojit-se?mode=simulator");
});

test("dedicated role page exposes all six role infographics", async ({ page }) => {
  await page.goto(`${BASE_URL}/pro-koho`, { waitUntil: "networkidle" });
  for (const role of ["learner", "family", "school", "mentor", "partner", "community"]) {
    await expect(page.locator(`button[data-role="${role}"]`).first()).toBeVisible();
  }
  const partner = page.locator('button[data-role="partner"]').first();
  await partner.click();
  await expect(partner).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("heading", { name: /Firma \/ organizace/i })).toBeVisible();
  await expect(page.locator(".role-map-boundary")).toContainText("Partner hodnotí výstup podle zadání, nikdy lidskou hodnotu");
  await expect(page.getByText(/neveřejné podklady a důkazy žáka/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Jak funguje partnerství/i })).toHaveAttribute("href", "/partneri");
});

test("public maturity page separates implementation from unproven impact", async ({ page }) => {
  await page.goto(`${BASE_URL}/o-projektu`, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: /Učení má větší smysl, když se propojí se skutečným životem/i })).toBeVisible();
  for (const label of ["UŽ FUNGUJE", "POTŘEBUJEME OVĚŘIT", "ZATÍM NEMÁME DŮKAZ", "DALŠÍ KROK"]) {
    await expect(page.getByRole("heading", { name: label })).toBeVisible();
  }
  await expect(page.getByText(/Nemáme za sebou vyhodnocený pilot v reálné škole/i)).toBeVisible();
});

test("legacy contact path redirects to truthful role-specific journey", async ({ page }) => {
  await page.goto(`${BASE_URL}/kontakt`, { waitUntil: "networkidle" });
  await expect(page).toHaveURL(`${BASE_URL}/zapojit-se`);
  await expect(page.getByRole("heading", { name: /Vyzkoušejte Pansofii/i })).toBeVisible();
  await expect(page.locator("form")).toHaveCount(0);
});

test("404 has useful recovery actions", async ({ page }) => {
  await page.goto(`${BASE_URL}/tohle-neexistuje`, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: /Tahle cesta v Pansofii neexistuje/i })).toBeVisible();
  await expect(page.getByRole("link", { name: "Domů", exact: true })).toHaveAttribute("href", "/");
  await expect(page.getByRole("link", { name: /Jak to funguje/i }).last()).toHaveAttribute("href", "/jak-funguje");
  await expect(page.getByRole("link", { name: /Pro koho/i }).last()).toHaveAttribute("href", "/pro-koho");
});
