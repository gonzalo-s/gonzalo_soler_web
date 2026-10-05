'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './brickAnimation.module.scss';

export default function BrickAnimation() {
  const artRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const art = artRef.current;
    if (!art) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const update = () => {
      frame = 0;
      const top = art.getBoundingClientRect().top + window.scrollY;
      const start = Math.max(0, top - window.innerHeight * 0.7);
      const distance = Math.min(window.innerHeight * 0.4, 320);
      const progress = motionPreference.matches ? 1 : Math.min(1, Math.max(0, (window.scrollY - start) / distance));

      const lift = progress === 1 ? '-10.694390715667312%' : `${-30 + 19.305609284332688 * progress}%`;
      const rotation = progress === 1 ? '-0.258164deg' : `${-2 + 1.741836 * progress}deg`;
      art.style.setProperty('--yellow-lift', lift);
      art.style.setProperty('--yellow-rotation', rotation);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    motionPreference.addEventListener('change', schedule);

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      motionPreference.removeEventListener('change', schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={artRef} className={styles.animation} aria-hidden="true">
      <div className={styles.animation__composition}>
        <Image
          className={styles.animation__blueBrick}
          src="/images/lego-brick-blue.png"
          alt=""
          width={1254}
          height={1254}
          priority
          sizes="(max-width: 900px) 70vw, 42vw"
        />
        <Image
          className={styles.animation__yellowBrick}
          src="/images/lego-brick-yellow.png"
          alt=""
          width={1254}
          height={1254}
          priority
          sizes="(max-width: 900px) 70vw, 42vw"
        />
        <Image
          className={styles.animation__blueStuds}
          src="/images/lego-brick-blue.png"
          alt=""
          width={1254}
          height={1254}
          sizes="(max-width: 900px) 70vw, 42vw"
        />
      </div>
    </div>
  );
}
