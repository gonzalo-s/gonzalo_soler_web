import Papa from 'papaparse';

// A token that is stable within one build/process but changes between builds.
// Appending it to the CSV URL busts Next's persisted fetch cache so every build
// (and every Vercel deploy, which restores `.next/cache`) pulls the latest CMS
// content — while the fetch itself stays cacheable, keeping pages statically
// prerendered (no runtime dependency on Google Sheets).
const BUILD_CACHE_TOKEN = process.env.VERCEL_DEPLOYMENT_ID ?? process.env.VERCEL_GIT_COMMIT_SHA ?? String(Date.now());

// Accept a generic type for the row, defaulting to unknown to avoid 'any'
export default async function fetchCsv<T = unknown>(url: string): Promise<T[]> {
  const separator = url.includes('?') ? '&' : '?';
  const response = await fetch(`${url}${separator}_cb=${BUILD_CACHE_TOKEN}`);
  const text = await response.text();
  const { data } = Papa.parse<T>(text, { header: true, skipEmptyLines: true });
  return data;
}
