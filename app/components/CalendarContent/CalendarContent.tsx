"use client";
import { observer } from "mobx-react-lite";
import {
  startOfMonth,
  endOfMonth,
  getDayOfYear,
  eachWeekOfInterval,
} from "date-fns";
import CalendarContentHeaders from "../CalendarContentHeaders";
import { DayOfMonth } from "@/app/types/DayOfMonth";
import { useRef } from "react";
import { CalendarType } from "@/app/types/CalendarType";
import { formatDate } from "@/app/libs/format";
import CalendarWeek from "../CalendarWeek";
import { getDaysOfWeek } from "@/app/libs/date";

const getCalendarWeeksWithDays = (
  month: number,
  year: number,
): DayOfMonth[][] => {
  const firstDayOfTheMonth = new Date(year, month, 1);
  const start = startOfMonth(firstDayOfTheMonth);
  const end = endOfMonth(firstDayOfTheMonth);
  const weeks = eachWeekOfInterval({ start, end });

  return weeks.map((weekStartDay) =>
    getDaysOfWeek(weekStartDay).map((date) => ({
      date: date,
      dayOfMonth: date.getDate(),
      dayOfYear: getDayOfYear(date),
    })),
  );
};

export type CalendarContentProps = {
  item: CalendarType;
};
export const CalendarContent = observer(({ item }: CalendarContentProps) => {
  const calendarContentRef = useRef<HTMLDivElement>(null);
  const weeksOfMonth = getCalendarWeeksWithDays(item.month, item.year);

  return (
    <div
      ref={calendarContentRef}
      data-testid="calendar-content"
      className="w-screen bg-primary h-full"
    >
      <CalendarContentHeaders />
      {weeksOfMonth.map((week) => (
        <CalendarWeek
          key={formatDate(week[0].date, "yyyyMMdd")}
          daysOfWeek={week}
        />
      ))}
    </div>
  );
});

export default CalendarContent;
