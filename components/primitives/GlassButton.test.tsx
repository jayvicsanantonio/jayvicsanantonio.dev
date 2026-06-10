// Component tests for the GlassButton primitive.
// Verifies it renders a styled link with merged classes and forwarded props.
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { GlassButton } from "@/components/primitives/GlassButton";

describe("GlassButton", () => {
  it("renders a link with the given href and children", () => {
    render(<GlassButton href="/projects">View projects</GlassButton>);
    const link = screen.getByRole("link", { name: "View projects" });
    expect(link).toHaveAttribute("href", "/projects");
  });

  it("merges custom class names with the glass styles", () => {
    render(
      <GlassButton href="/" className="h-12 w-12">
        Home
      </GlassButton>,
    );
    const link = screen.getByRole("link", { name: "Home" });
    expect(link).toHaveClass("h-12");
    expect(link).toHaveClass("rounded-full");
  });

  it("forwards anchor attributes like aria-label", () => {
    render(
      <GlassButton href="/work" aria-label="Go to work history">
        Work
      </GlassButton>,
    );
    expect(screen.getByRole("link", { name: "Go to work history" })).toHaveAttribute(
      "href",
      "/work",
    );
  });
});
