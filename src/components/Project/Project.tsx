'use client';

import { ProjectsSection } from '@/components/RenderSection/Projects/Projects';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import styles from './project.module.scss';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useHighlightWords } from '@/hooks/useHighlightWords';

const Technologies = dynamic(() => import('@/components/RenderSection/Technologies'));
const Button = dynamic(() => import('@/components/Button/Button'));

export default function Project({ project }: { project: ProjectsSection['projects'][0] }) {
  const [setHeaderRef, isHeaderVisible] = useIntersectionObserver();
  const [setOverviewRef, isOverviewVisible] = useIntersectionObserver();
  const [setStackRef, isStackVisible] = useIntersectionObserver();
  const [setGoalsRef, isGoalsVisible] = useIntersectionObserver();
  const [setGoalsDetailsRef, isGoalsDetailsVisible] = useIntersectionObserver();
  const [setLinksRef, isLinksVisible] = useIntersectionObserver();

  useHighlightWords(project?.highlightWords, styles.highlight);

  return (
    <div className={styles['project-page']}>
      <section
        ref={setHeaderRef}
        className={`${styles['project-page__header']} ${isHeaderVisible ? styles.visible : ''}`}
      >
        <h1>{project.title}</h1>
        <p className={styles['project-page__header__short-description']}>{project.shortDescription}</p>
        <div className={styles['project-page__header__image']}>
          <Image src={project.image.src} alt={project.image.alt} fill priority />
        </div>
      </section>
      <ul className={styles['project-page__tech_list']}>
        {project?.stack.map((tech) => (
          <li key={tech.displayName} className={styles['project-page__tech_list__item']}>
            <p>{tech.displayName}</p>
          </li>
        ))}
      </ul>
      <section
        ref={setOverviewRef}
        className={`${styles['project-page__overview']} ${isOverviewVisible ? styles.visible : ''}`}
      >
        <h2>📊 Project Overview:</h2>
        <p className={styles['project-page__overview__description']}>{project.description}</p>
      </section>
      <section ref={setStackRef} className={`${styles['project-page__stack']} ${isStackVisible ? styles.visible : ''}`}>
        <h2 className={styles['project-page__stack__title']}>🧰 Stack used in this project</h2>
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
      <section
        ref={setGoalsDetailsRef}
        className={`${styles['project-page__goalsDetails']} ${isGoalsDetailsVisible ? styles.visible : ''}`}
      >
        <h2>📊 This project involved several challenging tasks:</h2>
        <p className={styles['project-page__goalsDetails__description']}>{project.goalsDetail}</p>
      </section>

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
