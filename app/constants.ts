export const WeekEventHeightInRem = 5;
export const DateKeyFormat = "yyyyMMdd";
export const PxInOneRem = parseFloat(
  typeof window === "undefined"
    ? "16"
    : getComputedStyle(document.documentElement).fontSize,
);
export const PxInOneHour = WeekEventHeightInRem * PxInOneRem;
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
