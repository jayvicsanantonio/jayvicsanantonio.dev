"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { usePathname } from "next/navigation";
import * as React from "react";
import AmbientBackground from "@/components/shell/AmbientBackground";
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
