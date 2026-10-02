import { getId } from '@/components/utils/getHref';
import { Section, SectionType } from '@/types/sections';
import styles from './aboutMe.module.scss';

export type AboutMeSection = Section & {
  type: Extract<SectionType, 'AboutMe'>;
  description: {
    highlightText?: string;
    text?: string;
  };
  header: {
    highlightText?: string;
    text?: string;
  };
  image?: {
    src: string;
    alt: string;
  };
};

function AboutMe(props: AboutMeSection) {
  return (
    <section className={styles['about-me']} id={getId(props.href)}>
      <h2 className={styles['about-me__text-wrapper']}>
        {props.header?.highlightText && (
          <span className={styles['about-me__text-wrapper__highlight']}>{props.header.highlightText}</span>
        )}
        <br />
        {props.header?.text && <span className={styles['about-me__text-wrapper__text']}>{props.header.text}</span>}
      </h2>
      <p className={styles['about-me__description']}>
        {props.description?.highlightText && (
          <span className={styles['about-me__description__highlight']}>{props.description.highlightText}</span>
        )}{' '}
        {props.description?.text && (
          <span className={styles['about-me__description__text']}>{props.description.text}</span>
        )}
      </p>
    </section>
  );
}

export default AboutMe;
