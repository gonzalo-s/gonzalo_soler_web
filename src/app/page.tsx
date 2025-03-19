import Footer from '@/components/Footer/Footer';
import Navigation from '../components/Navigation/Navigation';
import styles from './page.module.scss';
import { SECTIONS, LOGO, FOOTER_DETAILS } from '@/constants/sections';
import { getHref } from '@/components/utils/getHref';

export default function Home() {
  const mainSections = SECTIONS.filter((section) => section.isMain);
  const footerLinkList = SECTIONS.filter((section) => section.isFooter);
  const navigationLinkList = SECTIONS.filter((section) => section.isNav);

  return (
    <section className={styles['page-wrapper']}>
      <div className={styles.content}>
        <Navigation linkList={navigationLinkList} logo={LOGO} />
        <main className={styles.main}>
          {mainSections.map((section) => {
            const id = getHref(section.href);
            return (
              <section key={section.title} id={id} style={{ height: '900px' }}>
                {section.title}
              </section>
            );
          })}
        </main>
        <Footer linkList={footerLinkList} details={FOOTER_DETAILS} />
      </div>
    </section>
  );
}
