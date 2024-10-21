import { differenceInCalendarDays, isSameDay, isSameHour } from "date-fns";
import { TZDate } from "@date-fns/tz";
import { utc, UTCDate } from "@date-fns/utc";
import { isLeft, Left, Right } from "@/app/api/core/Either";
import { Logger } from "../ports/logger";
import {
  ForecastDay,
  GetWeather,
  WeatherResponse,
} from "../ports/weatherRepository";
import { GetWeatherFilters } from "../entities/WeatherInfo";

type GetWeatherInfoDependencies = {
  logger: Logger;
  getWeather: GetWeather;
};
/**
 * Obtiene la información del clima según la ubicación, fecha y zona horaria especificadas.
 *
 */
const getWeatherInfo =
  ({ logger, getWeather }: GetWeatherInfoDependencies) =>
  async ({ location, date, timezone }: GetWeatherFilters) => {
    logger.debug("getWeatherInfo", { location, date });

    const today = new Date();

    //el api de forecast solo soporta consultar por los siguientes 10 dias (plan gratis)
    const days = differenceInCalendarDays(date, today) + 2;
    if (days > 10) return Left("No soportado");

    const result = await getWeather(location, days)
      .then((response) => Right(response))
      .catch((error) => {
        logger.error(error);
        return Left("ha ocurrido un error al obtener el clima");
      });
    if (isLeft(result)) return result;

    //debido a que llegan en utc y se deben pasar al timezone de consulta
    const normalizedDate = new TZDate(date, timezone);

    const condition = filterByDay(result.value, normalizedDate).map(
      findByHour(normalizedDate),
    )[0];

    if (!condition)
      return Left("No se han encontrado las condiciones de clima");

    return Right(condition);
  };

const filterByDay = (response: WeatherResponse, date: TZDate) => {
  return response.forecast.forecastday.filter((forecast) => {
    return isSameDay(date, new UTCDate(forecast.date_epoch * 1000), {
      in: utc,
    });
  });
};
const findByHour = (date: TZDate) => (forecastDay: ForecastDay) => {
  return forecastDay.hour.find((hour) => {
    return isSameHour(date, new UTCDate(hour.time_epoch * 1000), { in: utc });
  })!;
};
export default getWeatherInfo;
