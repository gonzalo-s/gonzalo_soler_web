/**
 * Converts a Google Drive "share/view" link into a direct-download link so the
 * browser downloads the file (served with an attachment disposition) instead of
 * opening Drive's preview page.
 *
 *   https://drive.google.com/file/d/FILE_ID/view?usp=drive_link
 *     -> https://drive.google.com/uc?export=download&id=FILE_ID
 *
 * Non-Drive URLs (and already-direct links) are returned unchanged.
 */
export function toDriveDownloadUrl(url: string): string {
  const fileMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (fileMatch) return `https://drive.google.com/uc?export=download&id=${fileMatch[1]}`;
  return url;
}
