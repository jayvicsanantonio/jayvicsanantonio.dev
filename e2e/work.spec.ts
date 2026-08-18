// End-to-end tests for the work experience page.
// Verifies the timeline renders experiences and that its JSON-LD describes what the page shows.
import { expect, test } from "@playwright/test";

type ListItem = { item: { name: string; description: string } };
type CollectionPage = {
  "@type": string;
  mainEntity: { numberOfItems: number; itemListElement: ListItem[] };
};

test("work page renders the experience timeline", async ({ page }) => {
  await page.goto("/work");
  await expect(page).toHaveTitle(/Experience/);
  await expect(
    page.getByRole("heading", { name: "Independent AI Developer & Builder" }),
  ).toBeVisible();
  await expect(page.getByText("Yahoo Inc.")).toBeVisible();
});

test("work page structured data describes the experiences the page renders", async ({ page }) => {
  await page.goto("/work");

  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
  const collectionPage = blocks
    .map((block) => JSON.parse(block))
    .find((schema): schema is CollectionPage => schema["@type"] === "CollectionPage");

  expect(collectionPage).toBeDefined();

  const renderedTitles = await page.getByRole("heading", { level: 3 }).allTextContents();
  const { numberOfItems, itemListElement } = collectionPage!.mainEntity;

  expect(numberOfItems).toBe(renderedTitles.length);
  expect(itemListElement).toHaveLength(renderedTitles.length);

  // Each schema entry is "<title> at <company>", or just the title when there is no company,
  // so the rendered heading must be the leading segment of the schema name in page order.
  for (const [index, title] of renderedTitles.entries()) {
    expect(itemListElement[index]!.item.name).toMatch(new RegExp(`^${title}( at .+)?$`));
  }
});
