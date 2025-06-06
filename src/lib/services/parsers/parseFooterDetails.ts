import { FooterProps } from '@/components/Footer/Footer';
import fetchCsv from '../utils/fetchCsv';
import CSV_URLS from '../config/csvUrls';
import parseLogo from './parseLogo';
import { CsvFooterDetailsRow } from '../types/csvTypes';

export default async function parseFooterDetails(): Promise<FooterProps['details']> {
  const raw: Array<CsvFooterDetailsRow> = await fetchCsv(CSV_URLS.FooterDetail);
  if (!raw.length) throw new Error('No FooterDetail row found.');

  const row = raw[0];
  const logo = await parseLogo();

  const footerDetails: FooterProps['details'] = {
    logo,
    description: row.description,
    email: [`${row.email}@${row.emailLast}`],
  };

  console.log('✅ FooterDetails parsed:', footerDetails);
  return footerDetails;
}
