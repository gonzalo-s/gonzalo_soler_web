import { ButtonProps } from '@/components/Button/Button';
import fetchCsv from '../utils/fetchCsv';
import CSV_URLS from '../config/csvUrls';
import { CsvLogoRow } from '../types/csvTypes';
import getHrefGuard from '../utils/getHrefGuard';
import { buildIcon } from '../utils/resolveIcon';

export default async function parseLogo(): Promise<ButtonProps> {
  const raw: Array<CsvLogoRow> = await fetchCsv(CSV_URLS.Logo);
  if (!raw.length) throw new Error('No Logo row found.');

  const row = raw[0];

  const logo: ButtonProps = {
    text: row.text,
    variant: row.variant,
    href: getHrefGuard({ hrefType: row.hrefType, hrefValue: row.hrefValue }),
    icon: await buildIcon(row.iconName, row.iconPre),
  };

  return logo;
}
