import axios from "axios";
import { Location } from "../api/domain/entities/CalendarEvent";
import { GetWeatherFilters } from "../api/domain/entities/WeatherInfo";
import { TZDate } from "@date-fns/tz";
import { handleCancelable } from "../libs/utils";

const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_HOST}api`,
});
export const getLocations = async (query: string): Promise<Location[]> => {
  return API.get(`/locations?query=${query}`).then((response) => response.data);
};

export const getWeatherConditions = ({
  location,
  date,
  timezone,
}: GetWeatherFilters) => {
  const normalizedDate = new TZDate(date, timezone);
  return handleCancelable((signal) =>
    API.get(
      `/weather?location=${location}&date=${normalizedDate.toISOString()}&timezone=${timezone}`,
      { signal },
    ).then((response) => response.data),
  );
};

export const getTimezones = (query: string) => {
  const timezones = Intl.supportedValuesOf("timeZone");
  if (query.trim() === "") return timezones;
  return timezones.filter((timezone) =>
    timezone
      .toLowerCase()
      .trim()
      .replace("_", " ")
      .includes(query.toLowerCase().trim()),
  );
};
