import clsx from 'clsx';
import styles from './button.module.scss';
import { ButtonProps } from './Button';

// Function to get button class based on props
export const getButtonClasses = (props: ButtonProps) => {
  const variant = props?.variant || 'primary';
  const type = props?.href ? 'link' : 'button';
  console.log('🚀 ~ getButtonClasses ~ variant:', props, variant, type, variant, styles[`${type}_${variant}`]);

  return clsx(styles[type], styles[`${type}_${variant}`], {
    [styles.disabled]: props.disabled,
  });
};
