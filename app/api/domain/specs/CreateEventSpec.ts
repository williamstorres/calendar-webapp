import { Pair, Predicate } from "@/app/api/core/Either";
import { CalendarEvent } from "../entities/CalendarEvent";
import { isBefore } from "date-fns";

const TitleMustNotBeEmpty = (event: CalendarEvent) => event.title.trim() !== "";
const StartDateMustBeBeforeEndDate = (event: CalendarEvent) =>
  !isBefore(event.endDateTime, event.startDateTime);

export const CreateEventSpec: Pair<Predicate<CalendarEvent>, string>[] = [
  [TitleMustNotBeEmpty, "Se debe ingresar un titulo"],
  [
    StartDateMustBeBeforeEndDate,
    "La fecha de inicio debe ser anterior a la de termino",
  ],
];
