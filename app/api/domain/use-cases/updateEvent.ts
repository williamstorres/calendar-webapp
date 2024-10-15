import { firstLeft, isLeft, Left, Right } from "@/app/api/core/Either";
import { CalendarEvent } from "../entities/CalendarEvent";
import { UpdateEvent } from "../ports/eventRepository";
import { Logger } from "../ports/logger";
import { UpdateEventSpec } from "../specs/UpdateEventSpec";

type UpdateEventDependencies = {
  logger: Logger;
  updateEvent: UpdateEvent;
};
const updateEvent =
  ({ logger, updateEvent }: UpdateEventDependencies) =>
  async (event: CalendarEvent) => {
    logger.debug("updating event", event);

    const specResult = firstLeft(event, UpdateEventSpec);
    if (isLeft(specResult)) return specResult;

    return await updateEvent(event)
      .then(Right)
      .catch((err) => {
        logger.error(err);
        return Left("Ha ocurrido un error");
      });
  };
export default updateEvent;
