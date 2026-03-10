import type { MetadataRoute } from "next";

const siteUrl = "https://jayvicsanantonio.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/projects`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/work`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
