import { Section } from '@/types/sections';
import { JSX } from 'react';
import Projects, { ProjectsSection } from './Projects';
import Introduction, { IntroductionSection } from './Introduction';
import AboutMe, { AboutMeSection } from './AboutMe';
import Technologies, { TechnologiesSection } from './Technologies';
import Experience, { ExperienceSection } from './Experience';
import Contact, { ContactSection } from './Contact';

type SectionComponents = {
  Introduction?: (section: IntroductionSection) => JSX.Element;
  Projects?: (section: ProjectsSection) => JSX.Element;
  AboutMe?: (section: AboutMeSection) => JSX.Element;
  Contact?: (section: ContactSection) => JSX.Element;
  Social?: (section: Section) => JSX.Element;
  Technologies?: (section: TechnologiesSection) => JSX.Element;
  Experience?: (section: ExperienceSection) => JSX.Element;
};

export const SECTIONS_COMPONENTS: SectionComponents = {
  Introduction,
  Projects,
  AboutMe,
  Technologies,
  Experience,
  Contact,
};
