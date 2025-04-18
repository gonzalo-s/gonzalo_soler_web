import type { Metadata } from 'next';
import { Geist_Mono, Inter } from 'next/font/google';
import Navigation from '@/components/Navigation/Navigation';
import Footer from '@/components/Footer/Footer';
import { SECTIONS, LOGO, FOOTER_DETAILS } from '@/constants/sections';
import './globals.css';
import styles from './layout.module.scss';
import { Analytics } from '@vercel/analytics/react';

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});
const interSans = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

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
        <div className={styles['page-wrapper']}>
          <div className={styles.content}>
            <Navigation linkList={navigationLinkList} logo={LOGO} />
            <main className={styles.main}>{children}</main>
            <Footer linkList={footerLinkList} details={FOOTER_DETAILS} />
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
