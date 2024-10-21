import { useStore } from "@/app/hooks/useStore";
import { hoursOfDay } from "@/app/libs/constants";
import { isToday, setHours } from "date-fns";
import { observer } from "mobx-react-lite";

type CalendarHours = {
  children: React.ReactNode;
  day: Date;
};
/**
 * Componente que muestra las horas del día en el calendario.
 * Permite al usuario agregar un nuevo evento al hacer clic en una hora específica.
 *
 * @component
 * @param {CalendarHours} props - Las propiedades del componente.
 * @param {React.ReactNode} props.children - Los elementos secundarios que se renderizarán dentro del componente.
 * @param {Date} props.day - La fecha del día para el cual se muestran las horas.
 * @returns {JSX.Element} Un elemento que representa las horas del día en el calendario.
 */
export const CalendarHours: React.FC<CalendarHours> = observer(
  ({ children, day }) => {
    const { calendarStore } = useStore();

    const handleOnClickToAddNewEvent = (
      event: React.MouseEvent<HTMLDivElement>,
      hour: number,
    ) => {
      calendarStore.setDate(setHours(calendarStore.date, hour));
      calendarStore.setShowEventForm(true);

      event.stopPropagation();
    };

    return (
      <>
        {!calendarStore.selectedViewIsMonth && (
          <div className="absolute w-full h-full">
            {hoursOfDay.map((hour) => (
              <div
                key={hour}
                onClick={(e) => handleOnClickToAddNewEvent(e, hour)}
                className="h-20 border-t-2 border-zinc-600"
                data-testid={hour}
              ></div>
            ))}
            <div className="h-20 border-t-2 border-zinc-600"></div>
          </div>
        )}
        {calendarStore.selectedViewIsMonth && (
          <span
            data-testid={isToday(day) && "active-day"}
            className={`${isToday(day) && "rounded-full bg-secondary p-1"}`}
          >
            {day.getDate()}
          </span>
        )}
        {children}
      </>
    );
  },
);
