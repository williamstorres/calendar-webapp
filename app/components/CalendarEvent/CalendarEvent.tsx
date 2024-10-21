import { CalendarEventType } from "@/app/types/CalendarEvent";
import { observer } from "mobx-react-lite";
import { twJoin } from "tailwind-merge";
import { useDraggable } from "@dnd-kit/core";
import { generateDateAsKey } from "@/app/libs/date";
import { useCalendarEvent } from "@/app/hooks/useEventDrag";
import { useStore } from "@/app/hooks/useStore";

type CalendarEventProps = {
  event: CalendarEventType;
  overlaping: number;
  index: number;
};
export const CalendarEvent: React.FC<CalendarEventProps> = observer(
  ({ event, overlaping, index }) => {
    const { calendarStore } = useStore();

    const { attributes, listeners, setNodeRef, transform, node } = useDraggable(
      {
        id: event.id,
        data: {
          dayId: generateDateAsKey(event.startDateTime),
        },
        attributes: {
          role: "button",
        },
      },
    );
    const { style, top, height, width } = useCalendarEvent({
      transform,
      eventDurationInMinutes: event.durationInMinutes,
      overlaping,
      startDateTime: event.startDateTime,
      node,
      selectedViewIsMonth: calendarStore.selectedViewIsMonth,
      selectedViewIsDay: calendarStore.selectedViewIsDay,
    });

    const styleHeight = !calendarStore.selectedViewIsMonth
      ? {
          height: `${height}rem`,
        }
      : undefined;

    return (
      <div
        data-testid="event"
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={{
          ...style,
          ...styleHeight,
          top: `${top}rem`,
          left:
            overlaping > 1 ? `calc((100% / ${overlaping}) * ${index})` : "auto",
          width: `${width}%`,
        }}
        className={twJoin(
          "bg-green-500 px-1 rounded-md overflow-hidden text-primary box-border shadow-sm border z-[100]",
          !calendarStore.selectedViewIsMonth && "absolute",
          calendarStore.selectedViewIsDay ? "text-xs" : "text-xxs",
          calendarStore.selectedViewIsMonth && "max-h-4",
        )}
      >
        {event.title}
      </div>
    );
  },
);
