import React, { useCallback } from "react";
import { Button, ButtonType } from "../UI";
import { useStore } from "@/app/store/storeContext";
import { observer } from "mobx-react-lite";
import { format } from "date-fns";
import Weather from "../Weather";

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
  const store = useStore();

  if (!store.selectedEvent) return null;

  const handleEdit = useCallback(() => {
    store.showEventForm = true;
    store.showEventView = false;
  }, [store]);

  const handleBack = useCallback(() => {
    store.cleanSelectedEvent();
    store.showEventView = false;
  }, [store]);

  const handleDelete = useCallback(() => {
    store.deleteEvent();
    store.showEventView = false;
  }, [store]);

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
        {store.selectedEvent.title}
      </h2>
      <p className="text-sm text-red-500">
        En {store.selectedEvent.location.name}
      </p>
      <p className="text-sm leading-relaxed  py-5">
        {format(
          store.selectedEvent.startDateTime,
          "'Comienza el 'dd' de 'MMMM' del 'yyyy' desde las ' HH:mm'hrs '",
        )}
        {format(store.selectedEvent.endDateTime, "'hasta las 'HH:mm'hrs'")}
      </p>
      <p className="text-sm leading-relaxed font-bold">Descripción:</p>
      <p className="text-sm leading-relaxed pb-5 pt-2">
        {store.selectedEvent.description}
      </p>
      <Weather
        locationId={store.selectedEvent.location.id}
        date={store.selectedEvent.startDateTime}
      />
      <div className="flex w-full justify-end mt-10">
        <Button onClick={handleDelete} className="text-red-500">
          Eliminar
        </Button>
      </div>
    </>
  );
});
