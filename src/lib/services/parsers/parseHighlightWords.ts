import fetchCsv from '../utils/fetchCsv';
import CSV_URLS from '../config/csvUrls';
import type { CsvHighlightWordRow } from '../types/csvTypes';

export default async function parseHighlightWords(): Promise<string[]> {
  const raw: CsvHighlightWordRow[] = await fetchCsv(CSV_URLS.HighlightWords);
  if (!raw.length) {
    console.warn('No HighlightWords found.');
    return [];
  }

  const highlightWords = raw.map((row) => row.word).filter(Boolean);

  return highlightWords;
}
