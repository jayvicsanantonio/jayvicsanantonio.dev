// Unit tests for SEO constants and URL helpers.
// Verifies absolute URL building and the crawlable route definitions.
import { describe, expect, it } from "vitest";

import { CRAWLABLE_ROUTES, SITE_URL, toAbsoluteUrl } from "@/lib/seo";

describe("toAbsoluteUrl", () => {
  it("returns the bare site URL for the root path", () => {
    expect(toAbsoluteUrl("/")).toBe(SITE_URL);
  });

  it("appends non-root paths to the site URL", () => {
    expect(toAbsoluteUrl("/projects")).toBe(`${SITE_URL}/projects`);
    expect(toAbsoluteUrl("/projects/collectiq")).toBe(`${SITE_URL}/projects/collectiq`);
  });
});

describe("CRAWLABLE_ROUTES", () => {
  it("covers the three top-level pages", () => {
    expect(CRAWLABLE_ROUTES.map((route) => route.path)).toEqual(["/", "/projects", "/work"]);
  });

  it("keeps priorities within the valid sitemap range", () => {
    for (const route of CRAWLABLE_ROUTES) {
      expect(route.priority).toBeGreaterThan(0);
      expect(route.priority).toBeLessThanOrEqual(1);
    }
  });

  it("ranks the home page highest", () => {
    const homePriority = CRAWLABLE_ROUTES.find((route) => route.path === "/")?.priority;
    for (const route of CRAWLABLE_ROUTES) {
      expect(homePriority).toBeGreaterThanOrEqual(route.priority);
    }
  });
});
