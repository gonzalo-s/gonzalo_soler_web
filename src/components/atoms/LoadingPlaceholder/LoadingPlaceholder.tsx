import styles from './loadingPlaceholder.module.scss';

export default function LoadingPlaceholder() {
  return (
    <div className={styles.placeholder} role="status" aria-label="Loading content">
      <span className={styles.label}>Loading content</span>
    </div>
  );
}
