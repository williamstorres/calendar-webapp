import { es } from "date-fns/locale";
import { setDefaultOptions } from "date-fns";
import { format } from "date-fns";
import { tz } from "@date-fns/tz";
import { currentTimezone } from "../constants";

setDefaultOptions({ locale: es });

export const formatDate = (
  date: Date,
  dateFormat: string,
  timezone: string = currentTimezone,
) => {
  return format(date, dateFormat, { in: tz(timezone) });
};

export const formatTime = (hour: number, minutes = 0) => {
  const hourFormated = hour.toString().padStart(2, "0");
  const minutesFormated = minutes.toString().padStart(2, "0");
  return `${hourFormated}:${minutesFormated}`;
};
