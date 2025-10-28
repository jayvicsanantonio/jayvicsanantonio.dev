"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { usePathname } from "next/navigation";
import * as React from "react";
import CursorGlow from "@/components/shell/CursorGlow";
import { Toaster } from "@/components/ui/Toaster";
import { useWebVitalsLogger } from "@/hooks/useWebVitalsLogger";
// Next.js v16 docs: prefer `ViewTransition` from 'react' when available.
// Fallback to a no-op wrapper (React.Fragment) when not available.
const ViewTransition: React.ComponentType<{ children: React.ReactNode }> =
  // Using `as any` since ViewTransition may not exist on some React versions
  ((React as any).ViewTransition as React.ComponentType<{ children: React.ReactNode }>) ||
  React.Fragment;

export default function ClientAppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useWebVitalsLogger();

  const isHome = pathname === "/";
  const routeKey = (() => {
    if (isHome) return "home";
    if (pathname?.startsWith("/projects")) return "projects";
    if (pathname?.startsWith("/work")) return "work";
    if (pathname?.startsWith("/lite")) return "lite";
    return "default";
  })();

  React.useEffect(() => {
    if (typeof document === "undefined") return;
    const { body } = document;
    const previous = body.dataset.route;
    body.dataset.route = routeKey;
    return () => {
      body.dataset.route = previous ?? "";
    };
  }, [routeKey]);

  return (
    <>
      <CursorGlow />
      {/* React ViewTransition wrapper per Next.js docs; key by pathname to scope updates */}
      <ViewTransition>
        <div key={pathname} suppressHydrationWarning>
          {isHome ? children : <div className="container">{children}</div>}
        </div>
      </ViewTransition>
      <Toaster />
      <SpeedInsights />
      <Analytics />
    </>
  );
}
