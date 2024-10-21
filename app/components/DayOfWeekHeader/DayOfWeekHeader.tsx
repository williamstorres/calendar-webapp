import { useStore } from "@/app/hooks/useStore";
import { isSameDay, isToday } from "date-fns";
import { observer } from "mobx-react-lite";

type DayOfWeekHeaderProps = {
  day: Date;
};
/**
 * DayOfWeekHeader component displays the day of the week and highlights the active day.
 *
 * @param {DayOfWeekHeaderProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
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
