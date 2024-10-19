import { DayOfMonth } from "@/app/types/DayOfMonth";
import { observer } from "mobx-react-lite";
import { useStore } from "@/app/store/storeContext";
import { twJoin } from "tailwind-merge";
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
    const { calendarStore } = useStore();

    const showWeek =
      !calendarStore.selectedViewIsMonth &&
      isWithinInterval(calendarStore.date, {
        start: daysOfWeek[0].date,
        end: endOfDay(daysOfWeek[6].date),
      });

    return (
      <div
        role="calendar-week"
        className={twJoin(
          "w-screen bg-primary h-full",
          !calendarStore.selectedViewIsMonth && !showWeek && "hidden",
        )}
      >
        {calendarStore.selectedViewIsMonth && (
          <CalendarMonthDay daysOfWeek={daysOfWeek} />
        )}
        {!calendarStore.selectedViewIsMonth && showWeek && <CalendarHours />}
      </div>
    );
  },
);
