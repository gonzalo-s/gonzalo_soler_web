import Papa from 'papaparse';
import { CsvAboutMeSectionRow } from '../types/csvTypes';

export default async function fetchCsv(url: string): Promise<Array<CsvAboutMeSectionRow | any>> {
  const response = await fetch(url);
  const text = await response.text();
  const { data } = Papa.parse<string>(text, { header: true, skipEmptyLines: true });
  console.log('🚀 ~ data:', data);
  return data;
}
