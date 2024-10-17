import { useEffect, useState } from "react";
import {
  GetWeatherFilters,
  WeatherCondition,
  WeatherConditionSchema,
} from "../api/domain/entities/WeatherInfo";
import { getWeatherConditions } from "../services/locationsService";

export const useWeatherConditionsApi = ({
  location,
  date,
}: GetWeatherFilters) => {
  const [condition, setCondition] = useState<WeatherCondition>();

  useEffect(() => {
    getWeatherConditions({ location, date }).then((result) => {
      setCondition(WeatherConditionSchema.parse(result));
    });
  }, [location, date]);

  return condition;
};
