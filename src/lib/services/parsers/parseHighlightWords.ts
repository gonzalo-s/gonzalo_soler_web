import fetchCsv from '../utils/fetchCsv';
import { contentUrls } from '@/config/content';
import type { CsvHighlightWordRow } from '../types/csvTypes';

export default async function parseHighlightWords(): Promise<string[]> {
  const raw: CsvHighlightWordRow[] = await fetchCsv(contentUrls.highlightWords);
  if (!raw.length) {
    console.warn('No HighlightWords found.');
    return [];
  }

  const highlightWords = raw.map((row) => row.word).filter(Boolean);

  return highlightWords;
}
