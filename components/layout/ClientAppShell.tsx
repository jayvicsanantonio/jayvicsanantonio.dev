"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { usePathname } from "next/navigation";
import * as React from "react";
import AmbientBackground from "@/components/layout/AmbientBackground";
import { Toaster } from "@/components/feedback/Toaster";
import { useWebVitalsLogger } from "@/hooks/useWebVitalsLogger";

const ENABLE_VIEW_TRANSITIONS = false;

type ReactWithViewTransition = typeof React & {
  ViewTransition?: React.ComponentType<{ children: React.ReactNode }>;
};

const ViewTransition: React.ComponentType<{ children: React.ReactNode }> =
  ENABLE_VIEW_TRANSITIONS && (React as ReactWithViewTransition).ViewTransition
    ? ((React as ReactWithViewTransition).ViewTransition as React.ComponentType<{
        children: React.ReactNode;
      }>)
    : React.Fragment;

export default function ClientAppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useWebVitalsLogger();

  const isHome = pathname === "/";

  return (
    <>
      <ViewTransition>
        <div key={pathname} suppressHydrationWarning>
          {pathname !== "/" && <AmbientBackground />}
          {isHome ? children : <div className="container">{children}</div>}
        </div>
      </ViewTransition>
      <Toaster />
      {process.env.NODE_ENV === "production" &&
        process.env.NEXT_PUBLIC_VERCEL_ENV === "production" && (
          <>
            <SpeedInsights />
            <Analytics />
          </>
        )}
    </>
  );
}
