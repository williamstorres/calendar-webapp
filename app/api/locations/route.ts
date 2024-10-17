import { NextRequest } from "next/server";
import { pino } from "pino";
import { GetLocationsFiltersSchema } from "../domain/entities/WeatherInfo";
import { getLocations } from "../adapters/weatherApiRepository";
import getLocationsUseCase from "../domain/use-cases/getLocationsUseCase";

const logger = pino();

export async function GET(request: NextRequest) {
  const { success, data, error } = GetLocationsFiltersSchema.safeParse({
    query: request.nextUrl.searchParams.get("query"),
  });

  if (!success) return Response.json(error, { status: 400 });

  const result = await getLocationsUseCase({
    logger,
    getLocations: getLocations,
  })(data);

  return Response.json(result.value);
}
