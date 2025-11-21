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

  lockCount += 1;
  if (lockCount === 1) {
    applyLock();
  }

  let released = false;

  return () => {
    if (released) {
      return;
    }
    released = true;

    lockCount = Math.max(0, lockCount - 1);
    if (lockCount === 0) {
      clearLock();
    }
  };
}
