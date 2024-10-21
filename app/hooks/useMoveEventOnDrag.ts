import { DragEndEvent } from "@dnd-kit/core";
import { addMinutes, getHours, getMinutes, parse } from "date-fns";
import { getMinutesInSteps, setHoursAndMinutes } from "../libs/date";
import { minutesInHour } from "date-fns/constants";
import { useStore } from "./useStore";
import { dateKeyFormat, pxInOneHour } from "../libs/constants";
import { Views } from "../store/calendarStore";
import { toast } from "react-toastify";

export const useMoveEventOnDrag = () => {
  const { eventsStore, calendarStore } = useStore();

  const handleDragEnd = (event: DragEndEvent) => {
    if (!event.active.data.current) return;
    const { delta, over } = event;

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
    if (Math.abs(delta.x) < 2 && Math.abs(delta.y) < 2) {
      if (calendarStore.selectedViewIsMonth) {
        calendarStore.setDate(new Date(selectedEvent.startDateTime));
        calendarStore.setSelectedView(Views.Day);
        return;
      }
      eventsStore.setSelectedEvent(selectedEvent);
      calendarStore.setShowEventView(true);
      return;
    }

    const { startDateTime, endDateTime } = selectedEvent;

    if (calendarStore.selectedViewIsMonth) {
      const newDay = parse(event.over!.id as string, dateKeyFormat, new Date());
      eventsStore
        .updateEvent({
          ...selectedEvent,
          startDateTime: setHoursAndMinutes(newDay)(getHours(startDateTime))(
            getMinutes(startDateTime),
          ),
          endDateTime: setHoursAndMinutes(newDay)(getHours(endDateTime))(
            getMinutes(endDateTime),
          ),
        })
        .then(eventUpdateNotification);
      return;
    }

    //en caso de que la vista seleccionada sea dia, event.over es undefined ya que no cambia de dia, por eso se debe utilizar currentDayId
    const newDate = parse(
      (over ? over.id : currentDayId) as string,
      dateKeyFormat,
      new Date(),
    );

    //Los movimientos de horario son en rangos definidos en la constante CalendarMinutesSteps
    const minutesToMove = getMinutesInSteps(
      Math.round((delta.y * minutesInHour) / pxInOneHour),
    );

    const newStartDate = setHoursAndMinutes(newDate)(getHours(startDateTime))(
      getMinutes(startDateTime),
    );
    const newEndDate = setHoursAndMinutes(newDate)(getHours(endDateTime))(
      getMinutes(endDateTime),
    );

    eventsStore
      .updateEvent({
        ...selectedEvent,
        startDateTime: addMinutes(newStartDate, minutesToMove),
        endDateTime: addMinutes(newEndDate, minutesToMove),
      })
      .then(eventUpdateNotification);
  };
  return handleDragEnd;
};
const eventUpdateNotification = () => toast.info("Evento actualizado");
