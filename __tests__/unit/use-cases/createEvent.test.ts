import { isLeft, isRight } from "@/app/api/core/Either";
import { SaveEvent } from "@/app/api/domain/ports/eventRepository";
import { Logger } from "@/app/api/domain/ports/logger";
import createEvent from "@/app/api/domain/use-cases/createEvent";
import { TZDate } from "@date-fns/tz";
import { fakerES as faker } from "@faker-js/faker";
import { addHours } from "date-fns";

jest.mock("nanoid");

describe("Use case Create Event", () => {
  const loggerMock: jest.Mocked<Logger> = {
    warn: jest.fn(),
    info: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  };

  const baseEvent = {
    id: "",
    title: "",
    location: {
      id: 0,
      name: "",
      region: "",
      country: "",
    },
    description: null,
    startDateTime: new TZDate(),
    endDateTime: new TZDate(),
    color: "",
    timezone: "",
    durationInMinutes: 0,
    isAllDay: false,
  };

  it("return errors of required properties", async () => {
    const saveEventMock: jest.Mocked<SaveEvent> = jest.fn();
    const response = await createEvent({
      logger: loggerMock,
      saveEvent: saveEventMock,
      generateId: jest.fn(),
    })({ ...baseEvent });
    expect(isLeft(response)).toBeTruthy();
    expect(saveEventMock).not.toHaveBeenCalled();
  });

  it("create an event with all required properties", async () => {
    const saveEventMock: jest.Mocked<SaveEvent> = jest
      .fn()
      .mockReturnValueOnce(Promise.resolve());
    const response = await createEvent({
      logger: loggerMock,
      saveEvent: saveEventMock,
      generateId: jest.fn(),
    })({
      ...baseEvent,
      title: faker.company.buzzPhrase(),
      location: {
        id: 0,
        name: faker.location.city(),
        region: "",
        country: "",
      },
      startDateTime: new TZDate(),
      endDateTime: addHours(new TZDate(), 1),
      timezone: "America/Santiago",
      durationInMinutes: 60,
    });
    expect(isRight(response)).toBeTruthy();
    expect(saveEventMock).toHaveBeenCalledTimes(1);
  });

  it("return error when timezone is not valid", async () => {
    const saveEventMock: jest.Mocked<SaveEvent> = jest
      .fn()
      .mockReturnValueOnce(Promise.resolve());
    const response = await createEvent({
      logger: loggerMock,
      saveEvent: saveEventMock,
      generateId: jest.fn(),
    })({
      ...baseEvent,
      title: faker.company.buzzPhrase(),
      location: {
        id: 0,
        name: faker.location.city(),
        region: "",
        country: "",
      },
      startDateTime: new TZDate(),
      endDateTime: addHours(new TZDate(), 1),
      timezone: "algo",
      durationInMinutes: 60,
    });
    expect(isLeft(response)).toBeTruthy();
    expect(saveEventMock).not.toHaveBeenCalled();
    expect(response.value).toBe("La zona horaria no es válida");
  });
});
