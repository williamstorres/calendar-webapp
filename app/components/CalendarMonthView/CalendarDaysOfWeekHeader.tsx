import { daysOfTheWeekNames } from "@/app/constants";
import { getDaysOfWeek } from "@/app/libs/date";
import { Views } from "@/app/store/calendarStore";
import { observer } from "mobx-react-lite";
import { twJoin } from "tailwind-merge";
import { DayOfWeekHeader } from "./DayOfWeekHeader";
import { useStore } from "@/app/hooks/useStore";

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
export const CalendarDaysOfWeekHeader: React.FC = observer(() => {
  const { calendarStore } = useStore();

  const daysOfWeek = getDaysOfWeek(calendarStore.date);

  return (
    <div
      className={twJoin(
        "w-screen min-h-14 grid grid-cols-7 gap-y-0.5 bg-primary",
        !calendarStore.selectedViewIsMonth && "pl-10",
      )}
    >
      {daysOfTheWeekNames.map((dayName, index) => (
        <button
          key={dayName}
          className="p-2 text-xs text-center font-bold flex flex-col"
          onClick={() => {
            calendarStore.setDate(daysOfWeek[index]);
            calendarStore.setSelectedView(Views.Day);
          }}
        >
          <span>{dayName.substring(0, 3)}</span>
          {!calendarStore.selectedViewIsMonth && (
            <DayOfWeekHeader day={daysOfWeek[index]} />
          )}
        </button>
      ))}
    </div>
  );
});
