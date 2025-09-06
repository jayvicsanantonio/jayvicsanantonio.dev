import type { Metadata } from 'next';

import Body from '@/components/pages/Body';
import './globals.css';
import localFont from 'next/font/local';
import { Inter_Tight } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Jayvic San Antonio | Software Engineer',
  description:
    'Highly skilled senior web developer with a proven track record of delivering successful web projects. Experienced in JavaScript and passionate about building innovative solutions. Contact me to learn more about my expertise.',
  icons: {
    icon: [
      {
        url: '/icons/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        url: '/icons/favicon.svg',
        sizes: '48x48',
        type: 'image/svg+xml',
      },
    ],
    apple: '/icons/apple-icon.png',
  },
};

export const viewport = {
  themeColor: '#030712',
};

const sourceSansPro = localFont({
  src: [
    {
      path: '../public/fonts/SourceSansPro-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/SourceSansPro-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/SourceSansPro-Bold.woff2',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Body
        fontVars={`${sourceSansPro.variable} ${interTight.variable}`}
      >
        {children}
      </Body>
    </html>
  );
}
