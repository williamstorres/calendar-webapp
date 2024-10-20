import { renderStoreProvider } from "@/__tests__/testUtils";
import CalendarDay from "@/app/components/CalendarDay";
import { Views } from "@/app/store/calendarStore";
import RootStore from "@/app/store/rootStore";
import { fireEvent, screen } from "@testing-library/react";
import { setHours } from "date-fns";

describe("CalendarDay", function () {
  it("Open modal to create a new event when click the component", async function () {
    const store = new RootStore();
    const setShowEventForm = jest.spyOn(
      store.calendarStore,
      "setShowEventForm",
    );
    const setDate = jest.spyOn(store.calendarStore, "setDate");
    const today = new Date();

    renderStoreProvider(<CalendarDay day={today} events={[]} />, store);

    const calendarDay = await screen.findByTestId("calendar-day");
    fireEvent.click(calendarDay);

    expect(setShowEventForm).toHaveBeenCalledWith(true);
    expect(setDate).toHaveBeenCalledWith(today);
  });

  it("Open modal to create a new event in a specifict hour when click the component", async function () {
    const store = new RootStore();
    store.calendarStore.setSelectedView(Views.Day);
    const setShowEventForm = jest.spyOn(
      store.calendarStore,
      "setShowEventForm",
    );
    const setDate = jest.spyOn(store.calendarStore, "setDate");
    const today = new Date();
    renderStoreProvider(<CalendarDay day={today} events={[]} />, store);

    const calendarDay = await screen.findByTestId(10);
    fireEvent.click(calendarDay, { clientX: 20 * 10, clientY: 50 });

    expect(setShowEventForm).toHaveBeenCalledWith(true);
    expect(setDate).toHaveBeenCalledWith(setHours(today, 10));
  });
});
