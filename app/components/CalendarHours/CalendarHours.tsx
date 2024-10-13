import { getDaysOfWeek, hoursOfDay } from "@/app/libs/date";
import { formatHour } from "@/app/libs/format";
import { useStore } from "@/app/store/storeContext";
import { observer } from "mobx-react-lite";

export const CalendarHours = observer(() => {
  const store = useStore();

  const generateHour = (hour: number) => {
    return (
      <div
        key={hour}
        className="h-20 text-xs border-t-2 border-secondary ml-10 first:mt-4"
      >
        <div className="-translate-x-8 -translate-y-2 w-min absolute">
          {formatHour(hour)}
        </div>
        {store.selectedViewIsWeek ? (
          <div className="grid grid-cols-7">
            {getDaysOfWeek(store.date).map((date) => (
              <div
                key={date.getDate()}
                className="h-20 border-r-2 border-secondary last:border-0"
              ></div>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  };

  return (
    <>
      {hoursOfDay.map(generateHour)}
      {generateHour(0)}
    </>
  );
});
