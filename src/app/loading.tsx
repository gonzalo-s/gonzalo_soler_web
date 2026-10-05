import LoadingPlaceholder from '@/components/atoms/LoadingPlaceholder/LoadingPlaceholder';
import styles from './layout.module.scss';

export default function Loading() {
  return (
    <div className={styles.loading}>
      <LoadingPlaceholder />
    </div>
  );
}
