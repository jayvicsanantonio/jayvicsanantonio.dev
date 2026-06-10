// End-to-end tests for the work experience page.
// Verifies the timeline renders experiences with and without a company.
import { expect, test } from "@playwright/test";

test("work page renders the experience timeline", async ({ page }) => {
  await page.goto("/work");
  await expect(page).toHaveTitle(/Experience/);
  await expect(
    page.getByRole("heading", { name: "Independent AI Developer & Builder" }),
  ).toBeVisible();
  await expect(page.getByText("Yahoo Inc.")).toBeVisible();
});

test("work page exposes CollectionPage structured data", async ({ page }) => {
  await page.goto("/work");
  const jsonLd = page.locator('script[type="application/ld+json"]').first();
  await expect(jsonLd).toBeAttached();
  expect(await jsonLd.textContent()).toContain('"@type":"CollectionPage"');
});
