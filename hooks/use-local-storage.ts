/**
 * A custom React hook for managing state that persists in localStorage.
 * - Syncs state across multiple tabs/windows
 * - Handles serialization/deserialization automatically
 * - Cleans up old keys when the key changes
 * - Provides type safety through generics
 */
import { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    if (typeof window === "undefined")
      return typeof initialValue === "function" ? initialValue() : initialValue;

    const valueInLocalStorage = window.localStorage.getItem(key);

    if (valueInLocalStorage) {
      try {
        return JSON.parse(valueInLocalStorage);
      } catch (error) {
        return window.localStorage.removeItem(key);
      }
    }

    return typeof initialValue === "function" ? initialValue() : initialValue;
  });

  const prevKeyRef = useRef(key);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prevKey = prevKeyRef.current;

    if (prevKey !== key) {
      try {
        window.localStorage.removeItem(prevKey);
      } catch (error) {
        console.warn(`Failed to remove old key "${prevKey}"`, error);
      }
    }

    prevKeyRef.current = key;

    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Failed to save state for key "${key}"`, error);
    }

    // Handle storage events from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setState(JSON.parse(e.newValue));
        } catch (error) {
          console.warn(
            `Failed to parse storage event value for key "${key}"`,
            error,
          );
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, state]);

  return [state, setState];
}
