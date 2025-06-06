'use client';

import { Geist_Mono, Inter } from 'next/font/google';
import Navigation from '@/components/Navigation/Navigation';
import Footer from '@/components/Footer/Footer';
import './globals.scss';
import styles from './layout.module.scss';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeContextProvider } from '@/contexts/themeContext';
import { loadAllSections } from '@/lib/services/loadAllSections';
import parseFooterDetails from '@/lib/services/parsers/parseFooterDetails';
import parseLogo from '@/lib/services/parsers/parseLogo';
import { useEffect, useState } from 'react';
import type { Section } from '@/constants/sections';
import type { FooterProps } from '@/components/Footer/Footer';
import type { ButtonProps } from '@/components/Button/Button';

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
  const [footerLinkList, setFooterLinkList] = useState<Array<Section>>([]);
  const [navigationLinkList, setNavigationLinkList] = useState<Array<Section>>([]);
  const [footerDetails, setFooterDetails] = useState<FooterProps['details']>({
    logo: { text: '' },
    description: '',
    email: [],
  });
  const [logo, setLogo] = useState<ButtonProps>({ text: '' });

  useEffect(() => {
    async function fetchData() {
      let googleSheetData;
      try {
        googleSheetData = await loadAllSections();
        if (!googleSheetData || !googleSheetData.length) {
          throw new Error('No data found in Google Sheets.');
        }
        const footerLinkListFiltered = googleSheetData.filter((section) => section?.isFooter);
        setFooterLinkList(footerLinkListFiltered);
      } catch (error) {
        console.error('Error fetching Google Sheets data:', error);
        return;
      }

      try {
        const navigationLinkList = googleSheetData.filter((section) => section?.isNav);
        setNavigationLinkList(navigationLinkList);
      } catch (error) {
        console.error('Error filtering navigation links:', error);
      }

      try {
        const footerDetails = await parseFooterDetails();
        setFooterDetails(footerDetails);
      } catch (error) {
        console.error('Error parsing footer details:', error);
      }

      try {
        const logo = await parseLogo();
        setLogo(logo);
      } catch (error) {
        console.error('Error parsing logo:', error);
      }
    }

    fetchData();
  }, []);
  return (
    <html lang="en">
      <body className={`${interSans.variable} ${geistMono.variable}`}>
        <ThemeContextProvider>
          <div className={styles['page-wrapper']}>
            <div className={styles.content}>
              {navigationLinkList.length > 0 && logo && <Navigation linkList={navigationLinkList} logo={logo} />}
              <main className={styles.main}>{children}</main>
              {footerLinkList.length > 0 && footerDetails && (
                <Footer linkList={footerLinkList} details={footerDetails} />
              )}
            </div>
          </div>
        </ThemeContextProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
