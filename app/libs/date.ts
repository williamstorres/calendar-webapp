import {
  addMinutes,
  areIntervalsOverlapping,
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  getDate,
  setHours,
  setMinutes,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { formatDate } from "./format";
import { CalendarEventType } from "../types/CalendarEvent";
import {
  calendarMinutesSteps,
  currentTimezone,
  DateKeyFormat,
} from "../constants";
import { TZDate, tzOffset } from "@date-fns/tz";
import { UTCDate } from "@date-fns/utc";

export const TimeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const getDaysOfWeek = (date: Date) =>
  eachDayOfInterval({
    start: startOfWeek(date),
    end: endOfWeek(date),
  });

export const generateDateAsKey = (
  date: Date,
  timezone: string = currentTimezone,
) => formatDate(date, DateKeyFormat, timezone);

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
export const setTime = (date: Date | UTCDate | TZDate, time: string) => {
  if (!time) return date;
  const [hours, minutes] = time.split(TimeDivisor).map((num) => Number(num));
  return setMinutes(setHours(date, hours), minutes);
};

export const getTime = (date: Date, timezone?: string) => {
  return formatDate(date, "HH:mm", timezone);
};

export const setHoursAndMinutes =
  (date: Date) => (hours: number) => (minutes: number) =>
    setMinutes(setHours(date, hours), minutes);

export const getMinutesInSteps = (minutes: number) =>
  Math.round(minutes / calendarMinutesSteps) * calendarMinutesSteps;

export const fixTimezone = (date: Date, timezone: string) => {
  const timezoneOffSet = tzOffset(currentTimezone, date);
  const dateWithTimezoneFixed = addMinutes(
    date,
    timezoneOffSet >= 0 ? timezoneOffSet : timezoneOffSet * -1,
  );
  const newDate = new TZDate(
    dateWithTimezoneFixed.getFullYear(),
    dateWithTimezoneFixed.getMonth(),
    getDate(dateWithTimezoneFixed),
    timezone,
  );
  return newDate;
};
