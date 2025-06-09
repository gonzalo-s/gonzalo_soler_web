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
import type { Section } from '@/types/sections';
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let navigationLinkList: Array<Section> = [];
  let footerLinkList: Array<Section> = [];
  let footerDetails: FooterProps['details'] = { logo: { text: '' }, description: '', email: [] };
  let logo: ButtonProps = { text: '' };

  try {
    const googleSheetData = await loadAllSections();
    if (googleSheetData && googleSheetData.length) {
      footerLinkList = googleSheetData.filter((section) => section?.isFooter);
      navigationLinkList = googleSheetData.filter((section) => section?.isNav);
    }
  } catch (error) {
    console.error('Error fetching Google Sheets data:', error);
  }

  try {
    footerDetails = await parseFooterDetails();
  } catch (error) {
    console.error('Error parsing footer details:', error);
  }

  try {
    logo = await parseLogo();
  } catch (error) {
    console.error('Error parsing logo:', error);
  }

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
