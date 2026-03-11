import type { MetadataRoute } from "next";

import { CRAWLABLE_ROUTES, toAbsoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return CRAWLABLE_ROUTES.map((route) => ({
    url: toAbsoluteUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
