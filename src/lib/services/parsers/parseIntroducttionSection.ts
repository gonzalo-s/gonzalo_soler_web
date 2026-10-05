import type { IntroductionSection } from '@/types/sections';
import fetchCsv from '../utils/fetchCsv';
import { contentUrls } from '@/config/content';
import type { CsvIntroductionSectionRow } from '../types/csvTypes';
import getHrefGuard from '../utils/getHrefGuard';
import { toBoolean } from '../utils/toBoolean';
import { buildIcon } from '../utils/resolveIcon';

export default async function parseIntroductionSection(): Promise<IntroductionSection> {
  const raw: CsvIntroductionSectionRow[] = await fetchCsv(contentUrls.introductionSection);
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
      icon: await buildIcon(row.ctaIconName, row.ctaIconPre),
    },
    image: {
      src: row.imageSrc,
      alt: row.imageAlt,
    },
  };

  return section;
}
