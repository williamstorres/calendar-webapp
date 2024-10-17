import {
  differenceInCalendarDays,
  isSameDay,
  isSameHour,
  subMinutes,
} from "date-fns";
import { tzOffset } from "@date-fns/tz";
import { UTCDate } from "@date-fns/utc";
import { isLeft, Left, Right } from "@/app/api/core/Either";
import { Logger } from "../ports/logger";
import { GetWeather } from "../ports/weatherRepository";
import { GetWeatherFilters } from "../entities/WeatherInfo";

type GetWeatherInfoDependencies = {
  logger: Logger;
  getWeather: GetWeather;
};
const getWeatherInfo =
  ({ logger, getWeather }: GetWeatherInfoDependencies) =>
  async ({ location, date }: GetWeatherFilters) => {
    logger.debug("getWeatherInfo", location, date);

    const today = new Date();

    const days = differenceInCalendarDays(date, today) + 2;
    if (days > 10) return Left("No soportado");

    const result = await getWeather(location, days)
      .then((response) => Right(response))
      .catch((error) => {
        logger.error(error);
        return Left("ha ocurrido un error al obtener el clima");
      });
    if (isLeft(result)) return result;

    const offsetMinutes = tzOffset(result.value.location.tz_id, date);
    const normaliceDate = subMinutes(new UTCDate(date), offsetMinutes);

    const condition = result.value.forecast.forecastday
      .filter((forecast) => {
        return isSameDay(normaliceDate, new Date(forecast.date_epoch * 1000));
      })
      .map((forecast) =>
        forecast.hour.find((hour) =>
          isSameHour(normaliceDate, new Date(hour.time_epoch * 1000)),
        ),
      )[0];
    if (!condition)
      return Left("No se han encontrado las condiciones de clima");

    return Right(condition);
  };
export default getWeatherInfo;
