'use client';
import Skeleton from 'react-loading-skeleton';
import styles from './layout.module.scss';

export default function Loading() {
  return (
    <div className={styles.loading}>
      <Skeleton height={200} width={300} />
    </div>
  );
}
