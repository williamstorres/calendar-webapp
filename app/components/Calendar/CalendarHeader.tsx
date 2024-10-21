import { memo } from "react";
import CalendarViewSelector from "../CalendarViewSelector";
import { formatDate } from "date-fns";
import CalendarNavigationButtons from "../CalendarNavigationButtons";

type CalendarHeaderProps = {
  selectedYear: number;
  selectedMonth: number;
};
const CalendarHeader: React.FC<CalendarHeaderProps> = memo(
  function CalendarHeader({ selectedYear, selectedMonth }) {
    return (
      <header>
        <CalendarViewSelector />
        <div className="flex justify-between">
          <div className="flex">
            <h2 className="font-bold text-lg px-2 py-3 capitalize">
              {formatDate(new Date(selectedYear, selectedMonth, 1), "MMMM")}
            </h2>
          </div>
          <CalendarNavigationButtons />
        </div>
      </header>
    );
  },
);

export default CalendarHeader;
