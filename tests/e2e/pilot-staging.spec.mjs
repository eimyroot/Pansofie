import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PANSOFIE_STAGING_URL || "https://pansofie-staging.vercel.app";

function runtimeErrors(page) {
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("response", (response) => {
    try {
      const url = new URL(response.url());
      const base = new URL(BASE_URL);
      if (url.origin === base.origin && response.status() >= 500) {
        errors.push(`http ${response.status()}: ${response.url()}`);
      }
    } catch {
      // Ignore malformed/non-http response URLs.
    }
  });
  return errors;
}

test("deep-link /pilot renders the merged Pilot R1 product", async ({ page }) => {
  const errors = runtimeErrors(page);
  const response = await page.goto(`${BASE_URL}/pilot`, { waitUntil: "networkidle" });

  expect(response, "deep-link must return a document response").not.toBeNull();
  expect(response.status(), "deep-link /pilot must not be protected/broken").toBeLessThan(400);
  await expect(page.getByText("PANSOFIE SCHOOL · PILOT R1")).toBeVisible();
  await expect(page.getByRole("heading", { name: /Tři skutečné zkušenosti/ })).toBeVisible();
  await expect(page.getByText("Zlepši svou školu", { exact: true })).toBeVisible();
  await expect(page.getByText("Digitální most", { exact: true })).toBeVisible();
  await expect(page.getByText("Circular Challenge", { exact: true })).toBeVisible();

  expect(errors, `runtime errors on /pilot:\n${errors.join("\n")}`).toEqual([]);
});

test("pilot CTA preserves governed returnTo=/skola through login", async ({ page }) => {
  const errors = runtimeErrors(page);
  await page.goto(`${BASE_URL}/pilot`, { waitUntil: "networkidle" });

  const cta = page.getByRole("link", { name: /Vstoupit do školního pilotu/ });
  await expect(cta).toHaveAttribute("href", "/login?returnTo=%2Fskola");
  await cta.click();

  await expect(page).toHaveURL((url) => url.pathname === "/login" && url.searchParams.get("returnTo") === "/skola");
  await expect(page.getByRole("heading", { name: "Vítej zpět" })).toBeVisible();
  await expect(page.getByLabel("E-mail")).toBeVisible();
  await expect(page.getByLabel("Heslo")).toBeVisible();

  expect(errors, `runtime errors in CTA/login path:\n${errors.join("\n")}`).toEqual([]);
});

test("unauthenticated /skola is fail-closed and redirects to login", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors = runtimeErrors(page);

  await page.goto(`${BASE_URL}/skola`, { waitUntil: "networkidle" });
  await expect(page).toHaveURL((url) => url.pathname === "/login" && url.searchParams.get("returnTo") === "/skola");
  await expect(page.getByRole("heading", { name: "Vítej zpět" })).toBeVisible();

  expect(errors, `runtime errors in auth redirect:\n${errors.join("\n")}`).toEqual([]);
  await context.close();
});

test("mobile pilot has no horizontal overflow and keeps primary CTA usable", async ({ browser }, testInfo) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
  const page = await context.newPage();
  const errors = runtimeErrors(page);

  const response = await page.goto(`${BASE_URL}/pilot`, { waitUntil: "networkidle" });
  expect(response).not.toBeNull();
  expect(response.status()).toBeLessThan(400);

  const dimensions = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scrollWidth, `horizontal overflow: ${JSON.stringify(dimensions)}`).toBeLessThanOrEqual(dimensions.innerWidth + 1);

  const cta = page.getByRole("link", { name: /Vstoupit do školního pilotu/ });
  await expect(cta).toBeVisible();
  await expect(cta).toHaveAttribute("href", "/login?returnTo=%2Fskola");

  await page.screenshot({ path: testInfo.outputPath("pilot-mobile.png"), fullPage: true });
  expect(errors, `runtime errors on mobile /pilot:\n${errors.join("\n")}`).toEqual([]);
  await context.close();
});
