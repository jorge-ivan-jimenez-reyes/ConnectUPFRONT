/**
 * ==========================================================================
 * UI COMPONENTS INDEX - ConnectUP Design System
 * ==========================================================================
 * 
 * Exportaciones centralizadas de todos los componentes UI.
 * 
 * @example
 * import { Button, Input, Card, ThemeToggle } from '@/shared/components/ui';
 */

// Utilities
export { cn, generateId } from './utils';

// Button
export { Button, buttonVariants } from './Button';
export type { ButtonProps } from './Button';

// Input
export { Input, inputVariants, labelVariants } from './Input';
export type { InputProps } from './Input';

// Card
export { Card, cardVariants } from './Card';
export type { CardProps, CardHeaderProps, CardTitleProps, CardFooterProps } from './Card';

// Theme Toggle
export { ThemeToggle } from './ThemeToggle';
