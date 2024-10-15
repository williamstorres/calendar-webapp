import { Pair, Predicate } from "@/app/api/core/Either";
import { CalendarEvent } from "../entities/CalendarEvent";
import {
  StartDateMustBeBeforeEndDate,
  TitleMustNotBeEmpty,
} from "./SpecPredicates";

export const UpdateEventSpec: Pair<Predicate<CalendarEvent>, string>[] = [
  [TitleMustNotBeEmpty, "Se debe ingresar un titulo"],
  [
    StartDateMustBeBeforeEndDate,
    "La fecha de inicio debe ser anterior a la de termino",
  ],
];
