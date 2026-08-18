"use client";

import { usePathname } from "next/navigation";
import * as React from "react";
import AmbientBackground from "@/components/layout/AmbientBackground";
import DeferredVercelInsights from "@/components/layout/DeferredVercelInsights";

export default function ClientAppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <>
      <div key={pathname} suppressHydrationWarning>
        {pathname !== "/" && <AmbientBackground />}
        {isHome ? children : <div className="container">{children}</div>}
      </div>
      {process.env.NODE_ENV === "production" &&
        process.env.NEXT_PUBLIC_VERCEL_ENV === "production" && <DeferredVercelInsights />}
    </>
  );
}
