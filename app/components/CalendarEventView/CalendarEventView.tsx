import React, { useCallback } from "react";
import { Button, ButtonType } from "../UI";
import { useStore } from "@/app/store/storeContext";
import { observer } from "mobx-react-lite";
import { format } from "date-fns";
import Weather from "../Weather";
import { tz, TZDate } from "@date-fns/tz";
import { formatDate } from "@/app/libs/format";

/**
 * Componente `CalendarEventView` que muestra la vista detallada de un evento de calendario.
 *
 * Este componente permite ver los detalles de un evento seleccionado,
 * así como editar o eliminar el evento. Utiliza MobX para gestionar el estado
 * del evento seleccionado.
 *
 * @returns {JSX.Element|null} El componente `CalendarEventView` o `null` si no hay un evento seleccionado.
 */
export const CalendarEventView: React.FC = observer(() => {
  const { calendarStore, eventsStore } = useStore();

  if (!eventsStore.selectedEvent) return null;

  const handleEdit = useCallback(() => {
    calendarStore.setShowEventForm(true);
  }, [calendarStore]);

  const handleBack = useCallback(() => {
    eventsStore.cleanSelectedEvent();
    calendarStore.setShowEventView(false);
  }, [calendarStore, eventsStore]);

  const handleDelete = useCallback(() => {
    eventsStore.deleteEvent();
    calendarStore.setShowEventView(false);
  }, [calendarStore, eventsStore]);

  const zoneStartDate = new TZDate(
    eventsStore.selectedEvent.startDateTime,
  ).withTimeZone(eventsStore.selectedEvent.timezone);

  console.log(
    format(eventsStore.selectedEvent.startDateTime, "dd/MM/yy HH:mm", {
      in: tz(eventsStore.selectedEvent.timezone),
    }),
  );

  return (
    <>
      <div className="grid grid-cols-2 mt-0 w-full mb-8 items-center">
        <Button
          onClick={handleBack}
          className="text-red-500 justify-self-start"
        >
          Atras
        </Button>
        <Button
          type={ButtonType.Submit}
          className="text-red-500 justify-self-end"
          onClick={handleEdit}
        >
          Editar
        </Button>
      </div>
      <h2 data-testid="event-title" className="font-bold text-lg">
        {eventsStore.selectedEvent.title}
      </h2>
      <p className="text-sm text-red-500">
        En {eventsStore.selectedEvent.location.name}
      </p>
      <p className="text-sm leading-relaxed  py-5">
        {formatDate(
          zoneStartDate,
          "'Comienza el 'dd' de 'MMMM' del 'yyyy' desde las ' HH:mm'hrs '",
          eventsStore.selectedEvent.timezone,
        )}
        {formatDate(
          eventsStore.selectedEvent.endDateTime,
          "'hasta las 'HH:mm'hrs'",
          eventsStore.selectedEvent.timezone,
        )}{" "}
        en {eventsStore.selectedEvent.timezone}
      </p>
      <p className="text-sm leading-relaxed font-bold">Descripción:</p>
      <p className="text-sm leading-relaxed pb-5 pt-2">
        {eventsStore.selectedEvent.description}
      </p>
      <Weather
        locationId={eventsStore.selectedEvent.location.id}
        date={eventsStore.selectedEvent.startDateTime}
        timezone={eventsStore.selectedEvent.timezone}
      />
      <div className="flex w-full justify-end mt-10">
        <Button onClick={handleDelete} className="text-red-500">
          Eliminar
        </Button>
      </div>
    </>
  );
});
