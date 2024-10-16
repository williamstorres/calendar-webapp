"use client";
import { observer } from "mobx-react-lite";
import CalendarContentHeaders from "../CalendarContentHeaders";
import { useRef } from "react";
import { CalendarType } from "@/app/types/CalendarType";
import { formatDate } from "@/app/libs/format";
import CalendarWeek from "../CalendarWeek";
import { getCalendarWeeksWithDays } from "@/app/libs/date";

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
