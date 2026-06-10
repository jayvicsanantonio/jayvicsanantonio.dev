// End-to-end tests for the SEO metadata routes.
// Verifies robots.txt and sitemap.xml are served with the expected content.
import { expect, test } from "@playwright/test";

test("robots.txt allows crawling and references the sitemap", async ({ request }) => {
  const response = await request.get("/robots.txt");
  expect(response.status()).toBe(200);

  const body = await response.text();
  expect(body).toContain("User-Agent: *");
  expect(body).toContain("Allow: /");
  expect(body).toContain("Sitemap: https://jayvicsanantonio.dev/sitemap.xml");
});

test("sitemap.xml lists the top-level pages and project pages", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);

  const body = await response.text();
  expect(body).toContain("<loc>https://jayvicsanantonio.dev</loc>");
  expect(body).toContain("<loc>https://jayvicsanantonio.dev/work</loc>");
  expect(body).toContain("<loc>https://jayvicsanantonio.dev/projects/collectiq</loc>");
});
