'use client';

import { useState } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import useDragScroll from '@/hooks/useDragScroll';
import useAutoScroll from '@/hooks/useAutoScroll';
import IconButton from '@/components/atoms/IconButton/IconButton';
import { ICONS } from '@/constants/icons';
import styles from './chipList.module.scss';

type DragScrollListProps = ComponentPropsWithoutRef<'ul'> & { autoScroll?: boolean };

export default function DragScrollList({ autoScroll = false, ...props }: DragScrollListProps) {
  const ref = useDragScroll<HTMLUListElement>();
  const [paused, setPaused] = useState(false);
  const canAnimate = useAutoScroll(ref, autoScroll, paused);
  const list = (
    <ul
      {...props}
      ref={ref}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
        event.preventDefault();
        event.currentTarget.scrollLeft += event.key === 'ArrowRight' ? 80 : -80;
      }}
    />
  );
  if (!autoScroll) return list;
  return (
    <div className={styles.scrollable}>
      {list}
      {canAnimate && (
        <div className={styles.controls}>
          <IconButton
            className={styles.control}
            aria-label={paused ? 'Resume technology scrolling' : 'Pause technology scrolling'}
            title={paused ? 'Resume scrolling' : 'Pause scrolling'}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? ICONS.play : ICONS.pause}
          </IconButton>
        </div>
      )}
    </div>
  );
}
