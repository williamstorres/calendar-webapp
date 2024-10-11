"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import CalendarContent from "../CalendarContent";
import CalendarViewSelector from "../CalendarViewSelector";
import { observer } from "mobx-react-lite";
import { formatDate } from "@/app/libs/format";
import { useStore } from "@/app/store/storeContext";
import { useEffect, useRef, useState } from "react";

const getPreviousMonth = (month: number, year: number) => {
  if (month === 0) {
    return { month: 11, year: year - 1 };
  }
  return { month: month - 1, year: year };
};
const getNextMonth = (month: number, year: number) => {
  if (month === 11) {
    return { month: 1, year: year + 1 };
  }
  return { month: month + 1, year: year };
};

export const Calendar = observer(() => {
  const store = useStore();
  const [calendars, setCalendars] = useState([
    getPreviousMonth(store.month, store.year),
    { month: store.month, year: store.year },
    getNextMonth(store.month, store.year),
  ]);
  const calendarContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = calendarContainer.current;
    if (container) container.scrollLeft = 390;
  }, []);

  const handlePreviousMonth = () => {
    store.previousMonth();
    setCalendars([
      getPreviousMonth(store.month, store.year),
      { month: store.month, year: store.year },
      getNextMonth(store.month, store.year),
    ]);
  };

  const handleNextMonth = () => {
    store.previousMonth();
    setCalendars([
      getPreviousMonth(store.month, store.year),
      { month: store.month, year: store.year },
      getNextMonth(store.month, store.year),
    ]);
  };

  const handleToday = () => {
    store.today();
    setCalendars([
      getPreviousMonth(store.month, store.year),
      { month: store.month, year: store.year },
      getNextMonth(store.month, store.year),
    ]);
  };

  const handleScroll = () => {
    const currentContainer = calendarContainer.current;
    if (currentContainer && currentContainer.style.visibility === "") {
      currentContainer.style.visibility = "visible";
      currentContainer.style.scrollBehavior = "smooth";
      return;
    }
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
        <div
          ref={calendarContainer}
          className="flex flex-row overflow-x-auto snap-x snap-mandatory invisible"
          onScroll={handleScroll}
        >
          {calendars.map((calendar) => (
            <CalendarContent
              key={`${calendar.year}${calendar.month}`}
              month={calendar.month}
              year={calendar.year}
            />
          ))}
        </div>
      </div>
    </>
  );
});
