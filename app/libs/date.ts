import {
  areIntervalsOverlapping,
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  setHours,
  setMinutes,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { formatDate } from "./format";
import { CalendarEventType } from "../types/CalendarEvent";
import { calendarMinutesSteps, DateKeyFormat } from "../constants";

export const TimeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const getDaysOfWeek = (date: Date) =>
  eachDayOfInterval({
    start: startOfWeek(date),
    end: endOfWeek(date),
  });

export const generateDateAsKey = (date: Date) =>
  formatDate(date, DateKeyFormat);

export const getCalendarWeeksWithDays = (
  month: number,
  year: number,
): Date[][] => {
  const firstDayOfTheMonth = new Date(year, month, 1);
  const start = startOfMonth(firstDayOfTheMonth);
  const end = endOfMonth(firstDayOfTheMonth);
  const weeks = eachWeekOfInterval({ start, end });

  return weeks.map((weekStartDay) => getDaysOfWeek(weekStartDay));
};

//TODO refactorizar
// return cuantity of overlaping events and the max duration
export const countEventsOverlaping = (
  event: CalendarEventType,
  events: CalendarEventType[],
) => {
  let overlaping = 0;
  events.forEach((eventToCompare) => {
    if (
      areIntervalsOverlapping(
        { start: event.startDateTime, end: event.endDateTime },
        {
          start: eventToCompare.startDateTime,
          end: eventToCompare.endDateTime,
        },
      )
    ) {
      overlaping++;
    }
  });
  return overlaping;
};

const TimeDivisor = ":";
export const setTime = (date: Date, time: string) => {
  if (!time) return date;
  const [hours, minutes] = time.split(TimeDivisor).map((num) => Number(num));
  return setMinutes(setHours(date, hours), minutes);
};

export const getTime = (date: Date) => {
  return format(date, "HH:mm");
};

export const setHoursAndMinutes =
  (date: Date) => (hours: number) => (minutes: number) =>
    setMinutes(setHours(date, hours), minutes);

export const getMinutesInSteps = (minutes: number) =>
  Math.round(minutes / calendarMinutesSteps) * calendarMinutesSteps;
