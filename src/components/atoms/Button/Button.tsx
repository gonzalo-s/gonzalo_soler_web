'use client';

import type { MouseEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getButtonClasses } from './buttonUtils';
import { getInternalHref, isExternal, isPlainPrimaryClick } from '@/lib/ui/getHref';
import { smoothScrollTo } from '@/lib/ui/smoothScroll';
import type { ButtonProps } from '@/types/ui';
import styles from './button.module.scss';
export type { ButtonProps, ButtonVariant, ButtonHref, ButtonIcon, InternalHref, ExternalHref } from '@/types/ui';

export default function Button(props: ButtonProps) {
  const pathname = usePathname();
  const content = (
    <>
      {props.icon?.pre && (
        <span className={styles.icon} aria-hidden="true">
          {props.icon.icon}
        </span>
      )}
      {props.text}
      {props.icon && !props.icon.pre && (
        <span className={styles.icon} aria-hidden="true">
          {props.icon.icon}
        </span>
      )}
    </>
  );

  function handleClick(event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
    if (props.disabled) {
      event.preventDefault();
      return;
    }
    props.onClick?.(event);
    if (event.defaultPrevented || !isPlainPrimaryClick(event) || !props.href || isExternal(props.href)) return;
    if (!props.href.internal.startsWith('#') || pathname !== '/') return;
    const target = document.getElementById(props.href.internal.slice(1));
    if (!target) return;
    event.preventDefault();
    window.history.pushState(null, '', props.href.internal);
    smoothScrollTo(target);
  }

  const shared = {
    id: props.id,
    className: getButtonClasses(props),
    onClick: handleClick,
    'aria-label': props['aria-label'],
  };
  const disabledLink = props.disabled ? { 'aria-disabled': true as const, tabIndex: -1 } : {};

  if (props.href) {
    if (isExternal(props.href)) {
      const separateWindow = !props.download && /^https?:\/\//i.test(props.href.external);
      return (
        <a
          {...shared}
          {...disabledLink}
          href={props.href.external}
          {...(props.download
            ? { download: true }
            : separateWindow
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
        >
          {content}
        </a>
      );
    }
    return (
      <Link {...shared} {...disabledLink} href={getInternalHref(props.href.internal, pathname)}>
        {content}
      </Link>
    );
  }
  return (
    <button {...shared} type={props.type ?? 'button'} disabled={props.disabled}>
      {content}
    </button>
  );
}
