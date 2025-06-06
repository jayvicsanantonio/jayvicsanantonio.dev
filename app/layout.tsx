import type { Metadata } from 'next';

import Body from '@/components/pages/Body';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://jayvicsanantonio.dev'),
  title: 'Jayvic San Antonio | Software Engineer',
  description:
    'Highly skilled senior web developer with a proven track record of delivering successful web projects. Experienced in JavaScript and passionate about building innovative solutions. Contact me to learn more about my expertise.',
  keywords: ['software engineer', 'web developer', 'javascript', 'typescript', 'nextjs', 'react', 'portfolio', 'full-stack'],
  manifest: '/manifest.json',
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
  openGraph: {
    title: 'Jayvic San Antonio | Software Engineer',
    description: 'Highly skilled senior web developer with a proven track record of delivering successful web projects. Experienced in JavaScript and passionate about building innovative solutions.',
    url: '/',
    siteName: 'Jayvic San Antonio Portfolio',
    images: [
      {
        url: '/images/home/profile-image.webp',
        width: 800,
        height: 600,
        alt: 'Jayvic San Antonio - Software Engineer',
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jayvic San Antonio | Software Engineer',
    description: 'Highly skilled senior web developer with a proven track record of delivering successful web projects. Experienced in JavaScript and passionate about building innovative solutions.',
    images: ['/images/home/profile-image.webp'],
    creator: '@jayvicsanantonio',
  },
  alternates: {
    canonical: '/',
  },
};

export const viewport = {
  themeColor: '#030712',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Body>{children}</Body>
    </html>
  );
}
