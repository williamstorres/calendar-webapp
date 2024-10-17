export const WeekEventHeightInRem = 5;
export const DateKeyFormat = "yyyyMMdd";
export const PxInOneRem = parseFloat(
  typeof window === "undefined"
    ? "16"
    : getComputedStyle(document.documentElement).fontSize,
);
export const PxInOneHour = WeekEventHeightInRem * PxInOneRem;
