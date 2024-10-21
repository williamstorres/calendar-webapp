import { useEffect, useState } from "react";
import {
  GetWeatherFilters,
  WeatherCondition,
  WeatherConditionSchema,
} from "../api/domain/entities/WeatherInfo";
import { getWeatherConditions } from "../services/locationsService";
import { toast } from "react-toastify";

export const useWeatherConditionsApi = ({
  location,
  timezone,
  date,
}: GetWeatherFilters) => {
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
