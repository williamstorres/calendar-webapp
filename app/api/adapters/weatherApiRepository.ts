import axios from "axios";
import {
  GetLocations,
  GetWeather,
  WeatherResponseSchema,
} from "../domain/ports/weatherRepository";
import { LocationSchema } from "../domain/entities/CalendarEvent";

const API = axios.create({
  baseURL: process.env.WEATHER_API_BASE_URL!,
});

export const getWeather: GetWeather = async (
  location: number,
  days: number,
) => {
  const apiKey = process.env.WEATHER_APIKEY!;
  return API.get(
    `forecast.json?key=${apiKey}&q=id:${location}&days=${days}&aqi=no&alerts=no`,
  ).then((response) => WeatherResponseSchema.parse(response.data));
};

export const getLocations: GetLocations = async (query: string) => {
  const apiKey = process.env.WEATHER_APIKEY!;
  return API.get(`search.json?key=${apiKey}&q=${query}`)
    .then((response) => response.data)
    .then((data) => LocationSchema.array().parse(data));
};
