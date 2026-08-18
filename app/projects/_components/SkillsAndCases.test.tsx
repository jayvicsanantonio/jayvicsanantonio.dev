// Component tests for the projects grid.
// Locks the rendered card aspect ratio so image geometry stays derived from width/height.
import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn() }),
  usePathname: () => "/projects",
  useSearchParams: () => new URLSearchParams(),
}));

import SkillsAndCases from "@/app/projects/_components/SkillsAndCases";
import { PROJECTS } from "@/app/projects/projects.data";

beforeAll(() => {
  vi.stubGlobal("matchMedia", () => ({
    matches: true,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
});

const projectListItems = PROJECTS.map(({ slug, title, period, blurb, image, skills, links }) => ({
  slug,
  title,
  period,
  blurb,
  image,
  skills,
  links,
}));

describe("SkillsAndCases", () => {
  it("renders each card image with an aspect ratio matching its intrinsic dimensions", () => {
    render(<SkillsAndCases projects={projectListItems} />);

    for (const project of PROJECTS) {
      const image = screen.getByAltText(project.image.alt);
      expect(image).toHaveStyle({
        aspectRatio: `${project.image.width}/${project.image.height}`,
      });
    }
  });
});
