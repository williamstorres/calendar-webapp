import {
  deleteEventPostgres,
  getEventsPostgres,
  saveEventPostgres,
  updateEventPostgres,
} from "@/app/api/adapters/eventPostgresRepository";
import { isLeft } from "@/app/api/core/Either";
import {
  CalendarEventSchema,
  GetEventsFilters,
} from "@/app/api/domain/entities/CalendarEvent";
import createEvent from "@/app/api/domain/use-cases/createEvent";
import deleteEvent from "@/app/api/domain/use-cases/deleteEvent";
import getEvents from "@/app/api/domain/use-cases/getEvents";
import updateEvent from "@/app/api/domain/use-cases/updateEvent";
import { nanoid } from "nanoid";
import { NextRequest } from "next/server";
import { pino } from "pino";

const logger = pino();

export async function GET(request: NextRequest) {
  const { success, data } = GetEventsFilters.safeParse({
    month: request.nextUrl.searchParams.get("month"),
    year: request.nextUrl.searchParams.get("year"),
  });
  const today = new Date();
  const filters = success
    ? data
    : { month: today.getMonth(), year: today.getFullYear() };
  const result = await getEvents({ logger, getEvents: getEventsPostgres })(
    filters,
  );
  return Response.json(result);
}

export async function POST(request: Request) {
  const { success, data, error } = CalendarEventSchema.safeParse(
    await request.json(),
  );
  if (!success) return Response.json(error, { status: 400 });

  const result = await createEvent({
    logger,
    saveEvent: saveEventPostgres,
    generateId: nanoid,
  })(data);
  if (isLeft(result)) Response.json(result.value, { status: 400 });

  return Response.json(result.value, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (id === null) return Response.json({}, { status: 400 });

  const result = await deleteEvent({
    logger,
    deleteEvent: deleteEventPostgres,
  })(id);
  if (isLeft(result)) return Response.json(result.value, { status: 400 });

  return Response.json({});
}

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (id === null) return Response.json({}, { status: 400 });

  const { success, data, error } = CalendarEventSchema.safeParse(
    await request.json(),
  );
  if (!success) return Response.json(error, { status: 400 });

  const result = await updateEvent({
    logger,
    updateEvent: updateEventPostgres,
  })(data);
  if (isLeft(result)) return Response.json(result.value, { status: 400 });

  return Response.json(result.value);
}
