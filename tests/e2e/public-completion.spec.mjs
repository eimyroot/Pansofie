import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PANSOFIE_STAGING_URL || "https://pansofie-staging.vercel.app";

function runtimeErrors(page) {
  const errors = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(`console: ${message.text()}`); });
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("response", (response) => {
    try {
      const url = new URL(response.url());
      const base = new URL(BASE_URL);
      if (url.origin === base.origin && response.status() >= 500) errors.push(`http ${response.status()}: ${response.url()}`);
    } catch {}
  });
  return errors;
}

const ROUTES = [
  ["/zapojit-se", /Najděme roli/],
  ["/kontakt", /Najděme roli/],
  ["/o-projektu", /Pansofie staví učení/],
  ["/soukromi", /Soukromí podle účelu/],
  ["/bezpecnost", /Bezpečnost není disclaimer/],
  ["/podminky", /Veřejný web popisuje připravovaný produkt/],
  ["/register", /Registrace je nyní pouze na pozvání/],
  ["/login", /Vítej zpět/],
];

for (const [path, heading] of ROUTES) {
  test(`completion route ${path} renders without runtime failure`, async ({ page }) => {
    const errors = runtimeErrors(page);
    const response = await page.goto(`${BASE_URL}${path}`, { waitUntil: "networkidle" });
    expect(response).not.toBeNull();
    expect(response.status()).toBeLessThan(400);
    await expect(page.getByRole("heading", { name: heading }).first()).toBeVisible();
    expect(errors, `runtime errors on ${path}:\n${errors.join("\n")}`).toEqual([]);
  });
}

test("public interest form is explicitly fail-closed before legal operator activation", async ({ page }) => {
  await page.goto(`${BASE_URL}/zapojit-se?role=school`, { waitUntil: "networkidle" });
  await expect(page.getByText(/Kontaktní kanál je zatím fail-closed/)).toBeVisible();
  await page.getByRole("button", { name: /Ověřit připravenost formuláře/ }).click();
  await expect(page.getByRole("status")).toContainText("nic neodesílá ani neukládá");
});

test("public registration does not expose self-signup controls", async ({ page }) => {
  await page.goto(`${BASE_URL}/register`, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: /Registrace je nyní pouze na pozvání/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "Chci se zapojit" })).toHaveAttribute("href", "/zapojit-se");
  await expect(page.getByRole("button", { name: /Vytvořit účet/ })).toHaveCount(0);
});

test("mobile join route has no horizontal overflow", async ({ browser }, testInfo) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
  const page = await context.newPage();
  await page.goto(`${BASE_URL}/zapojit-se?role=partner`, { waitUntil: "networkidle" });
  const dimensions = await page.evaluate(() => ({ innerWidth: window.innerWidth, scrollWidth: document.documentElement.scrollWidth }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.innerWidth + 1);
  await page.screenshot({ path: testInfo.outputPath("join-mobile.png"), fullPage: true });
  await context.close();
});
