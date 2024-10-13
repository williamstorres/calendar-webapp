import { CalendarEventType } from "@/app/types/CalendarEvent";

type CalendarEventProps = {
  event: CalendarEventType;
};
export const CalendarEvent = ({ event }: CalendarEventProps) => {
  return (
    <div
      className={`bg-[${event.color}] text-xxs p-1 rounded-md overflow-hidden`}
    >
      {event.title}
    </div>
  );
};
