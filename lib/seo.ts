export const SITE_URL = "https://jayvicsanantonio.dev" as const;

export type SitePath = `/${string}` | "/";

type CrawlRoute = {
  path: SitePath;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
};

export const CRAWLABLE_ROUTES: CrawlRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
  { path: "/work", changeFrequency: "monthly", priority: 0.8 },
];

export const toAbsoluteUrl = (path: SitePath): string =>
  path === "/" ? SITE_URL : `${SITE_URL}${path}`;
