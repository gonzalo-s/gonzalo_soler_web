import clsx from 'clsx';
import styles from './button.module.scss';
import type { ButtonProps } from '@/types/ui';

// Function to get button class based on props
export const getButtonClasses = (props: ButtonProps) => {
  const variant = props?.variant || 'primary';
  const type = props?.href ? 'link' : 'button';

  return clsx(
    styles[type],
    styles[`${type}_${variant}`],
    {
      [styles.disabled]: props.disabled,
      [styles.fullWidth]: props.fullWidth,
    },
    props.className,
  );
};
