import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Eagle Automobiles',
  description: 'Premium vehicle inventory and finance management platform',
  keywords: ['vehicles', 'automobiles', 'inventory', 'finance'],
  authors: [{ name: 'Eagle Automobiles' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://eagleautomobiles.com',
    title: 'Eagle Automobiles',
    description: 'Premium vehicle inventory and finance management platform',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
