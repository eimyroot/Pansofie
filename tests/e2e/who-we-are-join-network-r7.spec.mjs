import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PANSOFIE_LOCAL_URL || "http://127.0.0.1:5173";
const EVIDENCE_DIR = path.resolve("browser-evidence/who-we-are-join-network-r7");
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

async function expectNoHorizontalOverflow(page) {
  const dimensions = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.innerWidth + 1);
}

for (const viewport of [
  { label: "desktop", width: 1440, height: 1100, isMobile: false },
  { label: "mobile", width: 390, height: 844, isMobile: true },
]) {
  test(`join network ${viewport.label} explains all participation paths without fake submission`, async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, isMobile: viewport.isMobile });
    const page = await context.newPage();
    const errors = runtimeErrors(page);

    await page.goto(`${BASE_URL}/zapojit-se`, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: /Pansofie potřebuje lidi, kteří přinesou realitu/i })).toBeVisible();
    await expect(page.getByText(/Nemusíte mít školu ani firmu/i)).toBeVisible();

    for (const id of ["school", "teacher", "learner", "family", "mentor", "partner", "community", "supporter"]) {
      await expect(page.locator(`[data-help-path="${id}"]`)).toBeVisible();
    }

    await expect(page.getByText(/Veřejný web zatím nesbírá kontaktní údaje/i)).toBeVisible();
    await expect(page.locator("form")).toHaveCount(0);
    await expectNoHorizontalOverflow(page);
    expect(errors).toEqual([]);

    await page.screenshot({ path: path.join(EVIDENCE_DIR, `join-network-${viewport.label}.png`), fullPage: true });
    await context.close();
  });

  test(`about ${viewport.label} explains purpose identity maturity and who is needed`, async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, isMobile: viewport.isMobile });
    const page = await context.newPage();
    const errors = runtimeErrors(page);

    await page.goto(`${BASE_URL}/o-projektu`, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: /Pansofie je funkční digitální produkt/i })).toBeVisible();
    await expect(page.getByText("Proč Pansofie vzniká", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Jsme ve fázi, kdy se produkt musí potkat s realitou/i })).toBeVisible();
    await expect(page.getByText(/Jména lidí za projektem, právního provozovatele a faktický veřejný kontaktní kanál/i)).toBeVisible();
    await expect(page.getByRole("heading", { name: "FUNKČNÍ / TECHNICKY OVĚŘENÉ" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "JEŠTĚ NEPROBĚHLO" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Ne publikum\. První síť lidí/i })).toBeVisible();

    await expectNoHorizontalOverflow(page);
    expect(errors).toEqual([]);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, `about-${viewport.label}.png`), fullPage: true });
    await context.close();
  });
}

test("PANSOFIEDIT remains available through explicit simulator mode", async ({ page }) => {
  await page.goto(`${BASE_URL}/zapojit-se?mode=simulator`, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: /Vyzkoušejte Pansofii/i })).toBeVisible();
  await expect(page.getByText(/PANSOFIEDIT · 60–90 sekund/i)).toBeVisible();
  await expect(page.locator("form")).toHaveCount(0);
});

test("role deep-link still enters the role-aware journey", async ({ page }) => {
  await page.goto(`${BASE_URL}/zapojit-se?role=mentor`, { waitUntil: "networkidle" });
  await expect(page.getByText("Mentor / odborník", { exact: true }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: /Jak chcete do Experience přinést odbornou zkušenost/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Pansofie potřebuje lidi, kteří přinesou realitu/i })).toHaveCount(0);
});

test("legacy contact keeps the old truthful journey contract on the same target URL", async ({ page }) => {
  await page.goto(`${BASE_URL}/kontakt`, { waitUntil: "networkidle" });
  await expect(page).toHaveURL(`${BASE_URL}/zapojit-se`);
  await expect(page.getByRole("heading", { name: /Vyzkoušejte Pansofii/i })).toBeVisible();
  await expect(page.locator("form")).toHaveCount(0);
});

test("public navigation exposes both project identity and participation", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await expect(page.getByRole("link", { name: "O Pansofii", exact: true })).toHaveAttribute("href", "/o-projektu");
  await expect(page.getByRole("link", { name: "Přidejte se", exact: true })).toHaveAttribute("href", "/zapojit-se");
  await expect(page.getByRole("link", { name: /Vyzkoušet 60 s/i })).toHaveAttribute("href", "/zapojit-se?mode=simulator");
});
