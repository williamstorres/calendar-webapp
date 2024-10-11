"use client";
import { useState } from "react";
import { twJoin } from "tailwind-merge";

export const CalendarViewSelector = () => {
  const [selectedView, setSelectedView] = useState("month");

  const baseLabelStyle =
    "text-sm font-bold text-zinc-400 cursor-pointer py-1 px-4 rounded-full ease-linear duration-100";
  const selectedStyle =
    "text-zinc-900 bg-zinc-400 w-10 h-full top-0 rounded-full ";
  return (
    <div className="flex justify-center mt-3 mb-5 w-full">
      <div className="w-max bg-zinc-900 rounded-full relative gap-5">
        <label
          onClick={() => setSelectedView("month")}
          className={twJoin(
            baseLabelStyle,
            selectedView === "month" && selectedStyle,
          )}
        >
          Mes
        </label>
        <label
          onClick={() => setSelectedView("week")}
          className={twJoin(
            baseLabelStyle,
            selectedView === "week" && selectedStyle,
          )}
        >
          Semana
        </label>
        <label
          onClick={() => setSelectedView("day")}
          className={twJoin(
            baseLabelStyle,
            selectedView === "day" && selectedStyle,
          )}
        >
          Día
        </label>
      </div>
    </div>
  );
};
