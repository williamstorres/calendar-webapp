import { DayOfMonth } from "@/app/types/DayOfMonth";
import { isToday } from "date-fns";

type CalendarDayProps = {
  day: DayOfMonth;
};
export const CalendarDay = ({ day }: CalendarDayProps) => {
  return (
    <div role="calendar-day" className="bg-zinc-900 p-2 min-h-24 text-sm">
      <span
        className={`${isToday(day.date) && "rounded-full bg-blue-600 p-1"}`}
      >
        {day.dayOfMonth}
      </span>
    </div>
  );
};
