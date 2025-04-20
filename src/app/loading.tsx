'use client';
import { PacmanLoader } from 'react-spinners';
import styles from './layout.module.scss';

export default function Loading() {
  return (
    <div className={styles.loading}>
      <PacmanLoader color={'#757575'} loading />
    </div>
  );
}
