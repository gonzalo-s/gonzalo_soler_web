'use client';

import { Sections } from '@/constants/sections';
import Button, { ButtonProps } from '../Button/Button';
import styles from './navigation.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { ICONS } from '@/constants/icons';

type NavigationProps = {
  logo: ButtonProps;
  linkList: Sections;
};

function Navigation(props: NavigationProps) {
  console.log('BUTTON ; ', props.logo);
  return (
    <nav className={styles.navigation}>
      <Button {...props.logo} />
      <DesktopNavigation {...props} />
      <MobileNavigation {...props} />
    </nav>
  );
}

export default Navigation;

function DesktopNavigation(props: NavigationProps) {
  return (
    <div className={styles.desktop}>
      {props.linkList.map((listLink) => {
        return (
          <Button
            key={listLink.title}
            text={listLink.title}
            variant={listLink.buttonVariant}
            icon={listLink.icon}
            href={listLink.href}
          />
        );
      })}
    </div>
  );
}
function MobileNavigation(props: NavigationProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // close menu when menu is at least 1 outside the view port

    if (!showMenu) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setShowMenu(false);
        }
      },
      { threshold: 0.99 },
    );

    const currentMenuRef = menuRef.current;

    if (currentMenuRef) {
      observer.observe(currentMenuRef);
    }

    return () => {
      if (currentMenuRef) {
        observer.unobserve(currentMenuRef);
      }
    };
  }, [showMenu]);

  return (
    <div className={styles.mobile}>
      <button ref={buttonRef} className={styles.mobile__button} onClick={toggleMenu}>
        {showMenu ? ICONS.menuClose : ICONS.menuOpen}
      </button>

      <div
        ref={menuRef}
        className={clsx(styles.mobile__menu, showMenu ? styles.mobile__menu__show : styles.mobile__menu__hide)}
      >
        {props.linkList.map((listLink) => {
          return (
            <Button
              key={listLink.title}
              text={listLink.title}
              variant={listLink.buttonVariant}
              icon={listLink.icon}
              href={listLink.href}
            />
          );
        })}
      </div>
    </div>
  );
}
