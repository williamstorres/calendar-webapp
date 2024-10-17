"use client";
import CalendarContent from "../CalendarContent";
import { observer } from "mobx-react-lite";
import { useStore } from "@/app/store/storeContext";
import CalendarsContainer from "../CalendarsContainer";
import { CalendarType } from "@/app/types/CalendarType";
import { PlusIcon } from "@heroicons/react/24/solid";
import CalendarHeader from "../CalendarHeader";
import { Loading } from "../UI";

export const Calendar = observer(() => {
  const store = useStore();

  const generateCalendars = (calendar: CalendarType) => (
    <CalendarContent
      key={`${calendar.year}${calendar.month}`}
      item={calendar}
    />
  );

  return (
    <>
      <Loading loading={store.isLoading} />
      <CalendarHeader selectedMonth={store.month} selectedYear={store.year} />
      <div className="w-screen">
        <CalendarsContainer items={store.calendars}>
          {generateCalendars}
        </CalendarsContainer>
      </div>
      {!store.showEventForm && (
        <button
          className="bg-secondary px-2 my-2 mx-2 rounded-full fixed bottom-5 right-5 aspect-square z-[1000]"
          onClick={() => {
            store.showEventForm = true;
          }}
        >
          <PlusIcon className="size-10" />
        </button>
      )}
    </>
  );
});
