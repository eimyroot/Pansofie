import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PANSOFIE_STAGING_URL || "https://pansofie-staging.vercel.app";

test("Partner workspace is authentication-gated", async ({ page }) => {
  await page.goto(`${BASE_URL}/partner-workspace`, { waitUntil: "networkidle" });
  await expect(page).toHaveURL(/\/login/);
});

test("School Challenge inbox is authentication-gated", async ({ page }) => {
  await page.goto(`${BASE_URL}/skola/challenges`, { waitUntil: "networkidle" });
  await expect(page).toHaveURL(/\/login/);
});

test("Admin Partner Challenge control is admin-gated", async ({ page }) => {
  await page.goto(`${BASE_URL}/admin/challenges`, { waitUntil: "networkidle" });
  await expect(page).toHaveURL(/\/admin\/login|\/login/);
});
