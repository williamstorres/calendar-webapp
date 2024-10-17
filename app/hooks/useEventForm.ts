import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarEventType } from "../types/CalendarEvent";
import { addHours } from "date-fns";
import { getTime } from "@/app/libs/date";
import {
  eventFormSchema,
  FormFields,
} from "../components/EventForm/eventFormSchema";
import { useForm } from "react-hook-form";

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
        description: String(selectedEvent.description),
        startTime: getTime(selectedEvent.startDateTime),
        endTime: getTime(selectedEvent.endDateTime),
      }
    : {
        startTime: getTime(initialDate),
        endTime: getTime(addHours(initialDate, 1)),
      };

  return useForm<FormFields>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(eventFormSchema),
    defaultValues,
  });
};
