import { z } from "zod";

export const GetWeatherFiltersSchema = z.object({
  location: z.coerce.number(),
  date: z.coerce.date(),
});
export type GetWeatherFilters = z.infer<typeof GetWeatherFiltersSchema>;
