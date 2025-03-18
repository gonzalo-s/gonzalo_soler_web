import Link from 'next/link';
import clsx from 'clsx';

import { getButtonClasses } from './buttonUtils';

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
  if (props.href) {
    if (isExternal(props.href)) {
      return (
        <a
          href={props.href.external}
          className={clsx(getButtonClasses(props))}
        >
          {props.text}
        </a>
      );
    }
    return (
      <Link href={props.href.internal} className={clsx(getButtonClasses(props))}>
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

function isExternal(href: InternalHref | ExternalHref): href is ExternalHref {
  return (href as ExternalHref).external !== undefined;
}
