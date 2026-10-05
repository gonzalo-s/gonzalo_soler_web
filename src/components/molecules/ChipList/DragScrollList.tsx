'use client';

import type { ComponentPropsWithoutRef } from 'react';
import useDragScroll from '@/hooks/useDragScroll';
import useAutoScroll from '@/hooks/useAutoScroll';

type DragScrollListProps = ComponentPropsWithoutRef<'ul'> & { autoScroll?: boolean };

export default function DragScrollList({ autoScroll = false, ...props }: DragScrollListProps) {
  const ref = useDragScroll<HTMLUListElement>();
  useAutoScroll(ref, autoScroll);
  return (
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
}
