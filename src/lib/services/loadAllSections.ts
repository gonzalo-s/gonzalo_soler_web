import { Section } from '@/constants/sections';
import parseIntroductionSection from './parsers/parseIntroducttionSection';
import { AboutMeSection } from '@/components/RenderSection/AboutMe';
import { ContactSection } from '@/components/RenderSection/Contact';
import { ExperienceSection } from '@/components/RenderSection/Experience';
import { IntroductionSection } from '@/components/RenderSection/Introduction';
import { ProjectsSection } from '@/components/RenderSection/Projects';
import { TechnologiesSection } from '@/components/RenderSection/Technologies';
import parseProjectsSection from './parsers/parseProjectsSection';
import parseAboutMeSection from './parsers/parseAboutMeSection';
import parseTechnologiesSection from './parsers/parseTechnologiesSection';
import parseExperienceSection from './parsers/parseExperienceSection';
import parseContactSection from './parsers/parseContactSection';

export async function loadAllSections(): Promise<
  (
    | Section
    | IntroductionSection
    | ProjectsSection
    | AboutMeSection
    | TechnologiesSection
    | ExperienceSection
    | ContactSection
  )[]
> {
  const [intro, projects, aboutMe, tech, experience, contact] = await Promise.all([
    parseIntroductionSection(),
    parseProjectsSection(),
    parseAboutMeSection(),
    parseTechnologiesSection(),
    parseExperienceSection(),
    parseContactSection(),
  ]);

  return [intro, projects, aboutMe, tech, experience, contact];
}
