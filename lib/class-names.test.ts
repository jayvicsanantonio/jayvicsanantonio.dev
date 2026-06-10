// Unit tests for the cn class-name helper.
// Verifies clsx composition and tailwind-merge conflict resolution.
import { describe, expect, it } from "vitest";

import { cn } from "@/lib/class-names";

describe("cn", () => {
  it("joins multiple class values", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("ignores falsy values and flattens arrays", () => {
    expect(cn("a", false, undefined, ["c", null])).toBe("a c");
  });

  it("applies conditional object syntax", () => {
    expect(cn({ a: true, b: false })).toBe("a");
  });

  it("lets the last conflicting Tailwind class win", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-white", "text-cyan-300")).toBe("text-cyan-300");
  });

  it("keeps non-conflicting Tailwind classes", () => {
    expect(cn("px-2", "py-4")).toBe("px-2 py-4");
  });
});
