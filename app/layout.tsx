'use client';

import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import PlasticBackground from '@/components/PlasticBackground';
import ReducedMotionProvider from '@/components/ReducedMotionProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Plastic Centuries — Archaeological Archive (2126)</title>
        <meta name="description" content="A future archaeological archive examining plastic as ritual infrastructure. Exhibition catalogue 2126." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ReducedMotionProvider>
          <PlasticBackground />
          <Navigation />
          <main className="relative z-10">
            {children}
          </main>
        </ReducedMotionProvider>
      </body>
    </html>
  );
}
