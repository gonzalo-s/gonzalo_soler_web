import { Sections } from '@/constants/sections';
import Button, { ButtonProps } from '../Button/Button';
import styles from './footer.module.scss';
import clsx from 'clsx';

export type FooterProps = {
  linkList: Sections;
  details: {
    logo: ButtonProps;
    description: string;
    email: string;
  };
};

function Footer(props: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__top}>
        <div className={styles.footer__top__details}>
          <Button text="Gonzalo Soler" variant="primary" href={{ internal: '/' }} />
          <p className={styles.footer__top__details__description}>{props.details.description}</p>
          <Button text={props.details.email} variant="secondary" href={{ external: `mailto:${props.details.email}` }} />
        </div>
        <nav>
          <ul className={styles.footer__top__list}>
            {props.linkList.map((listLink) => {
              return (
                <li key={listLink.title}>
                  <Button text={listLink.title} variant="secondary" icon={listLink.icon} href={listLink.href} />
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className={clsx(styles.footer__bottom, styles['footer__bottom__border-gradient'])}>
        <span className={styles['footer__bottom__border-gradient__text']}>gonzalo soler</span>
      </div>
    </footer>
  );
}

export default Footer;
