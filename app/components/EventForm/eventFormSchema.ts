import { timeRegex } from "@/app/libs/constants";
import { setTime } from "@/app/libs/date";
import { isAfter, addDays } from "date-fns";
import { z } from "zod";

export const eventFormSchema = z
  .object({
    title: z.string().min(1, "Debes ingresar el titulo del evento"),
    location: z.string().min(1, "Debes ingresar la ubicación"),
    description: z.string(),
    date: z.coerce.date(),
    timezone: z.string().min(1, "Debes ingresar la zona horaria"),
    isAllDay: z.boolean(),
    startTime: z
      .string()
      .min(1, "Debes ingresar la hora de inicio")
      .regex(timeRegex),
    endTime: z
      .string()
      .min(1, "Debes ingresar la hora de termino")
      .regex(timeRegex),
  })
  .refine(
    (data) => {
      const endDateTime = setTime(data.date, data.endTime);
      return isAfter(
        data.endTime === "00:00" ? addDays(endDateTime, 1) : endDateTime,
        setTime(data.date, data.startTime),
      );
    },
    {
      message: "La hora de termino debe ser posterior a la de inicio",
      path: ["endTime"],
    },
  );
export type FormFields = z.infer<typeof eventFormSchema>;
