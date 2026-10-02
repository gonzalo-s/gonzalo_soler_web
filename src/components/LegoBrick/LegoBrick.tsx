import clsx from 'clsx';
import BrickStuds from '@/components/BrickStuds/BrickStuds';
import type { ElementType, ReactNode } from 'react';
import styles from './legoBrick.module.scss';

type LegoBrickProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

/** A decorative brick skin; the chosen HTML element retains its native behavior. */
export default function LegoBrick<T extends ElementType = 'div'>({
  as,
  children,
  className,
  ...props
}: LegoBrickProps<T>) {
  const Component = as || 'div';

  return (
    <Component className={clsx(styles.brick, className)} {...props}>
      <BrickStuds className={styles.studs} />
      {children}
    </Component>
  );
}
