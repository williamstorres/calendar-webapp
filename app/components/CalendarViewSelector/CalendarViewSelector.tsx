"use client";
import { Views } from "@/app/store/calendarStore";
import { useStore } from "@/app/store/storeContext";
import { observer } from "mobx-react-lite";
import { twJoin } from "tailwind-merge";

/**
 * Componente `CalendarViewSelector` que permite al usuario seleccionar la vista
 * del calendario entre Mes, Semana o Día.
 *
 * Este componente utiliza el estado global del store para gestionar la vista
 * seleccionada y actualizarla cuando el usuario interactúa con las etiquetas.
 *
 * @returns {JSX.Element} El selector de vista del calendario.
 */
export const CalendarViewSelector: React.FC = observer(() => {
  const store = useStore();

  const baseLabelStyle =
    "text-sm font-bold text-zinc-400 cursor-pointer py-1 px-4 rounded-full ease-linear duration-100";
  const selectedStyle =
    "text-zinc-900 bg-zinc-400 w-10 h-full top-0 rounded-full ";
  return (
    <div
      role="calendar-view-selector"
      className="flex justify-center mt-3 mb-5 w-full"
    >
      <div className="w-max bg-zinc-900 rounded-full relative gap-5">
        <label
          onClick={() => store.setSelectedView(Views.Month)}
          className={twJoin(
            baseLabelStyle,
            store.selectedView === Views.Month && selectedStyle,
          )}
        >
          Mes
        </label>
        <label
          onClick={() => store.setSelectedView(Views.Week)}
          className={twJoin(
            baseLabelStyle,
            store.selectedView === Views.Week && selectedStyle,
          )}
        >
          Semana
        </label>
        <label
          onClick={() => store.setSelectedView(Views.Day)}
          className={twJoin(
            baseLabelStyle,
            store.selectedView === Views.Day && selectedStyle,
          )}
        >
          Día
        </label>
      </div>
    </div>
  );
});
