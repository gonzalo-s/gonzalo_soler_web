import type { ExperienceSection } from '@/types/sections';
export type { ExperienceSection } from '@/types/sections';
import styles from './experience.module.scss';
import Heading from '@/components/atoms/Heading/Heading';
import { getId } from '@/lib/ui/getHref';
import { ICONS } from '@/constants/icons';

function Experience(props: ExperienceSection) {
  return (
    <section id={getId(props.href)} className={styles.experience}>
      <Heading
        className={styles.experience__title}
        icon={ICONS.briefcase}
        iconClassName={styles.experience__title__icon}
      >
        {props.title}
      </Heading>
      <ol className={styles.experience__list}>
        {props.experience.map((exp, index) => (
          <li key={exp.company + index} className={styles.experience__list__item}>
            <div className={styles.experience__list__item__left}>
              <h3 className={styles.experience__list__item__company}>{exp.company}</h3>
              <p className={styles.experience__list__item__position}>{exp.position}</p>
              <p className={styles.experience__list__item__duration}>{exp.duration}</p>
            </div>
            <p className={styles.experience__list__item__right}>{exp.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Experience;
