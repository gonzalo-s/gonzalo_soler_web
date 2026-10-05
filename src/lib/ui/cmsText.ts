export type CmsTextPart = { text: string; keepTogether: boolean };

/** Paired double asterisks mark a phrase; unmatched markers remain literal text. */
export function splitCmsText(text: string): CmsTextPart[] {
  const parts: CmsTextPart[] = [];
  let cursor = 0;
  for (const match of text.matchAll(/\*\*([^*]+)\*\*/g)) {
    const index = match.index ?? 0;
    if (index > cursor) parts.push({ text: text.slice(cursor, index), keepTogether: false });
    parts.push({ text: match[1], keepTogether: true });
    cursor = index + match[0].length;
  }
  if (cursor < text.length) parts.push({ text: text.slice(cursor), keepTogether: false });
  return parts.length ? parts : [{ text, keepTogether: false }];
}

export function phraseScale(available: number, natural: number): number {
  return available > 0 && natural > 0 ? Math.min(1, available / natural) : 1;
}
