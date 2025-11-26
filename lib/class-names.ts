import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function classNames(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Keep the shorthand commonly used across the codebase.
export const cn = classNames;
