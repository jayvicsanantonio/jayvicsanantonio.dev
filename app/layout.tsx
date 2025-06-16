import type { Metadata } from 'next';

import Body from '@/components/pages/Body';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jayvic San Antonio | Software Engineer',
  description:
    'Highly skilled senior web developer with a proven track record of delivering successful web projects. Experienced in JavaScript and passionate about building innovative solutions. Contact me to learn more about my expertise.',
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
  keywords: ['software engineer', 'web developer', 'javascript', 'typescript', 'react', 'nextjs', 'portfolio', 'full-stack'],
  openGraph: {
    title: 'Jayvic San Antonio | Software Engineer',
    description: 'Highly skilled senior web developer with a proven track record of delivering successful web projects. Experienced in JavaScript and passionate about building innovative solutions. Contact me to learn more about my expertise.',
    url: 'https://jayvicsanantonio.dev',
    siteName: 'Jayvic San Antonio Portfolio',
    images: [
      {
        url: 'https://jayvicsanantonio.dev/icons/web-app-manifest-512x512.png', // Replace with actual URL
        width: 512,
        height: 512,
        alt: 'Jayvic San Antonio Portfolio Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jayvic San Antonio | Software Engineer',
    description: 'Highly skilled senior web developer with a proven track record of delivering successful web projects. Experienced in JavaScript and passionate about building innovative solutions. Contact me to learn more about my expertise.',
    // Optional: creator: '@YourTwitterHandle',
    images: ['https://jayvicsanantonio.dev/icons/web-app-manifest-512x512.png'], // Replace with actual URL
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
      <head>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Jayvic San Antonio | Software Engineer",
              "url": "https://jayvicsanantonio.dev"
            }
          `}
        </script>
      </head>
      <Body>{children}</Body>
    </html>
  );
}
