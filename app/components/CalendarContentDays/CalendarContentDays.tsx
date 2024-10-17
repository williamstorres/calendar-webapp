import { isToday } from "date-fns";
import { observer } from "mobx-react-lite";
import { DayOfMonth } from "@/app/types/DayOfMonth";

type CalendarContentDaysProps = {
  daysOfMonth: DayOfMonth[];
};
/**
 * Componente `CalendarContentDays` que muestra los días del mes en un calendario.
 *
 * Este componente itera sobre los días del mes proporcionados y renderiza
 * cada día, resaltando el día actual si corresponde.
 *
 * @param {CalendarContentDaysProps} props - Props del componente.
 * @returns {JSX.Element} El componente `CalendarContentDays`.
 *
 * @example
 * const days = [
 *   { dayOfYear: 1, dayOfMonth: 1, date: new Date("2024-10-01") },
 *   { dayOfYear: 2, dayOfMonth: 2, date: new Date("2024-10-02") },
 *   // ... otros días
 * ];
 * <CalendarContentDays daysOfMonth={days} />
 */
export const CalendarContentDays: React.FC<CalendarContentDaysProps> = observer(
  ({ daysOfMonth }) => {
    return (
      <>
        {daysOfMonth.map((day) => (
          <div
            key={day.dayOfYear}
            role="calendar-content-day"
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
