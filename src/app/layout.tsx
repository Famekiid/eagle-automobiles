import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import Providers from '@/app/providers';
import RootLayout from '@/components/RootLayout';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Eagle Automobiles | Luxury Vehicle Dealership',
  description:
    'Discover premium luxury vehicles from world-class brands. Expert financing and seamless booking experience.',
  keywords: [
    'luxury vehicles',
    'automobile dealership',
    'vehicle financing',
    'premium cars',
    'Avatr',
    'BYD',
    'XPeng',
    'Geely',
    'NIO',
  ],
  authors: [{ name: 'Eagle Automobiles' }],
  openGraph: {
    title: 'Eagle Automobiles | Luxury Vehicle Dealership',
    description:
      'Discover premium luxury vehicles from world-class brands.',
    type: 'website',
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-950 text-slate-50`}
      >
        <Providers>
          <RootLayout>{children}</RootLayout>
        </Providers>
      </body>
    </html>
  );
}
