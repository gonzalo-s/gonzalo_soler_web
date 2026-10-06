'use client';

import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';

type Props = {
  summary: ReactNode;
  children: ReactNode;
  className?: string;
  summaryClassName?: string;
  contentClassName?: string;
};

/** Native disclosure semantics and server HTML, with reversible height transitions. */
export default function AnimatedDisclosure({
  summary,
  children,
  className,
  summaryClassName,
  contentClassName,
}: Props) {
  const details = useRef<HTMLDetailsElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const expanded = useRef(false);
  const animation = useRef<Animation | null>(null);
  const motion = useRef<MediaQueryList | null>(null);
  const finish = () => {
    animation.current?.cancel();
    animation.current = null;
    if (!details.current) return;
    details.current.open = expanded.current;
    details.current.style.height = '';
    details.current.style.overflow = '';
    if (content.current) content.current.inert = !expanded.current;
  };
  useEffect(() => {
    motion.current = matchMedia('(prefers-reduced-motion: reduce)');
    const changed = () => {
      if (motion.current?.matches) finish();
    };
    motion.current.addEventListener('change', changed);
    return () => {
      motion.current?.removeEventListener('change', changed);
      animation.current?.cancel();
    };
  }, []);

  const toggle = (event: MouseEvent<HTMLElement>) => {
    if (!details.current || !content.current) return;
    event.preventDefault();
    const element = details.current;
    const start = element.getBoundingClientRect().height;
    expanded.current = !expanded.current;
    element.style.height = `${start}px`;
    animation.current?.cancel();
    element.open = true;
    content.current.inert = !expanded.current;
    if (motion.current?.matches || !element.animate) {
      finish();
      return;
    }
    const summaryHeight = event.currentTarget.getBoundingClientRect().height;
    const border =
      parseFloat(getComputedStyle(element).borderTopWidth) + parseFloat(getComputedStyle(element).borderBottomWidth);
    const target = summaryHeight + border + (expanded.current ? content.current.getBoundingClientRect().height : 0);
    element.style.overflow = 'hidden';
    const next = element.animate([{ height: `${start}px` }, { height: `${target}px` }], {
      duration: 260,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      fill: 'forwards',
    });
    animation.current = next;
    next.onfinish = () => {
      if (animation.current === next) finish();
    };
  };
  return (
    <details ref={details} className={className} data-animated-disclosure>
      <summary className={summaryClassName} onClick={toggle}>
        {summary}
      </summary>
      <div ref={content} className={contentClassName}>
        {children}
      </div>
    </details>
  );
}
