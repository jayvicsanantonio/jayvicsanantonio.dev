'use client';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { usePathname } from 'next/navigation';
import { unstable_ViewTransition as ViewTransition } from 'react';

import AmbientBackground from '@/components/shell/AmbientBackground';
import CursorGlow from '@/components/shell/CursorGlow';
import { Toaster } from '@/components/ui/Toaster';
import { useWebVitalsLogger } from '@/hooks/useWebVitalsLogger';

export default function ClientAppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useWebVitalsLogger();

  const isHome = pathname === '/';

  return (
    <>
      <CursorGlow />
      {/* React ViewTransition wrapper per Next.js docs; key by pathname to scope updates */}
      <ViewTransition>
        <div key={pathname}>
          {pathname !== '/' && <AmbientBackground />}
          {isHome ? children : <div className="container">{children}</div>}
        </div>
      </ViewTransition>
      <Toaster />
      <SpeedInsights />
      <Analytics />
    </>
  );
}
