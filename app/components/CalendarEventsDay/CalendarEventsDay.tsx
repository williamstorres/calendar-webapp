import { CalendarEventType } from "@/app/types/CalendarEvent";
import CalendarEvent from "../CalendarEvent";
import { countEventsOverlaping, generateDateAsKey } from "@/app/libs/date";
import { useDroppable } from "@dnd-kit/core";

type CalendarEventsDayProps = {
  events: CalendarEventType[];
  date: Date;
};
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
