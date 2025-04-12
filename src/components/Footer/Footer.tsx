'use client';

import { Sections } from '@/constants/sections';
import Button, { ButtonProps } from '../Button/Button';
import styles from './footer.module.scss';
import clsx from 'clsx';
import { useEffect } from 'react';

export type FooterProps = {
  linkList: Sections;
  details: {
    logo: ButtonProps;
    description: string;
    email: Array<string>;
  };
};

function Footer(props: FooterProps) {
  useEffect(() => {
    let emailSet = false;

    const setEmail = () => {
      if (emailSet) return;
      emailSet = true;

      const emailElement = document.getElementById('email-link');
      if (emailElement) {
        const email = props.details.email.join('@');
        emailElement.setAttribute('href', `mailto:${email}`);
        emailElement.textContent = email;
      }

      // Clean up event listeners after execution
      window.removeEventListener('scroll', setEmail);
      window.removeEventListener('mousemove', setEmail);
    };

    // Set a timeout for 2 seconds
    const timeoutId = setTimeout(setEmail, 2000);

    // Add event listeners for scroll and mousemove
    window.addEventListener('scroll', setEmail);
    window.addEventListener('mousemove', setEmail);

    // Cleanup function to remove listeners and timeout
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', setEmail);
      window.removeEventListener('mousemove', setEmail);
    };
  }, [props.details.email]);

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__top}>
        <div className={styles.footer__top__details}>
          <Button text="Gonzalo Soler" variant="primary" href={{ internal: '/' }} />
          <p className={styles.footer__top__details__description}>{props.details.description}</p>
          <a id="email-link" className={styles.footer__top__details__email} href="#"></a>
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
