import { generateDateAsKey, hoursOfDay } from "@/app/libs/date";
import { formatTime } from "@/app/libs/format";
import { useStore } from "@/app/store/storeContext";
import { observer } from "mobx-react-lite";
import CalendarEventsWeek from "../CalendarEventsWeek";
import CalendarEventsDay from "../CalendarEventsDay";

export const CalendarHours: React.FC = observer(() => {
  const store = useStore();

  const generateHour = (hour: number) => {
    return (
      <div key={hour} className="h-20 text-xs w-min ml-10 first:mt-4">
        <div className="-translate-x-8 -translate-y-2 w-min absolute">
          {formatTime(hour)}
        </div>
      </div>
    );
  };

  return (
    <div className="w-screen flex">
      <div className="w-min">
        {hoursOfDay.map(generateHour)}
        {generateHour(0)}
      </div>
      <div className="relative w-full">
        <div className="absolute w-full h-full mt-4">
          {hoursOfDay.map((hour) => (
            <div key={hour} className="h-20 border-t-2 border-zinc-600"></div>
          ))}
          <div className="h-20 border-t-2 border-secondary"></div>
        </div>
        {store.selectedViewIsWeek ? (
          <CalendarEventsWeek />
        ) : (
          <div className="w-full relative mt-4 z-10">
            <CalendarEventsDay
              date={store.date}
              events={store.events[generateDateAsKey(store.date)] ?? []}
            />
          </div>
        )}
      </div>
    </div>
  );
});
