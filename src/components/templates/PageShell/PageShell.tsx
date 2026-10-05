import type { ReactNode } from 'react';
import Navigation from '@/components/organisms/Navigation/Navigation';
import Footer from '@/components/organisms/Footer/Footer';
import type { FooterProps, Section } from '@/types/sections';
import type { ButtonProps } from '@/types/ui';
import styles from './pageShell.module.scss';

type PageShellProps = {
  children: ReactNode;
  navigationLinks: Section[];
  footerLinks: Section[];
  footerDetails: FooterProps['details'];
  logo: ButtonProps;
};

export default function PageShell({ children, navigationLinks, footerLinks, footerDetails, logo }: PageShellProps) {
  return (
    <div className={styles['page-wrapper']}>
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>
      <div className={styles.content}>
        {navigationLinks.length > 0 && <Navigation linkList={navigationLinks} logo={logo} />}
        <main className={styles.main} id="main-content" tabIndex={-1}>
          {children}
        </main>
        {footerLinks.length > 0 && <Footer linkList={footerLinks} details={footerDetails} />}
      </div>
    </div>
  );
}
