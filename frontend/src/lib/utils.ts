import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDate(isoDateString: string | undefined) {
  if (isoDateString === undefined) return ''
  if (!isoDateString) return '';
  const date = new Date(isoDateString);
  return date.toLocaleDateString();
}