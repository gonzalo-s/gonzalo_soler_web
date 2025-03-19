'use client';

import { Sections } from '@/constants/sections';
import Button, { ButtonProps } from '../Button/Button';
import styles from './navigation.module.scss';
import React, { useState } from 'react';
import clsx from 'clsx';
import { ICONS } from '@/constants/icons';

type NavigationProps = {
  logo: ButtonProps;
  linkList: Sections;
};

function Navigation(props: NavigationProps) {
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
  // TODO: handle outside click, handle scroll => close menu, etc

  const [showMenu, setShowMenu] = useState(false);

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <div className={styles.mobile}>
      <button className={styles.mobile__button} onClick={toggleMenu}>
        {showMenu ? ICONS.menuClose : ICONS.menuOpen}
      </button>

      <div className={clsx(styles.mobile__menu, showMenu ? styles.mobile__menu__show : styles.mobile__menu__hide)}>
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
