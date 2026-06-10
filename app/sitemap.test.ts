// Unit tests for the generated sitemap.
// Verifies static routes come first and every project gets an absolute, unique URL.
import { describe, expect, it } from "vitest";

import { PROJECTS } from "@/app/projects/projects.data";
import sitemap from "@/app/sitemap";
import { CRAWLABLE_ROUTES, SITE_URL, toAbsoluteUrl } from "@/lib/seo";

describe("sitemap", () => {
  const entries = sitemap();

  it("contains every crawlable route followed by every project", () => {
    expect(entries).toHaveLength(CRAWLABLE_ROUTES.length + PROJECTS.length);
    expect(entries.map((entry) => entry.url).slice(0, CRAWLABLE_ROUTES.length)).toEqual(
      CRAWLABLE_ROUTES.map((route) => toAbsoluteUrl(route.path)),
    );
  });

  it("lists each project detail page with monthly change frequency", () => {
    for (const project of PROJECTS) {
      const entry = entries.find(
        (candidate) => candidate.url === `${SITE_URL}/projects/${project.slug}`,
      );
      expect(entry).toBeDefined();
      expect(entry?.changeFrequency).toBe("monthly");
      expect(entry?.priority).toBe(0.7);
    }
  });

  it("contains only absolute, unique URLs", () => {
    const urls = entries.map((entry) => entry.url);
    expect(new Set(urls).size).toBe(urls.length);
    for (const url of urls) {
      expect(url).toMatch(new RegExp(`^${SITE_URL}`));
    }
  });
});
