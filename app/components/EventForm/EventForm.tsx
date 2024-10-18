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
import { useDebounce } from "@/app/hooks/useDebounce";
import { useEventForm } from "@/app/hooks/useEventForm";
import { observer } from "mobx-react-lite";

type LocationAutocomplete = Location & AutocompleteOption;

/**
 * Componente que renderiza un formulario para crear o editar un evento en el calendario.
 * Utiliza el estado global del almacén y proporciona funcionalidades para manejar la entrada del usuario
 * y el envío del formulario.
 *
 * @component
 * @example
 * return (
 *   <EventForm />
 * );
 */
export const EventForm: React.FC = observer(() => {
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
    initialDate: store.date,
  });
  const handleSave = useSaveEventForm(selectedLocation as Location, (event) =>
    store.saveEvent({ ...event, id: String(store.selectedEvent?.id) }),
  );
  const location = watch("location");

  console.log(errors);

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
    <form role="event-form" onSubmit={handleSubmit(handleSave)}>
      <div className="grid grid-cols-2 mt-0 w-full mb-8 items-center">
        <Button
          onClick={() => store.setShowEventForm(false)}
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
          store.selectedEvent ? store.selectedEvent.startDateTime : store.date,
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
  );
});
