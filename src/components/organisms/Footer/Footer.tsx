import type { FooterProps } from '@/types/sections';
export type { FooterProps } from '@/types/sections';

import Button from '@/components/atoms/Button/Button';
import styles from './footer.module.scss';
import clsx from 'clsx';
import EmailLink from '@/components/atoms/EmailLink/EmailLink';

function Footer(props: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__top}>
        <div className={styles.footer__top__details}>
          <Button text={props.details.logo.text} variant={props.details.logo.variant} href={props.details.logo.href} />
          <p className={styles.footer__top__details__description}>{props.details.description}</p>
          <EmailLink email={props.details.email} className={styles.footer__top__details__email} />
        </div>
        <nav aria-label="Footer navigation">
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
        <span data-fluid-footer data-fluid-gradient className={styles['footer__bottom__border-gradient__text']}>
          gonzalo soler
        </span>
      </div>
    </footer>
  );
}

export default Footer;
