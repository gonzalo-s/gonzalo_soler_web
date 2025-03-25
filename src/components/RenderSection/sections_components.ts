import { Section } from '@/constants/sections';
import { JSX } from 'react';
import Projects, { ProjectsSection } from './Projects';
import Introduction, { IntroductionSection } from './Introduction';
import AboutMe, { AboutMeSection } from './AboutMe';

type SectionComponents = {
  Introduction?: (section: IntroductionSection) => JSX.Element;
  Projects?: (section: ProjectsSection) => JSX.Element;
  AboutMe?: (section: AboutMeSection) => JSX.Element;
  Contact?: (section: Section) => JSX.Element;
  Social?: (section: Section) => JSX.Element;
};

export const SECTIONS_COMPONENTS: SectionComponents = {
  Introduction,
  Projects,
  AboutMe,
};
