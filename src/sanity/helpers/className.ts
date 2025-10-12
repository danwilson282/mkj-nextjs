import { twMerge } from 'tailwind-merge';
import clsx, { ClassValue } from 'clsx';

/**
 * Combines base Tailwind classes with additional ones,
 * resolving any conflicts (e.g. 'px-4' vs 'px-2').
 *
 * @param base - Base class string
 * @param extras - Additional class values (from props, conditions, etc.)
 * @returns Final merged class string
 */
export function cn(base: string, ...extras: ClassValue[]): string {
  return twMerge(clsx(base, ...extras));
}
