import { DragEndEvent } from "@dnd-kit/core";
import { addMinutes, getHours, getMinutes, parse } from "date-fns";
import { DateKeyFormat, PxInOneHour } from "../constants";
import { getMinutesInSteps, setHoursAndMinutes } from "../libs/date";
import { minutesInHour } from "date-fns/constants";
import { useStore } from "../store/storeContext";

export const useMoveEventOnDrag = () => {
  const store = useStore();

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

    const selectedEvent = store.events[currentDayId].find(
      (event) => event.id === eventId,
    )!;

    //si no se ha movido, es porque se ha seleccionado el evento
    if (event.delta.x === 0 && event.delta.y === 0) {
      store.setSelectedEvent(selectedEvent);
      store.setShowEventView(true);
      return;
    }

    //en caso de que la vista seleccionada sea dia, event.over es undefined ya que no cambia de dia, por eso se debe utilizar currentDayId
    const newDate = parse(
      (event.over ? event.over.id : currentDayId) as string,
      DateKeyFormat,
      new Date(),
    );
    const { startDateTime, endDateTime } = selectedEvent;

    //Los movimientos de horario son en rangos definidos en la constante CalendarMinutesSteps
    const minutesToMove = getMinutesInSteps(
      Math.round((event.delta.y * minutesInHour) / PxInOneHour),
    );

    const newStartDate = setHoursAndMinutes(newDate)(getHours(startDateTime))(
      getMinutes(startDateTime),
    );
    const newEndDate = setHoursAndMinutes(newDate)(getHours(endDateTime))(
      getMinutes(endDateTime),
    );

    store.updateEvent({
      ...selectedEvent,
      startDateTime: addMinutes(newStartDate, minutesToMove),
      endDateTime: addMinutes(newEndDate, minutesToMove),
    });
  };
  return handleDragEnd;
};
