import { generateDateAsKey, getDaysOfWeek } from "@/app/libs/date";
import { useStore } from "@/app/store/storeContext";
import { CalendarEventType } from "@/app/types/CalendarEvent";
import { observer } from "mobx-react-lite";
import CalendarEventsDay from "../CalendarEventsDay";

export const CalendarEventsWeek = observer(() => {
  console.log("render CalendarEventsWeek");
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
    <div className="w-full h-full absolute grid grid-cols-7 mt-4 z-10">
      {daysOfWeek.map((date) => (
        <div
          key={date.getDate()}
          className="border-r-2 border-secondary last:border-0 w-full relative"
        >
          <CalendarEventsDay
            events={weekEvents[generateDateAsKey(date)] ?? []}
          />
        </div>
      ))}
    </div>
  );
});
