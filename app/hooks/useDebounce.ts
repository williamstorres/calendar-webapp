import { useState, useEffect } from "react";

export const useDebounce = <T>(
  initValue: T,
  delay: number = 500,
): [T, (val: T) => void] => {
  const [debouncedValue, setDebouncedValue] = useState<T>(initValue);
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return [debouncedValue, setValue];
};
