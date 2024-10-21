import { addDays, differenceInMinutes } from "date-fns";
import { FormFields } from "../components/EventForm/eventFormSchema";
import { fixTimezone, setTime } from "../libs/date";
import { Location } from "@/app/api/domain/entities/CalendarEvent";
import { toast } from "react-toastify";
import { useStore } from "./useStore";

export const useSaveEventForm = (location: Location, timezone: string) => {
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
