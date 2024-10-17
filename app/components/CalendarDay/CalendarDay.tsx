import { CalendarEventType } from "@/app/types/CalendarEvent";
import { DayOfMonth } from "@/app/types/DayOfMonth";
import { isToday } from "date-fns";
import CalendarEvent from "../CalendarEvent";
import { useDroppable } from "@dnd-kit/core";
import { generateDateAsKey } from "@/app/libs/date";

type CalendarDayProps = {
  day: DayOfMonth;
  events: CalendarEventType[];
};
export const CalendarDay: React.FC<CalendarDayProps> = ({ day, events }) => {
  const { setNodeRef } = useDroppable({
    id: generateDateAsKey(day.date),
  });

  return (
    <div
      ref={setNodeRef}
      role="calendar-day"
      className="bg-zinc-900 p-2 min-h-24 text-sm"
    >
      <span
        className={`${isToday(day.date) && "rounded-full bg-blue-600 p-1"}`}
      >
        {day.dayOfMonth}
      </span>
      <div>
        {events.map((event) => (
          <CalendarEvent
            key={event.id}
            event={event}
            overlaping={1}
            index={0}
          />
        ))}
      </div>
    </div>
  );
};
