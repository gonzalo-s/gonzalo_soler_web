import { TechnologiesSection, StackIconProps } from '@/components/RenderSection/Technologies';
import fetchCsv from '../utils/fetchCsv';
import CSV_URLS from '../config/csvUrls';

export default async function parseTechnologiesSection(): Promise<TechnologiesSection> {
  const techSectionRaw = await fetchCsv<any>(CSV_URLS.TechnologiesSection);
  const stackIconsRaw = await fetchCsv<any>(CSV_URLS.StackIconProps);

  if (!techSectionRaw.length) throw new Error('No TechnologiesSection rows found.');

  const sectionRow = techSectionRaw[0];

  const stack: StackIconProps[] = stackIconsRaw.map((s) => ({
    stackIconName: s.stackIconName,
    displayName: s.displayName,
    size: s.size,
    grayscale: s.grayscale === 'TRUE',
  }));

  const section: TechnologiesSection = {
    type: 'Technologies',
    title: sectionRow.title,
    href: sectionRow.hrefValue ? { [sectionRow.hrefType]: sectionRow.hrefValue } : undefined,
    isMain: sectionRow.isMain === 'TRUE',
    isNav: sectionRow.isNav === 'TRUE',
    isFooter: sectionRow.isFooter === 'TRUE',
    buttonVariant: sectionRow.buttonVariant || undefined,
    stack,
  };

  return section;
}
