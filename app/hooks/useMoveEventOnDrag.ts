import { DragEndEvent } from "@dnd-kit/core";
import { addMinutes, getHours, getMinutes, parse } from "date-fns";
import { DateKeyFormat, PxInOneHour } from "../constants";
import { CalendarEventType } from "../types/CalendarEvent";
import { setHoursAndMinutes } from "../libs/date";

type HandleDragEndProps = {
  openEditEventView: (selectedEvent: CalendarEventType) => void;
  updateEvent: (selectedEvent: CalendarEventType) => void;
  getEvent: (dayId: string, eventId: string) => CalendarEventType;
};
export const useMoveEventOnDrag =
  ({ openEditEventView, updateEvent, getEvent }: HandleDragEndProps) =>
  (event: DragEndEvent) => {
    if (!event.active.data.current) return;

    const {
      active: {
        id: eventId,
        data: {
          current: { dayId: currentDayId },
        },
      },
    } = event;

    const selectedEvent = getEvent(currentDayId, String(eventId));

    //si no se ha movido, es porque se ha seleccionado el evento
    if (event.delta.x === 0 && event.delta.y === 0) {
      openEditEventView(selectedEvent!);
      return;
    }

    //en caso de que la vista seleccionada sea dia, event.over es undefined ya que no cambia de dia, por eso se debe utilizar currentDayId
    const newDate = parse(
      (event.over ? event.over.id : currentDayId) as string,
      DateKeyFormat,
      new Date(),
    );
    const { startDateTime, endDateTime } = selectedEvent;

    //Los movimientos de horario son en rangos de 15 minutos
    const fifteenMinutesSteps = (minutes: number) =>
      Math.round(minutes / 15) * 15;
    const minutesToMove = fifteenMinutesSteps(
      Math.round((event.delta.y * 60) / PxInOneHour),
    );

    const newStartDate = setHoursAndMinutes(newDate)(getHours(startDateTime))(
      getMinutes(startDateTime),
    );
    const newEndDate = setHoursAndMinutes(newDate)(getHours(endDateTime))(
      getMinutes(endDateTime),
    );

    updateEvent({
      ...selectedEvent,
      startDateTime: addMinutes(newStartDate, minutesToMove),
      endDateTime: addMinutes(newEndDate, minutesToMove),
    });
  };
