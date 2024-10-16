import { setTime, TimeRegex } from "@/app/libs/date";
import { isAfter } from "date-fns";
import { z } from "zod";

export const eventFormSchema = z
  .object({
    title: z.string().min(1, "Debes ingresar el titulo del evento"),
    location: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    isAllDay: z.boolean(),
    startTime: z
      .string()
      .min(1, "Debes ingresar la hora de inicio")
      .regex(TimeRegex),
    endTime: z
      .string()
      .min(1, "Debes ingresar la hora de termino")
      .regex(TimeRegex),
  })
  .refine(
    (data) =>
      isAfter(
        setTime(data.date, data.endTime),
        setTime(data.date, data.startTime),
      ),
    {
      message: "La hora de termino debe ser posterior a la de inicio",
      path: ["endTime"],
    },
  );
export type FormFields = z.infer<typeof eventFormSchema>;
