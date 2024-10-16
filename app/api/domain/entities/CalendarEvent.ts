import { z } from "zod";

export const CalendarEventId = z.string().default("");

export type CalendarEventId = z.infer<typeof CalendarEventId>;

export const CalendarEvent = z.object({
  id: CalendarEventId,
  title: z.string(),
  description: z.string().nullable().default(null),
  startDateTime: z.coerce.date(),
  endDateTime: z.coerce.date(),
  isAllDay: z.boolean().default(false),
  color: z.string().nullable().default(null),
  durationInMinutes: z.number().nullable(),
});
export type CalendarEvent = Readonly<z.infer<typeof CalendarEvent>>;

export const GetEventsFilters = z.object({
  month: z.coerce.number(),
  year: z.coerce.number(),
});

export type GetEventsFilters = Readonly<z.infer<typeof GetEventsFilters>>;
