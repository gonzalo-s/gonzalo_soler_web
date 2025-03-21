// display projects section, title, description, and projects images preview

import { ButtonProps } from '@/components/Button/Button';
import { getHref, getId } from '@/components/utils/getHref';
import { Section } from '@/constants/sections';
import Image from 'next/image';
import styles from './projects.module.scss';
import Link from 'next/link';

export type Project = {
  title: string;
  description: string;
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
      <h2 className={styles['projects-wrapper__title']}>{props.title}</h2>
      <p className={styles['projects-wrapper__description']}>{props.description}</p>
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
  return (
    <li className={styles.card}>
      <Link className={styles.card__content} href={getHref(props.cta?.href)}>
        <div className={styles.card__content__overlay}></div>
        <p className={styles.card__content__description}>{props.description}</p>
        <Image src={props.image.src} alt={props.image.alt} className={styles.card__content__image} layout="fill" />
      </Link>
      <h3 className={styles.card__title}>{props.title}</h3>
    </li>
  );
}
