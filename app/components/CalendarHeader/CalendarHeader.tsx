import { memo } from "react";
import CalendarViewSelector from "../CalendarViewSelector";
import { formatDate } from "date-fns";
import CalendarNavigationButtons from "../CalendarNavigationButtons";

type CalendarHeaderProps = {
  selectedYear: number;
  selectedMonth: number;
};
/**
 * Componente que muestra el encabezado del calendario.
 * Incluye un selector de vista de calendario, el nombre del mes seleccionado
 * y botones de navegación para cambiar entre meses.
 *
 * @component
 * @param {CalendarHeaderProps} props - Las propiedades del componente.
 * @param {number} props.selectedYear - El año seleccionado en el calendario.
 * @param {number} props.selectedMonth - El mes seleccionado en el calendario.
 * @returns {JSX.Element} El encabezado del calendario.
 */
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
