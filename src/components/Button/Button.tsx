'use client';

import clsx from 'clsx';

import { getButtonClasses } from './buttonUtils';
import { JSX } from 'react';
import { isExternal } from '@/components/utils/getHref';
import Link from 'next/link';
import styles from './button.module.scss';
import { usePathname } from 'next/navigation';

export type ButtonVariant = 'primary' | 'secondary' | 'accent';
type InternalHref = { internal: string };
export type ExternalHref = { external: string };
export type ButtonHref = InternalHref | ExternalHref;
export type ButtonIcon = { pre: boolean; icon: JSX.Element };

export type ButtonProps = {
  text: string;
  disabled?: boolean;
  icon?: ButtonIcon;
  variant?: ButtonVariant;
  href?: ButtonHref;
  id?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  fullWith?: boolean;
};

function Button(props: ButtonProps) {
  const pathname = usePathname();

  function smoothScrollTo(targetElement: HTMLElement) {
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 500; // Duration in milliseconds
    let startTime: number | null = null;

    function animation(currentTime: number) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeOutQuad(elapsedTime: number, startValue: number, changeInValue: number, duration: number) {
      const time = elapsedTime / duration;
      return -changeInValue * time * (time - 2) + startValue;
    }

    requestAnimationFrame(animation);
  }

  function handleInternalClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    if (props?.href && !isExternal(props.href)) {
      const targetId = props.href?.internal.replace('#', '');
      const targetElement = document.getElementById(targetId!);

      if (targetElement) {
        event.preventDefault(); // Prevent default only if the target element exists, to keep redirection behavior
        smoothScrollTo(targetElement);
      } else {
        console.warn(`Element with ID: ${targetId} not found.`);
      }
    }

    if (props.onClick) {
      props.onClick(event);
    }
  }

  if (props.href) {
    // external link
    if (isExternal(props.href)) {
      return (
        <a
          id={props?.id}
          target="_blank"
          rel="noopener noreferrer"
          href={props.href.external}
          className={clsx(getButtonClasses(props))}
        >
          {props.icon?.pre && props.icon.icon && <span className={styles.icon}>{props.icon.icon}</span>}
          {props.text}
          {props.icon && !props.icon.pre && <span className={styles.icon}>{props.icon.icon}</span>}
        </a>
      );
    }

    // internal link
    const internalLinkFixed =
      props.href.internal.startsWith('#') && pathname !== '/' ? '/' + props.href.internal : props.href.internal;

    return (
      <Link
        id={props?.id}
        href={internalLinkFixed}
        className={clsx(getButtonClasses(props))}
        onClick={handleInternalClick}
      >
        {props.icon?.pre && props.icon.icon && <span className={styles.icon}>{props.icon.icon}</span>}
        {props.text}
        {props.icon && !props.icon.pre && <span className={styles.icon}>{props.icon.icon}</span>}
      </Link>
    );
  }

  // button without link
  return (
    <button id={props?.id} disabled={props.disabled} className={clsx(getButtonClasses(props))}>
      {props.icon?.pre && props.icon.icon && <span className={styles.icon}>{props.icon.icon}</span>}
      {props.text}
      {props.icon && !props.icon.pre && <span className={styles.icon}>{props.icon.icon}</span>}
    </button>
  );
}

export default Button;
