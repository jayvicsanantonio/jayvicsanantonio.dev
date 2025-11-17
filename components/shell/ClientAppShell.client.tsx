"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { usePathname } from "next/navigation";
import * as React from "react";
import AmbientBackground from "@/components/shell/AmbientBackground";
import { Toaster } from "@/components/ui/Toaster";
import { useWebVitalsLogger } from "@/hooks/useWebVitalsLogger";

// Toggle keeps the wiring in place but skips React ViewTransitions entirely while debugging.
const ENABLE_VIEW_TRANSITIONS = false;
const ViewTransition: React.ComponentType<{ children: React.ReactNode }> =
  ENABLE_VIEW_TRANSITIONS && (React as any).ViewTransition
    ? ((React as any).ViewTransition as React.ComponentType<{ children: React.ReactNode }>)
    : React.Fragment;

export default function ClientAppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useWebVitalsLogger();

  const isHome = pathname === "/";

  return (
    <>
      {/* <CursorGlow /> */}
      {/* React ViewTransition wrapper per Next.js docs; key by pathname to scope updates */}
      <ViewTransition>
        <div key={pathname} suppressHydrationWarning>
          {pathname !== "/" && <AmbientBackground />}
          {isHome ? children : <div className="container">{children}</div>}
        </div>
      </ViewTransition>
      <Toaster />
      <SpeedInsights />
      <Analytics />
    </>
  );
}
