"use client";

const SCROLL_KEYS = new Set([
  " ",
  "Space",
  "Spacebar",
  "PageUp",
  "PageDown",
  "End",
  "Home",
  "ArrowUp",
  "ArrowDown",
]);

type UnlockFn = () => void;

let lockCount = 0;
let isLocked = false;

const wheelListener = (event: WheelEvent) => {
  event.preventDefault();
  event.stopPropagation();
};

const touchMoveListener = (event: TouchEvent) => {
  event.preventDefault();
  event.stopPropagation();
};

const keydownListener = (event: KeyboardEvent) => {
  // Allow keyboard shortcuts and non-scroll keys to pass through.
  // Skip if: already prevented, modifier key pressed, or not a scroll key.
  if (
    event.defaultPrevented ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    !SCROLL_KEYS.has(event.key)
  ) {
    return;
  }
  event.preventDefault();
};

const isBrowser = () => typeof window !== "undefined" && typeof document !== "undefined";

/**
 * Applies scroll lock by preventing wheel, touch, and keyboard scroll events.
 */
function applyLock() {
  if (!isBrowser() || isLocked) {
    return;
  }

  document.addEventListener("wheel", wheelListener, { passive: false, capture: true });
  document.addEventListener("touchmove", touchMoveListener, { passive: false, capture: true });
  document.addEventListener("keydown", keydownListener, { passive: false });

  isLocked = true;
}

/**
 * Removes scroll lock by cleaning up event listeners.
 */
function clearLock() {
  if (!isBrowser() || !isLocked) {
    return;
  }

  document.removeEventListener("wheel", wheelListener, true);
  document.removeEventListener("touchmove", touchMoveListener, true);
  document.removeEventListener("keydown", keydownListener);

  isLocked = false;
}

/**
 * Locks scrolling by preventing wheel, touch, and keyboard scroll events.
 * Uses reference counting to support nested locks.
 *
 * @returns A function to release the scroll lock
 *
 * @example
 * const unlock = lockScroll();
 * // ... do something while scroll is locked
 * unlock(); // Release the lock
 */
export function lockScroll(): UnlockFn {
  if (!isBrowser()) {
    return () => {};
  }

  // Reference counting pattern: allows multiple components to lock scroll simultaneously.
  // Each call to lockScroll() increments the count, each unlock() decrements it.
  // The actual lock is only applied when count goes from 0→1.
  // The actual lock is only removed when count goes from 1→0.
  lockCount += 1;
  // Only apply lock on first call (when count goes from 0 to 1).
  if (lockCount === 1) {
    applyLock();
  }

  let released = false;

  return () => {
    // Prevent double-release (makes unlock function idempotent).
    // This is important because React effects can run multiple times.
    if (released) {
      return;
    }
    released = true;

    // Decrement reference count, ensuring it never goes negative.
    lockCount = Math.max(0, lockCount - 1);
    // Only clear lock when all references are released (count reaches 0).
    if (lockCount === 0) {
      clearLock();
    }
  };
}
