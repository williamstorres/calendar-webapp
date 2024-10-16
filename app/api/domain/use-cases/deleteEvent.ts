import { DeleteEvent } from "../ports/eventRepository";
import { CalendarEventId } from "../entities/CalendarEvent";
import { Logger } from "../ports/logger";
import { Left, Right } from "@/app/api/core/Either";

type DeleteEventDependencies = {
  logger: Logger;
  deleteEvent: DeleteEvent;
};
const deleteEvent =
  ({ logger, deleteEvent }: DeleteEventDependencies) =>
  async (id: CalendarEventId) => {
    logger.debug(`deleting event ${id}`);

    return deleteEvent(id)
      .then(() => Right(null))
      .catch((error) => {
        logger.error(error);
        return Left("Ha ocurrido un error al eliminar el evento");
      });
  };
export default deleteEvent;
