// Integration tests for the project detail page.
// Covers static params, per-project metadata, page rendering, and unknown slugs.
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ProjectDetailPage, {
  generateMetadata,
  generateStaticParams,
} from "@/app/projects/[slug]/page";
import { PROJECTS } from "@/app/projects/projects.data";
import { SITE_URL } from "@/lib/seo";

const FIRST_PROJECT = PROJECTS[0]!;

const pageProps = (slug: string) => ({ params: Promise.resolve({ slug }) });

describe("generateStaticParams", () => {
  it("returns one param per project", () => {
    expect(generateStaticParams()).toEqual(PROJECTS.map((project) => ({ slug: project.slug })));
  });
});

describe("generateMetadata", () => {
  it("builds title, description, and canonical URL from the project", async () => {
    const metadata = await generateMetadata(pageProps(FIRST_PROJECT.slug));

    expect(metadata.title).toBe(`${FIRST_PROJECT.title} | Projects | Jayvic San Antonio`);
    expect(metadata.description).toBe(FIRST_PROJECT.blurb);
    expect(metadata.alternates?.canonical).toBe(`/projects/${FIRST_PROJECT.slug}`);
    expect(metadata.openGraph?.url).toBe(`${SITE_URL}/projects/${FIRST_PROJECT.slug}`);
  });

  it("returns empty metadata for an unknown slug", async () => {
    expect(await generateMetadata(pageProps("does-not-exist"))).toEqual({});
  });
});

describe("ProjectDetailPage", () => {
  it("renders the project title, blurb, and back link", async () => {
    render(await ProjectDetailPage(pageProps(FIRST_PROJECT.slug)));

    expect(screen.getByRole("heading", { level: 1, name: FIRST_PROJECT.title })).toBeInTheDocument();
    expect(screen.getByText(FIRST_PROJECT.blurb)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to projects" })).toHaveAttribute(
      "href",
      "/projects",
    );
  });

  it("renders every skill, metric, and external link of the project", async () => {
    render(await ProjectDetailPage(pageProps(FIRST_PROJECT.slug)));

    for (const skill of FIRST_PROJECT.skills) {
      expect(screen.getByText(skill)).toBeInTheDocument();
    }
    for (const metric of FIRST_PROJECT.metrics) {
      expect(screen.getByText(metric)).toBeInTheDocument();
    }
    for (const link of FIRST_PROJECT.links) {
      const anchor = screen.getByRole("link", { name: link.label });
      expect(anchor).toHaveAttribute("href", link.href);
      expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("throws notFound for an unknown slug", async () => {
    await expect(ProjectDetailPage(pageProps("does-not-exist"))).rejects.toThrow();
  });
});
