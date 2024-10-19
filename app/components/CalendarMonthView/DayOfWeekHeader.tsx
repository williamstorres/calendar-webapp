import { isSameDay } from "date-fns";
import { memo } from "react";

type DayOfWeekHeaderProps = {
  day: Date;
  selectedDate: Date;
};
export const DayOfWeekHeader = memo(function DayOfWeekHeader({
  day,
  selectedDate,
}: DayOfWeekHeaderProps) {
  const isSelected = isSameDay(selectedDate, day);

  return (
    <span
      data-testid={isSelected && "active-day"}
      className={isSelected ? "rounded-full bg-blue-600 p-1" : ""}
    >
      {day.getDate()}
    </span>
  );
});
