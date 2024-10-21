import { NextRequest } from "next/server";
import getWeatherInfo from "../domain/use-cases/getWeatherInfo";
import { pino } from "pino";
import { GetWeatherFiltersSchema } from "../domain/entities/WeatherInfo";
import { getWeather } from "../adapters/weatherApiRepository";

const logger = pino();

export async function GET(request: NextRequest) {
  const { success, data, error } = GetWeatherFiltersSchema.safeParse({
    location: request.nextUrl.searchParams.get("location"),
    date: request.nextUrl.searchParams.get("date"),
    timezone: request.nextUrl.searchParams.get("timezone"),
  });

  if (!success) return Response.json(error, { status: 400 });

  const result = await getWeatherInfo({ logger, getWeather: getWeather })(data);

  return Response.json(result.value);
}
