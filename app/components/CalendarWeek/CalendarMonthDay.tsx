import { DateKeyFormat } from "@/app/constants";
import { useStore } from "@/app/store/storeContext";
import { DayOfMonth } from "@/app/types/DayOfMonth";
import { formatDate } from "date-fns";
import { observer } from "mobx-react-lite";
import CalendarDay from "../CalendarDay";

type CalendarMonthDayProp = {
  daysOfWeek: DayOfMonth[];
};
/**
 * Componente `CalendarMonthDay` que renderiza los días de la semana en un calendario.
 *
 * Este componente recibe una lista de días del mes y utiliza el store para obtener
 * los eventos asociados a cada día. Luego, renderiza un componente `CalendarDay` para
 * cada día de la semana, mostrando su información y eventos correspondientes.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {DayOfMonth[]} props.daysOfWeek - Array de objetos `DayOfMonth` que representan
 * los días de la semana a mostrar en el calendario.
 * @returns {JSX.Element} Un contenedor que representa los días de la semana en el calendario.
 */
export const CalendarMonthDay: React.FC<CalendarMonthDayProp> = observer(
  ({ daysOfWeek }) => {
    const { eventsStore } = useStore();

    return (
      <div className="grid grid-cols-7 gap-y-0.5 border-t-2 border-zinc-600">
        {daysOfWeek.map((day) => {
          const key = formatDate(day.date, DateKeyFormat);
          const events = eventsStore.getDayEvents(key);

          return <CalendarDay key={key} day={day} events={events} />;
        })}
      </div>
    );
  },
);
