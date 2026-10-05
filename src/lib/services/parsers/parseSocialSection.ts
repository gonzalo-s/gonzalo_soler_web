import fetchCsv from '../utils/fetchCsv';
import { contentUrls } from '@/config/content';
import type { Section } from '@/types/sections';
import type { CsvSocialSectionRow } from '../types/csvTypes';
import getHrefGuard from '../utils/getHrefGuard';
import { toBoolean } from '../utils/toBoolean';
import { buildIcon } from '../utils/resolveIcon';

export default async function parseSocialSection(): Promise<Section> {
  const raw: Array<CsvSocialSectionRow> = await fetchCsv(contentUrls.socialSection);
  if (!raw.length) throw new Error('No SocialSection rows found.');

  const row = raw[0];

  const section: Section = {
    type: 'Social',
    title: row.title,
    href: getHrefGuard({ hrefType: row.hrefType, hrefValue: row.hrefValue }),
    buttonVariant: row.buttonVariant,
    isNav: toBoolean(row.isNav),
    isFooter: toBoolean(row.isFooter),
    isMain: toBoolean(row.isMain),
    icon: await buildIcon(row.iconName, row.iconPre),
  };

  return section;
}
