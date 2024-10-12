"use client";
import CalendarContent from "../CalendarContent";
import CalendarViewSelector from "../CalendarViewSelector";
import { observer } from "mobx-react-lite";
import { formatDate } from "@/app/libs/format";
import { useStore } from "@/app/store/storeContext";
import { useEffect, useState } from "react";
import CalendarsContainer from "../CalendarsContainer";
import { CalendarType } from "@/app/types/CalendarType";
import CalendarNavigationButtons from "../CalendarNavigationButtons";

export const Calendar = observer(() => {
  const store = useStore();
  const [calendars, setCalendars] = useState<CalendarType[]>([]);

  useEffect(() => {
    setCalendars([{ month: store.month, year: store.year }]);
  }, [store.month, store.year]);

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
          <h2
            role="month-label"
            className="font-bold text-lg px-2 py-3 capitalize"
          >
            {formatDate(new Date(store.year, store.month, 1), "MMMM")}
          </h2>
          <h3 className="text-lg py-3">{store.year}</h3>
        </div>
        <CalendarNavigationButtons />
      </div>
      <div className="w-screen">
        <CalendarsContainer items={calendars}>
          {generateCalendars}
        </CalendarsContainer>
      </div>
    </>
  );
});
