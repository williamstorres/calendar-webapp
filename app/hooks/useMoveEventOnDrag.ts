import { DragEndEvent } from "@dnd-kit/core";
import { addMinutes, getHours, getMinutes, parse } from "date-fns";
import { getMinutesInSteps, setHoursAndMinutes } from "../libs/date";
import { minutesInHour } from "date-fns/constants";
import { useStore } from "./useStore";
import { dateKeyFormat, pxInOneHour } from "../libs/constants";

export const useMoveEventOnDrag = () => {
  const { eventsStore, calendarStore } = useStore();

  const handleDragEnd = (event: DragEndEvent) => {
    if (!event.active.data.current) return;

    const {
      active: {
        id: eventId,
        data: {
          current: { dayId: currentDayId },
        },
      },
    } = event;

    const selectedEvent = eventsStore.events[currentDayId].find(
      (event) => event.id === eventId,
    )!;

    //si no se ha movido, es porque se ha seleccionado el evento
    if (
      event.delta.x < 2 &&
      event.delta.x > -2 &&
      event.delta.y < 2 &&
      event.delta.y > -2
    ) {
      eventsStore.setSelectedEvent(selectedEvent);
      calendarStore.setShowEventView(true);
      return;
    }

    const { startDateTime, endDateTime } = selectedEvent;

    if (calendarStore.selectedViewIsMonth) {
      const newDay = parse(event.over!.id as string, dateKeyFormat, new Date());
      eventsStore.updateEvent({
        ...selectedEvent,
        startDateTime: setHoursAndMinutes(newDay)(getHours(startDateTime))(
          getMinutes(startDateTime),
        ),
        endDateTime: setHoursAndMinutes(newDay)(getHours(endDateTime))(
          getMinutes(endDateTime),
        ),
      });
      return;
    }

    //en caso de que la vista seleccionada sea dia, event.over es undefined ya que no cambia de dia, por eso se debe utilizar currentDayId
    const newDate = parse(
      (event.over ? event.over.id : currentDayId) as string,
      dateKeyFormat,
      new Date(),
    );

    //Los movimientos de horario son en rangos definidos en la constante CalendarMinutesSteps
    const minutesToMove = getMinutesInSteps(
      Math.round((event.delta.y * minutesInHour) / pxInOneHour),
    );

    const newStartDate = setHoursAndMinutes(newDate)(getHours(startDateTime))(
      getMinutes(startDateTime),
    );
    const newEndDate = setHoursAndMinutes(newDate)(getHours(endDateTime))(
      getMinutes(endDateTime),
    );

    eventsStore.updateEvent({
      ...selectedEvent,
      startDateTime: addMinutes(newStartDate, minutesToMove),
      endDateTime: addMinutes(newEndDate, minutesToMove),
    });
  };
  return handleDragEnd;
};
