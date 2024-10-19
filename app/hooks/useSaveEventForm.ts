import { tzOffset } from "@date-fns/tz";
import { addDays, addMinutes, differenceInMinutes } from "date-fns";
import { FormFields } from "../components/EventForm/eventFormSchema";
import { setTime } from "../libs/date";
import { Location } from "@/app/api/domain/entities/CalendarEvent";
import { useStore } from "../store/storeContext";

export const useSaveEventForm = (location: Location) => {
  const { eventsStore } = useStore();

  const saveEvent = ({ date, startTime, endTime, ...data }: FormFields) => {
    const timezoneOffSet = tzOffset("America/Santiago", date);
    const dateWithTimezoneFixed = addMinutes(
      date,
      timezoneOffSet >= 0 ? timezoneOffSet : timezoneOffSet * -1,
    );
    const startDateTime = setTime(dateWithTimezoneFixed, startTime);
    const endDateTime = setTime(dateWithTimezoneFixed, endTime);

    return () =>
      eventsStore.saveEvent({
        ...data,
        id: "",
        location,
        startDateTime,
        endDateTime:
          endTime === "00:00" ? addDays(endDateTime, 1) : endDateTime,
        durationInMinutes: differenceInMinutes(endDateTime, startDateTime),
        color: "",
      });
  };

  return saveEvent;
};
