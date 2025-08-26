'use client';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/pages/Header';
import Footer from '@/components/pages/Footer';
import AmbientBackground from '@/components/pages/AmbientBackground';
import CursorGlow from '@/components/pages/CursorGlow';

export default function Body({
  children,
  fontVars,
}: {
  children: React.ReactNode;
  fontVars?: string;
}) {
  return (
    <body
      className={`dark ${
        fontVars ?? ''
      } flex flex-col md:flex-row min-h-screen dark:bg-gray-950 text-gray-200`}
    >
      <AmbientBackground />
      <CursorGlow />
      <div
        className={`font-source-sans flex flex-col w-3xl lg:w-6xl md:px-12 mx-4 lg:mx-auto`}
      >
        <Header />
        <main className="flex-1 py-12">{children}</main>
        <Footer />
      </div>
      <Toaster />
      <SpeedInsights />
      <Analytics />
    </body>
  );
}
