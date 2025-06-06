import fetchCsv from '../utils/fetchCsv';
import CSV_URLS from '../config/csvUrls';

export default async function parseHighlightWords(): Promise<string[]> {
  const raw = await fetchCsv<any>(CSV_URLS.HighlightWords);
  if (!raw.length) {
    console.warn('No HighlightWords found.');
    return [];
  }

  const highlightWords = raw.map((row) => row.word).filter(Boolean);

  return highlightWords;
}
