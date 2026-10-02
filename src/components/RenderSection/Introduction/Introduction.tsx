'use client';

import { useEffect, useRef } from 'react';
import { Section, SectionType } from '@/types/sections';
import styles from './introduction.module.scss';
import { getId } from '@/components/utils/getHref';
import Image from 'next/image';
import Button, { ButtonProps } from '@/components/Button/Button';

export type IntroductionSection = Section & {
  type: Extract<SectionType, 'Introduction'>;
  description: { highlightText?: string; text?: string };
  cta: ButtonProps;
  image?: { src: string; alt: string };
};

function Introduction(props: IntroductionSection) {
  const sectionRef = useRef<HTMLElement>(null);
  const artRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const art = artRef.current;
    if (!section || !art) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const update = () => {
      frame = 0;
      const top = section.getBoundingClientRect().top + window.scrollY;
      const start = Math.max(0, top - 120);
      const distance = Math.min(section.offsetHeight * 0.55, 440);
      const progress = motionPreference.matches ? 1 : Math.min(1, Math.max(0, (window.scrollY - start) / distance));

      art.style.setProperty('--yellow-lift', `${-17 * (1 - progress)}%`);
      art.style.setProperty('--yellow-rotation', `${-2 * (1 - progress)}deg`);
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
    <section ref={sectionRef} className={styles.introduction} id={getId(props.href)}>
      <div ref={artRef} className={styles.introduction__art} aria-hidden="true">
        <Image
          className={styles.introduction__blueBrick}
          src="/images/lego-brick-blue.png"
          alt=""
          width={1254}
          height={1254}
          priority
          sizes="(max-width: 900px) 70vw, 42vw"
        />
        <Image
          className={styles.introduction__yellowBrick}
          src="/images/lego-brick-yellow.png"
          alt=""
          width={1254}
          height={1254}
          priority
          sizes="(max-width: 900px) 70vw, 42vw"
        />
      </div>
      <div className={styles.introduction__content}>
        <span className={styles.introduction__rule} aria-hidden="true" />
        <h1 className={styles.introduction__textWrapper}>
          {props.description?.highlightText && <span>{props.description.highlightText}</span>}
          {props.description?.text && (
            <span className={styles.introduction__description}>{props.description.text}</span>
          )}
        </h1>
        <div className={styles.introduction__bottom}>
          {props.cta && <Button {...props.cta} />}
          {props.image && (
            <div className={styles.introduction__portrait}>
              <Image src={props.image.src} alt={props.image.alt || ''} fill sizes="72px" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Introduction;
