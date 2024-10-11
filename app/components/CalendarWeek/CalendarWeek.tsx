import { DayOfMonth } from "@/app/types/DayOfMonth";
import CalendarDay from "../CalendarDay";
import { formatDate } from "@/app/libs/format";

type CaledarWeekProps = {
  daysOfWeek: DayOfMonth[];
};
export const CalendarWeek = ({ daysOfWeek }: CaledarWeekProps) => {
  return (
    <div className="w-screen grid grid-cols-7 gap-y-0.5">
      {daysOfWeek.map((day) => (
        <CalendarDay key={formatDate(day.date, "yyyyMMdd")} day={day} />
      ))}
    </div>
  );
};
