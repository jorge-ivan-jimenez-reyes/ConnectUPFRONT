/**
 * ==========================================================================
 * INPUT COMPONENT - ConnectUP Design System
 * ==========================================================================
 * 
 * Componente Input reutilizable con variantes, estados y addons.
 * 
 * @example
 * <Input placeholder="Email" type="email" />
 * <Input label="Password" type="password" error="Required field" />
 * <Input leftAddon={<Icon />} rightAddon={<Button />} />
 */

import React, { forwardRef, useId } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

/* ══════════════════════════════════════════════════════════════════════
 * INPUT VARIANTS (CVA)
 * ══════════════════════════════════════════════════════════════════════ */

const inputVariants = cva(
  // Base styles
  [
    'w-full',
    'bg-surface-primary',
    'border border-border-primary',
    'text-content-primary placeholder:text-content-muted',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-bg-tertiary',
  ],
  {
    variants: {
      /* Variant - Estilo visual */
      variant: {
        default: [
          'focus:border-border-focus focus:ring-brand-primary/20',
        ],
        filled: [
          'bg-bg-tertiary border-transparent',
          'focus:bg-surface-primary focus:border-border-focus focus:ring-brand-primary/20',
        ],
        flushed: [
          'border-0 border-b-2 rounded-none px-0',
          'focus:border-border-focus focus:ring-0',
        ],
      },
      /* Size - Tamaño */
      size: {
        sm: 'h-8 px-3 text-sm rounded-md',
        md: 'h-10 px-3 text-sm rounded-input',
        lg: 'h-12 px-4 text-base rounded-input',
      },
      /* Estado de error */
      isInvalid: {
        true: [
          'border-error-500',
          'focus:border-error-500 focus:ring-error-500/20',
        ],
      },
      /* Estado de éxito */
      isValid: {
        true: [
          'border-success-500',
          'focus:border-success-500 focus:ring-success-500/20',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const labelVariants = cva(
  'block text-sm font-medium text-content-primary mb-1.5',
  {
    variants: {
      required: {
        true: "after:content-['*'] after:ml-0.5 after:text-error-500",
      },
    },
  }
);

/* ══════════════════════════════════════════════════════════════════════
 * INPUT TYPES
 * ══════════════════════════════════════════════════════════════════════ */

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Label del input */
  label?: string;
  /** Mensaje de error */
  error?: string;
  /** Mensaje de ayuda */
  helperText?: string;
  /** Elemento a la izquierda (dentro del input) */
  leftAddon?: React.ReactNode;
  /** Elemento a la derecha (dentro del input) */
  rightAddon?: React.ReactNode;
  /** Elemento antes del input (fuera) */
  leftElement?: React.ReactNode;
  /** Elemento después del input (fuera) */
  rightElement?: React.ReactNode;
  /** Contenedor className */
  containerClassName?: string;
  /** Input className */
  inputClassName?: string;
}

/* ══════════════════════════════════════════════════════════════════════
 * INPUT COMPONENT
 * ══════════════════════════════════════════════════════════════════════ */

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      inputClassName,
      variant,
      size,
      isInvalid,
      isValid,
      label,
      error,
      helperText,
      leftAddon,
      rightAddon,
      leftElement,
      rightElement,
      required,
      disabled,
      id: providedId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const hasError = Boolean(error) || isInvalid;
    const hasSuccess = isValid && !hasError;

    return (
      <div className={cn('w-full', containerClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            className={labelVariants({ required })}
          >
            {label}
          </label>
        )}

        {/* Input Container */}
        <div className="relative flex items-center">
          {/* Left Element (outside) */}
          {leftElement && (
            <div className="mr-2 flex-shrink-0">{leftElement}</div>
          )}

          {/* Input Wrapper */}
          <div className="relative flex-1">
            {/* Left Addon (inside) */}
            {leftAddon && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-content-muted">
                {leftAddon}
              </div>
            )}

            {/* Input */}
            <input
              ref={ref}
              id={id}
              disabled={disabled}
              required={required}
              aria-invalid={hasError}
              aria-describedby={
                error ? `${id}-error` : helperText ? `${id}-helper` : undefined
              }
              className={cn(
                inputVariants({
                  variant,
                  size,
                  isInvalid: hasError,
                  isValid: hasSuccess,
                }),
                leftAddon && 'pl-10',
                rightAddon && 'pr-10',
                inputClassName,
                className
              )}
              {...props}
            />

            {/* Right Addon (inside) */}
            {rightAddon && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted">
                {rightAddon}
              </div>
            )}
          </div>

          {/* Right Element (outside) */}
          {rightElement && (
            <div className="ml-2 flex-shrink-0">{rightElement}</div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p
            id={`${id}-error`}
            className="mt-1.5 text-sm text-error-500"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Helper Text */}
        {helperText && !error && (
          <p
            id={`${id}-helper`}
            className="mt-1.5 text-sm text-content-tertiary"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

/* ══════════════════════════════════════════════════════════════════════
 * EXPORTS
 * ══════════════════════════════════════════════════════════════════════ */

export { inputVariants, labelVariants };
export default Input;
