import type { TechnologiesSection } from '@/types/sections';
import fetchCsv from '../utils/fetchCsv';
import { contentUrls } from '@/config/content';
import type { CsvTechnologiesSectionRow, CsvStackIconRow } from '../types/csvTypes';
import getHrefGuard from '../utils/getHrefGuard';
import { toBoolean } from '../utils/toBoolean';
import type { StackIconProps } from '@/types/technology';

export default async function parseTechnologiesSection(): Promise<TechnologiesSection> {
  const techSectionRaw: CsvTechnologiesSectionRow[] = await fetchCsv(contentUrls.technologiesSection);
  const stackIconsRaw: CsvStackIconRow[] = await fetchCsv(contentUrls.stackIconProps);

  if (!techSectionRaw.length) throw new Error('No TechnologiesSection rows found.');

  const sectionRow = techSectionRaw[0];

  const stack: Array<StackIconProps> = stackIconsRaw.map((s) => ({
    stackIconName: s.stackIconName,
    displayName: s.displayName,
    size: s.size,
    grayscale: s.grayscale === 'TRUE',
  }));

  const section: TechnologiesSection = {
    type: 'Technologies',
    title: sectionRow.title,
    href: getHrefGuard({ hrefType: sectionRow.hrefType, hrefValue: sectionRow.hrefValue }),
    isMain: toBoolean(sectionRow.isMain),
    isNav: toBoolean(sectionRow.isNav),
    isFooter: toBoolean(sectionRow.isFooter),
    buttonVariant: sectionRow.buttonVariant || undefined,
    stack,
  };

  return section;
}
