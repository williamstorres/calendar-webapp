import { PxInOneHour } from "@/app/constants";
import { generateDateAsKey, getMinutesInSteps } from "@/app/libs/date";
import { useStore } from "@/app/store/storeContext";
import { useDroppable } from "@dnd-kit/core";
import { setMinutes } from "date-fns";
import { minutesInHour } from "date-fns/constants";
import { observer } from "mobx-react-lite";

export type CalendarEventsWeekDayProps = {
  children: React.ReactNode;
  date: Date;
};
/**
 * Componente `CalendarEventsWeekDay` que representa un día en la semana dentro del calendario.
 *
 * Este componente utiliza la funcionalidad de arrastrar y soltar para permitir la interacción
 * con los eventos de ese día.
 *
 * @param {CalendarEventsWeekDayProps} props - Props del componente.
 * @returns {JSX.Element} El componente `CalendarEventsWeekDay`.
 */
export const CalendarEventsWeekDay: React.FC<CalendarEventsWeekDayProps> =
  observer(({ children, date }: CalendarEventsWeekDayProps): JSX.Element => {
    const store = useStore();
    const { setNodeRef } = useDroppable({
      id: generateDateAsKey(date),
    });

    const handleOnClickToAddNewEvent = (
      event: React.MouseEvent<HTMLDivElement>,
    ) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const yPxFromTop = event.clientY - rect.top;
      const minutes = (yPxFromTop / PxInOneHour) * minutesInHour;
      const minutesToSet = getMinutesInSteps(minutes);
      store.setDate(setMinutes(date, minutesToSet));
      store.setShowEventForm(true);
    };

    return (
      <div
        role="calendar-events-week-day"
        ref={setNodeRef}
        onClick={handleOnClickToAddNewEvent}
        className="border-r-2 border-zinc-600 last:border-0 w-full relative"
      >
        {children}
      </div>
    );
  });
