'use client';

import { ButtonProps } from '@/components/Button/Button';
import { getHref, getId } from '@/components/utils/getHref';
import { Section } from '@/types/sections';
import Image from 'next/image';
import styles from './projects.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import StackIcon, { StackIconProps } from '@/constants/StackIcon/StackIcon';
import { ICONS } from '@/constants/icons';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useTilt } from '@/hooks/useTilt';
import type { CSSProperties } from 'react';

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
  goalsDetail: string;
  goalsList?: Array<string>;
  exampleLinks?: Array<ButtonProps>;
  highlightWords?: Array<string>;
};

export type ProjectsSection = Section & {
  type: 'Projects';
  title: string;
  description: string;
  projects: Array<Project>;
};

function Projects(props: ProjectsSection) {
  const [setCardsRef, cardsVisible] = useIntersectionObserver();

  return (
    <section id={getId(props.href)} className={styles['projects-wrapper']}>
      <header className={styles['projects-wrapper__header']}>
        <h2 className={styles['projects-wrapper__header__title']}>{props.description}</h2>
      </header>
      <ul ref={setCardsRef} className={styles['projects-wrapper__cards']}>
        {props.projects.map((project, index) => (
          <Card {...project} index={index} visible={cardsVisible} key={project.title} />
        ))}
      </ul>
    </section>
  );
}

export default Projects;

function Card(props: ProjectsSection['projects'][0] & { index: number; visible: boolean }) {
  const tiltRef = useTilt<HTMLAnchorElement>();

  return (
    <li
      className={clsx(styles.card, props.visible && styles['card--visible'])}
      style={{ '--i': props.index } as CSSProperties}
    >
      <Link
        ref={tiltRef}
        className={styles.card__content}
        href={getHref(props.cta?.href)}
        aria-label={`View project: ${props.title}`}
      >
        <div className={styles.card__content__media}>
          <Image src={props.image.src} alt={props.image.alt} className={styles.card__content__media__image} fill />
          <span className={styles.card__content__media__scrim} aria-hidden="true" />
          <ul className={styles.card__content__media__stack}>
            {props.stack.slice(0, 6).map((stackIcon) => (
              <li key={stackIcon.stackIconName} className={styles.card__content__media__stack__chip}>
                <StackIcon {...stackIcon} />
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.card__content__meta}>
          <div>
            <h3 className={styles.card__content__meta__title}>{props.title}</h3>
            {props.shortDescription && <p className={styles.card__content__meta__desc}>{props.shortDescription}</p>}
          </div>
          <span className={styles.card__content__meta__arrow} aria-hidden="true">
            {ICONS.arrowAltRight}
          </span>
        </div>
      </Link>
    </li>
  );
}
