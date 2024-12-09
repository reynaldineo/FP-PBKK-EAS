import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Providers from '@/app/providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'TokoITS ',
    template: '%s | TokoITS ',
  },
  description: 'TokoITS - FP PBKKK EAS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
