import { getDaysOfWeek } from "@/app/libs/date";
import { useStore } from "@/app/store/storeContext";
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
  return (
    <div
      className={twJoin(
        "tw-screen grid grid-cols-7 gap-y-0.5 bg-primary",
        store.selectedViewIsWeek && "pl-10",
      )}
    >
      {daysOfTheWeekNames.map((dayName, index) => (
        <div
          key={dayName}
          role="calendar-day-header"
          className="p-2 text-xs text-center font-bold flex flex-col"
        >
          <span>{dayName.substring(0, 3)}</span>
          {store.selectedViewIsWeek && (
            <span>{daysOfWeek[index].getDate()}</span>
          )}
        </div>
      ))}
    </div>
  );
});
