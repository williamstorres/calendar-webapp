import { addDays, differenceInMinutes } from "date-fns";
import { FormFields } from "../components/EventForm/eventFormSchema";
import { fixTimezone, setTime } from "../libs/date";
import { Location } from "@/app/api/domain/entities/CalendarEvent";
import { toast } from "react-toastify";
import { useStore } from "./useStore";

/**
 * Hook para guardar un evento utilizando un formulario.
 *
 * Este hook se encarga de preparar y guardar un evento en el estado global
 * de eventos, ajustando la fecha y la hora según la zona horaria y
 * manejando la duración del evento.
 *
 * @param {Location} location - La ubicación del evento.
 * @param {string} timezone - La zona horaria en la que se encuentra el evento.
 * @returns {(data: FormFields) => void} Función para guardar el evento.
 *
 * @example
 * const saveEvent = useSaveEventForm(location, timezone);
 *
 * const handleSubmit = (formData) => {
 *   saveEvent(formData);
 * };
 */
export const useSaveEventForm = (
  location: Location,
  timezone: string,
): ((data: FormFields) => void) => {
  const { eventsStore } = useStore();

  const saveEvent = ({ date, startTime, endTime, ...data }: FormFields) => {
    const dateWithCorrectTimezone = fixTimezone(date, timezone);

    const startDateTime = setTime(dateWithCorrectTimezone, startTime);
    const endDateTime = setTime(dateWithCorrectTimezone, endTime);

    const eventToSave = {
      ...data,
      id: "",
      location,
      startDateTime,
      endDateTime: endTime === "00:00" ? addDays(endDateTime, 1) : endDateTime,
      durationInMinutes: differenceInMinutes(endDateTime, startDateTime),
      color: "",
    };

    eventsStore
      .saveEvent(eventToSave)
      .then(() => toast.success("Evento guardado con éxito"));
  };

  return saveEvent;
};
