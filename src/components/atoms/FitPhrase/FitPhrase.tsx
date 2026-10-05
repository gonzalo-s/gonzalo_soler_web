'use client';

import { useEffect, useRef } from 'react';
import { phraseScale } from '@/lib/ui/cmsText';
import styles from './fitPhrase.module.scss';

export default function FitPhrase({ children }: { children: React.ReactNode }) {
  const wrapper = useRef<HTMLSpanElement>(null);
  const phrase = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const container = wrapper.current;
    const text = phrase.current;
    if (!container || !text) return;
    let active = true;
    const fit = () => {
      if (!active) return;
      text.style.fontSize = '100%';
      const natural = text.getBoundingClientRect().width;
      text.style.fontSize = `${phraseScale(container.clientWidth, natural) * 100}%`;
    };
    const observer = new ResizeObserver(fit);
    observer.observe(container.parentElement ?? container);
    window.addEventListener('resize', fit);
    document.fonts.ready.then(fit);
    fit();
    return () => {
      active = false;
      observer.disconnect();
      window.removeEventListener('resize', fit);
    };
  }, [children]);
  return (
    <span ref={wrapper} className={styles.wrapper} data-fit-phrase>
      <span ref={phrase} className={styles.phrase}>
        {children}
      </span>
    </span>
  );
}
