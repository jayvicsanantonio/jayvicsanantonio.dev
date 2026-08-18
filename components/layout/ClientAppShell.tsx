"use client";

import { usePathname } from "next/navigation";
import * as React from "react";
import { ViewTransition } from "react";
import AmbientBackground from "@/components/layout/AmbientBackground";
import DeferredVercelInsights from "@/components/layout/DeferredVercelInsights";

export default function ClientAppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <ViewTransition>
        <div key={pathname} suppressHydrationWarning>
          {pathname !== "/" && <AmbientBackground />}
          {children}
        </div>
      </ViewTransition>
      {process.env.NODE_ENV === "production" &&
        process.env.NEXT_PUBLIC_VERCEL_ENV === "production" && <DeferredVercelInsights />}
    </>
  );
}
