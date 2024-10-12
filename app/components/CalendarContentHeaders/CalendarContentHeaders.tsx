import { getDaysOfWeek } from "@/app/libs/date";
import { useStore } from "@/app/store/storeContext";
import { isSameDay, isToday } from "date-fns";
import { observer } from "mobx-react-lite";
import { twJoin } from "tailwind-merge";

export const CalendarContentHeaders = observer(() => {
  const store = useStore();

  const daysOfTheWeekNames = [
    "Lunes",
    "Martes",
    "Míercoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];
  const daysOfWeek = getDaysOfWeek(store.date);
  const today = new Date();
  return (
    <div
      className={twJoin(
        "w-screen min-h-14 grid grid-cols-7 gap-y-0.5 bg-primary",
        !store.selectedViewIsMonth && "pl-10",
      )}
    >
      {daysOfTheWeekNames.map((dayName, index) => (
        <div
          key={dayName}
          role="calendar-day-header"
          className="p-2 text-xs text-center font-bold flex flex-col"
        >
          <span>{dayName.substring(0, 3)}</span>
          {!store.selectedViewIsMonth && (
            <span
              className={twJoin(
                store.selectedViewIsDay &&
                  isToday(daysOfWeek[index]) &&
                  "rounded-full bg-blue-600 p-1",
                store.selectedViewIsWeek &&
                  isSameDay(today, daysOfWeek[index]) &&
                  "rounded-full bg-blue-600 p-1",
              )}
            >
              {daysOfWeek[index].getDate()}
            </span>
          )}
        </div>
      ))}
    </div>
  );
});
