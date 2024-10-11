"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import CalendarContent from "../CalendarContent";
import CalendarViewSelector from "../CalendarViewSelector";
import { observer } from "mobx-react-lite";
import { formatDate } from "@/app/libs/format";
import { useStore } from "@/app/store/storeContext";
import { useState } from "react";
import CalendarsContainer from "../CalendarsContainer";
import { CalendarType } from "@/app/types/CalendarType";

export const Calendar = observer(() => {
  const store = useStore();
  const [calendars, setCalendars] = useState<CalendarType[]>([
    { month: store.month, year: store.year },
  ]);

  const handlePreviousMonth = () => {
    store.previousMonth();
    updateCalendarsList();
  };

  const handleNextMonth = () => {
    store.nextMont();
    updateCalendarsList();
  };

  const handleToday = () => {
    store.today();
    updateCalendarsList();
  };

  const updateCalendarsList = () => {
    setCalendars([{ month: store.month, year: store.year }]);
  };

  const generateCalendars = (calendar: CalendarType) => {
    return (
      <CalendarContent
        key={`${calendar.year}${calendar.month}`}
        item={calendar}
      />
    );
  };

  return (
    <>
      <CalendarViewSelector />
      <div className="flex justify-between">
        <div className="flex">
          <h2 role="month-label" className="font-bold text-lg px-2 py-3">
            {formatDate(new Date(store.year, store.month, 1), "MMMM")}
          </h2>
          <h3 className="text-lg py-3">{store.year}</h3>
        </div>
        <div className="flex px-5">
          <button
            role="previous-month"
            className="bg-zinc-800 px-2 my-2 mx-2 rounded-md"
            onClick={() => handlePreviousMonth()}
          >
            <ChevronLeftIcon className="size-4" />
          </button>
          <button
            className="bg-zinc-800 px-2 my-2 rounded-md font-bold text-sm"
            onClick={() => handleToday()}
          >
            Hoy
          </button>
          <button
            className="bg-zinc-800 px-2 my-2 mx-2 rounded-md"
            onClick={() => handleNextMonth()}
          >
            <ChevronRightIcon className="size-4" />
          </button>
        </div>
      </div>
      <div className="w-screen">
        <CalendarsContainer items={calendars}>
          {generateCalendars}
        </CalendarsContainer>
      </div>
    </>
  );
});
