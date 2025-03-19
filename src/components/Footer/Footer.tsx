import { Sections } from '@/constants/sections';
import Button from '../Button/Button';
import styles from './footer.module.scss';

type FooterProps = {
  listLinks: Sections;
};

function Footer(props: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__top}>
        <div className={styles.footer__top__details}>
          <Button text="Gonzalo Soler" variant="primary" href={{ internal: '/' }} />
          SOME TEXT HERE
        </div>
        <nav>
          <ul className={styles.footer__top__list}>
            {props.listLinks.map((listLink) => {
              return (
                <li key={listLink.title}>
                  <Button text={listLink.title} variant="secondary" icon={listLink.icon} href={listLink.href} />
                </li>
              );
            })}
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
