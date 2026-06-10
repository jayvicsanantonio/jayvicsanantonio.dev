// Unit tests for the usePrefersReducedMotion hook.
// Verifies the initial value and reaction to media query change events.
import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

type ChangeListener = (event: MediaQueryListEvent) => void;

const stubMatchMedia = () => {
  const listeners: ChangeListener[] = [];
  const removeEventListener = vi.fn((_type: string, listener: ChangeListener) => {
    const index = listeners.indexOf(listener);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  });
  const matchMedia = vi.fn().mockReturnValue({
    matches: true,
    addEventListener: (_type: string, listener: ChangeListener) => {
      listeners.push(listener);
    },
    removeEventListener,
  });
  vi.stubGlobal("matchMedia", matchMedia);

  const emitChange = (matches: boolean) => {
    for (const listener of [...listeners]) {
      listener({ matches } as MediaQueryListEvent);
    }
  };

  return { matchMedia, emitChange, removeEventListener };
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("usePrefersReducedMotion", () => {
  it("returns false before any media query change fires", () => {
    stubMatchMedia();
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(false);
  });

  it("subscribes to the no-preference media query", () => {
    const { matchMedia } = stubMatchMedia();
    renderHook(() => usePrefersReducedMotion());
    expect(matchMedia).toHaveBeenCalledWith("(prefers-reduced-motion: no-preference)");
  });

  it("returns true when the user switches to reduced motion", () => {
    const { emitChange } = stubMatchMedia();
    const { result } = renderHook(() => usePrefersReducedMotion());

    act(() => emitChange(false));
    expect(result.current).toBe(true);

    act(() => emitChange(true));
    expect(result.current).toBe(false);
  });

  it("removes the change listener on unmount", () => {
    const { removeEventListener } = stubMatchMedia();
    const { unmount } = renderHook(() => usePrefersReducedMotion());

    unmount();
    expect(removeEventListener).toHaveBeenCalledTimes(1);
  });
});
