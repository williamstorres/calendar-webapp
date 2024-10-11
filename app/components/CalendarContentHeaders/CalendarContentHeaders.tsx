export const CalendarContentHeaders = () => {
  const daysOfTheWeekNames = [
    "Lunes",
    "Martes",
    "Míercoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];
  return (
    <div className="w-screen grid grid-cols-7 gap-y-0.5">
      {daysOfTheWeekNames.map((dayName) => (
        <div
          key={dayName}
          role="calendar-day-header"
          className="bg-zinc-900 p-2 text-xs text-center font-bold"
        >
          {dayName.substring(0, 3)}
        </div>
      ))}
    </div>
  );
};
