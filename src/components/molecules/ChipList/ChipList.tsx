import clsx from 'clsx';
import Chip from '@/components/atoms/Chip/Chip';
import StackIcon from '@/components/atoms/StackIcon/StackIcon';
import type { StackIconProps } from '@/types/technology';
import DragScrollList from './DragScrollList';
import styles from './chipList.module.scss';

type ChipListProps = {
  items: readonly StackIconProps[];
  className?: string;
  itemClassName?: string;
  limit?: number;
  scrollable?: boolean;
  autoScroll?: boolean;
  label?: string;
};

export default function ChipList({
  items,
  className,
  itemClassName,
  limit,
  scrollable,
  autoScroll,
  label = 'Technologies',
}: ChipListProps) {
  const children = (limit === undefined ? items : items.slice(0, limit)).map((item) => (
    <Chip as="li" key={`${item.stackIconName}-${item.displayName}`} className={itemClassName}>
      <StackIcon {...item} />
    </Chip>
  ));
  const listClass = clsx(styles.list, className);
  return scrollable ? (
    <DragScrollList autoScroll={autoScroll} className={listClass} aria-label={label}>
      {children}
    </DragScrollList>
  ) : (
    <ul className={listClass} aria-label={label}>
      {children}
    </ul>
  );
}
