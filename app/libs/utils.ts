import axios from "axios";

/**
 * Tipo que representa una función de cancelación.
 */
type Cancel = () => void;

/**
 * Tipo que representa una solicitud cancelable.
 * @template T
 */
export type CancelableRequest<T> = {
  cancel: Cancel;
  request: Promise<T>;
};

/**
 * Maneja la creación de una solicitud cancelable.
 * @template T
 * @param {(signal: AbortSignal) => Promise<T>} promise - Función que devuelve una promesa y acepta una señal de aborto para su cancelación.
 * @returns {CancelableRequest<T>} Un objeto que contiene la función de cancelación y la promesa de la solicitud.
 */
export const handleCancelable = <T>(
  promise: <T>(signal: AbortSignal) => Promise<T>,
): CancelableRequest<T> => {
  const controller = new AbortController();
  const signal = controller.signal;

  return {
    cancel: () => {
      controller.abort();
    },
    request: new Promise<T>((resolve, reject) =>
      promise(signal)
        .then((result) => {
          resolve(result as T);
        })
        .catch((err) => {
          if (axios.isCancel(err)) return;
          reject(err);
        }),
    ),
  };
};
