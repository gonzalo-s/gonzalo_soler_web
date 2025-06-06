import { ExperienceSection } from '@/components/RenderSection/Experience';
import fetchCsv from '../utils/fetchCsv';
import CSV_URLS from '../config/csvUrls';
import type { CsvExperienceSectionRow, CsvExperienceItemRow } from '../types/csvTypes';
import getHrefGuard from '../utils/getHrefGuard';
import { toBoolean } from '../utils/toBoolean';

export default async function parseExperienceSection(): Promise<ExperienceSection> {
  const expSectionRaw: CsvExperienceSectionRow[] = await fetchCsv(CSV_URLS.ExperienceSection);
  const expItemsRaw: CsvExperienceItemRow[] = await fetchCsv(CSV_URLS.ExperienceItems);

  if (!expSectionRaw.length) throw new Error('No ExperienceSection rows found.');

  const sectionRow = expSectionRaw[0];

  const experience = expItemsRaw.map((item) => ({
    company: item.company,
    position: item.position,
    duration: item.duration,
    description: item.description,
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
