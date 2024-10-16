import { WeekEventHeightInRem } from "@/app/constants";
import { useStore } from "@/app/store/storeContext";
import { CalendarEventType } from "@/app/types/CalendarEvent";
import { getHours } from "date-fns";
import { minutesInHour } from "date-fns/constants";
import { observer } from "mobx-react-lite";
import { twJoin } from "tailwind-merge";

type CalendarEventProps = {
  event: CalendarEventType;
  overlaping: number;
  index: number;
};
export const CalendarEvent = observer(
  ({ event, overlaping, index }: CalendarEventProps) => {
    const store = useStore();

    const startHour = getHours(event.startDateTime);
    const height =
      (WeekEventHeightInRem / minutesInHour) * event.durationInMinutes;
    const width = 100 / overlaping;
    const top = WeekEventHeightInRem * startHour;

    const handleEventClick = () => {
      console.log(JSON.stringify(event));
      store.selectedEvent = event;
      store.showEventForm = true;
    };

    return (
      <button
        onClick={handleEventClick}
        style={{
          top: `${top}rem`,
          left:
            overlaping > 1 ? `calc((100% / ${overlaping}) * ${index})` : "auto",
          height: !store.selectedViewIsMonth ? `${height}rem` : "auto",
          width: `${width}%`,
        }}
        className={twJoin(
          "bg-green-500 px-1 rounded-md overflow-hidden text-primary box-border shadow-sm border",
          !store.selectedViewIsMonth && "absolute",
          store.selectedViewIsDay ? "text-xs" : "text-xxs",
        )}
      >
        {event.title}
      </button>
    );
  },
);
