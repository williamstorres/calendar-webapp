import { hoursOfDay } from "@/app/libs/date";
import { useStore } from "@/app/store/storeContext";
import { DayOfMonth } from "@/app/types/DayOfMonth";
import { isToday, setHours } from "date-fns";
import { observer } from "mobx-react-lite";

type CalendarHours = {
  children: React.ReactNode;
  day: DayOfMonth;
};
export const CalendarHours: React.FC<CalendarHours> = observer(
  ({ children, day }) => {
    const { calendarStore } = useStore();

    const handleOnClickToAddNewEvent = (
      event: React.MouseEvent<HTMLDivElement>,
      hour: number,
    ) => {
      calendarStore.setDate(setHours(calendarStore.date, hour));
      calendarStore.setShowEventForm(true);

      event.stopPropagation();
    };

    return (
      <>
        {!calendarStore.selectedViewIsMonth && (
          <div className="absolute w-full h-full">
            {hoursOfDay.map((hour) => (
              <div
                key={hour}
                onClick={(e) => handleOnClickToAddNewEvent(e, hour)}
                className="h-20 border-t-2 border-zinc-600"
              ></div>
            ))}
            <div className="h-20 border-t-2 border-zinc-600"></div>
          </div>
        )}
        {calendarStore.selectedViewIsMonth && (
          <span
            data-testid={isToday(day.date) && "active-day"}
            className={`${isToday(day.date) && "rounded-full bg-blue-600 p-1"}`}
          >
            {day.dayOfMonth}
          </span>
        )}
        {children}
      </>
    );
  },
);
