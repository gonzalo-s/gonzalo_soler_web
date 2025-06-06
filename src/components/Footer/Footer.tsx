'use client';

import { Sections } from '@/constants/sections';
import Button, { ButtonProps } from '../Button/Button';
import styles from './footer.module.scss';
import clsx from 'clsx';
import useSetEmail from '@/hooks/useSetEmail';

export type FooterProps = {
  linkList: Sections;
  details: {
    logo: ButtonProps;
    description: string;
    email: Array<string>;
  };
};

function Footer(props: FooterProps) {
  console.log('🚀 ~ Footer ~ props:', props);
  useSetEmail(props.details.email, 'footer-email');

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__top}>
        <div className={styles.footer__top__details}>
          <Button text={props.details.logo.text} variant={props.details.logo.variant} href={props.details.logo.href} />
          <p className={styles.footer__top__details__description}>{props.details.description}</p>
          <a className={clsx(styles.footer__top__details__email, 'footer-email')} href="#"></a>
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
