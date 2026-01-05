/**
 * ==========================================================================
 * BUTTON COMPONENT - ConnectUP Design System
 * ==========================================================================
 * 
 * Componente Button reutilizable con variantes y tamaños.
 * Usa class-variance-authority (CVA) para gestionar estilos.
 * 
 * @example
 * <Button variant="primary" size="md">Click me</Button>
 * <Button variant="outline" size="sm" isLoading>Loading...</Button>
 * <Button variant="ghost" leftIcon={<Icon />}>With Icon</Button>
 */

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

/* ══════════════════════════════════════════════════════════════════════
 * BUTTON VARIANTS (CVA)
 * ══════════════════════════════════════════════════════════════════════ */

const buttonVariants = cva(
  // Base styles - aplicados a todas las variantes
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium',
    'transition-all duration-200',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    'select-none',
  ],
  {
    variants: {
      /* Variant - Estilo visual */
      variant: {
        primary: [
          'bg-brand-primary text-white',
          'hover:bg-brand-primary-hover',
          'active:bg-brand-primary-active',
          'focus-visible:ring-brand-primary',
          'shadow-button hover:shadow-button-hover',
        ],
        secondary: [
          'bg-brand-secondary text-white',
          'hover:bg-brand-secondary-hover',
          'active:bg-brand-secondary-active',
          'focus-visible:ring-brand-secondary',
          'shadow-button hover:shadow-button-hover',
        ],
        accent: [
          'bg-brand-accent text-white',
          'hover:bg-brand-accent-hover',
          'focus-visible:ring-brand-accent',
          'shadow-button hover:shadow-button-hover',
        ],
        outline: [
          'border-2 border-brand-primary',
          'text-brand-primary bg-transparent',
          'hover:bg-brand-primary hover:text-white',
          'focus-visible:ring-brand-primary',
        ],
        'outline-secondary': [
          'border-2 border-brand-secondary',
          'text-brand-secondary bg-transparent',
          'hover:bg-brand-secondary hover:text-white',
          'focus-visible:ring-brand-secondary',
        ],
        ghost: [
          'text-content-secondary bg-transparent',
          'hover:bg-bg-tertiary hover:text-content-primary',
          'focus-visible:ring-gray-400',
        ],
        link: [
          'text-content-link bg-transparent underline-offset-4',
          'hover:underline hover:text-content-link-hover',
          'focus-visible:ring-brand-primary',
          'p-0 h-auto',
        ],
        danger: [
          'bg-error-500 text-white',
          'hover:bg-error-600',
          'active:bg-error-700',
          'focus-visible:ring-error-500',
          'shadow-button hover:shadow-button-hover',
        ],
        success: [
          'bg-success-500 text-white',
          'hover:bg-success-600',
          'active:bg-success-700',
          'focus-visible:ring-success-500',
          'shadow-button hover:shadow-button-hover',
        ],
      },
      /* Size - Tamaño del botón */
      size: {
        xs: 'h-7 px-2 text-xs rounded-md',
        sm: 'h-8 px-3 text-sm rounded-md',
        md: 'h-10 px-4 text-sm rounded-button',
        lg: 'h-12 px-6 text-base rounded-button',
        xl: 'h-14 px-8 text-lg rounded-button',
        icon: 'h-10 w-10 rounded-button p-0',
        'icon-sm': 'h-8 w-8 rounded-md p-0',
        'icon-lg': 'h-12 w-12 rounded-button p-0',
      },
      /* FullWidth - Ancho completo */
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

/* ══════════════════════════════════════════════════════════════════════
 * SPINNER COMPONENT
 * ══════════════════════════════════════════════════════════════════════ */

const Spinner: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={cn('animate-spin', className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

/* ══════════════════════════════════════════════════════════════════════
 * BUTTON TYPES
 * ══════════════════════════════════════════════════════════════════════ */

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Muestra spinner de carga */
  isLoading?: boolean;
  /** Texto mientras carga */
  loadingText?: string;
  /** Icono a la izquierda */
  leftIcon?: React.ReactNode;
  /** Icono a la derecha */
  rightIcon?: React.ReactNode;
  /** Renderizar como otro elemento (ej: 'a' para links) */
  as?: React.ElementType;
}

/* ══════════════════════════════════════════════════════════════════════
 * BUTTON COMPONENT
 * ══════════════════════════════════════════════════════════════════════ */

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      disabled,
      children,
      as: Component = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <Component
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={isLoading}
        {...props}
      >
        {/* Loading Spinner */}
        {isLoading && (
          <Spinner
            className={cn(
              size === 'xs' || size === 'sm' || size === 'icon-sm'
                ? 'h-3 w-3'
                : 'h-4 w-4'
            )}
          />
        )}

        {/* Left Icon */}
        {!isLoading && leftIcon && (
          <span className="inline-flex shrink-0">{leftIcon}</span>
        )}

        {/* Content */}
        {isLoading && loadingText ? loadingText : children}

        {/* Right Icon */}
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </Component>
    );
  }
);

Button.displayName = 'Button';

/* ══════════════════════════════════════════════════════════════════════
 * EXPORTS
 * ══════════════════════════════════════════════════════════════════════ */

export { buttonVariants };
export default Button;
