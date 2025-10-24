"use client";

import { useEffect } from "react";

export function useWebVitalsLogger() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    let active = true;

    import("web-vitals")
      .then(({ onLCP, onINP, onCLS }) => {
        const log = (name: string, value: number, rating?: string, id?: string) => {
          if (!active) return;
          const rounded = Math.round(value * 100) / 100;
          console.log(`[WebVitals] ${name}: ${rounded}`, { rating, id });
        };
        onLCP(({ value, rating, id }) => log("LCP", value, rating, id));
        onINP(({ value, rating, id }) => log("INP", value, rating, id));
        onCLS(({ value, rating, id }) => log("CLS", value, rating, id));
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);
}
