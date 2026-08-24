import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PANSOFIE_LOCAL_URL || "http://127.0.0.1:5173";

test("R23 Czech auth aliases resolve to governed canonical routes", async ({ page }) => {
  await page.goto(`${BASE_URL}/prihlaseni`, { waitUntil: "networkidle" });
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole("heading", { name: "Vítejte zpět" })).toBeVisible();
  await expect(page.getByText("Pilotní účty vznikají na pozvání.")).toBeVisible();

  await page.goto(`${BASE_URL}/registrace`, { waitUntil: "networkidle" });
  await expect(page).toHaveURL(/\/register$/);
  await expect(page.getByRole("heading", { name: "Registrace je nyní pouze na pozvání" })).toBeVisible();
});

test("R23 Material Bridge public entry does not pretend anonymous listing creation", async ({ page }) => {
  await page.goto(`${BASE_URL}/materialovy-most`, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: /Materiálový most/ }).first()).toBeVisible();
  const workspaceEntry = page.getByRole("link", { name: /Vstoupit do Materiálového mostu/ }).first();
  await expect(workspaceEntry).toHaveAttribute("href", "/login?returnTo=/materialovy-most/workspace");
  await expect(page.getByText("Stav se mění z AVAILABLE na RESERVED a teprve po skutečném předání na HANDED OVER.")).toBeVisible();
});

test("R23 PansofieGO remains a bounded decision lab, not a GPS school finder", async ({ page }) => {
  await page.goto(`${BASE_URL}/pansofiego`, { waitUntil: "networkidle" });
  await expect(page.getByText(/PansofieGO · experimentální vrstva/)).toBeVisible();
  await expect(page.getByText(/nic se neukládá/)).toBeVisible();
  await expect(page.getByRole("link", { name: /Spustit scénář/ })).toHaveAttribute("href", "#rozhodovaci-lab");
  await expect(page.getByText(/NAJÍT ŠKOLY V MÉM OKOLÍ/i)).toHaveCount(0);
});

test("R23 witness page preserves supporting-evidence boundary", async ({ page }) => {
  await page.goto(`${BASE_URL}/potvrzeni-zkusenosti?result=confirmed`, { waitUntil: "networkidle" });
  await expect(page.getByText(/Vaše potvrzení je podpůrná evidence/)).toBeVisible();
  await expect(page.getByText(/automaticky neschvaluje Pansofický pas/)).toBeVisible();
  await expect(page.getByText(/zrn/i)).toHaveCount(0);
});
