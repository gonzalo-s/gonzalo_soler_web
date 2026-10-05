import clsx from 'clsx';
import type { ComponentPropsWithRef } from 'react';
import styles from './iconButton.module.scss';

type IconButtonProps = ComponentPropsWithRef<'button'> & { 'aria-label': string };

export default function IconButton({ className, children, type = 'button', ...props }: IconButtonProps) {
  return (
    <button {...props} type={type} className={clsx(styles.button, className)}>
      <span aria-hidden="true">{children}</span>
    </button>
  );
}
