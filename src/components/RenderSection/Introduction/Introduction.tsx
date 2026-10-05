'use client';

import BrickAnimation from '@/components/BrickAnimation/BrickAnimation';
import { Section, SectionType } from '@/types/sections';
import styles from './introduction.module.scss';
import { getId } from '@/components/utils/getHref';
import Button, { ButtonProps } from '@/components/Button/Button';

export type IntroductionSection = Section & {
  type: Extract<SectionType, 'Introduction'>;
  description: { highlightText?: string; text?: string };
  cta: ButtonProps;
  image?: { src: string; alt: string };
};

function Introduction(props: IntroductionSection) {
  return (
    <section data-brick-hero className={styles.introduction} id={getId(props.href)}>
      <div className={styles.introduction__content}>
        <span className={styles.introduction__rule} aria-hidden="true" />
        <h1 className={styles.introduction__textWrapper}>
          {props.description?.highlightText && <span>{props.description.highlightText}</span>}
          {props.description?.text && (
            <span className={styles.introduction__description}>{props.description.text}</span>
          )}
        </h1>
        <div className={styles.introduction__bottom}>{props.cta && <Button {...props.cta} />}</div>
      </div>
      <BrickAnimation />
    </section>
  );
}

export default Introduction;
