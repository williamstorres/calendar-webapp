"use client";
import { observer } from "mobx-react-lite";
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  add,
  getDayOfYear,
} from "date-fns";
import CalendarContentDays from "../CalendarContentDays";
import CalendarContentHeaders from "../CalendarContentHeaders";
import { DayOfMonth } from "@/app/types/DayOfMonth";

// TODO mover a util
const getDayOfWeekMondayStart = (date: Date) => {
  const day = date.getDay();
  return day === 0 ? 6 : day - 1; // Si es domingo (0), se convierte en 6, sino restamos 1.
};
// TODO optimizar
const getCalendarDays = (month: number, year: number): DayOfMonth[] => {
  const firstDayOfTheMonth = new Date(year, month, 1);
  const start = startOfMonth(firstDayOfTheMonth);
  const end = endOfMonth(firstDayOfTheMonth);
  const days = eachDayOfInterval({ start, end });

  if (getDayOfWeekMondayStart(days[0]) > 0) {
    let pastDay = add(days[0], { days: -1 });
    days.unshift(pastDay);
    while (getDayOfWeekMondayStart(pastDay) > 0) {
      pastDay = add(pastDay, { days: -1 });
      days.unshift(pastDay);
    }
  }
  const lastDay = days[days.length - 1];
  if (getDayOfWeekMondayStart(lastDay) < 6) {
    let nextDay = add(lastDay, { days: 1 });
    days.push(nextDay);
    while (getDayOfWeekMondayStart(nextDay) < 6) {
      nextDay = add(nextDay, { days: 1 });
      days.push(nextDay);
    }
  }
  return days.map((date) => ({
    date: date,
    dayOfMonth: date.getDate(),
    dayOfYear: getDayOfYear(date),
  }));
};

export type CalendarContentProps = {
  month: number;
  year: number;
};
export const CalendarContent = observer(
  ({ month, year }: CalendarContentProps) => {
    const daysOfMonth = getCalendarDays(month, year);

    return (
      <div
        data-testid="calendar-container"
        className="w-screen shrink-0 snap-start snap-always bg-gray-500 grid grid-cols-7 gap-y-0.5"
      >
        <CalendarContentHeaders />
        <CalendarContentDays daysOfMonth={daysOfMonth} />
      </div>
    );
  },
);

export default CalendarContent;
