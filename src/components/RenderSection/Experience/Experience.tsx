import { Section, SectionType } from '@/types/sections';
import styles from './experience.module.scss';

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
      <h2 className={styles.experience__title}>💼 {props.title}</h2>
      <ul className={styles.experience__list}>
        {props.experience.map((exp, index) => (
          <li key={exp.company + index} className={styles.experience__list__item}>
            <div className={styles.experience__list__item__left}>
              <h3>{exp.company}</h3>
              <p>{exp.position}</p>
              <p>{exp.duration}</p>
            </div>
            <p className={styles.experience__list__item__right}>{exp.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Experience;
