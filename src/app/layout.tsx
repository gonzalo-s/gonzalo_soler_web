import { Geist_Mono, Inter, Space_Grotesk } from 'next/font/google';
import PageShell from '@/components/templates/PageShell/PageShell';
import './globals.scss';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeContextProvider } from '@/contexts/themeContext';
import { loadAllSections } from '@/lib/services/loadAllSections';
import parseFooterDetails from '@/lib/services/parsers/parseFooterDetails';
import parseLogo from '@/lib/services/parsers/parseLogo';

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});
const interSans = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin'],
});
const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sections, footerDetails, logo] = await Promise.all([loadAllSections(), parseFooterDetails(), parseLogo()]);
  const navigationLinks = sections.filter((section) => section.isNav);
  const footerLinks = sections.filter((section) => section.isFooter);

  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.dataset.theme=/(?:^|;\\s*)theme=dark(?:;|$)/.test(document.cookie)?'dark':'light';",
          }}
        />
      </head>
      <body className={`${interSans.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}>
        <ThemeContextProvider>
          <PageShell
            navigationLinks={navigationLinks}
            footerLinks={footerLinks}
            footerDetails={footerDetails}
            logo={logo}
          >
            {children}
          </PageShell>
        </ThemeContextProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
