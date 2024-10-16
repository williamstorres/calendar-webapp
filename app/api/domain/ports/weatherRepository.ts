import { z } from "zod";
import { Location } from "../entities/CalendarEvent";

const WeatherConditionSchema = z.object({
  text: z.string(),
  icon: z.string(),
});

export type WeatherCondition = z.infer<typeof WeatherConditionSchema>;

export const WeatherResponseSchema = z.object({
  location: z.object({
    tz_id: z.string(),
  }),
  forecast: z.object({
    forecastday: z
      .object({
        date_epoch: z.number(),
        hour: z
          .object({
            time_epoch: z.number(),
            temp_c: z.number(),
            condition: WeatherConditionSchema,
          })
          .array(),
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
