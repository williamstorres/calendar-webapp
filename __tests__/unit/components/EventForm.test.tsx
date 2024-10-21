import EventForm from "@/app/components/EventForm";
import RootStore from "@/app/store/rootStore";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { fakerES as faker } from "@faker-js/faker";
import { getLocations } from "@/app/services/locationsService";
import { renderStoreProvider } from "@/__tests__/testUtils";

jest.mock("@/app/services/locationsService", () => {
  return {
    getWeatherConditions: jest.fn(),
    getLocations: jest.fn(),
  };
});

describe("EventForm", function () {
  it("required inputs", async function () {
    const store = new RootStore();
    const saveEventMock = jest
      .spyOn(store.eventsStore, "saveEvent")
      .mockReturnValue(Promise.resolve());

    renderStoreProvider(<EventForm />, store);

    fireEvent.click(screen.getByRole("button", { name: "Guardar" }));

    const titleError = document.querySelector(
      'label[name="title"] + input + div > span[data-testid="error"]',
    );
    const locationError = document.querySelector(
      'label[name="location"] + input + div > span[data-testid="error"]',
    );

    expect(saveEventMock).toHaveBeenCalledTimes(0);
    await waitFor(() => {
      expect(titleError?.textContent).not.toBe("");
      expect(locationError?.textContent).not.toBe("");
    });
  });

  it("start date must be < than end date", async function () {
    const store = new RootStore();
    renderStoreProvider(<EventForm />, store);

    fireEvent.change(screen.getByLabelText("Hora de inicio"), {
      target: { value: "10:00" },
    });
    fireEvent.change(screen.getByLabelText("Hora de termino"), {
      target: { value: "09:00" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Guardar" }));

    const endDateError = document.querySelector(
      'input[name="endTime"] + div > span[data-testid="error"]',
    );

    await waitFor(() => {
      expect(endDateError?.textContent).toBe(
        "La hora de termino debe ser posterior a la de inicio",
      );
    });
  });

  it("call save event in store", async function () {
    (getLocations as jest.Mock).mockImplementation(() =>
      Promise.resolve([
        {
          id: 372662,
          name: "Santiago",
          region: "Region Metropolitana",
          country: "Chile",
        },
      ]),
    );
    const store = new RootStore();
    const saveEventMock = jest
      .spyOn(store.eventsStore, "saveEvent")
      .mockReturnValue(Promise.resolve());

    renderStoreProvider(<EventForm />, store);

    fireEvent.change(screen.getByLabelText("Titulo"), {
      target: { value: faker.company.buzzPhrase() },
    });
    fireEvent.change(screen.getByLabelText("Ubicación"), {
      target: { value: faker.location.city() },
    });
    await waitFor(() => {
      expect(screen.getByTestId("location-0")).toBeInTheDocument();
    });
    const option = screen.getByTestId("location-0");
    fireEvent.click(option);

    fireEvent.change(screen.getByLabelText("Hora de inicio"), {
      target: { value: "10:00" },
    });
    fireEvent.change(screen.getByLabelText("Hora de termino"), {
      target: { value: "11:00" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Guardar" }));

    const errors = screen.getAllByTestId("error");
    await waitFor(() => {
      errors.forEach((error) => {
        expect(error?.textContent).toBe("");
      });
      expect(saveEventMock).toHaveBeenCalledTimes(1);
    });
  });
});
