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
