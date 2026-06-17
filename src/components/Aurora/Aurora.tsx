'use client';

import { useParallax } from '@/hooks/useParallax';
import styles from './aurora.module.scss';

/**
 * Ambient aurora background. Three large, blurred colour blobs that gently
 * breathe (CSS drift) and shift with scroll parallax — each at a different
 * speed and direction — so the background colours subtly recompose as you
 * move down the page. Honours prefers-reduced-motion via the parallax hook.
 */
export default function Aurora() {
  const violet = useParallax<HTMLDivElement>(0.12, 'top');
  const cyan = useParallax<HTMLDivElement>(-0.1, 'top');
  const pink = useParallax<HTMLDivElement>(0.08, 'top');

  return (
    <div className={styles.aurora} aria-hidden="true">
      <div ref={violet} className={`${styles.aurora__blob} ${styles['aurora__blob--violet']}`}>
        <div className={styles.aurora__inner} />
      </div>
      <div ref={cyan} className={`${styles.aurora__blob} ${styles['aurora__blob--cyan']}`}>
        <div className={styles.aurora__inner} />
      </div>
      <div ref={pink} className={`${styles.aurora__blob} ${styles['aurora__blob--pink']}`}>
        <div className={styles.aurora__inner} />
      </div>
    </div>
  );
}
