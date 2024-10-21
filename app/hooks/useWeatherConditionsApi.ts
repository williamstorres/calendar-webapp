import { useEffect, useState } from "react";
import {
  GetWeatherFilters,
  WeatherCondition,
  WeatherConditionSchema,
} from "../api/domain/entities/WeatherInfo";
import { getWeatherConditions } from "../services/locationsService";
import { toast } from "react-toastify";

/**
 * Hook personalizado para obtener las condiciones climáticas de una ubicación específica.
 *
 * Este hook realiza una solicitud a la API de clima para obtener condiciones
 * meteorológicas basadas en la ubicación, la zona horaria y la fecha proporcionadas.
 *
 * @param {GetWeatherFilters} params - Parámetros para la solicitud de clima.
 * @param {string} params.location - La ubicación para la que se desea obtener el clima.
 * @param {string} params.timezone - La zona horaria de la ubicación.
 * @param {Date} params.date - La fecha para la que se desea obtener las condiciones climáticas.
 *
 * @returns {{ loading: boolean, weatherConditions: WeatherCondition | undefined }} Un objeto que contiene:
 *   - `loading`: Un booleano que indica si la solicitud está en curso.
 *   - `weatherConditions`: Las condiciones climáticas obtenidas o `undefined` si no están disponibles.
 *
 * @example
 * const { loading, weatherConditions } = useWeatherConditionsApi({
 *   location: "New York",
 *   timezone: "America/New_York",
 *   date: new Date(),
 * });
 */
export const useWeatherConditionsApi = ({
  location,
  timezone,
  date,
}: GetWeatherFilters): {
  loading: boolean;
  weatherConditions: WeatherCondition | undefined;
} => {
  const [weatherConditions, setWeatherConditions] =
    useState<WeatherCondition>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { cancel, request } = getWeatherConditions({
      location,
      timezone,
      date,
    });

    request
      .then((result) => {
        const { success, data } = WeatherConditionSchema.safeParse(result);
        if (success) return setWeatherConditions(data);
        toast.warning("No se ha logrado obtener información del clima", {
          toastId: "weather-conditions-error",
        });
      })
      .finally(() => setLoading(false));

    return () => cancel();
  }, [location, timezone, date, setLoading]);

  return { loading, weatherConditions };
};
