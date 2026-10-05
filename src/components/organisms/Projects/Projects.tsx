import type { ProjectsSection } from '@/types/sections';
export type { Project, ProjectsSection } from '@/types/sections';
import { getId } from '@/lib/ui/getHref';
import ProjectCard from '@/components/molecules/ProjectCard/ProjectCard';
import Heading from '@/components/atoms/Heading/Heading';
import styles from './projects.module.scss';

export default function Projects(props: ProjectsSection) {
  return (
    <section id={getId(props.href)} className={styles['projects-wrapper']}>
      <header className={styles['projects-wrapper__header']}>
        <Heading className={styles['projects-wrapper__header__title']}>{props.description}</Heading>
      </header>
      <ul className={styles['projects-wrapper__cards']}>
        {props.projects.map((project) => (
          <li key={project.slug} className={styles['projects-wrapper__item']}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
