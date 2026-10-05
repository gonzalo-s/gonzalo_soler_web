import type { Project as ProjectData } from '@/types/sections';
import Chip from '@/components/atoms/Chip/Chip';
import Heading from '@/components/atoms/Heading/Heading';
import HighlightedText from '@/components/atoms/HighlightedText/HighlightedText';
import Technologies from '@/components/organisms/Technologies/Technologies';
import Button from '@/components/atoms/Button/Button';
import Image from 'next/image';
import styles from './project.module.scss';
import { ICONS } from '@/constants/icons';

export default function ProjectDetails({ project }: { project: ProjectData }) {
  return (
    <div className={styles['project-page']}>
      <section className={styles['project-page__header']}>
        <Heading as="h1">
          <HighlightedText text={project.title} words={project.highlightWords} className={styles.highlight} />
        </Heading>
        <p className={styles['project-page__header__short-description']}>
          <HighlightedText
            text={project.shortDescription}
            words={project.highlightWords}
            className={styles.highlight}
          />
        </p>
        <div className={styles['project-page__header__image']}>
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={1200}
            height={750}
            sizes="(max-width: 1099px) 90vw, (max-width: 1600px) 80vw, 1120px"
            priority
          />
        </div>
      </section>
      <ul className={styles['project-page__tech_list']}>
        {project?.stack.map((tech) => (
          <Chip
            as="li"
            key={`${tech.stackIconName}-${tech.displayName}`}
            className={styles['project-page__tech_list__item']}
          >
            <p>{tech.displayName}</p>
          </Chip>
        ))}
      </ul>
      <section className={styles['project-page__overview']}>
        <Heading
          className={styles['project-page__heading']}
          iconClassName={styles['project-page__heading__icon']}
          icon={ICONS.overview}
        >
          Project Overview
        </Heading>
        <p className={styles['project-page__overview__description']}>
          <HighlightedText text={project.description} words={project.highlightWords} className={styles.highlight} />
        </p>
      </section>
      <section className={styles['project-page__stack']}>
        <Heading
          className={styles['project-page__heading']}
          iconClassName={styles['project-page__heading__icon']}
          icon={ICONS.stack}
        >
          Stack used in this project
        </Heading>
        <Technologies stack={project.stack} type="Technologies" title={'Technologies'} />
      </section>
      {project?.goalsList && (
        <section className={styles['project-page__goals']}>
          <Heading
            className={styles['project-page__heading']}
            iconClassName={styles['project-page__heading__icon']}
            icon={ICONS.target}
          >
            Goals of this project
          </Heading>
          <ul className={styles['project-page__goals__list']}>
            {project.goalsList.map((goal) => (
              <li key={goal} className={styles['project-page__goals__list__item']}>
                <p>
                  <HighlightedText text={goal} words={project.highlightWords} className={styles.highlight} />
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
      <section className={styles['project-page__goalsDetails']}>
        <Heading
          className={styles['project-page__heading']}
          iconClassName={styles['project-page__heading__icon']}
          icon={ICONS.overview}
        >
          This project involved several challenging tasks
        </Heading>
        <p className={styles['project-page__goalsDetails__description']}>
          <HighlightedText text={project.goalsDetail} words={project.highlightWords} className={styles.highlight} />
        </p>
      </section>

      {project?.exampleLinks && (
        <section className={styles['project-page__example-links']}>
          <Heading
            className={styles['project-page__heading']}
            iconClassName={styles['project-page__heading__icon']}
            icon={ICONS.link}
          >
            Check it out
          </Heading>
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
