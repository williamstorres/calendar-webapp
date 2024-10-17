import { DayOfMonth } from "@/app/types/DayOfMonth";
import { observer } from "mobx-react-lite";
import { useStore } from "@/app/store/storeContext";
import { twJoin } from "tailwind-merge";
import { Views } from "@/app/store/calendarStore";
import { endOfDay, isWithinInterval } from "date-fns";
import CalendarHours from "../CalendarHours";
import { CalendarMonthDay } from "./CalendarMonthDay";

type CaledarWeekProps = {
  daysOfWeek: DayOfMonth[];
};
export const CalendarWeek: React.FC<CaledarWeekProps> = observer(
  ({ daysOfWeek }) => {
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
          "w-screen bg-primary h-full",
          !store.selectedViewIsMonth && !showWeek && "hidden",
        )}
      >
        {store.selectedViewIsMonth && (
          <CalendarMonthDay daysOfWeek={daysOfWeek} />
        )}
        {store.selectedView !== Views.Month && showWeek && <CalendarHours />}
      </div>
    );
  },
);
