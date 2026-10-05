import type {
  Section,
  IntroductionSection,
  ProjectsSection,
  AboutMeSection,
  TechnologiesSection,
  ExperienceSection,
  ContactSection,
} from '@/types/sections';
import { SECTIONS_COMPONENTS } from './sections_components';
import styles from './renderSection.module.scss';

/** Server composition boundary; interactive behavior belongs to individual children. */
export default function RenderSection(section: Section) {
  let content;
  switch (section.type) {
    case 'Introduction':
      content = <SECTIONS_COMPONENTS.Introduction {...(section as IntroductionSection)} />;
      break;
    case 'Projects':
      content = <SECTIONS_COMPONENTS.Projects {...(section as ProjectsSection)} />;
      break;
    case 'AboutMe':
      content = <SECTIONS_COMPONENTS.AboutMe {...(section as AboutMeSection)} />;
      break;
    case 'Technologies':
      content = <SECTIONS_COMPONENTS.Technologies {...(section as TechnologiesSection)} />;
      break;
    case 'Experience':
      content = <SECTIONS_COMPONENTS.Experience {...(section as ExperienceSection)} />;
      break;
    case 'Contact':
      content = <SECTIONS_COMPONENTS.Contact {...(section as ContactSection)} />;
      break;
    default:
      return null;
  }
  return <div className={styles.section}>{content}</div>;
}
