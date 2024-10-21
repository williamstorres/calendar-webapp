import { useStore } from "@/app/hooks/useStore";
import { Views } from "@/app/store/calendarStore";
import { observer } from "mobx-react-lite";
import { twJoin } from "tailwind-merge";

/**
 * CalendarViewSelector component allows users to select the calendar view
 * (Month, Week, or Day). It updates the selected view in the calendar store
 * when a label is clicked.
 *
 * @returns {JSX.Element} The rendered component containing view selection labels.
 */
export const CalendarViewSelector: React.FC = observer(() => {
  const { calendarStore } = useStore();

  const baseLabelStyle =
    "text-sm font-bold text-zinc-400 cursor-pointer py-1 px-4 rounded-full ease-linear duration-100";
  const selectedStyle =
    "text-zinc-900 bg-zinc-400 w-10 h-full top-0 rounded-full ";
  return (
    <div className="flex justify-center mt-3 mb-5 w-full">
      <div className="w-max bg-zinc-900 rounded-full relative gap-5">
        <label
          role="button"
          onClick={() => calendarStore.setSelectedView(Views.Month)}
          className={twJoin(
            baseLabelStyle,
            calendarStore.selectedViewIsMonth && selectedStyle,
          )}
        >
          Mes
        </label>
        <label
          role="button"
          onClick={() => calendarStore.setSelectedView(Views.Week)}
          className={twJoin(
            baseLabelStyle,
            calendarStore.selectedViewIsWeek && selectedStyle,
          )}
        >
          Semana
        </label>
        <label
          role="button"
          onClick={() => calendarStore.setSelectedView(Views.Day)}
          className={twJoin(
            baseLabelStyle,
            calendarStore.selectedViewIsDay && selectedStyle,
          )}
        >
          Día
        </label>
      </div>
    </div>
  );
});
