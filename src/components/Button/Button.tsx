'use client';

import clsx from 'clsx';

import { getButtonClasses } from './buttonUtils';
import { MouseEvent } from 'react';

export type ButtonVariant = 'primary' | 'secondary';

type InternalHref = { internal: string };
type ExternalHref = { external: string };

export type ButtonProps = {
  text: string;
  disabled?: boolean;
  icon?: boolean; // later we can add icon to the button
  variant?: ButtonVariant;
  href?: InternalHref | ExternalHref;
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
        <a href={props.href.external} className={clsx(getButtonClasses(props))}>
          {props.text}
        </a>
      );
    }
    return (
      <a href={props.href.internal} className={clsx(getButtonClasses(props))} onClick={handleInternalClick}>
        {props.text}
      </a>
    );
  }
  return (
    <button disabled={props.disabled} className={clsx(getButtonClasses(props))}>
      {props.text}
    </button>
  );
}

export default Button;

function isExternal(href: InternalHref | ExternalHref): href is ExternalHref {
  return (href as ExternalHref).external !== undefined;
}
