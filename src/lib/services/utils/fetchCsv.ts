import Papa from 'papaparse';

// Accept a generic type for the row, defaulting to unknown to avoid 'any'
export default async function fetchCsv<T = unknown>(url: string): Promise<T[]> {
  const response = await fetch(url);
  const text = await response.text();
  const { data } = Papa.parse<T>(text, { header: true, skipEmptyLines: true });
  return data;
}
