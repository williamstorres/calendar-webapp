import {
  boolean,
  pgTable,
  text,
  timestamp,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

const timestamps = {
  deleted: boolean().notNull().default(false),
  updated_at: timestamp({ mode: "date" }),
  created_at: timestamp().defaultNow().notNull(),
  deleted_at: timestamp({ mode: "date" }),
};

export const usersTable = pgTable("users", {
  id: varchar("id", { length: 21 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  ...timestamps,
});

export const calendarEventsTable = pgTable("calendar_events", {
  id: varchar({ length: 21 }).primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  startDateTime: timestamp({ mode: "date" }).notNull(),
  endDateTime: timestamp({ mode: "date" }).notNull(),
  isAllDay: boolean().notNull().default(false),
  color: varchar({ length: 5 }),
  durationInMinutes: integer().notNull(),
  ...timestamps,
});
