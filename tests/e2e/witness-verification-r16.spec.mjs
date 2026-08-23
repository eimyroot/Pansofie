import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PANSOFIE_LOCAL_URL || "http://127.0.0.1:5173";
const EVIDENCE_DIR = path.resolve("browser-evidence/witness-verification-r16");
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

const overflow = (page) => page.evaluate(() => ({
  innerWidth: window.innerWidth,
  scrollWidth: document.documentElement.scrollWidth,
}));

for (const viewport of [
  { label: "desktop", width: 1440, height: 1000, isMobile: false },
  { label: "mobile", width: 390, height: 844, isMobile: true },
]) {
  test(`R16 confirmed witness thank-you is clean on ${viewport.label}`, async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, isMobile: viewport.isMobile, locale: "cs-CZ" });
    const page = await context.newPage();
    const response = await page.goto(`${BASE_URL}/potvrzeni-zkusenosti?result=confirmed`, { waitUntil: "networkidle" });
    expect(response?.status()).toBeLessThan(400);
    await expect(page.getByText("SVĚDEK NÁPRAVY", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Děkujeme. Svědectví bylo zaznamenáno.", exact: true })).toBeVisible();
    await expect(page.getByText(/Potvrdili jste konkrétní zkušenost, ne hodnotu člověka/i)).toBeVisible();
    await expect(page.getByText(/Samo o sobě neuděluje body, známku ani automaticky neschvaluje Pansofický pas/i)).toBeVisible();
    await expect(page.getByRole("link", { name: "Jak Pansofie funguje", exact: true })).toHaveAttribute("href", "/jak-funguje");
    await expect(page.getByRole("link", { name: "Chci se zapojit", exact: true })).toHaveAttribute("href", "/zapojit-se");
    await expect(page.getByText(/Vytvořit bezplatný profil/i)).toHaveCount(0);
    const metrics = await overflow(page);
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth + 1);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, `confirmed-${viewport.label}.png`), fullPage: true });
    await context.close();
  });
}

test("R16 returned-for-clarification result never claims verification", async ({ page }) => {
  await page.goto(`${BASE_URL}/potvrzeni-zkusenosti?result=needs_revision`, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Děkujeme. Zkušenost byla vrácena k doplnění.", exact: true })).toBeVisible();
  await expect(page.getByText(/Nic nebylo automaticky označeno jako ověřené/i)).toBeVisible();
});

test("R16 expired and invalid states are fail-closed", async ({ page }) => {
  await page.goto(`${BASE_URL}/potvrzeni-zkusenosti?result=expired`, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Platnost odkazu skončila.", exact: true })).toBeVisible();
  await page.goto(`${BASE_URL}/potvrzeni-zkusenosti`, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Tuto žádost se nepodařilo bezpečně otevřít.", exact: true })).toBeVisible();
});

test("R16 English confirmed state is explicit", async ({ page }) => {
  await page.goto(`${BASE_URL}/potvrzeni-zkusenosti?result=confirmed&lang=en`, { waitUntil: "networkidle" });
  await expect(page.getByText("WITNESS OF REAL-WORLD ACTION", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Thank you. Your witness statement was recorded.", exact: true })).toBeVisible();
  await expect(page.getByText(/does not award points, grades, or automatically approve the Pansofie Passport/i)).toBeVisible();
  expect(await page.getAttribute("html", "lang")).toBe("en");
});
