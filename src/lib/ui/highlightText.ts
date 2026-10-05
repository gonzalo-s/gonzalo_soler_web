export type TextPart = { text: string; highlighted: boolean };

export function splitHighlightedText(text: string, words: readonly string[] = []): TextPart[] {
  const uniqueWords = [...new Set(words.map((word) => word.trim()).filter(Boolean))];
  if (!uniqueWords.length) return [{ text, highlighted: false }];
  uniqueWords.sort((a, b) => b.length - a.length);
  const escaped = uniqueWords.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const expression = new RegExp(`(?<!\\w)(${escaped.join('|')})(?!\\w)`, 'gi');
  const parts: TextPart[] = [];
  let cursor = 0;
  for (const match of text.matchAll(expression)) {
    const index = match.index ?? 0;
    if (index > cursor) parts.push({ text: text.slice(cursor, index), highlighted: false });
    parts.push({ text: match[0], highlighted: true });
    cursor = index + match[0].length;
  }
  if (cursor < text.length) parts.push({ text: text.slice(cursor), highlighted: false });
  return parts.length ? parts : [{ text, highlighted: false }];
}
