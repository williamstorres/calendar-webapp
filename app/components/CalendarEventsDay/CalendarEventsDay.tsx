import { CalendarEventType } from "@/app/types/CalendarEvent";
import CalendarEvent from "../CalendarEvent";
import { countEventsOverlaping, generateDateAsKey } from "@/app/libs/date";
import { useDroppable } from "@dnd-kit/core";

type CalendarEventsDayProps = {
  events: CalendarEventType[];
  date: Date;
};
/**
 * Componente `CalendarEventsDay` que renderiza los eventos de un día específico en el calendario.
 *
 * Este componente utiliza la funcionalidad de arrastrar y soltar para permitir que los eventos
 * sean colocados en una fecha específica. También calcula y gestiona la superposición de eventos.
 *
 * @param {CalendarEventsDayProps} props - Props del componente.
 * @returns {JSX.Element} El componente `CalendarEventsDay`.
 *
 * @example
 * const events = [
 *   { id: "event1", title: "Reunión", startDateTime: new Date("2024-10-01T10:00:00"), durationInMinutes: 60 },
 *   { id: "event2", title: "Cita", startDateTime: new Date("2024-10-01T11:00:00"), durationInMinutes: 30 },
 * ];
 * <CalendarEventsDay events={events} date={new Date("2024-10-01")} />
 */
export const CalendarEventsDay: React.FC<CalendarEventsDayProps> = ({
  events,
  date,
}) => {
  const { setNodeRef } = useDroppable({
    id: generateDateAsKey(date),
  });
  return (
    <div ref={setNodeRef}>
      {events.map((event, index) => (
        <CalendarEvent
          key={event.id}
          event={event}
          overlaping={countEventsOverlaping(event, events)}
          index={index}
        />
      ))}
    </div>
  );
};
