// Utility to replace literal \n with real newlines
export function replaceEscapedNewlines(str: string): string {
  return str.replace(/\\n/g, '\n');
}
