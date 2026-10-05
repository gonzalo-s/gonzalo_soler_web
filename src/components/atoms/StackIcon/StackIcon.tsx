import Image from 'next/image';
import clsx from 'clsx';
import { getStackIconSrc } from '@/constants/StackIcon/lib';
import type { StackIconProps } from '@/types/technology';
import styles from './stackIcon.module.scss';
export type { StackIconName, StackIconProps, Size } from '@/types/technology';

const sizeMap = { small: 32, medium: 32, large: 48 };

export default function StackIcon(props: StackIconProps) {
  const source = getStackIconSrc(props.stackIconName);
  const size = sizeMap[props.size] ?? sizeMap.small;
  return (
    <span className={styles['stack-icon']}>
      {source && (
        <span
          className={clsx(styles['stack-icon__image'], props.grayscale && styles['stack-icon__image--grayscale'])}
          aria-hidden="true"
        >
          <Image src={source} alt="" width={size} height={size} unoptimized />
        </span>
      )}
      {props.displayName}
    </span>
  );
}
