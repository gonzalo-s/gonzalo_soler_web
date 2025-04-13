'use client';

import { Section } from '@/constants/sections';
import { SECTIONS_COMPONENTS } from './sections_components';
import { JSX } from 'react';
import { AboutMeSection } from './AboutMe';
import { ExperienceSection } from './Experience';
import { IntroductionSection } from './Introduction';
import { ProjectsSection } from './Projects';
import { TechnologiesSection } from './Technologies';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

import styles from './renderSection.module.scss';

function RenderSection(section: Section) {
  return SectionToRender(section);
}

export default RenderSection;

function SectionToRender(section: Section): JSX.Element | null {
  const [setRef, isVisible] = useIntersectionObserver();

  const sectionClassName = isVisible ? `${styles.section} ${styles['section--visible']}` : styles.section;

  switch (section.type) {
    case 'Introduction': {
      const TypedComponent = SECTIONS_COMPONENTS['Introduction'];
      return TypedComponent ? (
        <div ref={setRef} className={sectionClassName}>
          <TypedComponent {...(section as IntroductionSection)} />
        </div>
      ) : null;
    }
    case 'Projects': {
      const TypedComponent = SECTIONS_COMPONENTS['Projects'];
      return TypedComponent ? (
        <div ref={setRef} className={sectionClassName}>
          <TypedComponent {...(section as ProjectsSection)} />
        </div>
      ) : null;
    }
    case 'AboutMe': {
      const TypedComponent = SECTIONS_COMPONENTS['AboutMe'];
      return TypedComponent ? (
        <div ref={setRef} className={sectionClassName}>
          <TypedComponent {...(section as AboutMeSection)} />
        </div>
      ) : null;
    }
    case 'Technologies': {
      const TypedComponent = SECTIONS_COMPONENTS['Technologies'];
      return TypedComponent ? (
        <div ref={setRef} className={sectionClassName}>
          <TypedComponent {...(section as TechnologiesSection)} />
        </div>
      ) : null;
    }
    case 'Experience': {
      const TypedComponent = SECTIONS_COMPONENTS['Experience'];
      return TypedComponent ? (
        <div ref={setRef} className={sectionClassName}>
          <TypedComponent {...(section as ExperienceSection)} />
        </div>
      ) : null;
    }
    default:
      return null;
  }
}
