import type { ButtonHref, ExternalHref } from '@/types/ui';

export function isExternal(href: ButtonHref): href is ExternalHref {
  return 'external' in href;
}

export function getHref(href: ButtonHref | undefined): string {
  return href ? (isExternal(href) ? href.external : href.internal) : '/';
}

export function getId(href: ButtonHref | undefined): string | undefined {
  if (!href || isExternal(href) || !href.internal.startsWith('#')) return undefined;
  return href.internal.slice(1) || undefined;
}

export function getInternalHref(href: string, pathname: string): string {
  return href.startsWith('#') && pathname !== '/' ? `/${href}` : href;
}

export function isPlainPrimaryClick(event: {
  button: number;
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
}): boolean {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}
