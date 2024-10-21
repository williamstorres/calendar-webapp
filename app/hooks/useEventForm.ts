import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarEventType } from "../types/CalendarEvent";
import { addHours } from "date-fns";
import { getTime } from "@/app/libs/date";
import {
  eventFormSchema,
  FormFields,
} from "../components/EventForm/eventFormSchema";
import { useForm } from "react-hook-form";
import { currentTimezone } from "../constants";

type UseEventFormParams = {
  selectedEvent: CalendarEventType | undefined;
  initialDate: Date;
};
export const useEventForm = ({
  selectedEvent,
  initialDate,
}: UseEventFormParams) => {
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
