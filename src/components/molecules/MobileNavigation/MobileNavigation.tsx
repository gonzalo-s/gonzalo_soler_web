'use client';

import { useEffect, useId, useRef, useState } from 'react';
import clsx from 'clsx';
import IconButton from '@/components/atoms/IconButton/IconButton';
import { ThemeSwitch } from '@/components/atoms/ThemeSwitch/ThemeSwitch';
import NavigationLinks from '@/components/molecules/NavigationLinks/NavigationLinks';
import type { Section } from '@/types/sections';
import { ICONS } from '@/constants/icons';
import styles from './mobileNavigation.module.scss';

export default function MobileNavigation({ links }: { links: readonly Section[] }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: Event) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const frame = window.requestAnimationFrame(() =>
      menuRef.current?.querySelector<HTMLElement>('a, button, input')?.focus(),
    );
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('focusin', closeOutside);
    document.addEventListener('keydown', escape);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('focusin', closeOutside);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={styles.mobile}>
      <IconButton
        ref={buttonRef}
        className={styles.mobile__button}
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls={menuId}
      >
        {open ? ICONS.menuClose : ICONS.menuOpen}
      </IconButton>
      <div
        ref={menuRef}
        id={menuId}
        className={clsx(styles.mobile__menu, open && styles.mobile__menu__show)}
        inert={!open}
        aria-hidden={!open}
      >
        <NavigationLinks links={links} onNavigate={() => setOpen(false)} fullWidth />
        <ThemeSwitch />
      </div>
    </div>
  );
}
