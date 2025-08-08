'use client';

import localFont from 'next/font/local';
import { Inter_Tight } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/pages/Header';
import Footer from '@/components/pages/Footer';
import useLocalStorage from '@/hooks/use-local-storage';
import Theme from '@/types/theme';
import AmbientBackground from '@/components/pages/AmbientBackground';
import CursorGlow from '@/components/pages/CursorGlow';

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
  variable: '--font-source-sans',
});

// Map Inter Tight onto the legacy --font-oswald variable so existing classes continue to work
const interTight = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-oswald',
});

export default function Body({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'dark');

  return (
    <body
      className={`${theme === 'light' ? '' : 'dark'} ${
        sourceSansPro.variable
      } ${
        interTight.variable
      } flex flex-col md:flex-row min-h-screen dark:bg-gray-950 text-gray-200`}
    >
      <AmbientBackground />
      <CursorGlow />
      <div
        className={`font-source-sans flex flex-col w-3xl lg:w-6xl md:px-12 mx-4 lg:mx-auto ${
          theme === 'light' ? '' : 'dark'
        }`}
      >
        <Header theme={theme} setTheme={setTheme} />
        <main className="flex-1 py-12">{children}</main>
        <Footer />
      </div>
      <Toaster />
      <SpeedInsights />
      <Analytics />
    </body>
  );
}
