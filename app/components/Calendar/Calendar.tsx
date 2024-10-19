"use client";
import CalendarContent from "../CalendarMonthView";
import { observer } from "mobx-react-lite";
import { useStore } from "@/app/store/storeContext";
import CalendarsContainer from "../CalendarsContainer";
import { Month } from "@/app/types/CalendarType";
import { PlusIcon } from "@heroicons/react/24/solid";
import CalendarHeader from "./CalendarHeader";
import { Loading } from "../UI";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Calendar: React.FC = observer(() => {
  const { eventsStore, calendarStore } = useStore();
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (firstRender && typeof window === "undefined") return;

    const { cancel, events } = eventsStore.fethMonthlyEvents(
      calendarStore.date,
    );
    events.then(() => setFirstRender(false));

    return () => cancel();
  }, [eventsStore, calendarStore, calendarStore.date, firstRender]);

  useEffect(() => {
    if (calendarStore.error)
      toast.error(calendarStore.error, {
        position: "top-right",
      });
  }, [calendarStore, calendarStore.error]);

  const generateCalendars = (month: Month) => (
    <CalendarContent key={`${month.year}${month.month}`} month={month} />
  );

  return (
    <>
      <Loading loading={calendarStore.isLoading} />
      <CalendarHeader
        selectedMonth={calendarStore.month}
        selectedYear={calendarStore.year}
      />
      <div className="w-screen">
        <CalendarsContainer items={calendarStore.calendars}>
          {generateCalendars}
        </CalendarsContainer>
      </div>
      {!calendarStore.showEventForm && (
        <button
          aria-label="add Event"
          className="bg-secondary px-2 my-2 mx-2 rounded-full fixed bottom-5 right-5 aspect-square z-[1000]"
          onClick={() => {
            calendarStore.setShowEventForm(true);
          }}
        >
          <PlusIcon className="size-10" />
        </button>
      )}
      <ToastContainer />
    </>
  );
});
