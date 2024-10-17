import { generateDateAsKey, getDaysOfWeek } from "@/app/libs/date";
import { useStore } from "@/app/store/storeContext";
import { CalendarEventType } from "@/app/types/CalendarEvent";
import { observer } from "mobx-react-lite";
import CalendarEventsDay from "../CalendarEventsDay";
import { useDroppable } from "@dnd-kit/core";

type CalendarEventsWeekDayProps = {
  children: React.ReactNode;
  dayOfYear: string;
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
const CalendarEventsWeekDay: React.FC<CalendarEventsWeekDayProps> = ({
  children,
  dayOfYear,
}) => {
  const { setNodeRef } = useDroppable({
    id: dayOfYear,
  });

  return (
    <div
      ref={setNodeRef}
      className="border-r-2 border-zinc-600 last:border-0 w-full relative"
    >
      {children}
    </div>
  );
};
export const CalendarEventsWeek = observer(() => {
  const { date, events } = useStore();

  const daysOfWeek = getDaysOfWeek(date);
  const weekEvents = daysOfWeek.reduce(
    (acc, date) => {
      const dateKey = generateDateAsKey(date);
      acc[dateKey] = events[dateKey];
      return acc;
    },
    {} as Record<string, CalendarEventType[]>,
  );

  return (
    <div className="w-full h-full absolute grid grid-cols-7 mt-4 z-10">
      {daysOfWeek.map((date) => (
        <CalendarEventsWeekDay
          key={date.getDate()}
          dayOfYear={generateDateAsKey(date)}
        >
          <CalendarEventsDay
            date={date}
            events={weekEvents[generateDateAsKey(date)] ?? []}
          />
        </CalendarEventsWeekDay>
      ))}
    </div>
  );
});
