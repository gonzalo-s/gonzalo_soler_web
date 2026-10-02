'use client';

import { Section, SectionType } from '@/types/sections';
import styles from './introduction.module.scss';
import { getId } from '@/components/utils/getHref';
import Image from 'next/image';
import Button, { ButtonProps } from '@/components/Button/Button';

export type IntroductionSection = Section & {
  type: Extract<SectionType, 'Introduction'>;
  description: { highlightText?: string; text?: string };
  cta: ButtonProps;
  image?: { src: string; alt: string };
};

function Introduction(props: IntroductionSection) {
  return (
    <section className={styles.introduction} id={getId(props.href)}>
      <div className={styles.introduction__art} aria-hidden="true">
        <Image src="/images/two-bricks-hero.webp" alt="" fill priority sizes="(max-width: 760px) 100vw, 65vw" />
      </div>
      <div className={styles.introduction__content}>
        <span className={styles.introduction__rule} aria-hidden="true" />
        <h1 className={styles.introduction__textWrapper}>
          {props.description?.highlightText && <span>{props.description.highlightText}</span>}
          {props.description?.text && (
            <span className={styles.introduction__description}>{props.description.text}</span>
          )}
        </h1>
        <div className={styles.introduction__bottom}>
          {props.cta && <Button {...props.cta} />}
          {props.image && (
            <div className={styles.introduction__portrait}>
              <Image src={props.image.src} alt={props.image.alt || ''} fill sizes="72px" />
            </div>
          )}
        </div>
      </div>
      <span className={styles.introduction__index} aria-hidden="true">
        01 / 05
      </span>
    </section>
  );
}

export default Introduction;
