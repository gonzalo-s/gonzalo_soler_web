'use client';

import type { ComponentPropsWithoutRef } from 'react';
import useDragScroll from '@/hooks/useDragScroll';

export default function DragScrollList(props: ComponentPropsWithoutRef<'ul'>) {
  const ref = useDragScroll<HTMLUListElement>();
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
