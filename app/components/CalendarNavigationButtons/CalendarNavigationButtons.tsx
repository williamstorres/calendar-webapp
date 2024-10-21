import { observer } from "mobx-react-lite";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useCalendarNavigationsActions } from "@/app/hooks/useCalendarNavigationsActions";

/**
 * CalendarNavigationButtons component provides navigation controls
 * for the calendar, allowing users to move to the previous month,
 * go to the current day, or move to the next month.
 *
 * @returns {JSX.Element} The rendered component containing navigation buttons.
 */
export const CalendarNavigationButtons: React.FC = observer(() => {
  const { handlePrevious, handleNext, today } = useCalendarNavigationsActions();

  return (
    <div className="flex px-5">
      <button
        aria-label="previous calendar page"
        className="text-zinc-900 bg-zinc-400 px-2 my-2 mx-2 rounded-md"
        onClick={() => handlePrevious()}
      >
        <ChevronLeftIcon className="size-4" />
      </button>
      <button
        className="text-zinc-900 bg-zinc-400 px-2 my-2 rounded-md font-bold text-sm"
        onClick={() => today()}
      >
        Hoy
      </button>
      <button
        aria-label="next calendar page"
        className="text-zinc-900 bg-zinc-400 px-2 my-2 mx-2 rounded-md"
        onClick={() => handleNext()}
      >
        <ChevronRightIcon className="size-4" />
      </button>
    </div>
  );
});
