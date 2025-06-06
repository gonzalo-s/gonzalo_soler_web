import { AboutMeSection } from '@/components/RenderSection/AboutMe';
import fetchCsv from '../utils/fetchCsv';
import CSV_URLS from '../config/csvUrls';
import type { CsvAboutMeSectionRow } from '../types/csvTypes';
import getHrefGuard from '../utils/getHrefGuard';
import { toBoolean } from '../utils/toBoolean';
import { replaceEscapedNewlines } from '../utils/replaceEscapedNewlines';

export default async function parseAboutMeSection(): Promise<AboutMeSection> {
  const raw: Array<CsvAboutMeSectionRow> = await fetchCsv(CSV_URLS.AboutMeSection);
  if (!raw.length) throw new Error('No AboutMeSection rows found.');

  const row = raw[0];

  const section: AboutMeSection = {
    type: 'AboutMe',
    title: row.title,
    href: getHrefGuard({ hrefType: row.hrefType, hrefValue: row.hrefValue }),
    isMain: toBoolean(row.isMain),
    isNav: toBoolean(row.isNav),
    isFooter: toBoolean(row.isFooter),
    buttonVariant: row?.buttonVariant ?? undefined,
    header: {
      highlightText: row?.headerHighlightText ?? undefined,
      text: row?.headerText ?? undefined,
    },
    description: {
      highlightText: row?.descriptionHighlightText ? replaceEscapedNewlines(row.descriptionHighlightText) : undefined,
      text: row?.descriptionText ? replaceEscapedNewlines(row.descriptionText) : undefined,
    },
  };

  return section;
}
