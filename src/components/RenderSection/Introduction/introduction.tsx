import { Section, SectionType } from '@/constants/sections';
import styles from './introduction.module.scss';
import { getHref } from '@/components/utils/getHref';
import Image from 'next/image';

export type IntroductionSection = Section & {
  type: Extract<SectionType, 'Introduction'>;
  description: {
    highlightText?: string;
    text?: string;
  };
  image?: {
    src: string;
    alt: string;
  };
};

function Introduction(props: IntroductionSection) {
  return (
    <section className={styles.introduction} id={getHref(props.href)}>
      <h2>Welcome to the Introduction Section</h2>
      <p>This is the introduction content.</p>
      {props?.image && <Image alt="some" src={props.image.src} width={100} height={100} />}
    </section>
  );
}

export default Introduction;
