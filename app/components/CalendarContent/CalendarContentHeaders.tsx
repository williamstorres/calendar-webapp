import { getDaysOfWeek } from "@/app/libs/date";
import { Views } from "@/app/store/calendarStore";
import { useStore } from "@/app/store/storeContext";
import { isSameDay } from "date-fns";
import { observer } from "mobx-react-lite";
import { twJoin } from "tailwind-merge";

/**
 * Componente `CalendarContentHeaders` que renderiza los encabezados de los días de la semana
 * en un calendario.
 *
 * Este componente muestra los nombres de los días de la semana y permite seleccionar un día
 * específico. Cuando un día es seleccionado, actualiza la fecha y cambia la vista del calendario
 * al modo "día".
 *
 * @returns {JSX.Element} Un elemento que representa los encabezados de los días de la semana.
 */
export const CalendarContentHeaders: React.FC = observer(() => {
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
      role="calendar-content-headers"
      className={twJoin(
        "w-screen min-h-14 grid grid-cols-7 gap-y-0.5 bg-primary",
        !store.selectedViewIsMonth && "pl-10",
      )}
    >
      {daysOfTheWeekNames.map((dayName, index) => (
        <button
          key={dayName}
          role="calendar-day-header"
          className="p-2 text-xs text-center font-bold flex flex-col"
          onClick={() => {
            store.setDate(daysOfWeek[index]);
            store.setSelectedView(Views.Day);
          }}
        >
          <span>{dayName.substring(0, 3)}</span>
          {!store.selectedViewIsMonth && (
            <span
              className={twJoin(
                store.selectedViewIsDay &&
                  isSameDay(store.date, daysOfWeek[index]) &&
                  "rounded-full bg-blue-600 p-1",
                store.selectedViewIsWeek &&
                  isSameDay(today, daysOfWeek[index]) &&
                  "rounded-full bg-blue-600 p-1",
              )}
            >
              {daysOfWeek[index].getDate()}
            </span>
          )}
        </button>
      ))}
    </div>
  );
});
