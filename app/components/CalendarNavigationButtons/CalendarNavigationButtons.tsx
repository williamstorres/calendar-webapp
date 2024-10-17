import { useStore } from "@/app/store/storeContext";
import { observer } from "mobx-react-lite";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Views } from "@/app/store/calendarStore";

/**
 * Componente `CalendarNavigationButtons` que permite la navegación entre diferentes vistas del calendario.
 *
 * Este componente proporciona botones para navegar hacia el mes anterior, el mes siguiente y para volver a la fecha actual.
 * Utiliza MobX para gestionar el estado del calendario y su vista seleccionada.
 *
 * @returns {JSX.Element} El componente `CalendarNavigationButtons`, que incluye botones de navegación.
 */
export const CalendarNavigationButtons: React.FC = observer(() => {
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
        className="bg-zinc-500 px-2 my-2 mx-2 rounded-md"
        onClick={() => handlePrevious()}
      >
        <ChevronLeftIcon className="size-4" />
      </button>
      <button
        className="bg-zinc-500 px-2 my-2 rounded-md font-bold text-sm"
        onClick={() => store.today()}
      >
        Hoy
      </button>
      <button
        className="bg-zinc-500 px-2 my-2 mx-2 rounded-md"
        onClick={() => handleNext()}
      >
        <ChevronRightIcon className="size-4" />
      </button>
    </div>
  );
});
