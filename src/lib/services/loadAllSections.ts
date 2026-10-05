import type { Sections } from '@/types/sections';
import parseIntroductionSection from './parsers/parseIntroducttionSection';
import parseProjectsSection from './parsers/parseProjectsSection';
import parseAboutMeSection from './parsers/parseAboutMeSection';
import parseTechnologiesSection from './parsers/parseTechnologiesSection';
import parseExperienceSection from './parsers/parseExperienceSection';
import parseContactSection from './parsers/parseContactSection';
import parseSocialSection from './parsers/parseSocialSection';

export async function loadAllSections(): Promise<Sections> {
  const [intro, projects, aboutMe, tech, experience, contact, social] = await Promise.all([
    parseIntroductionSection(),
    parseProjectsSection(),
    parseAboutMeSection(),
    parseTechnologiesSection(),
    parseExperienceSection(),
    parseContactSection(),
    parseSocialSection(),
  ]);

  return [intro, projects, aboutMe, tech, experience, contact, social];
}
