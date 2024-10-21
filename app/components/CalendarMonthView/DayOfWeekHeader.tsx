import { useStore } from "@/app/store/storeContext";
import { isSameDay, isToday } from "date-fns";
import { observer } from "mobx-react-lite";

type DayOfWeekHeaderProps = {
  day: Date;
};
export const DayOfWeekHeader = observer(({ day }: DayOfWeekHeaderProps) => {
  const { calendarStore } = useStore();
  const isSelected = calendarStore.selectedViewIsWeek
    ? isToday(day)
    : isSameDay(calendarStore.date, day);

  return (
    <span
      data-testid={isSelected && "active-day"}
      className={isSelected ? "rounded-full bg-secondary p-1" : ""}
    >
      {day.getDate()}
    </span>
  );
});
