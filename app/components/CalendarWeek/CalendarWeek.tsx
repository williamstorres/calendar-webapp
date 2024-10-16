import { DayOfMonth } from "@/app/types/DayOfMonth";
import CalendarDay from "../CalendarDay";
import { formatDate } from "@/app/libs/format";
import { observer } from "mobx-react-lite";
import { useStore } from "@/app/store/storeContext";
import { twJoin } from "tailwind-merge";
import { Views } from "@/app/store/calendarStore";
import { endOfDay, isWithinInterval } from "date-fns";
import CalendarHours from "../CalendarHours";

type CaledarWeekProps = {
  daysOfWeek: DayOfMonth[];
};
export const CalendarWeek = observer(({ daysOfWeek }: CaledarWeekProps) => {
  const store = useStore();

  const showWeek =
    store.selectedView !== Views.Month &&
    isWithinInterval(store.date, {
      start: daysOfWeek[0].date,
      end: endOfDay(daysOfWeek[6].date),
    });

  return (
    <div
      className={twJoin(
        "w-screen bg-primary overflow-hidden h-full",
        store.selectedViewIsMonth &&
          "grid grid-cols-7 gap-y-0.5 border-t-2 border-zinc-600",
        !store.selectedViewIsMonth && !showWeek && "hidden",
      )}
    >
      {store.selectedViewIsMonth &&
        daysOfWeek.map((day) => {
          const key = formatDate(day.date, "yyyyMMdd");
          const events = store.getDayEvents(key);
          //console.log(events);

          return <CalendarDay key={key} day={day} events={events} />;
        })}
      {store.selectedView !== Views.Month && showWeek && <CalendarHours />}
    </div>
  );
});
