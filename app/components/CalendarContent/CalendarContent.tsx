"use client";
import { DateKeyFormat } from "@/app/constants";
import { useMoveEventOnDrag } from "@/app/hooks/useMoveEventOnDrag";
import { getCalendarWeeksWithDays } from "@/app/libs/date";
import { formatDate } from "@/app/libs/format";
import { useStore } from "@/app/store/storeContext";
import { CalendarEventType } from "@/app/types/CalendarEvent";
import { CalendarType } from "@/app/types/CalendarType";
import { DndContext } from "@dnd-kit/core";
import { observer } from "mobx-react-lite";
import { useRef } from "react";
import CalendarWeek from "../CalendarWeek";
import { CalendarContentHeaders } from "./CalendarContentHeaders";

export type CalendarContentProps = {
  item: CalendarType;
};
export const CalendarContent: React.FC<CalendarContentProps> = observer(
  ({ item }) => {
    const store = useStore();
    const calendarContentRef = useRef<HTMLDivElement>(null);
    const weeksOfMonth = getCalendarWeeksWithDays(item.month, item.year);
    const handleDragEnd = useMoveEventOnDrag({
      openEditEventView: (selectedEvent: CalendarEventType) => {
        store.selectedEvent = selectedEvent;
        store.showEventView = true;
      },
      updateEvent: (event: CalendarEventType) => {
        store.updateEvent(event);
      },
      getEvent: (dayId: string, eventId: string) =>
        store.events[dayId].find((event) => event.id === eventId)!,
    });

    return (
      <DndContext onDragEnd={handleDragEnd}>
        <div
          ref={calendarContentRef}
          data-testid="calendar-content"
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
