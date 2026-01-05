/**
 * ==========================================================================
 * CARD COMPONENT - ConnectUP Design System
 * ==========================================================================
 * 
 * Componente Card reutilizable con variantes y subcomponentes.
 * 
 * @example
 * <Card>
 *   <Card.Header>
 *     <Card.Title>Title</Card.Title>
 *     <Card.Description>Description</Card.Description>
 *   </Card.Header>
 *   <Card.Body>Content</Card.Body>
 *   <Card.Footer>Footer</Card.Footer>
 * </Card>
 */

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

/* ══════════════════════════════════════════════════════════════════════
 * CARD VARIANTS (CVA)
 * ══════════════════════════════════════════════════════════════════════ */

const cardVariants = cva(
  // Base styles
  [
    'rounded-card',
    'bg-surface-primary',
    'overflow-hidden',
  ],
  {
    variants: {
      /* Variant - Estilo visual */
      variant: {
        default: [
          'border border-border-primary',
          'shadow-card',
        ],
        elevated: [
          'shadow-lg',
          'hover:shadow-xl transition-shadow duration-200',
        ],
        outline: [
          'border-2 border-border-primary',
        ],
        ghost: [
          'bg-transparent',
        ],
        filled: [
          'bg-bg-secondary',
        ],
      },
      /* Padding */
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      /* Hoverable */
      hoverable: {
        true: [
          'cursor-pointer',
          'transition-all duration-200',
          'hover:shadow-card-hover hover:border-border-secondary',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'none',
    },
  }
);

/* ══════════════════════════════════════════════════════════════════════
 * CARD TYPES
 * ══════════════════════════════════════════════════════════════════════ */

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /** Renderizar como otro elemento */
  as?: React.ElementType;
}

/* ══════════════════════════════════════════════════════════════════════
 * CARD COMPONENT
 * ══════════════════════════════════════════════════════════════════════ */

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      padding,
      hoverable,
      as: Component = 'div',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(cardVariants({ variant, padding, hoverable, className }))}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

CardRoot.displayName = 'Card';

/* ══════════════════════════════════════════════════════════════════════
 * CARD HEADER
 * ══════════════════════════════════════════════════════════════════════ */

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Con borde inferior */
  bordered?: boolean;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, bordered = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'px-6 py-4',
          bordered && 'border-b border-border-primary',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

/* ══════════════════════════════════════════════════════════════════════
 * CARD TITLE
 * ══════════════════════════════════════════════════════════════════════ */

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Nivel del heading */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = 'h3', children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'text-lg font-semibold text-content-primary',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

CardTitle.displayName = 'CardTitle';

/* ══════════════════════════════════════════════════════════════════════
 * CARD DESCRIPTION
 * ══════════════════════════════════════════════════════════════════════ */

const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('text-sm text-content-secondary mt-1', className)}
      {...props}
    >
      {children}
    </p>
  );
});

CardDescription.displayName = 'CardDescription';

/* ══════════════════════════════════════════════════════════════════════
 * CARD BODY
 * ══════════════════════════════════════════════════════════════════════ */

const CardBody = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('px-6 py-4', className)}
      {...props}
    >
      {children}
    </div>
  );
});

CardBody.displayName = 'CardBody';

/* ══════════════════════════════════════════════════════════════════════
 * CARD FOOTER
 * ══════════════════════════════════════════════════════════════════════ */

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Con borde superior */
  bordered?: boolean;
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, bordered = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'px-6 py-4',
          bordered && 'border-t border-border-primary bg-bg-secondary',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

/* ══════════════════════════════════════════════════════════════════════
 * COMPOUND COMPONENT
 * ══════════════════════════════════════════════════════════════════════ */

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Body: CardBody,
  Footer: CardFooter,
});

/* ══════════════════════════════════════════════════════════════════════
 * EXPORTS
 * ══════════════════════════════════════════════════════════════════════ */

export { cardVariants };
export type { CardHeaderProps, CardTitleProps, CardFooterProps };
export default Card;
