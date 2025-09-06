"use client";

import AmbientBackground from "@/components/pages/AmbientBackground";
import CursorGlow from "@/components/pages/CursorGlow";
import { Toaster } from "@/components/ui/sonner";
import { useWebVitalsLogger } from "@/hooks/useWebVitalsLogger";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { usePathname } from "next/navigation";
import { unstable_ViewTransition as ViewTransition } from "react";

export default function Body({
  children,
  fontVars,
}: {
  children: React.ReactNode;
  fontVars?: string;
}) {
  const pathname = usePathname();

  useWebVitalsLogger();

  const isHome = pathname === "/";

  return (
    <body
      className={`dark ${
        fontVars ?? ""
      } flex flex-col min-h-screen dark:bg-gray-950 text-gray-200`}
    >
      <CursorGlow />
      {/* React ViewTransition wrapper per Next.js docs; key by pathname to scope updates */}
      <ViewTransition>
        <div key={pathname}>
          {pathname !== "/" && <AmbientBackground />}
          {isHome ? children : <div className="container">{children}</div>}
        </div>
      </ViewTransition>
      <Toaster />
      <SpeedInsights />
      <Analytics />
    </body>
  );
}
