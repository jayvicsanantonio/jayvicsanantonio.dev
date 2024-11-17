import { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    const valueInLocalStorage = window?.localStorage?.getItem(key);

    if (valueInLocalStorage) {
      try {
        return JSON.parse(valueInLocalStorage);
      } catch (error) {
        return window?.localStorage.removeItem(key);
      }
    }

    return typeof initialValue === "function" ? initialValue() : initialValue;
  });

  const prevKeyRef = useRef(key);

  useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window?.localStorage?.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
