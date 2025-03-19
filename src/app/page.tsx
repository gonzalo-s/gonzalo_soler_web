import Footer from '@/components/Footer/Footer';
import Navigation from '../components/Navigation/Navigation';
import styles from './page.module.scss';
import { SECTIONS } from '@/constants/sections';
import { getHref } from '@/components/utils/getHref';

export default function Home() {
  console.log(SECTIONS);
  const mainSections = SECTIONS.filter((section) => section.isMain);
  const footerSections = SECTIONS.filter((section) => section.isFooter);

  return (
    <section className={styles['page-wrapper']}>
      <div className={styles.content}>
        <Navigation />
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
        <Footer listLinks={footerSections} />
      </div>
    </section>
  );
}
