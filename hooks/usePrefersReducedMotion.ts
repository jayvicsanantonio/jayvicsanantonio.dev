// Tracks the user's reduced-motion preference.
// Subscribes to the media query so a preference set before load is honored, and later changes follow.
import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

const subscribe = (onStoreChange: () => void) => {
  const mediaQueryList = window.matchMedia(QUERY);
  mediaQueryList.addEventListener("change", onStoreChange);
  return () => {
    mediaQueryList.removeEventListener("change", onStoreChange);
  };
};

const getSnapshot = () => window.matchMedia(QUERY).matches;

// The server cannot know the preference; the client corrects it on hydration.
const getServerSnapshot = () => false;

export default function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
