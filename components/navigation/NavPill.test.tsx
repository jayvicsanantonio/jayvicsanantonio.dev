// Component tests for the navigation pill.
// Locks how the active state is expressed: icon tint, aria-current, tooltip suppression, dot.
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { NAV_BUTTON_CLASSES } from "@/components/navigation/navStyles";
import { NavPill } from "@/components/navigation/NavPill";
import Icon from "@/components/primitives/Icon";

const renderPill = (active: boolean) =>
  render(
    <NavPill
      href="/projects"
      ariaLabel="Projects"
      icon={<Icon name="projects" />}
      active={active}
      tooltip="Projects"
      tooltipPlacement="below"
    />,
  );

describe("NavPill", () => {
  it("tints the icon and marks the link current when active", () => {
    const { container } = renderPill(true);

    expect(screen.getByLabelText("Projects")).toHaveAttribute("aria-current", "page");
    expect(container.querySelector("span[aria-hidden]")).toHaveStyle({ color: "#22d3ee" });
  });

  it("leaves the icon untinted and unmarked when inactive", () => {
    const { container } = renderPill(false);

    expect(screen.getByLabelText("Projects")).not.toHaveAttribute("aria-current");
    expect(container.querySelector("span[aria-hidden]")).not.toHaveStyle({ color: "#22d3ee" });
  });

  it("suppresses the tooltip on the active pill only", () => {
    const { unmount } = renderPill(true);
    expect(screen.queryByText("Projects", { selector: "span" })).toBeNull();
    unmount();

    renderPill(false);
    expect(screen.getByText("Projects", { selector: "span" })).toBeInTheDocument();
  });
  it("keeps the active border tint when a caller supplies its own border class", () => {
    render(
      <NavPill
        href="/projects"
        ariaLabel="Projects"
        icon={<Icon name="projects" />}
        active
        className={NAV_BUTTON_CLASSES}
      />,
    );

    expect(screen.getByLabelText("Projects").className).toContain("border-cyan-400/70");
  });
});
