import { CalendarEventType } from "@/app/types/CalendarEvent";
import CalendarEvent from "../CalendarEvent";
import { countEventsOverlaping } from "@/app/libs/date";

type CalendarEventsDayProps = {
  events: CalendarEventType[];
};
export const CalendarEventsDay = ({ events }: CalendarEventsDayProps) => {
  return (
    <>
      {events.map((event, index) => (
        <CalendarEvent
          key={event.id}
          event={event}
          overlaping={countEventsOverlaping(event, events)}
          index={index}
        />
      ))}
    </>
  );
};
