import { z } from "zod";
import { Location } from "../entities/CalendarEvent";
import { WeatherConditionSchema } from "../entities/WeatherInfo";

export const WeatherResponseSchema = z.object({
  location: z.object({
    tz_id: z.string(),
  }),
  forecast: z.object({
    forecastday: z
      .object({
        date_epoch: z.number(),
        hour: WeatherConditionSchema.array(),
      })
      .array(),
  }),
});

export type WeatherResponse = z.infer<typeof WeatherResponseSchema>;

export type GetWeather = (
  location: number,
  days: number,
) => Promise<WeatherResponse>;

export type GetLocations = (query: string) => Promise<Location[]>;
