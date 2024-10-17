import { useStore } from "@/app/store/storeContext";
import { CalendarEventType } from "@/app/types/CalendarEvent";
import { observer } from "mobx-react-lite";
import { twJoin } from "tailwind-merge";
import { useDraggable } from "@dnd-kit/core";
import { generateDateAsKey } from "@/app/libs/date";
import { useCalendarEvent } from "@/app/hooks/useEventDrag";

type CalendarEventProps = {
  event: CalendarEventType;
  overlaping: number;
  index: number;
};
/**
 * Componente `CalendarEvent` que representa un evento en el calendario.
 *
 * Este componente utiliza la funcionalidad de arrastrar y soltar para
 * permitir que los eventos se reubiquen en el calendario. También ajusta
 * su estilo según la duración del evento y la vista seleccionada (mensual o diaria).
 *
 * @param {CalendarEventProps} props - Props del componente.
 * @returns {JSX.Element} El componente `CalendarEvent`.
 *
 * @example
 * const event = {
 *   id: "event1",
 *   title: "Reunión",
 *   startDateTime: new Date("2024-10-01T10:00:00"),
 *   durationInMinutes: 60,
 * };
 * <CalendarEvent event={event} overlaping={1} index={0} />
 */
export const CalendarEvent: React.FC<CalendarEventProps> = observer(
  ({ event, overlaping, index }) => {
    const store = useStore();
    const { attributes, listeners, setNodeRef, transform, node } = useDraggable(
      {
        id: event.id,
        data: {
          dayId: generateDateAsKey(event.startDateTime),
        },
      },
    );
    const { style, top, height, width } = useCalendarEvent({
      transform,
      eventDurationInMinutes: event.durationInMinutes,
      overlaping,
      startDateTime: event.startDateTime,
      node,
      selectedViewIsMonth: store.selectedViewIsMonth,
      selectedViewIsDay: store.selectedViewIsDay,
    });

    return (
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={{
          ...style,
          top: `${top}rem`,
          left:
            overlaping > 1 ? `calc((100% / ${overlaping}) * ${index})` : "auto",
          height: !store.selectedViewIsMonth ? `${height}rem` : "auto",
          width: `${width}%`,
        }}
        className={twJoin(
          "bg-green-500 px-1 rounded-md overflow-hidden text-primary box-border shadow-sm border z-50",
          !store.selectedViewIsMonth && "absolute",
          store.selectedViewIsDay ? "text-xs" : "text-xxs",
        )}
      >
        {event.title}
      </div>
    );
  },
);
