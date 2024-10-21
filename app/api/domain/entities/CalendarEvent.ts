import { z } from "zod";

export const CalendarEventId = z.string().default("");

export type CalendarEventId = z.infer<typeof CalendarEventId>;

export const LocationSchema = z.object({
  id: z.number(),
  name: z.string(),
  region: z.string(),
  country: z.string(),
});
export type Location = z.infer<typeof LocationSchema>;

export const CalendarEventSchema = z.object({
  id: CalendarEventId,
  title: z.string(),
  location: LocationSchema,
  description: z.string().nullable().default(null),
  startDateTime: z.coerce.date(),
  endDateTime: z.coerce.date(),
  timezone: z.string(),
  isAllDay: z.boolean().default(false),
  color: z.string().nullable().default(null),
  durationInMinutes: z.number().default(0),
});
export type CalendarEvent = Readonly<z.infer<typeof CalendarEventSchema>>;

export const GetEventsFilters = z.object({
  month: z.coerce.number(),
  year: z.coerce.number(),
});

export type GetEventsFilters = Readonly<z.infer<typeof GetEventsFilters>>;
