import type { AboutMeSection } from '@/types/sections';
export type { AboutMeSection } from '@/types/sections';
import Heading from '@/components/atoms/Heading/Heading';
import { getId } from '@/lib/ui/getHref';
import styles from './aboutMe.module.scss';

function AboutMe(props: AboutMeSection) {
  return (
    <section className={styles['about-me']} id={getId(props.href)}>
      <Heading className={styles['about-me__text-wrapper']}>
        {props.header?.highlightText && (
          <span className={styles['about-me__text-wrapper__highlight']}>{props.header.highlightText}</span>
        )}
        <br />
        {props.header?.text && <span className={styles['about-me__text-wrapper__text']}>{props.header.text}</span>}
      </Heading>
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
