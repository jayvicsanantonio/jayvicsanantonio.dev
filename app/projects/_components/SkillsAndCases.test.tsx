// Component tests for the projects grid.
// Covers card geometry and the filter <-> URL contract, including the legacy "filter" alias.
import { fireEvent, render, screen } from "@testing-library/react";

import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const replace = vi.fn();
let searchParams = new URLSearchParams();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace }),
  usePathname: () => "/projects",
  useSearchParams: () => searchParams,
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

beforeEach(() => {
  replace.mockClear();
  searchParams = new URLSearchParams();
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

const renderGrid = () => render(<SkillsAndCases projects={projectListItems} />);

describe("SkillsAndCases", () => {
  it("renders each card image with an aspect ratio matching its intrinsic dimensions", () => {
    renderGrid();

    for (const project of PROJECTS) {
      const image = screen.getByAltText(project.image.alt);
      expect(image).toHaveStyle({
        aspectRatio: `${project.image.width}/${project.image.height}`,
      });
    }
  });

  it("restores a filter from the canonical skill param", () => {
    searchParams = new URLSearchParams("skill=Enterprise");
    renderGrid();

    expect(screen.getByRole("button", { name: "Enterprise" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("restores a filter from the legacy filter alias", () => {
    searchParams = new URLSearchParams("filter=Hobby");
    renderGrid();

    expect(screen.getByRole("button", { name: "Hobby" })).toHaveAttribute("aria-pressed", "true");
  });

  it("falls back to All when the param names no known filter", () => {
    searchParams = new URLSearchParams("skill=Bogus");
    renderGrid();

    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");
  });

  it("never leaves the legacy alias behind to contradict the canonical param", () => {
    searchParams = new URLSearchParams("filter=Startup");
    renderGrid();

    fireEvent.click(screen.getByRole("button", { name: "Enterprise" }));

    expect(replace).toHaveBeenCalledWith("/projects?skill=Enterprise", { scroll: false });
  });

  it("clears both params when returning to All", () => {
    searchParams = new URLSearchParams("skill=Hobby");
    renderGrid();

    fireEvent.click(screen.getByRole("button", { name: "All" }));

    expect(replace).toHaveBeenCalledWith("/projects", { scroll: false });
  });
  // The commented-out "Client" entry in SKILL_FILTERS is what an untyped filter list
  // permits: a tab that matches nothing, with no failure signal.
  it("gives every filter tab at least one project, and each project exactly one tab", () => {
    const { container } = renderGrid();
    const countCards = () => container.querySelectorAll("article").length;

    const total = countCards();
    expect(total).toBe(PROJECTS.length);

    const tabs = screen
      .getAllByRole("button")
      .map((button) => button.textContent ?? "")
      .filter((label) => label !== "All");

    let summed = 0;
    for (const label of tabs) {
      fireEvent.click(screen.getByRole("button", { name: label }));
      const shown = countCards();
      expect(shown, `filter "${label}" matches no projects`).toBeGreaterThan(0);
      summed += shown;
    }

    expect(summed, "each project should belong to exactly one filter").toBe(total);
  });
});
