import { Section } from '@/constants/sections';
import Introduction from './Introduction';
import Projects from './Projects';
import { JSX } from 'react';
import { IntroductionSection } from './Introduction/Introduction';
import { ProjectsSection } from './Projects/Projects';

type SectionComponents = {
  Introduction?: (section: IntroductionSection) => JSX.Element;
  Projects?: (section: ProjectsSection) => JSX.Element;
  AboutMe?: (section: Section) => JSX.Element;
  Contact?: (section: Section) => JSX.Element;
  Social?: (section: Section) => JSX.Element;
};

export const SECTIONS_COMPONENTS: SectionComponents = {
  Introduction,
  Projects,
};
