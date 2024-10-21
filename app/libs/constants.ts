export const weekEventHeightInRem = 5;
export const dateKeyFormat = "yyyyMMdd";
export const pxInOneRem = parseFloat(
  typeof window === "undefined"
    ? "16"
    : getComputedStyle(document.documentElement).fontSize,
);
export const pxInOneHour = weekEventHeightInRem * pxInOneRem;
export const calendarMinutesSteps = 15;
export const daysOfTheWeekNames = [
  "Lunes",
  "Martes",
  "Míercoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];
export const hoursOfDay = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];

export const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

/**
 * Expresión regular para validar tiempos en formato HH:mm (24 horas).
 * @type {RegExp}
 */
export const timeRegex: RegExp = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const timeDivisor = ":";
