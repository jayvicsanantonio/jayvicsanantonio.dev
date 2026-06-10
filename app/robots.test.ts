// Unit tests for the robots.txt route.
// Verifies crawlers are allowed everywhere and pointed at the sitemap.
import { describe, expect, it } from "vitest";

import robots from "@/app/robots";
import { SITE_URL } from "@/lib/seo";

describe("robots", () => {
  it("allows all user agents to crawl the whole site", () => {
    expect(robots().rules).toEqual({ userAgent: "*", allow: "/" });
  });

  it("points crawlers at the sitemap and host", () => {
    const result = robots();
    expect(result.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
    expect(result.host).toBe(SITE_URL);
  });
});
