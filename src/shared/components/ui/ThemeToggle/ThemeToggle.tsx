/**
 * ==========================================================================
 * THEME TOGGLE COMPONENT - ConnectUP Design System
 * ==========================================================================
 * 
 * Botón para alternar entre modo claro y oscuro.
 * 
 * @example
 * <ThemeToggle />
 * <ThemeToggle showLabel />
 */

import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { Button } from '../Button';
import { cn } from '../utils';

interface ThemeToggleProps {
  /** Mostrar etiqueta con el tema actual */
  showLabel?: boolean;
  /** Clase CSS adicional */
  className?: string;
}

// Iconos SVG inline para evitar dependencias
const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  showLabel = false,
  className,
}) => {
  const { isDark, toggleTheme, resolvedTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size={showLabel ? 'md' : 'icon'}
      onClick={toggleTheme}
      className={cn('gap-2', className)}
      aria-label={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
      title={`Modo ${resolvedTheme === 'dark' ? 'oscuro' : 'claro'}`}
    >
      {isDark ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
      {showLabel && (
        <span className="capitalize">{resolvedTheme}</span>
      )}
    </Button>
  );
};

export default ThemeToggle;
