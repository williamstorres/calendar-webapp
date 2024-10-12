import { useStore } from "@/app/store/storeContext";
import { observer } from "mobx-react-lite";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Views } from "@/app/store/calendarStore";

export const CalendarNavigationButtons = observer(() => {
  const store = useStore();

  const handlePrevious = () => {
    switch (store.selectedView) {
      case Views.Week:
        store.previousWeek();
        break;
      case Views.Month:
        store.previousMonth();
        break;
      default:
        store.previousDay();
    }
  };

  const handleNext = () => {
    switch (store.selectedView) {
      case Views.Week:
        store.nextWeek();
        break;
      case Views.Month:
        store.nextMonth();
        break;
      default:
        store.nextDay();
    }
  };

  return (
    <div className="flex px-5">
      <button
        role="previous-month"
        className="bg-zinc-800 px-2 my-2 mx-2 rounded-md"
        onClick={() => handlePrevious()}
      >
        <ChevronLeftIcon className="size-4" />
      </button>
      <button
        className="bg-zinc-800 px-2 my-2 rounded-md font-bold text-sm"
        onClick={() => store.today()}
      >
        Hoy
      </button>
      <button
        className="bg-zinc-800 px-2 my-2 mx-2 rounded-md"
        onClick={() => handleNext()}
      >
        <ChevronRightIcon className="size-4" />
      </button>
    </div>
  );
});
