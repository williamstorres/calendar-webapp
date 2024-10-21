import { observer } from "mobx-react-lite";
import { twJoin } from "tailwind-merge";
import { endOfDay, isWithinInterval } from "date-fns";
import { generateDateAsKey } from "@/app/libs/date";
import { formatTime } from "@/app/libs/format";
import CalendarDay from "../CalendarDay";
import { useStore } from "@/app/hooks/useStore";
import { hoursOfDay } from "@/app/libs/constants";
import { motion } from "framer-motion";

type CaledarWeekProps = {
  daysOfWeek: Date[];
};
/**
 * CalendarWeek component displays a week view of the calendar.
 * It shows the days of the week along with the events for each day.
 * It hides the week if not in the appropriate view or if the week
 * is not selected.
 *
 * @param {CaledarWeekProps} props - The component props.
 * @returns {JSX.Element | null} The rendered component or null if the week should not be shown.
 */
export const CalendarWeek: React.FC<CaledarWeekProps> = observer(
  ({ daysOfWeek }) => {
    const { calendarStore, eventsStore } = useStore();

    //al cambiar a vista de semana o dia oculta las semanas no seleccionadas
    const showWeek =
      !calendarStore.selectedViewIsMonth &&
      isWithinInterval(calendarStore.date, {
        start: daysOfWeek[0],
        end: endOfDay(daysOfWeek[6]),
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
      <motion.div
        layout
        transition={{ duration: 0.3 }}
        className={twJoin(
          "w-screen bg-primary h-full transition-opacity duration-300 opacity-100",
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
            const key = generateDateAsKey(day);
            const events = eventsStore.getDayEvents(key);
            return <CalendarDay key={key} day={day} events={events} />;
          })}
        </div>
      </motion.div>
    );
  },
);
