import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarEventType } from "../types/CalendarEvent";
import { addHours } from "date-fns";
import { getTime } from "@/app/libs/date";
import {
  eventFormSchema,
  FormFields,
} from "../components/EventForm/eventFormSchema";
import { useForm } from "react-hook-form";
import { currentTimezone } from "../libs/constants";

type UseEventFormParams = {
  selectedEvent: CalendarEventType | undefined;
  initialDate: Date;
};
/**
 * Hook que maneja la lógica del formulario de eventos del calendario y la implementación de react-hook-form
 *
 * Este hook utiliza react-hook-form para manejar la validación y el estado del formulario,
 * y utiliza un esquema Zod para la validación de los datos del evento.
 *
 * @param {UseEventFormParams} param0 - Parámetros para inicializar el formulario del evento.
 * @returns {ReturnType<typeof useForm<FormFields>>} Un objeto que contiene las funciones y propiedades del formulario.
 *
 * @example
 * const { register, handleSubmit, formState } = useEventForm({
 *   selectedEvent: myEvent,
 *   initialDate: new Date(),
 * });
 */
export const useEventForm = ({
  selectedEvent,
  initialDate,
}: UseEventFormParams): ReturnType<typeof useForm<FormFields>> => {
  const defaultValues = selectedEvent
    ? {
        ...selectedEvent,
        location: selectedEvent.location.name,
        timezone: selectedEvent.timezone,
        description: String(selectedEvent.description),
        startTime: getTime(selectedEvent.startDateTime, selectedEvent.timezone),
        endTime: getTime(selectedEvent.endDateTime, selectedEvent.timezone),
      }
    : {
        isAllDay: false,
        startTime: getTime(initialDate),
        endTime: getTime(addHours(initialDate, 1)),
        timezone: currentTimezone,
      };

  return useForm<FormFields>({
    mode: "onChange",
    reValidateMode: "onBlur",
    resolver: zodResolver(eventFormSchema),
    defaultValues,
  });
};
