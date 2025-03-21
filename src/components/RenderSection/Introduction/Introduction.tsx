import { Section, SectionType } from '@/constants/sections';
import styles from './introduction.module.scss';
import { getId } from '@/components/utils/getHref';
import Image from 'next/image';
import Button, { ButtonProps } from '@/components/Button/Button';

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
  return (
    <section className={styles.introduction} id={getId(props.href)}>
      <h2 className={styles['introduction__text-wrapper']}>
        {props.description?.highlightText && (
          <span className={styles['introduction__text-wrapper__highlight']}>{props.description.highlightText}</span>
        )}{' '}
        {props.description?.text && (
          <span className={styles['introduction__text-wrapper__text']}>{props.description.text}</span>
        )}
      </h2>
      {props?.cta && <Button {...props.cta} />}

      {props?.image && (
        <div className={styles['introduction__image-wrapper']}>
          <Image alt="some" src={props.image.src} fill />
        </div>
      )}
    </section>
  );
}

export default Introduction;
