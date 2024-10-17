import { DayOfMonth } from "@/app/types/DayOfMonth";
import { observer } from "mobx-react-lite";
import { useStore } from "@/app/store/storeContext";
import { twJoin } from "tailwind-merge";
import { Views } from "@/app/store/calendarStore";
import { endOfDay, isWithinInterval } from "date-fns";
import CalendarHours from "../CalendarHours";
import { CalendarMonthDay } from "./CalendarMonthDay";

type CaledarWeekProps = {
  daysOfWeek: DayOfMonth[];
};
/**
 * Componente `CalendarWeek` que renderiza la vista semanal del calendario.
 *
 * Este componente muestra los días de la semana y, dependiendo de la vista seleccionada,
 * puede mostrar los días del mes o las horas del calendario.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {DayOfMonth[]} props.daysOfWeek - Un arreglo de objetos que representan los días del mes.
 * @returns {JSX.Element} Un elemento que representa la vista semanal del calendario.
 */
export const CalendarWeek: React.FC<CaledarWeekProps> = observer(
  ({ daysOfWeek }) => {
    const store = useStore();

    const showWeek =
      store.selectedView !== Views.Month &&
      isWithinInterval(store.date, {
        start: daysOfWeek[0].date,
        end: endOfDay(daysOfWeek[6].date),
      });

    return (
      <div
        role="calendar-week"
        className={twJoin(
          "w-screen bg-primary h-full",
          !store.selectedViewIsMonth && !showWeek && "hidden",
        )}
      >
        {store.selectedViewIsMonth && (
          <CalendarMonthDay daysOfWeek={daysOfWeek} />
        )}
        {store.selectedView !== Views.Month && showWeek && <CalendarHours />}
      </div>
    );
  },
);
