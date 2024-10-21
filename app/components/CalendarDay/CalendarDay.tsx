import { CalendarEventType } from "@/app/types/CalendarEvent";
import CalendarEvent from "../CalendarEvent";
import { observer } from "mobx-react-lite";
import CalendarHours from "../CalendarHours";
import { useDroppable } from "@dnd-kit/core";
import { generateDateAsKey } from "@/app/libs/date";
import { isSameDay } from "date-fns";
import { twJoin } from "tailwind-merge";
import { useStore } from "@/app/hooks/useStore";

type CalendarDayProps = {
  day: Date;
  events: CalendarEventType[];
};
export const CalendarDay: React.FC<CalendarDayProps> = observer(
  ({ day, events }: CalendarDayProps) => {
    const { calendarStore } = useStore();

    const { setNodeRef } = useDroppable({
      id: generateDateAsKey(day),
    });
    //Si la vista es dia, se ocultan los dias que no son el seleccionado
    if (
      calendarStore.selectedViewIsDay &&
      !isSameDay(calendarStore.date, day)
    ) {
      return null;
    }

    const handleOnClickToAddNewEvent = () => {
      calendarStore.setDate(day);
      calendarStore.setShowEventForm(true);
    };

    const generateEvents = () =>
      events.map((event) => (
        <CalendarEvent key={event.id} event={event} overlaping={1} index={0} />
      ));

    return (
      <div
        onClick={handleOnClickToAddNewEvent}
        className={twJoin(
          "flex w-full border-r-2 border-zinc-600 last:border-0",
        )}
      >
        <div
          data-testid="calendar-day"
          ref={setNodeRef}
          className={twJoin(
            "w-full",
            !calendarStore.selectedViewIsMonth && "relative",
            calendarStore.selectedViewIsMonth &&
              "bg-zinc-900 p-2 min-h-24 text-sm border-r-2 border-zinc-600 last:border-r-0",
          )}
        >
          <CalendarHours day={day}>{generateEvents()}</CalendarHours>
        </div>
      </div>
    );
  },
);
