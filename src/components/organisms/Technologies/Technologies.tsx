import type { TechnologiesSection } from '@/types/sections';
export type { TechnologiesSection } from '@/types/sections';
import { getId } from '@/lib/ui/getHref';
import ChipList from '@/components/molecules/ChipList/ChipList';
import styles from './technologies.module.scss';

export default function Technologies(props: TechnologiesSection) {
  return (
    <section id={getId(props.href)} className={styles.technologies} aria-label={props.title}>
      <ChipList
        items={props.stack}
        scrollable
        autoScroll
        label={props.title}
        className={styles.technologies__list}
        itemClassName={styles.technologies__list__item}
      />
    </section>
  );
}
