'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  // Detect initial theme
  useEffect(() => {
    const cookieTheme = Cookies.get('theme') as Theme | undefined;

    if (cookieTheme === 'light' || cookieTheme === 'dark') {
      setTheme(cookieTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Sync cookie
  useEffect(() => {
    if (theme) {
      Cookies.set('theme', theme, { path: '/', sameSite: 'lax' });
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    if (!theme) return;
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  if (!theme) {
    return null;
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside a ThemeProvider');
  }
  return context;
}
