"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function VTDiagnostics() {
  const pathname = usePathname();

  // Log a simple lifecycle around route content commits.
  useEffect(() => {
    const supportsVT =
      typeof document !== "undefined" && "startViewTransition" in document;
    const reduceMotion = (() => {
      try {
        return !window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
      } catch {
        return undefined;
      }
    })();

    // Mount for this route
    const computedBodyVTN = (() => {
      try {
        return window.getComputedStyle(document.body).getPropertyValue('view-transition-name');
      } catch {
        return undefined;
      }
    })();

    // eslint-disable-next-line no-console
    console.log("[VT DEBUG] mount route:", pathname, {
      supportsVT,
      visibility: typeof document !== "undefined" ? document.visibilityState : "unknown",
      reduceMotion,
      bodyViewTransitionName: computedBodyVTN,
      now: typeof performance !== "undefined" ? Math.round(performance.now()) : undefined,
    });

    // Log a couple of frames to see if paints are happening
    requestAnimationFrame(() => {
      // eslint-disable-next-line no-console
      console.log("[VT DEBUG] rAF #1 for route:", pathname);
      requestAnimationFrame(() => {
        // eslint-disable-next-line no-console
        console.log("[VT DEBUG] rAF #2 for route:", pathname);
      });
    });

    return () => {
      // Unmount (leaving this route)
      // eslint-disable-next-line no-console
      console.log("[VT DEBUG] unmount route:", pathname);
    };
  }, [pathname]);

  return null;
}

