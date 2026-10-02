import LegoBrick from '@/components/LegoBrick/LegoBrick';
import BrickStuds from '@/components/BrickStuds/BrickStuds';
import StackIcon from '@/constants/StackIcon/StackIcon';
import introductionStyles from '@/components/RenderSection/Introduction/introduction.module.scss';
import contactStyles from '@/components/RenderSection/Contact/contact.module.scss';
import aboutStyles from '@/components/RenderSection/AboutMe/aboutMe.module.scss';
import projectStyles from '@/components/RenderSection/Projects/projects.module.scss';
import technologyStyles from '@/components/RenderSection/Technologies/technologies.module.scss';
import styles from './page.module.scss';

export default function BrickExamples() {
  return (
    <section className={styles.examples}>
      <h1>Responsive bricks</h1>
      <p>The studs follow the width of each element. Resize the page to see the pattern adapt.</p>
      <div className={styles.row}>
        <LegoBrick as="button" type="button">
          OK
        </LegoBrick>
        <LegoBrick as="button" type="button">
          This is a considerably longer button
        </LegoBrick>
      </div>
      <LegoBrick as="div" className={styles.paragraph}>
        <p>
          This paragraph sets the size of its own brick. The studs stay the same height as the text wraps onto more
          lines.
        </p>
      </LegoBrick>
      <LegoBrick as="section" className={styles.fullWidth}>
        Full width container
      </LegoBrick>
      <div className={styles.row}>
        <LegoBrick as="button" type="button">
          Cancel
        </LegoBrick>
        <LegoBrick as="button" type="button" className={styles.grow}>
          A flex child that grows
        </LegoBrick>
      </div>
      <LegoBrick className={styles.responsive}>A responsive container that follows its parent width.</LegoBrick>
      <h2>Portfolio brick details</h2>
      <div className={styles.detailGrid}>
        <div className={styles.avatarSlot}>
          <div className={introductionStyles.introduction__avatar}>
            <BrickStuds className={introductionStyles.introduction__studs} />
            <span className={styles.previewLabel}>Introduction avatar</span>
          </div>
        </div>
        <p className={`${aboutStyles['about-me__description']} ${styles.aboutPreview}`}>
          <BrickStuds className={aboutStyles['about-me__studs']} />
          About Me card: the red top band and studs meet at the same edge.
        </p>
      </div>
      <section className={`${contactStyles.contact} ${styles.contactPreview}`}>
        <BrickStuds className={contactStyles.contact__studs} />
        <h2 className={contactStyles.contact__title}>Contact Me</h2>
      </section>
      <div className={`${projectStyles.card__content} ${styles.cardPreview}`}>
        <BrickStuds className={projectStyles.card__studs} />
        <div className={projectStyles.card__content__media}>
          <ul className={projectStyles.card__content__media__stack}>
            <li className={projectStyles.card__content__media__stack__chip}>
              <StackIcon stackIconName="reactjs" displayName="React" size="small" />
            </li>
            <li className={projectStyles.card__content__media__stack__chip}>
              <StackIcon stackIconName="typescript" displayName="TypeScript" size="small" />
            </li>
          </ul>
        </div>
      </div>
      <ul className={technologyStyles.technologies__list}>
        <li className={technologyStyles.technologies__list__item}>
          <StackIcon stackIconName="reactjs" displayName="React" size="small" />
        </li>
        <li className={technologyStyles.technologies__list__item}>
          <StackIcon stackIconName="typescript" displayName="TypeScript" size="small" />
        </li>
      </ul>
    </section>
  );
}
