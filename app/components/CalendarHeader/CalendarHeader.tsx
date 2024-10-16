import { memo } from "react";
import CalendarViewSelector from "../CalendarViewSelector";
import { formatDate } from "date-fns";
import CalendarNavigationButtons from "../CalendarNavigationButtons";

type CalendarHeaderProps = {
  selectedYear: number;
  selectedMonth: number;
};
export const CalendarHeader = memo(function CalendarHeader({
  selectedYear,
  selectedMonth,
}: CalendarHeaderProps) {
  return (
    <>
      <CalendarViewSelector />
      <div className="flex justify-between">
        <div className="flex">
          <h2
            role="month-label"
            className="font-bold text-lg px-2 py-3 capitalize"
          >
            {formatDate(new Date(selectedYear, selectedMonth, 1), "MMMM")}
          </h2>
          <h3 className="text-lg py-3">{}</h3>
        </div>
        <CalendarNavigationButtons />
      </div>
    </>
  );
});
