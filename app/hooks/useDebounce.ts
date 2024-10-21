import { useState, useEffect } from "react";

/**
 * Hook que retorna un valor que se debouncifica, es decir, retrasa su actualización hasta que no se producen cambios durante un periodo de tiempo especificado.
 *
 * @template T
 * @param {T} initValue - El valor inicial que se va a debouncificar.
 * @param {number} [delay=500] - El tiempo en milisegundos que debe transcurrir antes de que el valor se actualice.
 * @returns {[T, (val: T) => void]} Un array que contiene:
 *  - El valor debouncificado.
 *  - Una función para actualizar el valor original.
 *
 * @example
 * const [debouncedValue, setValue] = useDebounce<string>("", 300);
 *
 * const handleChange = (event) => {
 *   setValue(event.target.value);
 * };
 */
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
