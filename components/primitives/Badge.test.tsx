// Component tests for the Badge primitive.
// Verifies variant classes, custom class merging, and prop pass-through.
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge } from "@/components/primitives/Badge";

describe("Badge", () => {
  it("renders its children", () => {
    render(<Badge>TypeScript</Badge>);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("uses the default variant when none is given", () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText("Default")).toHaveClass("bg-primary");
  });

  it("applies the secondary variant", () => {
    render(<Badge variant="secondary">Secondary</Badge>);
    expect(screen.getByText("Secondary")).toHaveClass("bg-secondary");
  });

  it("merges custom class names with variant classes", () => {
    render(
      <Badge variant="secondary" className="text-xs">
        Tag
      </Badge>,
    );
    const badge = screen.getByText("Tag");
    expect(badge).toHaveClass("text-xs");
    expect(badge).toHaveClass("bg-secondary");
  });

  it("passes through arbitrary HTML attributes", () => {
    render(<Badge data-tag-item>Attr</Badge>);
    expect(screen.getByText("Attr")).toHaveAttribute("data-tag-item");
  });
});
