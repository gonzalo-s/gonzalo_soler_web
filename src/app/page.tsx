import Footer from '@/components/Footer/Footer';
import Navigation from '../components/Navigation/Navigation';
import styles from './page.module.scss';
import { SECTIONS, LOGO, FOOTER_DETAILS } from '@/constants/sections';
import RenderSection from '@/components/RenderSection/RenderSection';

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
            return <RenderSection {...section} key={section.title} />;
          })}
        </main>
        <Footer linkList={footerLinkList} details={FOOTER_DETAILS} />
      </div>
    </section>
  );
}
