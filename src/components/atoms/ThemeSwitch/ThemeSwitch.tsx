'use client';

import { useTheme } from '@/contexts/themeContext';
import styles from './themeSwitch.module.scss';

export function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={styles.themeSwitch}>
      <label className={styles.switch}>
        <input
          className={styles.switch__input}
          type="checkbox"
          role="switch"
          onChange={toggleTheme}
          checked={theme === 'dark'}
        />
        <span className={styles.switch__sr}>Dark mode</span>
      </label>
    </div>
  );
}
