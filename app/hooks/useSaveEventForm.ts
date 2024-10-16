import { tzOffset } from "@date-fns/tz";
import { addMinutes, differenceInMinutes } from "date-fns";
import { FormFields } from "../components/EventForm/eventFormSchema";
import { setTime } from "../libs/date";
import { CalendarEventType } from "../types/CalendarEvent";

export const useSaveEventForm =
  (onSave: (event: CalendarEventType) => void) =>
  ({ date, startTime, endTime, ...data }: FormFields) => {
    const timezoneOffSet = tzOffset("America/Santiago", date);
    const dateWithTimezoneFixed = addMinutes(
      date,
      timezoneOffSet >= 0 ? timezoneOffSet : timezoneOffSet * -1,
    );
    const startDateTime = setTime(dateWithTimezoneFixed, startTime);
    const endDateTime = setTime(dateWithTimezoneFixed, endTime);
    onSave({
      ...data,
      startDateTime,
      endDateTime,
      durationInMinutes: differenceInMinutes(endDateTime, startDateTime),
    });
  };
