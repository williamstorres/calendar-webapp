import { format } from "date-fns";
import { GetEventsFilters } from "../entities/CalendarEvent";
import { GetEvents } from "../ports/eventRepository";
import { isLeft, Left, Right } from "@/app/api/core/Either";
import { Logger } from "../ports/logger";

type GetEventsDependencies = {
  logger: Logger;
  getEvents: GetEvents;
};
/**
 * Obtiene eventos filtrados por mes y año, y los agrupa por fecha de inicio.
 */
const getEvents =
  ({ logger, getEvents }: GetEventsDependencies) =>
  async ({ month, year }: GetEventsFilters) => {
    logger.debug("getEvents", { month, year });

    const events = await getEvents({ month, year })
      .then(Right)
      .catch((err) => {
        logger.error(err);
        return Left("Ha ocurrido un error");
      });

    if (isLeft(events)) return events;

    return Object.groupBy(events.value, ({ startDateTime }) =>
      format(startDateTime, "yyyyMMdd"),
    );
  };
export default getEvents;
