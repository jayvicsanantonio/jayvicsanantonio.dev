"use client";

import { useEffect, useState, type ComponentType } from "react";

type InsightsComponents = {
  Analytics: ComponentType;
  SpeedInsights: ComponentType;
};

const scheduleIdle = (callback: () => void) => {
  if ("requestIdleCallback" in window) {
    const handle = window.requestIdleCallback(callback, { timeout: 4000 });
    return () => window.cancelIdleCallback(handle);
  }

  const handle = globalThis.setTimeout(callback, 2500);
  return () => globalThis.clearTimeout(handle);
};

export default function DeferredVercelInsights() {
  const [components, setComponents] = useState<InsightsComponents | null>(null);

  useEffect(() => {
    let active = true;

    const cancelIdle = scheduleIdle(() => {
      Promise.all([import("@vercel/analytics/react"), import("@vercel/speed-insights/next")]).then(
        ([analytics, speedInsights]) => {
          if (!active) return;
          setComponents({
            Analytics: analytics.Analytics,
            SpeedInsights: speedInsights.SpeedInsights,
          });
        },
      );
    });

    return () => {
      active = false;
      cancelIdle();
    };
  }, []);

  if (!components) return null;

  return (
    <>
      <components.SpeedInsights />
      <components.Analytics />
    </>
  );
}
