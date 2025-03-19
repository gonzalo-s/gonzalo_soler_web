import { ButtonHref, ExternalHref } from '../Button/Button';

export function isExternal(href: ButtonHref): href is ExternalHref {
  return 'external' in href;
}

export function getHref(href: ButtonHref | undefined): string {
  return href ? (isExternal(href) ? href.external : href.internal) : '/';
}
