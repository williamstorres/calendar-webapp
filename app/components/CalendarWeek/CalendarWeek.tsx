import { DayOfMonth } from "@/app/types/DayOfMonth";
import CalendarDay from "../CalendarDay";
import { formatDate } from "@/app/libs/format";
import { observer } from "mobx-react-lite";
import { useStore } from "@/app/store/storeContext";
import { twJoin } from "tailwind-merge";
import { Views } from "@/app/store/calendarStore";
import { isWithinInterval } from "date-fns";
import CalendarHours from "../CalendarHours";

type CaledarWeekProps = {
  daysOfWeek: DayOfMonth[];
};
export const CalendarWeek = observer(({ daysOfWeek }: CaledarWeekProps) => {
  const store = useStore();
  return (
    <div
      className={twJoin(
        "w-screen bg-primary overflow-hidden",
        store.selectedView === Views.Month && "grid grid-cols-7 gap-y-0.5",
        store.selectedView === Views.Week &&
          (isWithinInterval(store.date, {
            start: daysOfWeek[0].date,
            end: daysOfWeek[6].date,
          })
            ? "h-full"
            : "hidden"),
      )}
    >
      {store.selectedView === Views.Month ? (
        daysOfWeek.map((day) => (
          <CalendarDay key={formatDate(day.date, "yyyyMMdd")} day={day} />
        ))
      ) : (
        <CalendarHours />
      )}
    </div>
  );
});
