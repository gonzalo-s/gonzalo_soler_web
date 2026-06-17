'use client';

import { Section, SectionType } from '@/types/sections';
import styles from './contact.module.scss';
import clsx from 'clsx';
import { getId, isExternal } from '@/components/utils/getHref';
import useSetEmail from '@/hooks/useSetEmail';
import Button, { ButtonProps } from '@/components/Button/Button';
import { toDriveDownloadUrl } from '@/components/utils/driveDownloadUrl';

/** Turn the resume CTA into an in-place download (direct Drive link, same tab). */
function toResumeDownload(resume: ButtonProps): ButtonProps {
  if (!resume.href || !isExternal(resume.href)) return resume;
  return {
    ...resume,
    download: true,
    href: { external: toDriveDownloadUrl(resume.href.external) },
  };
}

export type ContactSection = Section & {
  type: Extract<SectionType, 'Contact'>;
  sectionTitle: string;
  email: Array<string>;
  cta: ButtonProps;
  resume?: ButtonProps;
  description?: string;
};

export default function Contact(props: ContactSection) {
  useSetEmail(props.email, 'contact-email');

  return (
    <section className={styles.contact} id={getId(props.href)}>
      <h2 className={styles.contact__title}>{props.sectionTitle}</h2>
      {props?.description && <p>{props.description}</p>}
      <div className={styles.contact__wrapper}>
        <a className={clsx('contact-email', styles.contact__wrapper__email)} href="#"></a>
        <div className={styles.contact__wrapper__cta}>
          <Button {...props.cta} />
          {props.resume && <Button {...toResumeDownload(props.resume)} />}
        </div>
      </div>
    </section>
  );
}
