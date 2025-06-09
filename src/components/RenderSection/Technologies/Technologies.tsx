'use client';

import { Section, SectionType } from '@/types/sections';
import styles from './technologies.module.scss';
import StackIcon, { StackIconProps } from '@/constants/StackIcon/StackIcon';
import useDragScroll from '@/hooks/useDragScroll';

export type TechnologiesSection = Section & {
  type: Extract<SectionType, 'Technologies'>;
  stack: Array<StackIconProps>;
};

function Technologies(props: TechnologiesSection) {
  const listRef = useDragScroll<HTMLUListElement>();

  return (
    <section className={styles.technologies}>
      <ul ref={listRef} className={styles.technologies__list}>
        {props.stack.map((stackIcon) => {
          return (
            <li key={stackIcon.stackIconName} className={styles.technologies__list__item}>
              <StackIcon {...stackIcon} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Technologies;
