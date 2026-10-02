import { Section, SectionType } from '@/types/sections';
import styles from './experience.module.scss';
import { ICONS } from '@/constants/icons';

export type ExperienceSection = Section & {
  type: Extract<SectionType, 'Experience'>;
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
};

function Experience(props: ExperienceSection) {
  return (
    <section className={styles.experience}>
      <h2 className={styles.experience__title}>
        <span className={styles.experience__title__icon} aria-hidden="true">
          {ICONS.briefcase}
        </span>
        {props.title}
      </h2>
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
