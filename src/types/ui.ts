import type { MouseEventHandler, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'accent';
export type InternalHref = { internal: string };
export type ExternalHref = { external: string };
export type ButtonHref = InternalHref | ExternalHref;
export type ButtonIcon = { pre: boolean; icon: ReactNode };

export type ButtonProps = {
  text: string;
  disabled?: boolean;
  icon?: ButtonIcon;
  variant?: ButtonVariant;
  href?: ButtonHref;
  id?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  fullWidth?: boolean;
  download?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  'aria-label'?: string;
};
