import {
  addMinutes,
  areIntervalsOverlapping,
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  getDate,
  setHours,
  setMinutes,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { formatDate } from "./format";
import { CalendarEventType } from "../types/CalendarEvent";
import {
  calendarMinutesSteps,
  currentTimezone,
  dateKeyFormat,
  timeDivisor,
} from "./constants";
import { TZDate, tzOffset } from "@date-fns/tz";
import { UTCDate } from "@date-fns/utc";

/**
 * Devuelve los días de la semana de la fecha proporcionada.
 *
 * @param {Date} date - Fecha para calcular la semana.
 * @returns {Date[]} - Array con los días de la semana.
 */
export const getDaysOfWeek = (date: Date): Date[] =>
  eachDayOfInterval({
    start: startOfWeek(date),
    end: endOfWeek(date),
  });

/**
 * Genera una cadena que representa la fecha como clave en un formato específico.
 *
 * @param {Date} date - Fecha a formatear como clave.
 * @param {string} [timezone=currentTimezone] - Zona horaria a utilizar.
 * @returns {string} - Fecha formateada como clave.
 */
export const generateDateAsKey = (
  date: Date,
  timezone: string = currentTimezone,
): string => formatDate(date, dateKeyFormat, timezone);

/**
 * Devuelve un array bidimensional con las semanas y días del mes especificado.
 *
 * @param {number} month - Mes del calendario (0 para enero, 11 para diciembre).
 * @param {number} year - Año del calendario.
 * @returns {Date[][]} - Array bidimensional donde cada subarray contiene los días de una semana.
 */
export const getCalendarWeeksWithDays = (
  month: number,
  year: number,
): Date[][] => {
  const firstDayOfTheMonth = new Date(year, month, 1);
  const start = startOfMonth(firstDayOfTheMonth);
  const end = endOfMonth(firstDayOfTheMonth);
  const weeks = eachWeekOfInterval({ start, end });

  return weeks.map((weekStartDay) => getDaysOfWeek(weekStartDay));
};

/**
 * Cuenta la cantidad de eventos que se solapan con el evento dado.
 *
 * @param {CalendarEventType} event - Evento de referencia.
 * @param {CalendarEventType[]} events - Lista de eventos para comparar.
 * @returns {number} - Cantidad de eventos que se solapan.
 */
export const countEventsOverlaping = (
  event: CalendarEventType,
  events: CalendarEventType[],
): number => {
  let overlaping = 0;
  events.forEach((eventToCompare) => {
    if (
      areIntervalsOverlapping(
        { start: event.startDateTime, end: event.endDateTime },
        {
          start: eventToCompare.startDateTime,
          end: eventToCompare.endDateTime,
        },
      )
    ) {
      overlaping++;
    }
  });
  return overlaping;
};

/**
 * Establece las horas y minutos de una fecha basándose en una cadena de tiempo en formato HH:mm.
 *
 * @param {Date | UTCDate | TZDate} date - Objeto de fecha.
 * @param {string} time - Tiempo en formato HH:mm.
 * @returns {Date} - Objeto de fecha con el tiempo ajustado.
 */
export const setTime = (date: Date | UTCDate | TZDate, time: string): Date => {
  if (!time) return date;
  const [hours, minutes] = time.split(timeDivisor).map((num) => Number(num));
  return setMinutes(setHours(date, hours), minutes);
};

/**
 * Devuelve la hora de una fecha en formato HH:mm.
 *
 * @param {Date} date - Objeto de fecha.
 * @param {string} [timezone] - Zona horaria opcional.
 * @returns {string} - Hora en formato HH:mm.
 */
export const getTime = (date: Date, timezone?: string): string => {
  return formatDate(date, "HH:mm", timezone);
};

/**
 * Función curried que establece las horas y minutos de una fecha.
 *
 * @param {Date} date - Objeto de fecha.
 * @returns {function(number): function(number): Date} - Función curried para establecer horas y minutos.
 */
export const setHoursAndMinutes =
  (date: Date) => (hours: number) => (minutes: number) =>
    setMinutes(setHours(date, hours), minutes);

/**
 * Redondea los minutos a los pasos definidos en `calendarMinutesSteps`.
 *
 * @param {number} minutes - Minutos a redondear.
 * @returns {number} - Minutos redondeados al paso más cercano.
 */
export const getMinutesInSteps = (minutes: number): number =>
  Math.round(minutes / calendarMinutesSteps) * calendarMinutesSteps;

/**
 * Corrige la zona horaria de una fecha basándose en el desfase de la zona horaria proporcionada.
 *
 * @param {Date} date - Objeto de fecha a corregir.
 * @param {string} timezone - Zona horaria a utilizar.
 * @returns {TZDate} - Nueva fecha con la zona horaria corregida.
 */
export const fixTimezone = (date: Date, timezone: string): TZDate => {
  const timezoneOffSet = tzOffset(currentTimezone, date);
  const dateWithTimezoneFixed = addMinutes(
    date,
    timezoneOffSet >= 0 ? timezoneOffSet : timezoneOffSet * -1,
  );
  const newDate = new TZDate(
    dateWithTimezoneFixed.getFullYear(),
    dateWithTimezoneFixed.getMonth(),
    getDate(dateWithTimezoneFixed),
    timezone,
  );
  return newDate;
};
