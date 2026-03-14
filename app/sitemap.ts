import type { MetadataRoute } from "next";

import { PROJECTS } from "@/app/projects/projects.data";
import { CRAWLABLE_ROUTES, toAbsoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = CRAWLABLE_ROUTES.map((route) => ({
    url: toAbsoluteUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: toAbsoluteUrl(`/projects/${project.slug}`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
