import Footer from '@/components/Footer/Footer';
import Navigation from '../components/Navigation/Navigation';
import styles from './page.module.scss';

export default function Home() {
  // TODO: see other way of creating and handling sections ids from a centralized object
  // export const sections = {
  //   introduction: 'introduction',
  //   projects: 'projects',
  //   aboutMe: 'about-me',
  //   contact: 'contact',
  // };

  return (
    <section className={styles['page-wrapper']}>
      <div className={styles.content}>
        <Navigation />
        <main className={styles.main}>
          <section id="introduction" style={{ height: '900px' }}>
            Introduction
          </section>
          <section id="projects" style={{ height: '900px' }}>
            Projects
          </section>
          <section id="about-me" style={{ height: '900px' }}>
            About me
          </section>
          <section id="contact" style={{ height: '900px' }}>
            Contact
          </section>
        </main>
        <Footer />
      </div>
    </section>
  );
}
