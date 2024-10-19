import { CalendarEventType } from "@/app/types/CalendarEvent";
import { DayOfMonth } from "@/app/types/DayOfMonth";
import { isToday } from "date-fns";
import CalendarEvent from "../CalendarEvent";
import { useDroppable } from "@dnd-kit/core";
import { generateDateAsKey } from "@/app/libs/date";
import { useStore } from "@/app/store/storeContext";
import { observer } from "mobx-react-lite";

type CalendarDayProps = {
  day: DayOfMonth;
  events: CalendarEventType[];
};
/**
 * Componente `CalendarDay` que representa un día en el calendario.
 *
 * Este componente muestra el número del día y renderiza los eventos
 * asociados a ese día. También utiliza DnD Kit para permitir la
 * funcionalidad de arrastrar y soltar.
 *
 * @param {CalendarDayProps} props - Props del componente.
 * @returns {JSX.Element} El componente `CalendarDay`.
 *
 * @example
 * const day = { dayOfMonth: 1, date: new Date("2024-10-01") };
 * const events = [{ id: "event1", ... }, { id: "event2", ... }];
 * <CalendarDay day={day} events={events} />
 */
export const CalendarDay: React.FC<CalendarDayProps> = observer(
  ({ day, events }: CalendarDayProps): JSX.Element => {
    const { calendarStore } = useStore();

    const { setNodeRef } = useDroppable({
      id: generateDateAsKey(day.date),
    });

    const handleOnClickToAddNewEvent = () => {
      calendarStore.setDate(day.date);
      calendarStore.setShowEventForm(true);
    };

    return (
      <div
        ref={setNodeRef}
        onClick={handleOnClickToAddNewEvent}
        className="bg-zinc-900 p-2 min-h-24 text-sm"
      >
        <span
          data-testid={isToday(day.date) && "active-day"}
          className={`${isToday(day.date) && "rounded-full bg-blue-600 p-1"}`}
        >
          {day.dayOfMonth}
        </span>
        <div>
          {events.map((event) => (
            <CalendarEvent
              key={event.id}
              event={event}
              overlaping={1}
              index={0}
            />
          ))}
        </div>
      </div>
    );
  },
);
