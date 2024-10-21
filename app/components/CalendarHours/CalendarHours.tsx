import { hoursOfDay } from "@/app/constants";
import { useStore } from "@/app/store/storeContext";
import { isToday, setHours } from "date-fns";
import { observer } from "mobx-react-lite";

type CalendarHours = {
  children: React.ReactNode;
  day: Date;
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
                data-testid={hour}
              ></div>
            ))}
            <div className="h-20 border-t-2 border-zinc-600"></div>
          </div>
        )}
        {calendarStore.selectedViewIsMonth && (
          <span
            data-testid={isToday(day) && "active-day"}
            className={`${isToday(day) && "rounded-full bg-secondary p-1"}`}
          >
            {day.getDate()}
          </span>
        )}
        {children}
      </>
    );
  },
);
