import React, { useCallback, useEffect, useState } from "react";
import { useSaveEventForm } from "@/app/hooks/useSaveEventForm";
import { format } from "date-fns";
import { useStore } from "@/app/store/storeContext";
import {
  Switch,
  Autocomplete,
  AutocompleteOption,
  InputTextArea,
  InputFieldType,
  InputField,
  Button,
  ButtonType,
} from "../UI";
import { Location } from "@/app/api/domain/entities/CalendarEvent";
import { getLocations } from "@/app/services/locationsService";
import { useEventForm } from "@/app/hooks/useEventForm";
import { observer } from "mobx-react-lite";
import { toast } from "react-toastify";

type LocationAutocomplete = Location & AutocompleteOption;

export const EventForm: React.FC = observer(() => {
  const { eventsStore, calendarStore, loading } = useStore();

  const [selectedLocation, setSelectedLocation] =
    useState<LocationAutocomplete | null>(
      eventsStore.selectedEvent?.location as LocationAutocomplete,
    );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useEventForm({
    selectedEvent: eventsStore.selectedEvent,
    initialDate: calendarStore.date,
  });
  const save = useSaveEventForm(selectedLocation as Location);

  const isAllDay = watch("isAllDay");

  useEffect(() => {
    if (isAllDay) {
      setValue("startTime", "00:00");
      setValue("endTime", "23:59");
    }
  }, [isAllDay, setValue]);

  const fetchLocations = useCallback(
    async (query: string) => {
      setSelectedLocation(null);
      return loading(
        getLocations(query).then((locations) =>
          locations.map((location) => ({
            ...location,
            text: location?.name,
          })),
        ),
      );
    },
    [setSelectedLocation, loading],
  );

  const setLocation = useCallback(
    (value: AutocompleteOption) => {
      setSelectedLocation(value as LocationAutocomplete);
      setValue("location", value.text);
    },
    [setValue],
  );

  return (
    <form role="event-form" onSubmit={handleSubmit(save)}>
      <div className="grid grid-cols-2 mt-0 w-full mb-8 items-center">
        <Button
          onClick={() => {
            calendarStore.setShowEventForm(false);
            eventsStore.cleanSelectedEvent();
          }}
          className="text-red-500 justify-self-start"
        >
          Cancelar
        </Button>
        <Button
          type={ButtonType.Submit}
          className="text-red-500 justify-self-end"
        >
          Guardar
        </Button>
      </div>
      <InputField autoFocus {...register("title")} error={errors.title}>
        Titulo
      </InputField>
      <Autocomplete
        {...register("location")}
        fetchOptions={fetchLocations}
        setValue={setLocation}
        error={errors.location}
      >
        Ubicación
      </Autocomplete>
      <InputTextArea {...register("description")}>Descripción</InputTextArea>
      <InputField
        type={InputFieldType.Date}
        {...register("date")}
        error={errors.date}
        defaultValue={format(
          eventsStore.selectedEvent
            ? eventsStore.selectedEvent.startDateTime
            : calendarStore.date,
          "yyyy-MM-dd",
        )}
      >
        Fecha
      </InputField>
      <Switch {...register("isAllDay")}>Todo el día?</Switch>
      <div className="flex w-full place-content-between">
        <InputField
          type={InputFieldType.Time}
          {...register("startTime")}
          error={errors.startTime}
          defaultValue={isAllDay ? "00:00" : undefined}
          readOnly={isAllDay}
        >
          Hora de inicio
        </InputField>
        <InputField
          type={InputFieldType.Time}
          {...register("endTime")}
          error={errors.endTime}
          disabled={isAllDay}
        >
          Hora de termino
        </InputField>
      </div>
      {eventsStore.selectedEvent?.id && (
        <Button
          onClick={() => {
            eventsStore.deleteEvent();
            toast.success("Evento eliminado");
          }}
          className="text-red-500 justify-self-end"
        >
          Eliminar
        </Button>
      )}
    </form>
  );
});
