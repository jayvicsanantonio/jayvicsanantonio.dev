// Data integrity tests for the projects catalog.
// Verifies slugs, required content, link safety, and that referenced images exist on disk.
import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { PROJECTS } from "@/app/projects/projects.data";

describe("PROJECTS", () => {
  it("is not empty", () => {
    expect(PROJECTS.length).toBeGreaterThan(0);
  });

  it("uses unique, URL-safe slugs", () => {
    const slugs = PROJECTS.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it.each(PROJECTS.map((project) => [project.slug, project] as const))(
    "%s has complete content",
    (_slug, project) => {
      expect(project.title).not.toBe("");
      expect(project.period).not.toBe("");
      expect(project.blurb).not.toBe("");
      expect(project.skills.length).toBeGreaterThan(0);
      expect(project.metrics.length).toBeGreaterThan(0);
      expect(project.links.length).toBeGreaterThan(0);
      expect(project.sections.length).toBeGreaterThan(0);
    },
  );

  it("links only to absolute https URLs", () => {
    for (const project of PROJECTS) {
      for (const link of project.links) {
        expect(link.href).toMatch(/^https:\/\//);
      }
    }
  });

  it("references images that exist in public/ with positive dimensions", () => {
    for (const project of PROJECTS) {
      expect(project.image.src).toMatch(/^\//);
      expect(existsSync(join(process.cwd(), "public", project.image.src))).toBe(true);
      expect(project.image.width).toBeGreaterThan(0);
      expect(project.image.height).toBeGreaterThan(0);
      expect(project.image.alt).not.toBe("");
    }
  });
});
