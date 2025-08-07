'use client';

import { EB_Garamond, Inter } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from '@/components/ui/sonner';
import Theme from '@/types/theme';

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-eb-garamond',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function Body({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body
      className={`dark ${ebGaramond.variable} ${inter.variable} min-h-screen bg-background text-foreground`}
    >
      <div className="font-sans antialiased">
        <main>{children}</main>
      </div>
      <Toaster />
      <SpeedInsights />
      <Analytics />
    </body>
  );
}
