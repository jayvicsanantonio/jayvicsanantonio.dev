// Integration tests for the work experience timeline.
// Verifies card headers render the period beside the title when there is no
// company, and beside the company line when there is one.
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import WorkTimeline from "@/app/work/_components/WorkTimeline";

describe("WorkTimeline", () => {
  beforeEach(() => {
    render(<WorkTimeline />);
  });

  it("renders every experience as a heading", () => {
    expect(
      screen.getByRole("heading", { name: "Independent AI Developer & Builder" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { name: "Software Engineer" })).toHaveLength(2);
    expect(screen.getByRole("heading", { name: "Co-Founder" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Intern" })).toBeInTheDocument();
  });

  it("shows the period next to the title when there is no company", () => {
    const heading = screen.getByRole("heading", { name: "Independent AI Developer & Builder" });
    expect(heading.parentElement).toHaveTextContent("2023 - Present");
  });

  it("shows the period next to the company line when there is a company", () => {
    const company = screen.getByText("Yahoo Inc.");
    expect(company.parentElement).toHaveTextContent("2016 - 2023");

    const heading = screen.getAllByRole("heading", { name: "Software Engineer" })[0];
    expect(heading?.parentElement).not.toHaveTextContent("2016 - 2023");
  });

  it("renders the tags of an experience as badges", () => {
    expect(screen.getByText("Ember.js")).toBeInTheDocument();
    expect(screen.getByText("Bluetooth Low Energy (BLE)")).toBeInTheDocument();
  });
});
