'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ProjectsSection } from '@/components/RenderSection/Projects/Projects';
import Technologies from '@/components/RenderSection/Technologies';
import { SECTIONS } from '@/constants/sections';
import Image from 'next/image';
import styles from './project.module.scss';
import Button from '@/components/Button/Button';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function Project({ slug }: { slug: string }) {
  const router = useRouter();
  const [project, setProject] = useState<ProjectsSection['projects'][0] | null>(null);

  useEffect(() => {
    // Find the section and project
    const section = SECTIONS.find((s): s is ProjectsSection => s.type === 'Projects' && 'projects' in s);
    const foundProject = section?.projects.find((p) => p.slug === slug);

    if (!foundProject) {
      router.push('/404');
    } else {
      setProject(foundProject);
    }
  }, [slug, router]);

  const [setHeaderRef, isHeaderVisible] = useIntersectionObserver();
  const [setOverviewRef, isOverviewVisible] = useIntersectionObserver();
  const [setStackRef, isStackVisible] = useIntersectionObserver();
  const [setGoalsRef, isGoalsVisible] = useIntersectionObserver();
  const [setLinksRef, isLinksVisible] = useIntersectionObserver();

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles['project-page']}>
      <section
        ref={setHeaderRef}
        className={`${styles['project-page__header']} ${isHeaderVisible ? styles.visible : ''}`}
      >
        <h1>{project.title}</h1>
        <p className={styles['project-page__header__short-description']}>{project.shortDescription}</p>
        <div className={styles['project-page__header__image']}>
          <Image src={project.image.src} alt={project.image.alt} fill />
        </div>
      </section>
      <section
        ref={setOverviewRef}
        className={`${styles['project-page__overview']} ${isOverviewVisible ? styles.visible : ''}`}
      >
        <h2>📊 Project Overview:</h2>
        <p className={styles['project-page__overview__description']}>{project.description}</p>
      </section>
      <section ref={setStackRef} className={`${styles['project-page__stack']} ${isStackVisible ? styles.visible : ''}`}>
        <h2 className={styles['project-page__stack__title']}>🧰 Stack used in this project 👇</h2>
        <Technologies stack={project.stack} type="Technologies" title={'Technologies'} />
      </section>
      {project?.goalsList && (
        <section
          ref={setGoalsRef}
          className={`${styles['project-page__goals']} ${isGoalsVisible ? styles.visible : ''}`}
        >
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
        <section
          ref={setLinksRef}
          className={`${styles['project-page__example-links']} ${isLinksVisible ? styles.visible : ''}`}
        >
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
