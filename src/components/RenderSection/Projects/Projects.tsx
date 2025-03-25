import { ButtonProps } from '@/components/Button/Button';
import { getHref, getId } from '@/components/utils/getHref';
import { Section } from '@/constants/sections';
import Image from 'next/image';
import styles from './projects.module.scss';
import Link from 'next/link';
import StackIcon, { StackIconProps } from '@/constants/StackIcon/StackIcon';

export type Project = {
  title: string;
  description: string;
  stack: Array<StackIconProps>;
  shortDescription: string;
  slug: string;
  image: {
    src: string;
    alt: string;
  };
  cta: ButtonProps;
};

export type ProjectsSection = Section & {
  type: 'Projects';
  title: string;
  description: string;
  projects: Array<Project>;
};

function Projects(props: ProjectsSection) {
  return (
    <section id={getId(props.href)} className={styles['projects-wrapper']}>
      <h2 className={styles['projects-wrapper__title']}>{props.description}</h2>
      <ul className={styles['projects-wrapper__cards']}>
        {props.projects.map((project) => (
          <Card {...project} key={project.title} />
        ))}
      </ul>
    </section>
  );
}

export default Projects;

function Card(props: ProjectsSection['projects'][0]) {
  console.log('🚀 ~ Card ~ props:', props);
  return (
    <li className={styles.card}>
      <Link className={styles.card__content} href={getHref(props.cta?.href)}>
        <ul className={styles.card__content__stack}>
          {props.stack.map((stackIcon) => {
            return (
              <li key={stackIcon.stackIconName}>
                <StackIcon {...stackIcon} />
              </li>
            );
          })}
        </ul>
        <div className={styles.card__content__overlay}></div>
        <Image src={props.image.src} alt={props.image.alt} className={styles.card__content__image} layout="fill" />
      </Link>
      <h3 className={styles.card__title}>{props.title}</h3>
    </li>
  );
}
