import { z } from "zod";

export const GetWeatherFiltersSchema = z.object({
  location: z.coerce.number(),
  date: z.coerce.date(),
});
export type GetWeatherFilters = z.infer<typeof GetWeatherFiltersSchema>;

export const GetLocationsFiltersSchema = z.object({
  query: z.coerce.string(),
});
export type GetLocationsFilters = z.infer<typeof GetLocationsFiltersSchema>;

export const WeatherConditionSchema = z.object({
  time_epoch: z.number(),
  temp_c: z.number(),
  condition: z.object({
    icon: z.string(),
    code: z.coerce.string(),
    is_day: z.coerce.boolean(),
  }),
});

export type WeatherCondition = z.infer<typeof WeatherConditionSchema>;
