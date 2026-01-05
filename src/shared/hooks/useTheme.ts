/**
 * ==========================================================================
 * USE THEME HOOK - ConnectUP Design System
 * ==========================================================================
 * 
 * Hook para manejar el tema (light/dark) de la aplicación.
 * Persiste la preferencia en localStorage y respeta la preferencia del sistema.
 * 
 * @example
 * const { theme, setTheme, toggleTheme, isDark } = useTheme();
 */

import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface UseThemeReturn {
  /** Tema actual ('light', 'dark', o 'system') */
  theme: Theme;
  /** Tema resuelto (siempre 'light' o 'dark') */
  resolvedTheme: 'light' | 'dark';
  /** Establecer tema */
  setTheme: (theme: Theme) => void;
  /** Alternar entre light y dark */
  toggleTheme: () => void;
  /** ¿Es modo oscuro? */
  isDark: boolean;
  /** ¿Es modo claro? */
  isLight: boolean;
}

const THEME_KEY = 'connectup-theme';

/**
 * Obtiene la preferencia del sistema
 */
function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/**
 * Obtiene el tema guardado o el del sistema
 */
function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  
  const stored = localStorage.getItem(THEME_KEY) as Theme | null;
  if (stored && ['light', 'dark', 'system'].includes(stored)) {
    return stored;
  }
  
  return 'system';
}

/**
 * Resuelve el tema final (light o dark)
 */
function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'system') {
    return getSystemTheme();
  }
  return theme;
}

/**
 * Hook para manejar el tema de la aplicación
 */
export function useTheme(): UseThemeReturn {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() =>
    resolveTheme(getInitialTheme())
  );

  // Aplicar tema al documento
  useEffect(() => {
    const resolved = resolveTheme(theme);
    setResolvedTheme(resolved);

    // Aplicar al documento
    const root = document.documentElement;
    root.setAttribute('data-theme', resolved);
    
    // También agregar/quitar clase para compatibilidad con Tailwind dark mode
    if (resolved === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Guardar en localStorage
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // Escuchar cambios en la preferencia del sistema
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setResolvedTheme(e.matches ? 'dark' : 'light');
      document.documentElement.setAttribute(
        'data-theme',
        e.matches ? 'dark' : 'light'
      );
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Establecer tema
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  // Alternar tema
  const toggleTheme = useCallback(() => {
    setThemeState((current) => {
      const resolved = resolveTheme(current);
      return resolved === 'dark' ? 'light' : 'dark';
    });
  }, []);

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
  };
}

export default useTheme;
