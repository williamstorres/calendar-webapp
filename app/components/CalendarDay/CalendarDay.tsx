import { CalendarEventType } from "@/app/types/CalendarEvent";
import CalendarEvent from "../CalendarEvent";
import { observer } from "mobx-react-lite";
import CalendarHours from "../CalendarHours";
import { useDroppable } from "@dnd-kit/core";
import { generateDateAsKey } from "@/app/libs/date";
import { isSameDay } from "date-fns";
import { twJoin } from "tailwind-merge";
import { useStore } from "@/app/hooks/useStore";
import { motion } from "framer-motion";

type CalendarDayProps = {
  day: Date;
  events: CalendarEventType[];
};
/**
 * Componente que representa un día en el calendario.
 *
 * Este componente muestra los eventos programados para un día específico
 * y permite la interacción del usuario para seleccionar un día.
 *
 * @component
 * @param {CalendarDayProps} props - Las propiedades del componente.
 * @returns {JSX.Element|null} El componente del día del calendario, o null si no se debe mostrar.
 */
export const CalendarDay: React.FC<CalendarDayProps> = observer(
  ({ day, events }: CalendarDayProps) => {
    const { calendarStore } = useStore();

    const { setNodeRef } = useDroppable({
      id: generateDateAsKey(day),
    });
    //Si la vista es dia, se ocultan los dias que no son el seleccionado
    if (
      calendarStore.selectedViewIsDay &&
      !isSameDay(calendarStore.date, day)
    ) {
      return null;
    }

    const generateEvents = () =>
      events.map((event) => (
        <CalendarEvent key={event.id} event={event} overlaping={1} index={0} />
      ));

    return (
      <motion.div
        layout
        transition={{ duration: 0.3 }}
        onClick={() => calendarStore.handleClickOnDay(day)}
        className={twJoin(
          "flex w-full border-r-2 border-zinc-600 last:border-0",
        )}
      >
        <div
          data-testid="calendar-day"
          ref={setNodeRef}
          className={twJoin(
            "w-full",
            !calendarStore.selectedViewIsMonth && "relative",
            calendarStore.selectedViewIsMonth &&
              "bg-zinc-900 p-2 h-24 text-sm border-r-2 border-zinc-600 last:border-r-0",
          )}
        >
          <CalendarHours day={day}>{generateEvents()}</CalendarHours>
        </div>
      </motion.div>
    );
  },
);
