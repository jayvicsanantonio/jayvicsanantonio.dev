// End-to-end tests for the projects listing and detail pages.
// Verifies the catalog renders, detail navigation works, and bad slugs 404.
import { expect, test } from "@playwright/test";

test("projects page renders the portfolio heading", async ({ page }) => {
  await page.goto("/projects");
  await expect(page.getByRole("heading", { name: "Engineering Portfolio" })).toBeVisible();
  await expect(page).toHaveTitle(/Projects/);
});

test("a project detail page renders from a direct visit", async ({ page }) => {
  await page.goto("/projects/collectiq");
  await expect(page.getByRole("heading", { level: 1, name: "CollectIQ" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Back to projects" })).toBeVisible();
});

test("the back link returns to the projects listing", async ({ page }) => {
  await page.goto("/projects/collectiq");
  await page.getByRole("link", { name: "Back to projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole("heading", { name: "Engineering Portfolio" })).toBeVisible();
});

test("an unknown project slug responds with 404", async ({ page }) => {
  const response = await page.goto("/projects/does-not-exist");
  expect(response?.status()).toBe(404);
});
