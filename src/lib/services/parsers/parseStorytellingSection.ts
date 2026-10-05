import type { StorytellingSection } from '@/types/sections';
import type { CsvStorytellingSectionRow, CsvStorytellingItemRow, CsvStorytellingRow } from '../types/csvTypes';
import fetchCsv from '../utils/fetchCsv';
import { contentUrls } from '@/config/content';
import getHrefGuard from '../utils/getHrefGuard';
import { toBoolean } from '../utils/toBoolean';
import { replaceEscapedNewlines } from '../utils/replaceEscapedNewlines';

function required(value: string | undefined, field: string): string {
  if (!value?.trim()) throw new Error(`Missing required storytelling field: ${field}.`);
  return replaceEscapedNewlines(value.trim());
}

export function buildStorytellingSection(
  sections: CsvStorytellingSectionRow[],
  items: CsvStorytellingItemRow[],
): StorytellingSection {
  if (!sections.length) throw new Error('No StorytellingSection rows found.');
  const row = sections[0];
  const id = required(row.id, 'section.id');
  const seen = new Set<string>();
  const stories = items
    .filter((item) => item.storytellingSectionId?.trim() === id)
    .map((item) => {
      const storyId = required(item.id, 'item.id');
      if (seen.has(storyId)) throw new Error(`Duplicate storytelling item ID: ${storyId}.`);
      seen.add(storyId);
      const projectName = required(item.projectName, `${storyId}.projectName`);
      const order = required(item.displayOrder, `${storyId}.displayOrder`);
      const displayOrder = Number(order);
      if (!Number.isFinite(displayOrder)) throw new Error(`Invalid storytelling displayOrder: ${order}.`);
      const href = getHrefGuard({
        hrefType: item.linkHrefType || 'internal',
        hrefValue: item.linkHrefValue?.trim() || '',
      });
      return {
        id: storyId,
        projectName,
        heading: required(item.heading, `${storyId}.heading`),
        challenge: required(item.challenge, `${storyId}.challenge`),
        ownership: required(item.ownership, `${storyId}.ownership`),
        outcome: required(item.outcome, `${storyId}.outcome`),
        displayOrder,
        ...(href ? { link: { href, text: item.linkText?.trim() || `View ${projectName} project` } } : {}),
      };
    })
    .sort((a, b) => a.displayOrder - b.displayOrder);
  if (!stories.length) throw new Error(`No StorytellingItems rows found for section ${id}.`);
  return {
    type: 'Storytelling',
    title: row.title?.trim() || required(row.heading, 'section.heading'),
    heading: required(row.heading, 'section.heading'),
    introduction: required(row.introduction, 'section.introduction'),
    ownershipClosingHeading: row.ownershipClosingHeading?.trim() || 'Ownership beyond implementation',
    ownershipClosing: required(row.ownershipClosing, 'section.ownershipClosing'),
    href: getHrefGuard({ hrefType: row.hrefType || 'internal', hrefValue: row.hrefValue?.trim() || '#storytelling' }),
    buttonVariant: row.buttonVariant || undefined,
    isMain: toBoolean(row.isMain || 'TRUE'),
    isNav: toBoolean(row.isNav || 'FALSE'),
    isFooter: toBoolean(row.isFooter || 'FALSE'),
    stories,
  };
}

export function buildCombinedStorytellingSection(rows: CsvStorytellingRow[]): StorytellingSection {
  const sections = rows.filter((row) => row.recordType === 'section');
  if (sections.length !== 1) throw new Error('Expected exactly one storytelling section record.');
  const row = sections[0];
  return buildStorytellingSection(
    [
      {
        id: row.sectionId,
        type: row.sectionType,
        title: row.sectionTitle,
        hrefType: row.sectionHrefType,
        hrefValue: row.sectionHrefValue,
        isMain: row.sectionIsMain,
        isNav: row.sectionIsNav,
        isFooter: row.sectionIsFooter,
        buttonVariant: row.sectionButtonVariant,
        heading: row.sectionSectionTitle,
        introduction: row.sectionIntroduction,
        ownershipClosingHeading: row.sectionClosingTitle,
        ownershipClosing: row.sectionClosingText,
      },
    ],
    rows.filter((row) => row.recordType === 'story'),
  );
}

export default async function parseStorytellingSection(): Promise<StorytellingSection> {
  const rows = await fetchCsv<CsvStorytellingRow>(contentUrls.storytelling);
  return buildCombinedStorytellingSection(rows);
}
