import { observer } from "mobx-react-lite";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useCalendarNavigationsActions } from "@/app/hooks/useCalendarNavigationsActions";

/**
 * Componente `CalendarNavigationButtons` que permite la navegación entre diferentes vistas del calendario.
 *
 * Este componente proporciona botones para navegar hacia el mes anterior, el mes siguiente y para volver a la fecha actual.
 * Utiliza MobX para gestionar el estado del calendario y su vista seleccionada.
 *
 * @returns {JSX.Element} El componente `CalendarNavigationButtons`, que incluye botones de navegación.
 */
export const CalendarNavigationButtons: React.FC = observer(() => {
  const { handlePrevious, handleNext, today } = useCalendarNavigationsActions();

  return (
    <div className="flex px-5">
      <button
        aria-label="previous calendar page"
        className="bg-zinc-500 px-2 my-2 mx-2 rounded-md"
        onClick={() => handlePrevious()}
      >
        <ChevronLeftIcon className="size-4" />
      </button>
      <button
        className="bg-zinc-500 px-2 my-2 rounded-md font-bold text-sm"
        onClick={() => today()}
      >
        Hoy
      </button>
      <button
        aria-label="next calendar page"
        className="bg-zinc-500 px-2 my-2 mx-2 rounded-md"
        onClick={() => handleNext()}
      >
        <ChevronRightIcon className="size-4" />
      </button>
    </div>
  );
});
