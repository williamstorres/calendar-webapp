import { DateKeyFormat } from "@/app/constants";
import { useStore } from "@/app/store/storeContext";
import { DayOfMonth } from "@/app/types/DayOfMonth";
import { formatDate } from "date-fns";
import { observer } from "mobx-react-lite";
import CalendarDay from "../CalendarDay";

type CalendarMonthDay = {
  daysOfWeek: DayOfMonth[];
};
export const CalendarMonthDay: React.FC<CalendarMonthDay> = observer(
  ({ daysOfWeek }) => {
    const store = useStore();

    return (
      <div className="grid grid-cols-7 gap-y-0.5 border-t-2 border-zinc-600">
        {daysOfWeek.map((day) => {
          const key = formatDate(day.date, DateKeyFormat);
          const events = store.getDayEvents(key);

          return <CalendarDay key={key} day={day} events={events} />;
        })}
      </div>
    );
  },
);
