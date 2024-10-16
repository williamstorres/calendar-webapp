"use client";
import { DateKeyFormat } from "@/app/constants";
import { useMoveEventOnDrag } from "@/app/hooks/useMoveEventOnDrag";
import { getCalendarWeeksWithDays } from "@/app/libs/date";
import { formatDate } from "@/app/libs/format";
import { CalendarType } from "@/app/types/CalendarType";
import { DndContext } from "@dnd-kit/core";
import { observer } from "mobx-react-lite";
import { useId, useRef } from "react";
import CalendarWeek from "../CalendarWeek";
import { CalendarContentHeaders } from "./CalendarContentHeaders";

export type CalendarContentProps = {
  item: CalendarType;
};
/**
 * Componente `CalendarContent` que muestra el contenido del calendario,
 * incluyendo los encabezados y las semanas del mes.
 *
 * Este componente utiliza MobX para gestionar el estado y renderiza
 * los días del mes en forma de semanas.
 *
 * @param {CalendarContentProps} props - Props del componente.
 * @returns {JSX.Element} El componente `CalendarContent`.
 *
 * @example
 * const calendar = { year: 2024, month: 10 }; // Ejemplo de objeto CalendarType
 * <CalendarContent item={calendar} />
 */
export const CalendarContent: React.FC<CalendarContentProps> = observer(
  ({ item }) => {
    const id = useId();
    const calendarContentRef = useRef<HTMLDivElement>(null);
    const weeksOfMonth = getCalendarWeeksWithDays(item.month, item.year);
    // Es necesario abir aqui un evento para su edicion,
    // debido a que de lo contrario el evento es ignorado por la libreria
    // de drag and drop
    const handleDragEnd = useMoveEventOnDrag();

    return (
      <DndContext id={id} onDragEnd={handleDragEnd}>
        <div
          ref={calendarContentRef}
          role="calendar-content"
          className="w-screen bg-primary h-full"
        >
          <CalendarContentHeaders />
          {weeksOfMonth.map((week) => (
            <CalendarWeek
              key={formatDate(week[0].date, DateKeyFormat)}
              daysOfWeek={week}
            />
          ))}
        </div>
      </DndContext>
    );
  },
);

export default CalendarContent;
