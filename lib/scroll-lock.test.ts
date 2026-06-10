// Unit tests for the global scroll lock.
// Exercises wheel/touch/key blocking, nested lock ref counting, and idempotent release.
import { describe, expect, it } from "vitest";

import { lockScroll } from "@/lib/scroll-lock";

const dispatchWheel = () => {
  const event = new WheelEvent("wheel", { bubbles: true, cancelable: true });
  document.dispatchEvent(event);
  return event;
};

const dispatchKeydown = (key: string, init: KeyboardEventInit = {}) => {
  const event = new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true, ...init });
  document.dispatchEvent(event);
  return event;
};

describe("lockScroll", () => {
  it("blocks wheel events while locked and allows them after release", () => {
    expect(dispatchWheel().defaultPrevented).toBe(false);

    const unlock = lockScroll();
    expect(dispatchWheel().defaultPrevented).toBe(true);

    unlock();
    expect(dispatchWheel().defaultPrevented).toBe(false);
  });

  it("blocks scroll keys but not other keys or modified combos", () => {
    const unlock = lockScroll();

    expect(dispatchKeydown("ArrowDown").defaultPrevented).toBe(true);
    expect(dispatchKeydown("PageDown").defaultPrevented).toBe(true);
    expect(dispatchKeydown(" ").defaultPrevented).toBe(true);
    expect(dispatchKeydown("a").defaultPrevented).toBe(false);
    expect(dispatchKeydown("ArrowDown", { ctrlKey: true }).defaultPrevented).toBe(false);
    expect(dispatchKeydown("ArrowDown", { metaKey: true }).defaultPrevented).toBe(false);

    unlock();
    expect(dispatchKeydown("ArrowDown").defaultPrevented).toBe(false);
  });

  it("stays locked until every nested lock is released", () => {
    const unlockFirst = lockScroll();
    const unlockSecond = lockScroll();

    unlockFirst();
    expect(dispatchWheel().defaultPrevented).toBe(true);

    unlockSecond();
    expect(dispatchWheel().defaultPrevented).toBe(false);
  });

  it("ignores a second call to the same unlock function", () => {
    const unlockFirst = lockScroll();
    const unlockSecond = lockScroll();

    unlockFirst();
    unlockFirst();
    expect(dispatchWheel().defaultPrevented).toBe(true);

    unlockSecond();
    expect(dispatchWheel().defaultPrevented).toBe(false);
  });
});
