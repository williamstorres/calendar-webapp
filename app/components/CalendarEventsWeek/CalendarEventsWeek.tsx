import { generateDateAsKey, getDaysOfWeek } from "@/app/libs/date";
import { useStore } from "@/app/store/storeContext";
import { CalendarEventType } from "@/app/types/CalendarEvent";
import { observer } from "mobx-react-lite";
import CalendarEventsDay from "../CalendarEventsDay";
import CalendarEventsWeekDay from "../CalendarEventsWeekDay";

export const CalendarEventsWeek = observer(() => {
  const { date, events } = useStore();

  const daysOfWeek = getDaysOfWeek(date);
  const weekEvents = daysOfWeek.reduce(
    (acc, date) => {
      const dateKey = generateDateAsKey(date);
      acc[dateKey] = events[dateKey];
      return acc;
    },
    {} as Record<string, CalendarEventType[]>,
  );

  return (
    <div
      role="calendar-events-week"
      className="w-full h-full absolute grid grid-cols-7 mt-4 z-10"
    >
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
