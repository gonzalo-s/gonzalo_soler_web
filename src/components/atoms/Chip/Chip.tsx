import clsx from 'clsx';
import type { HTMLAttributes } from 'react';
import styles from './chip.module.scss';

type ChipProps = HTMLAttributes<HTMLElement> & { as?: 'li' | 'span' };

export default function Chip({ as: Tag = 'span', className, ...props }: ChipProps) {
  return <Tag {...props} className={clsx(styles.chip, className)} />;
}
