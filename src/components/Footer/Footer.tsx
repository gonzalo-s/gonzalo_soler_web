import Button from '../Button/Button';
import styles from './footer.module.scss';

function Footer() {
  // TODO: use section object for keys and button text

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__top}>
        <div className={styles.footer__top__details}>
          <Button text="Gonzalo Soler" variant="primary" href={{ internal: '/' }} />
          SOME TEXT HERE
        </div>
        <nav>
          <ul className={styles.footer__top__list}>
            <li key="Projects">
              <Button text="Projects" variant="secondary" href={{ internal: '#projects' }} />
            </li>
            <li key="aboute-me">
              <Button text="About Me" variant="secondary" href={{ internal: '/' }} />
            </li>
            <li key="linkedin">
              <Button text="LinkedIn" variant="secondary" href={{ internal: '/' }} />
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.footer__bottom}>
        <span className={styles['footer__bottom__text']}>gonzalo soler </span>
      </div>
    </footer>
  );
}

export default Footer;
