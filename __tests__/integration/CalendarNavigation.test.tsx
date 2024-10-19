import { Views } from "@/app/store/calendarStore";
import { StoreProvider } from "@/app/store/storeContext";
import { fireEvent, render, screen } from "@testing-library/react";
import Calendar from "@/app/components/Calendar";
import { parse } from "date-fns";
import RootStore from "@/app/store/rootStore";

describe("Calendar", function () {
  beforeAll(function () {
    const date = parse("2024-10-18", "yyyy-MM-dd", new Date());
    jest.useFakeTimers().setSystemTime(date);
  });

  function renderStoreProvider(children: React.ReactNode, store: RootStore) {
    return render(
      <StoreProvider initialData={store}>{children}</StoreProvider>,
    );
  }

  it("select next day", function () {
    const store = new RootStore();
    store.calendarStore.setSelectedView(Views.Day);

    renderStoreProvider(<Calendar />, store);
    fireEvent.click(screen.getByRole("button", { name: "next calendar page" }));

    const activeDay = screen.getByTestId("active-day");

    expect(activeDay.textContent).toContain("19");
  });

  it("select previous day", function () {
    const store = new RootStore();
    store.calendarStore.setSelectedView(Views.Day);

    renderStoreProvider(<Calendar />, store);
    fireEvent.click(
      screen.getByRole("button", { name: "previous calendar page" }),
    );

    const activeDay = screen.getByTestId("active-day");

    expect(activeDay.textContent).toContain("17");
  });

  it("select today", function () {
    const store = new RootStore();
    store.calendarStore.setSelectedView(Views.Day);

    renderStoreProvider(<Calendar />, store);

    fireEvent.click(
      screen.getByRole("button", { name: "previous calendar page" }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Hoy" }));

    const activeDay = screen.getByTestId("active-day");

    expect(activeDay.textContent).toContain("18");
  });
});
