import { Views } from "../store/calendarStore";
import { useStore } from "../store/storeContext";

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
