import { Section, SectionType } from '@/constants/sections';
import styles from './technologies.module.scss';
import StackIcon, { StackIconProps } from '@/constants/StackIcon/StackIcon';

export type TechnologiesSection = Section & {
  type: Extract<SectionType, 'Technologies'>;
  stack: Array<StackIconProps>;
};

function Technologies(props: TechnologiesSection) {
  console.log('🚀 ~ Technologies ~ props:', props);
  return (
    <section className={styles.technologies}>
      <ul className={styles.technologies__list}>
        {[...props.stack, ...props.stack].map((stackIcon) => {
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
