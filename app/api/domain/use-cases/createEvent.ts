import { firstLeft, isLeft, Left, Right } from "@/app/api/core/Either";
import { CalendarEvent } from "../entities/CalendarEvent";
import { SaveEvent } from "../ports/eventRepository";
import { CreateEventSpec } from "../specs/CreateEventSpec";
import { nanoid } from "nanoid";
import { Logger } from "../ports/logger";
import { differenceInMinutes } from "date-fns";

type CreateEventDependencies = {
  logger: Logger;
  saveEvent: SaveEvent;
};
const createEvent =
  ({ logger, saveEvent }: CreateEventDependencies) =>
  async (newEvent: CalendarEvent) => {
    logger.debug("createEvent", newEvent);

    const specResult = firstLeft(newEvent, CreateEventSpec);
    if (isLeft(specResult)) return specResult;

    return await saveEvent({
      ...newEvent,
      id: nanoid(),
      durationInMinutes: differenceInMinutes(
        newEvent.endDateTime,
        newEvent.startDateTime,
      ),
    })
      .then(Right)
      .catch((err) => {
        logger.error(err);
        return Left("Ha ocurrido un error");
      });
  };
export default createEvent;
