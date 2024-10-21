import { es } from "date-fns/locale";
import { setDefaultOptions } from "date-fns";
import { format } from "date-fns";
import { tz } from "@date-fns/tz";
import { currentTimezone } from "./constants";

setDefaultOptions({ locale: es });

/**
 * Formatea una fecha en un formato específico y ajusta la zona horaria.
 *
 * @param {Date} date - La fecha a formatear.
 * @param {string} dateFormat - El formato deseado para la fecha.
 * @param {string} [timezone=currentTimezone] - La zona horaria a utilizar (por defecto, se usa la zona horaria actual).
 * @returns {string} - La fecha formateada como una cadena.
 */
export const formatDate = (
  date: Date,
  dateFormat: string,
  timezone: string = currentTimezone,
): string => {
  return format(date, dateFormat, { in: tz(timezone) });
};

/**
 * Formatea la hora y los minutos en una cadena de texto en formato HH:mm.
 *
 * @param {number} hour - La hora a formatear (0-23).
 * @param {number} [minutes=0] - Los minutos a formatear (0-59).
 * @returns {string} - La hora formateada en formato HH:mm.
 */
export const formatTime = (hour: number, minutes: number = 0): string => {
  const hourFormated = hour.toString().padStart(2, "0");
  const minutesFormated = minutes.toString().padStart(2, "0");
  return `${hourFormated}:${minutesFormated}`;
};
