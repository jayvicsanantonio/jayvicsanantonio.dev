"use client";

import React from "react";
import { usePathname } from "next/navigation";

export function useScrollReset(): void {
  const pathname = usePathname();

  const resetScrollPosition = React.useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    if (typeof document !== "undefined") {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, []);

  React.useLayoutEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const supportsScrollRestoration = "scrollRestoration" in window.history;
    let previousRestoration: History["scrollRestoration"] | undefined;

    if (supportsScrollRestoration) {
      previousRestoration = window.history.scrollRestoration;
      window.history.scrollRestoration = "manual";
    }

    const handleBeforeUnload = () => {
      resetScrollPosition();
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        resetScrollPosition();
      }
    };

    resetScrollPosition();
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pageshow", handlePageShow);
      if (supportsScrollRestoration && typeof previousRestoration !== "undefined") {
        window.history.scrollRestoration = previousRestoration;
      }
    };
  }, [resetScrollPosition]);

  React.useEffect(() => {
    const raf = requestAnimationFrame(() => {
      resetScrollPosition();
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname, resetScrollPosition]);
}
