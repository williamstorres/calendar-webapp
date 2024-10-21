import { endOfDay, endOfMonth } from "date-fns";
import {
  DeleteEvent,
  GetEventById,
  GetEvents,
  SaveEvent,
  UpdateEvent,
} from "../domain/ports/eventRepository";
import { connection } from "./db/connection";
import { calendarEventsTable } from "./db/schema";
import { and, eq, getTableColumns, gte, lte } from "drizzle-orm";
import {
  CalendarEventId,
  GetEventsFilters,
  CalendarEvent,
} from "../domain/entities/CalendarEvent";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { updated_at, created_at, deleted_at, deleted, ...columns } =
  getTableColumns(calendarEventsTable);

export const saveEventPostgres: SaveEvent = async (event: CalendarEvent) => {
  const db = await connection();
  await db.insert(calendarEventsTable).values(event);
  return event;
};

export const getEventsPostgres: GetEvents = async ({
  month,
  year,
}: GetEventsFilters) => {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = endOfDay(endOfMonth(firstDayOfMonth));

  const db = await connection();

  const events = await db
    .select(columns)
    .from(calendarEventsTable)
    .where(
      and(
        eq(calendarEventsTable.deleted, false),
        gte(calendarEventsTable.startDateTime, firstDayOfMonth),
        lte(calendarEventsTable.startDateTime, lastDayOfMonth),
      ),
    );
  return events;
};

export const getEventByIdPostgres: GetEventById = async (
  id: CalendarEventId,
) => {
  const db = await connection();

  const result = await db
    .select(columns)
    .from(calendarEventsTable)
    .where(eq(calendarEventsTable.id, id as string));

  return result[0];
};

export const updateEventPostgres: UpdateEvent = async (
  event: CalendarEvent,
) => {
  const db = await connection();
  const { id, ...eventToUpdate } = event;
  await db
    .update(calendarEventsTable)
    .set({ ...eventToUpdate, updated_at: new Date() })
    .where(eq(calendarEventsTable.id, id as string));

  return event;
};

export const deleteEventPostgres: DeleteEvent = async (id: CalendarEventId) => {
  const db = await connection();

  const eventToUpdate = (
    await db
      .select()
      .from(calendarEventsTable)
      .where(eq(calendarEventsTable.id, id as string))
  )[0];

  await db
    .update(calendarEventsTable)
    .set({ ...eventToUpdate, deleted: true, deleted_at: new Date() })
    .where(eq(calendarEventsTable.id, id));
};
