'use client';

import BrickImage from '@/components/atoms/BrickImage/BrickImage';
import useBrickLock from '@/hooks/useBrickLock';
import styles from './brickAnimation.module.scss';

export default function BrickAnimation() {
  const artRef = useBrickLock();
  return (
    <div ref={artRef} className={styles.animation} aria-hidden="true">
      <div className={styles.animation__composition}>
        <BrickImage color="blue" className={styles.animation__blueBrick} priority />
        <BrickImage color="yellow" className={styles.animation__yellowBrick} priority />
        <BrickImage color="blue" className={styles.animation__blueStuds} />
      </div>
    </div>
  );
}
