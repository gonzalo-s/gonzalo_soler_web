import clsx from 'clsx';
import styles from './brickStuds.module.scss';

type BrickStudsProps = {
  className?: string;
};

/** Decorative studs that follow the rendered width of their brick. */
export default function BrickStuds({ className }: BrickStudsProps) {
  return <span className={clsx(styles.studs, className)} aria-hidden="true" />;
}
