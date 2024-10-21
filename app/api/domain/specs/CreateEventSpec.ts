import { Pair, Predicate } from "@/app/api/core/Either";
import { CalendarEvent } from "../entities/CalendarEvent";
import {
  StartDateMustBeBeforeEndDate,
  TimezoneMustBeValid,
  TitleMustNotBeEmpty,
} from "./EventSpecPredicates";

export const CreateEventSpec: Pair<Predicate<CalendarEvent>, string>[] = [
  [TitleMustNotBeEmpty, "Se debe ingresar un titulo"],
  [
    StartDateMustBeBeforeEndDate,
    "La fecha de inicio debe ser anterior a la de termino",
  ],
  [TimezoneMustBeValid, "La zona horaria no es válida"],
];
