import EventForm from "@/app/components/EventForm";
import RootStore from "@/app/store/rootStore";
import { StoreProvider } from "@/app/store/storeContext";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { parse } from "date-fns";
import { fakerES as faker } from "@faker-js/faker";
import { getLocations } from "@/app/services/locationsService";

jest.mock("@/app/services/locationsService", () => {
  return {
    getWeatherConditions: jest.fn(),
    getLocations: jest.fn(),
  };
});

describe("EventForm", function () {
  beforeAll(function () {
    jest.clearAllMocks();
    const date = parse("2024-10-18", "yyyy-MM-dd", new Date());
    jest.useFakeTimers().setSystemTime(date);
  });

  function renderStoreProvider(children: React.ReactNode, store: RootStore) {
    return render(
      <StoreProvider initialData={store}>{children}</StoreProvider>,
    );
  }

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
      expect(screen.getByText("Santiago")).toBeInTheDocument();
    });
    const option = screen.getByText("Santiago");
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
