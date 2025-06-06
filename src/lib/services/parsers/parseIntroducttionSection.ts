import { IntroductionSection } from '@/components/RenderSection/Introduction';
import fetchCsv from '../utils/fetchCsv';
import CSV_URLS from '../config/csvUrls';
import type { CsvIntroductionSectionRow } from '../types/csvTypes';
import getHrefGuard from '../utils/getHrefGuard';
import { toBoolean } from '../utils/toBoolean';
import { ICONS } from '@/constants/icons';

export default async function parseIntroductionSection(): Promise<IntroductionSection> {
  const raw: CsvIntroductionSectionRow[] = await fetchCsv(CSV_URLS.IntroductionSection);
  if (!raw.length) throw new Error('No IntroductionSection rows found.');

  const row = raw[0];

  const section: IntroductionSection = {
    type: 'Introduction',
    title: row.title,
    href: getHrefGuard({ hrefType: row.hrefType, hrefValue: row.hrefValue }),
    isMain: toBoolean(row.isMain),
    isNav: toBoolean(row.isNav),
    isFooter: toBoolean(row.isFooter),
    buttonVariant: row.buttonVariant || undefined,
    description: {
      highlightText: row.descriptionHighlightText || undefined,
      text: row.descriptionText || undefined,
    },
    cta: {
      text: row.ctaText,
      href: getHrefGuard({ hrefType: row.ctaHrefType, hrefValue: row.ctaHrefValue }),
      variant: row.ctaVariant || undefined,
      icon: row.ctaIconName ? { pre: toBoolean(row.ctaIconPre), icon: ICONS[row.ctaIconName] } : undefined,
    },
    image: {
      src: row.imageSrc,
      alt: row.imageAlt,
    },
  };

  return section;
}
