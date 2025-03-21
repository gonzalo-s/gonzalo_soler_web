import { Section } from '@/constants/sections';
import { SECTIONS_COMPONENTS } from './sections_components';
import { IntroductionSection } from './Introduction/Introduction';
import { JSX } from 'react';
import { ProjectsSection } from './Projects/Projects';

function RenderSection(section: Section) {
  return SectionToRender(section);
}

export default RenderSection;

function SectionToRender(section: Section): JSX.Element | null {
  switch (section.type) {
    case 'Introduction': {
      const TypedComponent = SECTIONS_COMPONENTS['Introduction'];
      return TypedComponent ? <TypedComponent {...(section as IntroductionSection)} /> : null;
    }
    case 'Projects': {
      const TypedComponent = SECTIONS_COMPONENTS['Projects'];
      return TypedComponent ? <TypedComponent {...(section as ProjectsSection)} /> : null;
    }
    default:
      return null;
  }
}
