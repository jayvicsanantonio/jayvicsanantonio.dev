// End-to-end tests for the home page.
// Verifies the page loads with the right title and exposes site navigation.
import { expect, test } from "@playwright/test";

test("home page loads with the site title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Full-Stack Software Engineer/);
});

test("home page links to the projects and work pages", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('a[href="/projects"]').first()).toBeAttached();
  await expect(page.locator('a[href="/work"]').first()).toBeAttached();
});

test("home page exposes Person structured data", async ({ page }) => {
  await page.goto("/");
  const jsonLd = page.locator('script[type="application/ld+json"]').first();
  await expect(jsonLd).toBeAttached();
  expect(await jsonLd.textContent()).toContain('"@type":"Person"');
});
