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
  test(`R14 Pro koho full Pansofie Taste cycle works on ${viewport.label}`, async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, isMobile: viewport.isMobile, locale: "cs-CZ" });
    const page = await context.newPage();
    const response = await page.goto(`${BASE_URL}/pro-koho#ochutnejte`, { waitUntil: "networkidle" });
    expect(response?.status()).toBeLessThan(400);
    await expect(page.getByRole("heading", { name: "Pro koho je Pansofie?", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Vyzkoušejte si celý cyklus Pansofie bez registrace.", exact: true })).toBeVisible();
    await expect(page.getByText(/Žádné skóre osobnosti ani skrytá morální známka/i)).toBeVisible();

    const schoolTab = page.getByRole("tab", { name: /Chci zažít situaci ve třídě/i });
    await expect(schoolTab).toBeVisible();
    await expect(page.getByRole("tab", { name: /Chci otestovat situaci ve firmě/i })).toBeVisible();
    await expect(page.getByRole("tab", { name: /Chci zkusit cirkulární propojení/i })).toBeVisible();
    await schoolTab.click();

    await expect(page.getByText("Labyrint algoritmů 📲", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: /Možnost B: Otevřu laboratoř/i }).click();
    await expect(page.getByText("Výstup vytvořil použitelný postup.", { exact: true })).toBeVisible();
    await expect(page.getByText("MODELOVÝ DŮKAZ", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: /Použít tento modelový důkaz/i }).click();

    await expect(page.getByRole("heading", { name: "Moje krátká reflexe", exact: true })).toBeVisible();
    const reflection = page.getByRole("textbox");
    await reflection.fill("Děti si odnesly postup, jak oddělit silnou emoci od ověřitelného důkazu.");
    await page.getByRole("button", { name: /Potvrdit reflexi a zobrazit náhled stopy/i }).click();

    await expect(page.getByText(/Pouze náhled\. V tomto veřejném demu neproběhlo skutečné ověření ani zápis do Passportu/i)).toBeVisible();
    await expect(page.getByRole("heading", { name: "První doložená stopa v oblasti Kritický rozum", exact: true })).toBeVisible();
    await expect(page.getByText(/1 doložená zkušenost · První doložená zkušenost/i)).toBeVisible();
    await page.getByRole("button", { name: "Pokračovat", exact: true }).click();

    await expect(page.getByRole("heading", { name: "Chcete takovou mapu reálných zkušeností budovat i vy?", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: /Chci se zapojit do pilotu/i })).toHaveAttribute("href", "/zapojit-se");

    const metrics = await overflow(page);
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth + 1);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, `pro-koho-taste-${viewport.label}.png`), fullPage: true });
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

test("R14 Material Bridge is explicitly open to everyone without fabricating live examples", async ({ page }) => {
  await page.goto(`${BASE_URL}/materialovy-most`, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Užitečné věci mají najít dalšího člověka, který je dokáže využít.", exact: true })).toBeVisible();
  for (const actor of ["Jednotlivec", "Rodina", "Škola", "Firma", "Spolek", "Obec", "Komunita"]) {
    await expect(page.getByText(actor, { exact: true })).toBeVisible();
  }
  await expect(page.getByRole("link", { name: /Nabídnout nebo poptat materiál/i })).toBeVisible();
  await expect(page.getByText("Avast darovala 15 notebooků", { exact: false })).toHaveCount(0);
  await expect(page.getByText("Truhlářství Novák", { exact: false })).toHaveCount(0);
  await expect(page.getByText("Reno s.r.o.", { exact: false })).toHaveCount(0);
  const metrics = await overflow(page);
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth + 1);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, "material-bridge-public-r14.png"), fullPage: true });
});

test("R14 public Material Bridge intake supports all actor types and stays moderated", async ({ page }) => {
  await page.goto(`${BASE_URL}/materialovy-most/zapojit-se`, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Máte něco užitečného — nebo něco smysluplně potřebujete?", exact: true })).toBeVisible();
  const actorSelect = page.getByLabel("Kdo se zapojuje?").first();
  for (const option of ["Jednotlivec", "Rodina", "Škola / pedagog", "Firma / organizace", "Spolek / nezisková organizace", "Obec / město", "Komunita / komunitní centrum"]) {
    await expect(actorSelect.getByRole("option", { name: option })).toHaveCount(1);
  }
  await expect(page.getByText(/Nabídka se nezveřejní automaticky/i)).toBeVisible();
  const metrics = await overflow(page);
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth + 1);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, "material-bridge-open-intake-r14.png"), fullPage: true });
});

for (const viewport of [
  { label: "desktop", width: 1440, height: 1100, isMobile: false },
  { label: "mobile", width: 390, height: 844, isMobile: true },
]) {
  test(`R14 Repair Library is filterable and overflow-safe on ${viewport.label}`, async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, isMobile: viewport.isMobile, locale: "cs-CZ" });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/knihovna`, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: "Neschovávejme metodu. Ukažme ji tam, kde si ji lidé mohou osahat.", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Labyrint algoritmů/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Porada bez ega/i })).toBeVisible();
    await page.getByRole("button", { name: "Tvoř s druhými", exact: true }).click();
    await expect(page.getByRole("heading", { name: /Porada bez ega/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Etický kompas AI/i })).toHaveCount(0);
    const metrics = await overflow(page);
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth + 1);
    await page.screenshot({ path: path.join(EVIDENCE_DIR, `repair-library-${viewport.label}.png`), fullPage: true });
    await context.close();
  });
}

test("R14 English library is explicit and does not depend on Czech DOM projection", async ({ page }) => {
  await page.goto(`${BASE_URL}/knihovna?lang=en`, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Do not hide the method. Put it where people can try it.", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Algorithm Labyrinth/i })).toBeVisible();
  await expect(page.getByRole("button", { name: "Create with others", exact: true })).toBeVisible();
  expect(await page.getAttribute("html", "lang")).toBe("en");
});

test("R14 onboarding is protected when no account is signed in", async ({ page }) => {
  await page.goto(`${BASE_URL}/onboarding`, { waitUntil: "networkidle" });
  await expect(page).toHaveURL(/\/login\?returnTo=/);
  await expect(page.getByRole("heading", { name: "Vítejte zpět", exact: true })).toBeVisible();
});

test("R14 downloadable working materials are real static files", async ({ request }) => {
  const paths = [
    "/materials/pansofie-ukazkova-lekce-kriticke-mysleni.md",
    "/materials/pansofie-stavitele-mostu-dialog.md",
    "/materials/pansofie-restart-pozornosti-team-guide.md",
    "/materials/pansofie-eticky-kompas-ai-checklist.md",
    "/materials/pansofie-labyrint-algoritmu.md",
    "/materials/pansofie-porada-bez-ega.md",
  ];
  for (const item of paths) {
    const response = await request.get(`${BASE_URL}${item}`);
    expect(response.status()).toBe(200);
    expect((await response.text()).length).toBeGreaterThan(300);
  }
});
