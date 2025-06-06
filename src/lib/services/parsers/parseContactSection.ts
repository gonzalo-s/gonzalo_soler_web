import { ContactSection } from '@/components/RenderSection/Contact';
import fetchCsv from '../utils/fetchCsv';
import CSV_URLS from '../config/csvUrls';
import type { CsvContactSectionRow } from '../types/csvTypes';
import getHrefGuard from '../utils/getHrefGuard';
import { toBoolean } from '../utils/toBoolean';
import { ICONS } from '@/constants/icons';

export default async function parseContactSection(): Promise<ContactSection> {
  const raw: CsvContactSectionRow[] = await fetchCsv(CSV_URLS.ContactSection);
  if (!raw.length) throw new Error('No ContactSection rows found.');

  const row = raw[0];

  const section: ContactSection = {
    type: 'Contact',
    title: row.title,
    sectionTitle: row.sectionTitle,
    href: getHrefGuard({ hrefType: row.hrefType, hrefValue: row.hrefValue }),
    isMain: toBoolean(row.isMain),
    isNav: toBoolean(row.isNav),
    isFooter: toBoolean(row.isFooter),
    buttonVariant: row.buttonVariant || undefined,
    email: row.email ? row.email.split(',').map((e) => e.trim()) : [],
    description: row.description || undefined,
    cta: {
      text: row.ctaText,
      href: getHrefGuard({ hrefType: row.ctaHrefType, hrefValue: row.ctaHrefValue }),
      variant: row.ctaVariant || undefined,
      icon: row?.ctaIconName ? { pre: row.ctaIconPre === 'TRUE', icon: ICONS[row.ctaIconName] } : undefined,
    },
  };

  return section;
}
