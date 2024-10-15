import { Pair, Predicate } from "@/app/api/core/Either";
import { GetEventsFilters } from "../entities/CalendarEvent";
import { isValid } from "date-fns";

const MonthAndYearMustBeValid = ({ month, year }: GetEventsFilters) =>
  !isValid(`${year}-${month}-1`);

export const GetEventsSpec: Pair<Predicate<GetEventsFilters>, string>[] = [
  [MonthAndYearMustBeValid, "Mes y año no son validos"],
];
