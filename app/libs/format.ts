import { es } from "date-fns/locale";
import { setDefaultOptions } from "date-fns";
import { format } from "date-fns";

setDefaultOptions({ locale: es });

export const formatDate = (date: Date, dateFormat: string) =>
  format(date, dateFormat);

export const formatHour = (hour: number, minutes = 0) => {
  const hourFormated = hour.toString().padStart(2, "0");
  const minutesFormated = minutes.toString().padStart(2, "0");
  return `${hourFormated}:${minutesFormated}`;
};
