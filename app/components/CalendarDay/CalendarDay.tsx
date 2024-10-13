import { CalendarEventType } from "@/app/types/CalendarEvent";
import { DayOfMonth } from "@/app/types/DayOfMonth";
import { isToday } from "date-fns";
import CalendarEvent from "../CalendarEvent";

type CalendarDayProps = {
  day: DayOfMonth;
  events: CalendarEventType[];
};
export const CalendarDay = ({ day, events }: CalendarDayProps) => {
  return (
    <div role="calendar-day" className="bg-zinc-900 p-2 min-h-24 text-sm">
      <span
        className={`${isToday(day.date) && "rounded-full bg-blue-600 p-1"}`}
      >
        {day.dayOfMonth}
      </span>
      {events.map((event) => (
        <CalendarEvent key={event.id} event={event} />
      ))}
    </div>
  );
};
