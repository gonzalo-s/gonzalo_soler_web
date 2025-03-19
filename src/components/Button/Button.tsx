'use client';

import clsx from 'clsx';

import { getButtonClasses } from './buttonUtils';
import { JSX, MouseEvent } from 'react';
import { isExternal } from '@/components/utils/getHref';
import Link from 'next/link';

export type ButtonVariant = 'primary' | 'secondary';
type InternalHref = { internal: string };
export type ExternalHref = { external: string };
export type ButtonHref = InternalHref | ExternalHref;

export type ButtonProps = {
  text: string;
  disabled?: boolean;
  icon?: JSX.Element;
  variant?: ButtonVariant;
  href?: ButtonHref;
};

function Button(props: ButtonProps) {
  function handleInternalClick(event: MouseEvent) {
    event.preventDefault();

    if (props?.href && !isExternal(props.href)) {
      {
        const targetId = props.href?.internal.replace('#', '');
        const targetElement = document.getElementById(targetId!);

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  }

  if (props.href) {
    if (isExternal(props.href)) {
      return (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={props.href.external}
          className={clsx(getButtonClasses(props))}
        >
          {props.text}
        </a>
      );
    }
    return (
      <Link href={props.href.internal} className={clsx(getButtonClasses(props))} onClick={handleInternalClick}>
        {props.text}
      </Link>
    );
  }
  return (
    <button disabled={props.disabled} className={clsx(getButtonClasses(props))}>
      {props.text}
    </button>
  );
}

export default Button;
