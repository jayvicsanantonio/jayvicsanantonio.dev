'use client';

import localFont from 'next/font/local';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/pages/Header';
import Footer from '@/components/pages/Footer';
import useLocalStorage from '@/hooks/use-local-storage';
import Theme from '@/types/theme';

// Aether's Sophisticated Typography System
const supreme = localFont({
  src: [
    {
      path: '../../public/fonts/Supreme-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Supreme-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Supreme-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-supreme',
  fallback: ['system-ui', 'sans-serif'],
});

const editorial = localFont({
  src: [
    {
      path: '../../public/fonts/EditorialNew-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/EditorialNew-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/EditorialNew-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-editorial',
  fallback: ['Georgia', 'serif'],
});

const mono = localFont({
  src: [
    {
      path: '../../public/fonts/JetBrainsMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/JetBrainsMono-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-mono',
  fallback: ['Consolas', 'monospace'],
});

export default function Body({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'dark');

  return (
    <body
      className={`${theme === 'light' ? 'light' : 'dark'} ${supreme.variable} ${editorial.variable} ${mono.variable} min-h-screen font-supreme antialiased bg-obsidian text-pearl overflow-x-hidden`}
    >
      <div className="relative">
        {/* Elegant background gradient overlay */}
        <div className="fixed inset-0 bg-gradient-to-br from-obsidian via-charcoal to-slate pointer-events-none" />
        
        {/* Ambient light effects */}
        <div className="fixed top-0 left-1/4 w-96 h-96 bg-amber/10 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="fixed bottom-1/4 right-1/4 w-64 h-64 bg-rose/10 rounded-full blur-3xl animate-glow pointer-events-none" />
        
        {/* Main content wrapper */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header theme={theme} setTheme={setTheme} />
          
          <main className="flex-1">
            {children}
          </main>
          
          <Footer />
        </div>
      </div>
      
      <Toaster 
        theme={theme}
        className="font-supreme"
        toastOptions={{
          style: {
            background: 'rgba(26, 26, 26, 0.9)',
            border: '1px solid rgba(70, 70, 70, 0.3)',
            color: '#f8f8f8',
            backdropFilter: 'blur(12px)',
          },
        }}
      />
      <SpeedInsights />
      <Analytics />
    </body>
  );
}
