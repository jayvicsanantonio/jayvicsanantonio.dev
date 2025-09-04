'use client';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from '@/components/ui/sonner';
import AmbientBackground from '@/components/pages/AmbientBackground';
import CursorGlow from '@/components/pages/CursorGlow';
import { usePathname } from 'next/navigation';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useWebVitalsLogger } from '@/hooks/useWebVitalsLogger';
import { unstable_ViewTransition as ViewTransition } from 'react';

export default function Body({
  children,
  fontVars,
}: {
  children: React.ReactNode;
  fontVars?: string;
}) {
  const pathname = usePathname();
  useScrollToTop();
  useWebVitalsLogger();

  return (
    <body
      className={`dark ${
        fontVars ?? ''
      } flex flex-col md:flex-row min-h-screen dark:bg-gray-950 text-gray-200`}
    >
      <CursorGlow />
      {/* React ViewTransition wrapper per Next.js docs; key by pathname to scope updates */}
      <ViewTransition>
        <div key={pathname}>
          {pathname !== '/' && <AmbientBackground />}
          {children}
        </div>
      </ViewTransition>
      <Toaster />
      <SpeedInsights />
      <Analytics />
    </body>
  );
}
