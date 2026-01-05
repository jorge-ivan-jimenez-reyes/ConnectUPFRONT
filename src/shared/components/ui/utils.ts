/**
 * ==========================================================================
 * UI UTILITIES - ConnectUP Design System
 * ==========================================================================
 * 
 * Utilidades para manejar clases CSS de forma consistente
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina clases de Tailwind de forma inteligente
 * - Resuelve conflictos (ej: "px-2 px-4" → "px-4")
 * - Maneja condicionales
 * - Elimina duplicados
 * 
 * @example
 * cn('px-2 py-1', condition && 'bg-red-500', 'px-4')
 * // → 'py-1 px-4 bg-red-500' (si condition es true)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Crea un ID único para componentes
 */
export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}
