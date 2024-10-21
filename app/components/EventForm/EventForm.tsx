import React, { useCallback, useEffect, useState } from "react";
import { useSaveEventForm } from "@/app/hooks/useSaveEventForm";
import { format } from "date-fns";
import {
  Switch,
  Autocomplete,
  InputTextArea,
  InputFieldType,
  InputField,
  Button,
  ButtonType,
} from "../UI";
import { Location } from "@/app/api/domain/entities/CalendarEvent";
import { getLocations, getTimezones } from "@/app/services/locationsService";
import { useEventForm } from "@/app/hooks/useEventForm";
import { observer } from "mobx-react-lite";
import { toast } from "react-toastify";
import { InputFieldGroup } from "../UI/InputFieldGroup";
import { useStore } from "@/app/hooks/useStore";
import { currentTimezone } from "@/app/libs/constants";

export const EventForm: React.FC = observer(() => {
  const { eventsStore, calendarStore, loading } = useStore();

  const [selectedTimezone, setSelectedTimezone] = useState(
    eventsStore.selectedEvent?.timezone ?? currentTimezone,
  );
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    eventsStore.selectedEvent?.location as Location,
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

  const save = useSaveEventForm(selectedLocation as Location, selectedTimezone);

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
    (value: unknown) => {
      setSelectedLocation(value as Location);
      setValue("location", (value as Location).name);
    },
    [setValue, setSelectedLocation],
  );

  const fetchTimezones = useCallback(
    async (query: string) => getTimezones(query),
    [],
  );

  const setTimezone = useCallback(
    (value: unknown) => {
      setSelectedTimezone(value as string);
      setValue("timezone", value as string);
    },
    [setValue, setSelectedTimezone],
  );

  const renderLocation = useCallback(
    (location: unknown) => (
      <>
        <span>{(location as Location).name}, </span>
        <span className="text-xs">{(location as Location).country}</span>
      </>
    ),
    [],
  );

  const renderTimezone = useCallback((timezone: unknown) => {
    return (timezone as string).replaceAll("_", " ");
  }, []);

  return (
    <form onSubmit={handleSubmit(save)}>
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
        renderOption={renderLocation}
      >
        Ubicación
      </Autocomplete>
      <InputTextArea {...register("description")}>Descripción</InputTextArea>
      <InputFieldGroup>
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
        <Autocomplete
          {...register("timezone")}
          fetchOptions={fetchTimezones}
          setValue={setTimezone}
          error={errors.timezone}
          renderOption={renderTimezone}
        >
          Zona Horaria
        </Autocomplete>
      </InputFieldGroup>
      <Switch {...register("isAllDay")}>Todo el día?</Switch>
      <InputFieldGroup>
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
      </InputFieldGroup>
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
