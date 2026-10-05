import type { ExperienceSection } from '@/types/sections';
import fetchCsv from '../utils/fetchCsv';
import { contentUrls } from '@/config/content';
import type { CsvExperienceSectionRow, CsvExperienceItemRow } from '../types/csvTypes';
import getHrefGuard from '../utils/getHrefGuard';
import { toBoolean } from '../utils/toBoolean';
import { replaceEscapedNewlines } from '../utils/replaceEscapedNewlines';

export default async function parseExperienceSection(): Promise<ExperienceSection> {
  const expSectionRaw: CsvExperienceSectionRow[] = await fetchCsv(contentUrls.experienceSection);
  const expItemsRaw: CsvExperienceItemRow[] = await fetchCsv(contentUrls.experienceItems);

  if (!expSectionRaw.length) throw new Error('No ExperienceSection rows found.');

  const sectionRow = expSectionRaw[0];

  const experience = expItemsRaw.map((item) => ({
    company: item.company,
    position: item.position,
    duration: item.duration,
    description: replaceEscapedNewlines(item.description),
  }));

  const section: ExperienceSection = {
    type: 'Experience',
    title: sectionRow.title,
    href: getHrefGuard({ hrefType: sectionRow.hrefType, hrefValue: sectionRow.hrefValue }),
    isMain: toBoolean(sectionRow.isMain),
    isNav: toBoolean(sectionRow.isNav),
    isFooter: toBoolean(sectionRow.isFooter),
    buttonVariant: sectionRow.buttonVariant || undefined,
    experience,
  };

  return section;
}
