import type { StorytellingSection } from '@/types/sections';
import Heading from '@/components/atoms/Heading/Heading';
import Button from '@/components/atoms/Button/Button';
import { getId } from '@/lib/ui/getHref';
import styles from './storytelling.module.scss';

export default function Storytelling(props: StorytellingSection) {
  return (
    <section id={getId(props.href)} className={styles.storytelling} data-storytelling>
      <header className={styles.header}>
        <Heading className={styles.title}>{props.heading}</Heading>
        <p className={styles.text}>{props.introduction}</p>
      </header>
      <ul className={styles.stories}>
        {props.stories.map((story) => (
          <li key={story.id}>
            <details className={styles.story}>
              <summary className={styles.summary}>
                <span className={styles.project}>{story.projectName}</span>
                <h3 className={styles.heading}>{story.heading}</h3>
              </summary>
              <div className={styles.content}>
                <dl className={styles.narrative}>
                  <div>
                    <dt>Challenge</dt>
                    <dd>{story.challenge}</dd>
                  </div>
                  <div>
                    <dt>Ownership</dt>
                    <dd>{story.ownership}</dd>
                  </div>
                  <div>
                    <dt>Outcome</dt>
                    <dd>{story.outcome}</dd>
                  </div>
                </dl>
                {story.link && <Button {...story.link} variant="secondary" />}
              </div>
            </details>
          </li>
        ))}
      </ul>
      <footer className={styles.closing}>
        <Heading as="h3" className={styles.heading}>
          {props.ownershipClosingHeading}
        </Heading>
        <p className={styles.text}>{props.ownershipClosing}</p>
      </footer>
    </section>
  );
}
