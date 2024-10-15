import {
  CalendarEvent,
  CalendarEventId,
  GetEventsFilters,
} from "../entities/CalendarEvent";

export type SaveEvent = (event: CalendarEvent) => Promise<CalendarEvent>;

export type GetEvents = (
  filters: Required<NonNullable<GetEventsFilters>>,
) => Promise<CalendarEvent[]>;

export type GetEventById = (id: CalendarEventId) => Promise<CalendarEvent>;

export type UpdateEvent = (event: CalendarEvent) => Promise<CalendarEvent>;

export type DeleteEvent = (id: CalendarEventId) => Promise<void>;
