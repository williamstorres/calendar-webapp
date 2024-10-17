import { Left, Right } from "@/app/api/core/Either";
import { GetLocationsFilters } from "../entities/WeatherInfo";
import { GetLocations } from "../ports/weatherRepository";
import { Logger } from "../ports/logger";

type GetLocationsDependencies = {
  logger: Logger;
  getLocations: GetLocations;
};
const getLocationsUseCase =
  ({ logger, getLocations }: GetLocationsDependencies) =>
  async ({ query }: GetLocationsFilters) => {
    logger.debug("getLocationsUseCase", query);

    return await getLocations(query)
      .then(Right)
      .catch((err) => {
        logger.error(err);
        return Left("Ha ocurrido un error");
      });
  };
export default getLocationsUseCase;
