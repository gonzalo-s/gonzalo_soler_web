import { ExperienceSection } from '@/components/RenderSection/Experience';
import fetchCsv from '../utils/fetchCsv';
import CSV_URLS from '../config/csvUrls';

export default async function parseExperienceSection(): Promise<ExperienceSection> {
  const expSectionRaw = await fetchCsv<any>(CSV_URLS.ExperienceSection);
  const expItemsRaw = await fetchCsv<any>(CSV_URLS.ExperienceItems);

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
    href: sectionRow.hrefValue ? { [sectionRow.hrefType]: sectionRow.hrefValue } : undefined,
    isMain: sectionRow.isMain === 'TRUE',
    isNav: sectionRow.isNav === 'TRUE',
    isFooter: sectionRow.isFooter === 'TRUE',
    buttonVariant: sectionRow.buttonVariant || undefined,
    experience,
  };

  return section;
}
