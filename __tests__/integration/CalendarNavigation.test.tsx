import { Views } from "@/app/store/calendarStore";
import { fireEvent, screen } from "@testing-library/react";
import Calendar from "@/app/components/Calendar";
import RootStore from "@/app/store/rootStore";
import { renderStoreProvider } from "../testUtils";

describe("Calendar", function () {
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
