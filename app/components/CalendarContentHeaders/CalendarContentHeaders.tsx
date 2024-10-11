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
    <>
      {daysOfTheWeekNames.map((dayName) => (
        <div
          key={dayName}
          role="calendar-day-header"
          className="bg-zinc-900 p-2 text-xs text-center font-bold"
        >
          {dayName.substring(0, 3)}
        </div>
      ))}
    </>
  );
};
