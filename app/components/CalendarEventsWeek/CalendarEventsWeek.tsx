import { generateDateAsKey, getDaysOfWeek } from "@/app/libs/date";
import { useStore } from "@/app/store/storeContext";
import { CalendarEventType } from "@/app/types/CalendarEvent";
import { observer } from "mobx-react-lite";
import CalendarEventsDay from "../CalendarEventsDay";
import CalendarEventsWeekDay from "../CalendarEventsWeekDay";

export const CalendarEventsWeek = observer(() => {
  const { calendarStore, eventsStore } = useStore();

  const daysOfWeek = getDaysOfWeek(calendarStore.date);
  const weekEvents = daysOfWeek.reduce(
    (acc, date) => {
      const dateKey = generateDateAsKey(date);
      acc[dateKey] = eventsStore.events[dateKey];
      return acc;
    },
    {} as Record<string, CalendarEventType[]>,
  );

  return (
    <div className="w-full h-full absolute grid grid-cols-7 mt-4 z-10">
      {daysOfWeek.map((date) => (
        <CalendarEventsWeekDay key={date.getDate()} date={date}>
          <CalendarEventsDay
            date={date}
            events={weekEvents[generateDateAsKey(date)] ?? []}
          />
        </CalendarEventsWeekDay>
      ))}
    </div>
  );
});
