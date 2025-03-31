import { ProjectsSection } from '@/components/RenderSection/Projects/Projects';
import Technologies from '@/components/RenderSection/Technologies';
import { SECTIONS } from '@/constants/sections';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import styles from './projectPage.module.scss';

type ProjectProps = {
  params: Promise<{ slug: string }>;
};

export default async function Project({ params }: ProjectProps) {
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
    </div>
  );
}
