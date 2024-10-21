import { Views } from "../store/calendarStore";
import { useStore } from "./useStore";

/**
 * Hook que proporciona acciones de navegación para el calendario, dependiendo de la vista seleccionada.
 *
 * @returns Un objeto que contiene funciones para navegar entre fechas.
 * @returns {Function} handlePrevious - Función para navegar a la fecha anterior según la vista actual.
 * @returns {Function} handleNext - Función para navegar a la fecha siguiente según la vista actual.
 * @returns {Function} today - Función para ir a la fecha actual.
 *
 * @example
 * const { handlePrevious, handleNext, today } = useCalendarNavigationsActions();
 */
export const useCalendarNavigationsActions = () => {
  const { calendarStore } = useStore();

  const navigationActions = {
    [Views.Week]: {
      handlePrevious: () => calendarStore.previousWeek(),
      handleNext: () => calendarStore.nextWeek(),
    },
    [Views.Month]: {
      handlePrevious: () => calendarStore.previousMonth(),
      handleNext: () => calendarStore.nextMonth(),
    },
    [Views.Day]: {
      handlePrevious: () => calendarStore.previousDay(),
      handleNext: () => calendarStore.nextDay(),
    },
  };

  return {
    handlePrevious:
      navigationActions[calendarStore.selectedView].handlePrevious,
    handleNext: navigationActions[calendarStore.selectedView].handleNext,
    today: () => calendarStore.today(),
  };
};
