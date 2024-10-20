import { DayOfMonth } from "@/app/types/DayOfMonth";
import { observer } from "mobx-react-lite";
import { useStore } from "@/app/store/storeContext";
import { twJoin } from "tailwind-merge";
import { endOfDay, isWithinInterval } from "date-fns";
import { generateDateAsKey, hoursOfDay } from "@/app/libs/date";
import { formatTime } from "@/app/libs/format";
import CalendarDay from "../CalendarDay";

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
    const { calendarStore, eventsStore } = useStore();

    //al cambiar a vista de semana o dia oculta las semanas no seleccionadas
    const showWeek =
      !calendarStore.selectedViewIsMonth &&
      isWithinInterval(calendarStore.date, {
        start: daysOfWeek[0].date,
        end: endOfDay(daysOfWeek[6].date),
      });

    const generateHour = (hour: number) => {
      return (
        <div key={hour} className="h-20 text-xs w-min ml-10">
          <div className="-translate-x-8 -translate-y-2 w-min absolute">
            {formatTime(hour)}
          </div>
        </div>
      );
    };
    if (!calendarStore.selectedViewIsMonth && !showWeek) return null;

    return (
      <div
        className={twJoin(
          "w-screen bg-primary h-full",
          calendarStore.selectedViewIsMonth && "border-t-2 border-zinc-600",
          !calendarStore.selectedViewIsMonth && "flex flex-row",
        )}
      >
        {!calendarStore.selectedViewIsMonth && (
          <div className="w-min">
            {hoursOfDay.map(generateHour)}
            {generateHour(0)}
          </div>
        )}
        <div
          className={twJoin(
            "w-full",
            !calendarStore.selectedViewIsDay && "grid grid-cols-7 gap-y-0.5",
          )}
        >
          {daysOfWeek.map((day) => {
            const key = generateDateAsKey(day.date);
            const events = eventsStore.getDayEvents(key);
            return <CalendarDay key={key} day={day} events={events} />;
          })}
        </div>
      </div>
    );
  },
);
