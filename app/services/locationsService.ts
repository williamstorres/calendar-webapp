import axios from "axios";
import { Location } from "../api/domain/entities/CalendarEvent";
import { GetWeatherFilters } from "../api/domain/entities/WeatherInfo";
import { formatISO } from "date-fns";

const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_HOST}api`,
});
export const getLocations = async (query: string): Promise<Location[]> => {
  return API.get(`/locations?query=${query}`).then((response) => response.data);
};

export const getWeatherConditions = async ({
  location,
  date,
}: GetWeatherFilters) => {
  return API.get(`/weather?location=${location}&date=${formatISO(date)}`).then(
    (response) => response.data,
  );
};
