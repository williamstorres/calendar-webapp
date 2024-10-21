import { z } from "zod";
import { Location } from "../entities/CalendarEvent";
import { WeatherConditionSchema } from "../entities/WeatherInfo";

const ForecastDaySchema = z.object({
  date_epoch: z.number(),
  hour: WeatherConditionSchema.array(),
});
export type ForecastDay = z.infer<typeof ForecastDaySchema>;

export const WeatherResponseSchema = z.object({
  forecast: z.object({
    forecastday: ForecastDaySchema.array(),
  }),
});

export type WeatherResponse = z.infer<typeof WeatherResponseSchema>;

export type GetWeather = (
  location: number,
  days: number,
) => Promise<WeatherResponse>;

export type GetLocations = (query: string) => Promise<Location[]>;
