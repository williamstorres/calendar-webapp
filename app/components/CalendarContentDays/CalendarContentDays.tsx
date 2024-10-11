import { isToday } from "date-fns";
import { observer } from "mobx-react-lite";
import { DayOfMonth } from "@/app/types/DayOfMonth";

type CalendarContentDaysProps = {
  daysOfMonth: DayOfMonth[];
};
export const CalendarContentDays = observer(
  ({ daysOfMonth }: CalendarContentDaysProps) => {
    return (
      <>
        {daysOfMonth.map((day) => (
          <div
            key={day.dayOfYear}
            role="calendar-day"
            className="bg-zinc-900 p-2 min-h-24 text-sm"
          >
            <span
              className={`${isToday(day.date) && "rounded-full bg-blue-600 p-1"}`}
            >
              {day.dayOfMonth}
            </span>
          </div>
        ))}
      </>
    );
  },
);
