import fetchCsv from '../utils/fetchCsv';
import CSV_URLS from '../config/csvUrls';
import { ICONS } from '@/constants/icons';
import { Section } from '@/constants/sections';
import type { CsvSocialSectionRow } from '../types/csvTypes';
import getHrefGuard from '../utils/getHrefGuard';
import { toBoolean } from '../utils/toBoolean';

export default async function parseSocialSection(): Promise<Section> {
  const raw: Array<CsvSocialSectionRow> = await fetchCsv(CSV_URLS.SocialSection);
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
    icon: row.iconName ? { pre: row.iconPre === 'TRUE', icon: ICONS[row.iconName] } : undefined,
  };

  console.log('✅ SocialSection parsed:', section);
  return section;
}
