// Component tests for the hero scroll indicator.
// Guards that every GSAP animation it starts is torn down on unmount.
import { render } from "@testing-library/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { beforeAll, describe, expect, it, vi } from "vitest";

import ScrollIndicator from "@/app/(home)/components/Hero/ScrollIndicator";

beforeAll(() => {
  const mediaQueryList = {
    matches: true,
    media: "",
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  };
  vi.stubGlobal("matchMedia", () => mediaQueryList);
  window.matchMedia = (() => mediaQueryList) as unknown as typeof window.matchMedia;
  gsap.registerPlugin(ScrollTrigger);
});

describe("ScrollIndicator", () => {
  it("leaves no live tweens on the global timeline after unmount", () => {
    const before = gsap.globalTimeline.getChildren(true, true, true).length;

    const { unmount } = render(<ScrollIndicator />);
    unmount();

    expect(gsap.globalTimeline.getChildren(true, true, true).length).toBe(before);
  });
});
