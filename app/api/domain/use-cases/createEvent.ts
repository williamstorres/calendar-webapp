import { firstLeft, isLeft, Left, Right } from "@/app/api/core/Either";
import { CalendarEvent } from "../entities/CalendarEvent";
import { SaveEvent } from "../ports/eventRepository";
import { CreateEventSpec } from "../specs/CreateEventSpec";
import { Logger } from "../ports/logger";
import { differenceInMinutes } from "date-fns";
import { GenerateId } from "../ports/idGenerator";

type CreateEventDependencies = {
  logger: Logger;
  saveEvent: SaveEvent;
  generateId: GenerateId;
};
const createEvent =
  ({ logger, saveEvent, generateId }: CreateEventDependencies) =>
  async (newEvent: CalendarEvent) => {
    logger.debug("createEvent", newEvent);

    const specResult = firstLeft(newEvent, CreateEventSpec);
    if (isLeft(specResult)) return specResult;

    return await saveEvent({
      ...newEvent,
      id: generateId(),
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
