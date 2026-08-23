import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PANSOFIE_LOCAL_URL || "http://127.0.0.1:5173";
const EVIDENCE_DIR = path.resolve("browser-evidence/participation-network-r14");
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

const overflow = (page) => page.evaluate(() => ({
  innerWidth: window.innerWidth,
  scrollWidth: document.documentElement.scrollWidth,
}));

for (const viewport of [
  { label: "desktop", width: 1440, height: 1100, isMobile: false },
  { label: "mobile", width: 390, height: 844, isMobile: true },
]) {
  test(`R14 Pro koho participation gateway is readable on ${viewport.label}`, async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, isMobile: viewport.isMobile, locale: "cs-CZ" });
    const page = await context.newPage();
    const response = await page.goto(`${BASE_URL}/pro-koho`, { waitUntil: "networkidle" });
    expect(response?.status()).toBeLessThan(400);
    await expect(page.getByRole("heading", { name: "Pro koho je Pansofie?", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Udělejte první krok k nápravě.", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Chci Pansofii do školy", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Chci rozvíjet svůj tým", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Chci podpořit zelené projekty", exact: true })).toBeVisible();
    const metrics = await overflow(page);
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth + 1);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, `pro-koho-participation-${viewport.label}.png`), fullPage: true });
    await context.close();
  });
}

test("R14 school company and ecology audience routes are real", async ({ page }) => {
  const cases = [
    ["/pro-koho/skoly", "Školy jako dílny lidskosti, ne továrny na fakta", "S čím může Pansofie škole pomoci"],
    ["/pro-koho/firmy", "Podnikání s vyšším smyslem a morální kotvou", "S čím může Pansofie týmu pomoci"],
    ["/pro-koho/ekologie", "Uzdravení světa skrze porozumění přírodě", "S čím může Pansofie pomoci"],
  ];
  for (const [route, heading, section] of cases) {
    const response = await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });
    expect(response?.status()).toBeLessThan(400);
    await expect(page.getByRole("heading", { name: heading, exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: section, exact: true })).toBeVisible();
  }
});

test("R14 school intake explains pillars and does not pretend to create an account", async ({ page }) => {
  await page.goto(`${BASE_URL}/zapojit-se/skola`, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Kdo s námi chce měnit svět vzdělávání?", exact: true })).toBeVisible();
  await expect(page.getByText("POZNEJ SEBE", { exact: true })).toBeVisible();
  await expect(page.getByText("TVOŘ S DRUHÝMI", { exact: true })).toBeVisible();
  await expect(page.getByText("ZLEPŠUJ SVĚT", { exact: true })).toBeVisible();
  await expect(page.getByText("Odeslání formuláře automaticky nevytváří účet, rezervaci, workshop ani certifikaci.", { exact: true })).toBeVisible();
  const metrics = await overflow(page);
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth + 1);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, "school-intake-r14.png"), fullPage: true });
});

test("R14 company intake has explicit English copy", async ({ page }) => {
  await page.goto(`${BASE_URL}/zapojit-se/firma?lang=en`, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Who is looking for more wisdom and balance in their organization?", exact: true })).toBeVisible();
  await expect(page.getByText("ATTENTION AND INNER BALANCE", { exact: true })).toBeVisible();
  await expect(page.getByText("ETHICS OF INNOVATION AND AI", { exact: true })).toBeVisible();
  await expect(page.getByText("Submitting this form does not automatically create an account, booking, workshop or certification.", { exact: true })).toBeVisible();
  expect(await page.getAttribute("html", "lang")).toBe("en");
});

test("R14 Material Bridge public feed never fabricates example handovers", async ({ page }) => {
  await page.goto(`${BASE_URL}/materialovy-most`, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Materiálový most: dejte užitečným věcem druhý život.", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Jen příběhy podložené skutečným předáním.", exact: true })).toBeVisible();
  await expect(page.getByText("Avast darovala 15 notebooků", { exact: false })).toHaveCount(0);
  await expect(page.getByText("Truhlářství Novák", { exact: false })).toHaveCount(0);
  const metrics = await overflow(page);
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth + 1);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, "material-bridge-public-r14.png"), fullPage: true });
});

test("R14 downloadable working materials are real static files", async ({ request }) => {
  const paths = [
    "/materials/pansofie-ukazkova-lekce-kriticke-mysleni.md",
    "/materials/pansofie-stavitele-mostu-dialog.md",
    "/materials/pansofie-restart-pozornosti-team-guide.md",
    "/materials/pansofie-eticky-kompas-ai-checklist.md",
  ];
  for (const item of paths) {
    const response = await request.get(`${BASE_URL}${item}`);
    expect(response.status()).toBe(200);
    expect((await response.text()).length).toBeGreaterThan(300);
  }
});
