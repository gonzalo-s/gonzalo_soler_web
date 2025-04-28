'use client';

import { Section, SectionType } from '@/constants/sections';
import styles from './contact.module.scss';
import clsx from 'clsx';
import { getId } from '@/components/utils/getHref';
import useSetEmail from '@/hooks/useSetEmail';
import Button, { ButtonProps } from '@/components/Button/Button';

export type ContactSection = Section & {
  type: Extract<SectionType, 'Contact'>;
  email: Array<string>;
  cta: ButtonProps;
  description?: string;
};

export default function Contact(props: ContactSection) {
  useSetEmail(props.email, 'contact-email');

  return (
    <section className={styles.contact} id={getId(props.href)}>
      <h2>{props.title}</h2>
      {props?.description && <p>{props.description}</p>}
      <div className={styles.contact__wrapper}>
        <a className={clsx('contact-email', styles.contact__wrapper__email)} href="#"></a>
        <div className={styles.contact__wrapper__cta}>
          <Button {...props.cta} />
        </div>
      </div>
    </section>
  );
}
