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
export const CalendarEventsWeekDay: React.FC<CalendarEventsWeekDayProps> = ({
  children,
  dayOfYear,
}: CalendarEventsWeekDayProps): JSX.Element => {
  const { setNodeRef } = useDroppable({
    id: dayOfYear,
  });

  const handleOnClickToAddNewEvent = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const y = event.clientY - rect.top;
    console.log(y);
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
};
