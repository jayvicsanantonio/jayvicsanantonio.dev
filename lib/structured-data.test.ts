// Unit tests for the JSON-LD structured data builders.
// Verifies schema shapes, list ordering, and safe serialization for script tags.
import { describe, expect, it } from "vitest";

import { SITE_URL } from "@/lib/seo";
import {
  createHomePersonSchema,
  createHomeWebsiteSchema,
  createProjectsCollectionSchema,
  createWorkCollectionSchema,
  serializeJsonLd,
} from "@/lib/structured-data";

describe("serializeJsonLd", () => {
  it("serializes a schema to JSON", () => {
    expect(serializeJsonLd({ name: "test" })).toBe('{"name":"test"}');
  });

  it("escapes < so output is safe inside a script tag", () => {
    const serialized = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
    expect(serialized).not.toContain("<");
    expect(JSON.parse(serialized)).toEqual({ name: "</script><script>alert(1)</script>" });
  });
});

describe("createHomePersonSchema", () => {
  it("describes Jayvic as a Person at the site URL", () => {
    const schema = createHomePersonSchema();
    expect(schema["@type"]).toBe("Person");
    expect(schema.name).toBe("Jayvic San Antonio");
    expect(schema.url).toBe(SITE_URL);
  });
});

describe("createHomeWebsiteSchema", () => {
  it("describes the site as a WebSite", () => {
    const schema = createHomeWebsiteSchema();
    expect(schema["@type"]).toBe("WebSite");
    expect(schema.url).toBe(SITE_URL);
  });
});

describe("createProjectsCollectionSchema", () => {
  const projects = [
    {
      slug: "alpha",
      title: "Alpha",
      blurb: "First project",
      period: "2024",
      links: [{ href: "https://example.com" }],
    },
    {
      slug: "beta",
      title: "Beta",
      blurb: "Second project",
      period: "2025",
      links: [],
    },
  ];

  it("lists every project with 1-based positions and absolute URLs", () => {
    const schema = createProjectsCollectionSchema(projects);
    const mainEntity = schema.mainEntity as {
      numberOfItems: number;
      itemListElement: { position: number; item: { url: string; identifier: string } }[];
    };

    expect(mainEntity.numberOfItems).toBe(2);
    expect(mainEntity.itemListElement.map((element) => element.position)).toEqual([1, 2]);
    expect(mainEntity.itemListElement[0]?.item.url).toBe(`${SITE_URL}/projects/alpha`);
    expect(mainEntity.itemListElement[1]?.item.identifier).toBe("beta");
  });

  it("points the collection page at /projects", () => {
    const schema = createProjectsCollectionSchema(projects);
    expect(schema.url).toBe(`${SITE_URL}/projects`);
  });
});

describe("createWorkCollectionSchema", () => {
  it("joins title and company when a company is present", () => {
    const schema = createWorkCollectionSchema([
      { title: "Software Engineer", company: "Yahoo Inc.", period: "2016 - 2023" },
    ]);
    const mainEntity = schema.mainEntity as {
      itemListElement: { item: { name: string; description: string } }[];
    };

    expect(mainEntity.itemListElement[0]?.item.name).toBe("Software Engineer at Yahoo Inc.");
    expect(mainEntity.itemListElement[0]?.item.description).toBe("2016 - 2023");
  });

  it("uses the bare title when no company is present", () => {
    const schema = createWorkCollectionSchema([
      { title: "Independent AI Developer & Builder", period: "2023 - Present" },
    ]);
    const mainEntity = schema.mainEntity as {
      itemListElement: { item: { name: string } }[];
    };

    expect(mainEntity.itemListElement[0]?.item.name).toBe("Independent AI Developer & Builder");
  });
});
