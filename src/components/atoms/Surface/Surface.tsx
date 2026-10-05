import clsx from 'clsx';
import type { HTMLAttributes } from 'react';
import styles from './surface.module.scss';

type SurfaceProps = HTMLAttributes<HTMLElement> & { as?: 'div' | 'article' | 'section' | 'nav' };

export default function Surface({ as: Tag = 'div', className, ...props }: SurfaceProps) {
  return <Tag {...props} className={clsx(styles.surface, className)} />;
}
