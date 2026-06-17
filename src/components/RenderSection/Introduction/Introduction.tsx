'use client';

import { Section, SectionType } from '@/types/sections';
import styles from './introduction.module.scss';
import { getId } from '@/components/utils/getHref';
import Image from 'next/image';
import Button, { ButtonProps } from '@/components/Button/Button';
import { useParallax } from '@/hooks/useParallax';

export type IntroductionSection = Section & {
  type: Extract<SectionType, 'Introduction'>;
  description: {
    highlightText?: string;
    text?: string;
  };
  cta: ButtonProps;
  image?: {
    src: string;
    alt: string;
  };
};

function Introduction(props: IntroductionSection) {
  // Top-anchored parallax: image starts in place (above the text) and only
  // drifts downward — slipping a bit behind the text — as you scroll.
  const avatarRef = useParallax<HTMLDivElement>(0.2, 'top');

  return (
    <section className={styles.introduction} id={getId(props.href)}>
      {props.image && (
        <div ref={avatarRef} className={styles.introduction__avatar}>
          <Image alt={props.image.alt || ''} src={props.image.src} fill priority />
        </div>
      )}

      <h1 className={styles['introduction__text-wrapper']}>
        {props.description?.highlightText && (
          <span className={styles['introduction__text-wrapper__highlight']}>{props.description.highlightText}</span>
        )}
        {props.description?.text && (
          <span className={styles['introduction__text-wrapper__text']}>{props.description.text}</span>
        )}
      </h1>

      {props?.cta && (
        <div className={styles.introduction__cta}>
          <Button {...props.cta} />
        </div>
      )}
    </section>
  );
}

export default Introduction;
