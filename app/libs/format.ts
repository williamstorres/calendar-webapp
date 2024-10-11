import { es } from "date-fns/locale";
import { setDefaultOptions } from "date-fns";
import { format } from "date-fns";

setDefaultOptions({ locale: es });

export const formatDate = (date: Date, dateFormat: string) =>
  format(date, dateFormat);
