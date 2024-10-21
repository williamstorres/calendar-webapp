import { Logger } from "@/app/api/domain/ports/logger";
import { GetWeather } from "@/app/api/domain/ports/weatherRepository";
import getWeatherInfo from "@/app/api/domain/use-cases/getWeatherInfo";
import { weatherMock } from "./weatherMock";
import { isRight } from "@/app/api/core/Either";
import { WeatherCondition } from "@/app/api/domain/entities/WeatherInfo";

describe("Use case Get Weather Info", () => {
  const loggerMock: jest.Mocked<Logger> = {
    warn: jest.fn(),
    info: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  };

  it("get weather current timezone", async () => {
    const saveEventMock: jest.Mocked<GetWeather> = jest
      .fn()
      .mockReturnValueOnce(Promise.resolve(weatherMock));
    const response = await getWeatherInfo({
      logger: loggerMock,
      getWeather: saveEventMock,
    })({
      location: 2618724,
      date: new Date("2024-10-21T11:00:00.000-04:00"),
      timezone: "America/New_York",
    });

    expect(isRight(response)).toBeTruthy();
    expect((response.value as unknown as WeatherCondition).condition.code).toBe(
      "1000",
    );
  });
});
