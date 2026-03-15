import { SITE_URL, toAbsoluteUrl } from "@/lib/seo";

type JsonLd = Record<string, unknown>;

type ProjectStructuredDataInput = {
  slug: string;
  title: string;
  blurb: string;
  period: string;
  links: { href: string }[];
};

type WorkStructuredDataInput = {
  title: string;
  company: string;
  period: string;
};

export const serializeJsonLd = (schema: JsonLd): string =>
  JSON.stringify(schema).replace(/</g, "\\u003c");

export const createHomePersonSchema = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jayvic San Antonio",
  url: SITE_URL,
  jobTitle: "Full-Stack Software Engineer",
  email: "mailto:hi@jayvicsanantonio.dev",
  sameAs: [
    "https://github.com/jayvicsanantonio",
    "https://www.linkedin.com/in/jayvicsanantonio/",
  ],
});

export const createHomeWebsiteSchema = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Jayvic San Antonio",
  url: SITE_URL,
  description:
    "Portfolio of Jayvic San Antonio, a full-stack software engineer building high-performance web experiences.",
  inLanguage: "en-US",
});

export const createProjectsCollectionSchema = (
  projects: ProjectStructuredDataInput[],
): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Projects | Jayvic San Antonio",
  url: toAbsoluteUrl("/projects"),
  isPartOf: {
    "@type": "WebSite",
    url: SITE_URL,
  },
  mainEntity: {
    "@type": "ItemList",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.blurb,
        dateCreated: project.period,
        url: toAbsoluteUrl(`/projects/${project.slug}`),
        identifier: project.slug,
      },
    })),
  },
});

export const createWorkCollectionSchema = (
  experiences: WorkStructuredDataInput[],
): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Experience | Jayvic San Antonio",
  url: toAbsoluteUrl("/work"),
  isPartOf: {
    "@type": "WebSite",
    url: SITE_URL,
  },
  mainEntity: {
    "@type": "ItemList",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: experiences.length,
    itemListElement: experiences.map((experience, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Thing",
        name: `${experience.title} at ${experience.company}`,
        description: experience.period,
      },
    })),
  },
});
