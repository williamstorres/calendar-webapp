import React, { useCallback, useEffect, useState } from "react";
import InputField from "../Field";
import { InputFieldType } from "../Field/InputField";
import { Button, ButtonType } from "../Button/Button";
import { useSaveEventForm } from "@/app/hooks/useSaveEventForm";
import { addHours, format, setMinutes } from "date-fns";
import { useStore } from "@/app/store/storeContext";
import { Switch, Autocomplete, AutocompleteOption } from "../UI";
import { Location } from "@/app/api/domain/entities/CalendarEvent";
import { getLocations } from "@/app/services/locationsService";
import { useDebounce } from "@/app/hooks/useDebounce";
import { useEventForm } from "@/app/hooks/useEventForm";

type LocationAutocomplete = Location & AutocompleteOption;

const initialDate = setMinutes(addHours(new Date(), 1), 0);

export const EventForm = () => {
  const store = useStore();
  const [selectedLocation, setSelectedLocation] =
    useState<LocationAutocomplete>(
      store.selectedEvent?.location as LocationAutocomplete,
    );
  const [locations, setLocations] = useState<LocationAutocomplete[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useDebounce(
    String(store.selectedEvent?.location.name),
  );
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useEventForm({
    selectedEvent: store.selectedEvent,
    initialDate,
  });
  const handleSave = useSaveEventForm(selectedLocation as Location, (event) =>
    store.saveEvent({ ...event, id: String(store.selectedEvent?.id) }),
  );
  const location = watch("location");

  useEffect(() => {
    setDebouncedQuery(location);
  }, [location, setDebouncedQuery]);

  const isAllDay = watch("isAllDay");

  useEffect(() => {
    if (isAllDay) {
      setValue("startTime", "00:00");
      setValue("endTime", "23:59");
    }
  }, [isAllDay, setValue]);

  useEffect(() => {
    const fetchLocations = async () => {
      if (
        debouncedQuery.length === 0 ||
        debouncedQuery === store.selectedEvent?.location.name
      )
        return setLocations([]);

      const newLocations = await getLocations(debouncedQuery).then(
        (locations) =>
          locations.map((location) => ({
            ...location,
            text: location?.name,
          })),
      );
      setLocations(newLocations);
    };
    fetchLocations();
  }, [debouncedQuery, store.selectedEvent?.location.name]);

  const setLocation = useCallback(
    (value: AutocompleteOption) => {
      setSelectedLocation(value as LocationAutocomplete);
      setValue("location", value.text);
      setLocations([]);
    },
    [setValue],
  );

  return (
    <div className="w-screen h-[90%] p-8 bg-background z-[1000] fixed bottom-0 rounded-t-3xl shadow-[0px_-8px_10px_0px_#1a202c]">
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="grid grid-cols-2 mt-0 w-full mb-8 items-center">
          <Button
            onClick={() =>
              (store.showEventForm = false && store.cleanSelectedEvent())
            }
            className="text-red-500 justify-self-start"
          >
            Cancelar
          </Button>
          <Button
            type={ButtonType.Submit}
            className="text-red-500 justify-self-end"
            disabled={!isValid}
          >
            Guardar
          </Button>
        </div>
        <InputField autoFocus {...register("title")} error={errors.title}>
          Titulo
        </InputField>
        <Autocomplete
          {...register("location")}
          options={locations}
          setValue={setLocation}
        >
          Ubicación
        </Autocomplete>
        <InputField {...register("description")}>Descripción</InputField>
        <InputField
          type={InputFieldType.Date}
          {...register("date")}
          error={errors.date}
          defaultValue={format(
            store.selectedEvent
              ? store.selectedEvent.startDateTime
              : initialDate,
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
        {store.selectedEvent?.id && (
          <Button
            onClick={() => store.deleteEvent()}
            className="text-red-500 justify-self-end"
          >
            Eliminar
          </Button>
        )}
      </form>
    </div>
  );
};
