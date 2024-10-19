"use client";
import { DateKeyFormat } from "@/app/constants";
import { useMoveEventOnDrag } from "@/app/hooks/useMoveEventOnDrag";
import { getCalendarWeeksWithDays } from "@/app/libs/date";
import { formatDate } from "@/app/libs/format";
import { Month } from "@/app/types/CalendarType";
import { DndContext } from "@dnd-kit/core";
import { useId, useRef } from "react";
import CalendarWeek from "../CalendarWeek";
import { CalendarDaysOfWeekHeader } from "./CalendarDaysOfWeekHeader";

export type CalendarContentProps = {
  month: Month;
};
export const CalendarContent: React.FC<CalendarContentProps> = ({
  month,
}: CalendarContentProps): JSX.Element => {
  const id = useId();
  const calendarContentRef = useRef<HTMLDivElement>(null);

  const weeksOfMonth = getCalendarWeeksWithDays(month.month, month.year);
  // Es necesario abir aqui un evento para su edicion,
  // debido a que de lo contrario el evento es ignorado por la libreria
  // de drag and drop
  const handleDragEnd = useMoveEventOnDrag();

  return (
    <DndContext id={id} onDragEnd={handleDragEnd}>
      <div ref={calendarContentRef} className="w-screen bg-primary h-full">
        <CalendarDaysOfWeekHeader />
        {weeksOfMonth.map((week) => (
          <CalendarWeek
            key={formatDate(week[0].date, DateKeyFormat)}
            daysOfWeek={week}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default CalendarContent;
