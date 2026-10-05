import Image from 'next/image';
import Link from 'next/link';
import Surface from '@/components/atoms/Surface/Surface';
import ChipList from '@/components/molecules/ChipList/ChipList';
import type { Project } from '@/types/sections';
import { getHref } from '@/lib/ui/getHref';
import { ICONS } from '@/constants/icons';
import styles from './projectCard.module.scss';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Surface as="article" className={styles.card}>
      <Link
        className={styles.card__content}
        href={getHref(project.cta.href)}
        aria-label={`View project: ${project.title}`}
      >
        <div className={styles.card__content__media}>
          <Image
            src={project.image.src}
            alt={project.image.alt}
            className={styles.card__content__media__image}
            fill
            sizes="(max-width: 760px) 90vw, (max-width: 1600px) 43vw, 650px"
          />
        </div>
        <ChipList
          items={project.stack}
          limit={6}
          className={styles.card__content__media__stack}
          itemClassName={styles.card__content__media__stack__chip}
        />
        <div className={styles.card__content__meta}>
          <div>
            <h3 className={styles.card__content__meta__title}>{project.title}</h3>
            {project.shortDescription && <p className={styles.card__content__meta__desc}>{project.shortDescription}</p>}
          </div>
          <span className={styles.card__content__meta__arrow} aria-hidden="true">
            {ICONS.arrowAltRight}
          </span>
        </div>
      </Link>
    </Surface>
  );
}
