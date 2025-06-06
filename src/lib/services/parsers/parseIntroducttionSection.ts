import { IntroductionSection } from '@/components/RenderSection/Introduction';
import fetchCsv from '../utils/fetchCsv';
import CSV_URLS from '../config/csvUrls';
import { ICONS } from '@/constants/icons';

export default async function parseIntroductionSection() {
  const raw = await fetchCsv<any>(CSV_URLS.IntroductionSection);
  if (!raw.length) throw new Error('No IntroductionSection rows found.');

  const row = raw[0];

  const section: IntroductionSection = {
    type: 'Introduction',
    title: row.title,
    href: row.hrefValue ? { [row.hrefType]: row.hrefValue } : undefined,
    isMain: row.isMain === 'TRUE',
    isNav: row.isNav === 'TRUE',
    isFooter: row.isFooter === 'TRUE',
    buttonVariant: row.buttonVariant || undefined,
    description: {
      highlightText: row.descriptionHighlightText || undefined,
      text: row.descriptionText || undefined,
    },
    cta: {
      text: row.ctaText,
      href: row.ctaHrefValue ? { [row.ctaHrefType]: row.ctaHrefValue } : undefined,
      variant: row.ctaVariant || undefined,
      icon: row.ctaIconName ? { pre: row.ctaIconPre === 'TRUE', icon: ICONS[row.ctaIconName] } : undefined,
    },
    image: {
      src: row.imageSrc,
      alt: row.imageAlt,
    },
  };

  return section;
}
