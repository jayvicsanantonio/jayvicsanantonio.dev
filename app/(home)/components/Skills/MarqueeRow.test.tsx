// Component tests for the skills marquee row.
// Covers the duration and direction props now that callers must supply both.
import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";

import MarqueeRow from "@/app/(home)/components/Skills/MarqueeRow";

beforeAll(() => {
  vi.stubGlobal("matchMedia", () => ({
    matches: true,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
});

describe("MarqueeRow", () => {
  it("renders each item twice so the track can loop seamlessly", () => {
    render(<MarqueeRow items={["TypeScript", "React"]} duration={56} direction="left" />);

    expect(screen.getAllByText("TypeScript")).toHaveLength(2);
    expect(screen.getAllByText("React")).toHaveLength(2);
  });

  it("applies the caller's duration to the animation", () => {
    const { container } = render(
      <MarqueeRow items={["Vitest"]} duration={62} direction="left" />,
    );

    expect(container.querySelector(".marquee-runner")).toHaveStyle({
      animationDuration: "62s",
    });
  });

  it("reverses the animation only when direction is right", () => {
    const { container: left } = render(
      <MarqueeRow items={["Left"]} duration={56} direction="left" />,
    );
    expect(left.querySelector(".marquee-runner")?.className).not.toContain("animation-direction");

    const { container: right } = render(
      <MarqueeRow items={["Right"]} duration={56} direction="right" />,
    );
    expect(right.querySelector(".marquee-runner")?.className).toContain(
      "[animation-direction:reverse]",
    );
  });
});
