import type { Sections } from '@/types/sections';
import parseIntroductionSection from './parsers/parseIntroducttionSection';
import parseProjectsSection from './parsers/parseProjectsSection';
import parseAboutMeSection from './parsers/parseAboutMeSection';
import parseTechnologiesSection from './parsers/parseTechnologiesSection';
import parseExperienceSection from './parsers/parseExperienceSection';
import parseContactSection from './parsers/parseContactSection';
import parseStorytellingSection from './parsers/parseStorytellingSection';
import parseSocialSection from './parsers/parseSocialSection';

export async function loadAllSections(): Promise<Sections> {
  const [intro, projects, aboutMe, tech, experience, storytelling, contact, social] = await Promise.all([
    parseIntroductionSection(),
    parseProjectsSection(),
    parseAboutMeSection(),
    parseTechnologiesSection(),
    parseExperienceSection(),
    parseStorytellingSection(),
    parseContactSection(),
    parseSocialSection(),
  ]);

  return [intro, storytelling, projects, aboutMe, tech, experience, contact, social];
}
