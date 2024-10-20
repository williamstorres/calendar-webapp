import { generateDateAsKey } from "@/app/libs/date";
import { differenceInMinutes } from "date-fns";
import { http, HttpResponse } from "msw";
import { nanoid } from "nanoid";

const createEvent = (
  day: Date,
  startHour: number,
  startMinute: number,
  endHour: number,
  endMinute: number,
) => {
  const eventStartDate = new Date(
    day.getFullYear(),
    day.getMonth(),
    day.getDate(),
    startHour,
    startMinute,
  );
  const eventEndDate = new Date(
    day.getFullYear(),
    day.getMonth(),
    day.getDate(),
    endHour,
    endMinute,
  );
  return {
    id: nanoid(),
    title: "prueba",
    description: "esto es un evento de prueba",
    startDateTime: eventStartDate.toISOString(),
    endDateTime: eventEndDate.toISOString(),
    durationInMinutes: differenceInMinutes(eventEndDate, eventStartDate),
    isAllDay: false,
    color: "#2563eb",
  };
};

export const getMonthlyEvents = () => {
  const firstDate = new Date();
  const secondDate = new Date();
  secondDate.setDate(secondDate.getDate() - 1);
  const response = {
    [generateDateAsKey(firstDate)]: [
      createEvent(firstDate, 10, 30, 11, 0),
      createEvent(firstDate, 10, 0, 11, 30),
      createEvent(firstDate, 7, 0, 8, 0),
    ],
    [generateDateAsKey(secondDate)]: [createEvent(secondDate, 9, 0, 9, 30)],
  };
  return response;
};

export const handlers = [
  http.get("http://localhost:3000/api/events", () => {
    return HttpResponse.json(getMonthlyEvents());
  }),
];
