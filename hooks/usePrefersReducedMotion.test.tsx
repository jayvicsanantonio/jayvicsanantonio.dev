// Unit tests for the usePrefersReducedMotion hook.
// Covers detection at mount, reaction to live changes, and listener cleanup.
import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

type ChangeListener = (event: MediaQueryListEvent) => void;

// Models MediaQueryList closely enough to matter: `matches` and the event stream
// stay in agreement, so a hook that ignores one of them fails.
const stubMatchMedia = (initialMatches: boolean) => {
  const listeners: ChangeListener[] = [];
  const mediaQueryList = {
    matches: initialMatches,
    media: "",
    onchange: null,
    addEventListener: (_type: string, listener: ChangeListener) => {
      listeners.push(listener);
    },
    removeEventListener: vi.fn((_type: string, listener: ChangeListener) => {
      const index = listeners.indexOf(listener);
      if (index !== -1) listeners.splice(index, 1);
    }),
    dispatchEvent: () => false,
  };

  const matchMedia = vi.fn().mockReturnValue(mediaQueryList);
  vi.stubGlobal("matchMedia", matchMedia);

  const emitChange = (matches: boolean) => {
    mediaQueryList.matches = matches;
    for (const listener of [...listeners]) {
      listener({ matches } as MediaQueryListEvent);
    }
  };

  return { matchMedia, emitChange, removeEventListener: mediaQueryList.removeEventListener };
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("usePrefersReducedMotion", () => {
  it("reports the preference already set before the page loaded", () => {
    stubMatchMedia(true);
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(true);
  });

  it("reports no preference when the query does not match at mount", () => {
    stubMatchMedia(false);
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(false);
  });

  it("queries the reduce preference directly rather than its complement", () => {
    const { matchMedia } = stubMatchMedia(false);
    renderHook(() => usePrefersReducedMotion());
    expect(matchMedia).toHaveBeenCalledWith("(prefers-reduced-motion: reduce)");
  });

  it("follows the preference when it changes mid-session", () => {
    const { emitChange } = stubMatchMedia(false);
    const { result } = renderHook(() => usePrefersReducedMotion());

    act(() => emitChange(true));
    expect(result.current).toBe(true);

    act(() => emitChange(false));
    expect(result.current).toBe(false);
  });

  it("removes the change listener on unmount", () => {
    const { removeEventListener } = stubMatchMedia(false);
    const { unmount } = renderHook(() => usePrefersReducedMotion());

    unmount();
    expect(removeEventListener).toHaveBeenCalledTimes(1);
  });
});
