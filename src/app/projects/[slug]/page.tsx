import { ProjectsSection } from '@/components/RenderSection/Projects/Projects';
import Technologies from '@/components/RenderSection/Technologies';
import { SECTIONS } from '@/constants/sections';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import styles from './projectPage.module.scss';
import Button from '@/components/Button/Button';

type ProjectProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: ProjectProps) {
  const { slug } = await params;

  const section = SECTIONS.find((s): s is ProjectsSection => s.type === 'Projects' && 'projects' in s);

  if (!section) return notFound();

  const project = section.projects.find((p) => p.slug === slug);

  if (!project) return notFound();

  return (
    <div className={styles['project-page']}>
      <section className={styles['project-page__header']}>
        <h1>{project.title}</h1>
        <p className={styles['project-page__header__short-description']}>{project.shortDescription}</p>
        <div className={styles['project-page__header__image']}>
          <Image src={project.image.src} alt={project.image.alt} fill />
        </div>
      </section>
      <section className={styles['project-page__overview']}>
        <h2>📊 Project Overview:</h2>
        <p className={styles['project-page__overview__description']}>{project.description}</p>
      </section>
      <section className={styles['project-page__stack']}>
        <h2 className={styles['project-page__stack__title']}>🧰 Stack used in this project 👇</h2>
        <Technologies stack={project.stack} type="Technologies" title={'Technologies'} />
      </section>
      {project?.goalsList && (
        <section className={styles['project-page__goals']}>
          <h2 className={styles['project-page__goals__title']}>🎯 Goals of this project</h2>
          <ul className={styles['project-page__goals__list']}>
            {project.goalsList.map((goal) => (
              <li key={goal} className={styles['project-page__goals__list__item']}>
                <p>{goal}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
      {project?.exampleLinks && (
        <section className={styles['project-page__example-links']}>
          <h2 className={styles['project-page__example-links__title']}>🔗 Check It Out 😉</h2>
          <ul className={styles['project-page__example-links__list']}>
            {project.exampleLinks.map((link) => (
              <li key={link.text} className={styles['project-page__example-links__list__item']}>
                <Button {...link} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
