'use client';

import localFont from 'next/font/local';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

// Using Source Sans Pro for its clean, modern aesthetic.
const sourceSansPro = localFont({
  src: [
    {
      path: '../../public/fonts/SourceSansPro-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SourceSansPro-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SourceSansPro-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-sans', // Using standard tailwind variable name
});

export default function Body({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body
      className={cn(
        'dark font-sans bg-background text-foreground',
        sourceSansPro.variable
      )}
    >
      <main>{children}</main>
      <Toaster />
      <SpeedInsights />
      <Analytics />
    </body>
  );
}
