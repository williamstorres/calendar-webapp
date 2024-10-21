import { isBefore } from "date-fns";
import { CalendarEvent } from "../entities/CalendarEvent";

export const TitleMustNotBeEmpty = (event: CalendarEvent) =>
  event.title.trim() !== "";

export const StartDateMustBeBeforeEndDate = (event: CalendarEvent) =>
  !isBefore(event.endDateTime, event.startDateTime);

export const TimezoneMustBeValid = (event: CalendarEvent) =>
  Intl.supportedValuesOf("timeZone").find(
    (timezone) => timezone === event.timezone.trim(),
  ) !== undefined;
