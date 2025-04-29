'use client';

import { Geist_Mono, Inter } from 'next/font/google';
import Navigation from '@/components/Navigation/Navigation';
import Footer from '@/components/Footer/Footer';
import { SECTIONS, LOGO, FOOTER_DETAILS } from '@/constants/sections';
import './globals.scss';
import styles from './layout.module.scss';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeContextProvider } from '@/contexts/themeContext';

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});
const interSans = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const footerLinkList = SECTIONS.filter((section) => section.isFooter);
  const navigationLinkList = SECTIONS.filter((section) => section.isNav);

  return (
    <html lang="en">
      <body className={`${interSans.variable} ${geistMono.variable}`}>
        <ThemeContextProvider>
          <div className={styles['page-wrapper']}>
            <div className={styles.content}>
              <Navigation linkList={navigationLinkList} logo={LOGO} />
              <main className={styles.main}>{children}</main>
              <Footer linkList={footerLinkList} details={FOOTER_DETAILS} />
            </div>
          </div>
        </ThemeContextProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
