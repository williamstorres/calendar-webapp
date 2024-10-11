"use client";
import { useEffect, useRef } from "react";

type CalendarsContainerProps<T> = {
  items: T[];
  children(item: T): JSX.Element;
};

export const CalendarsContainer = <T,>({
  children,
  items,
}: CalendarsContainerProps<T>) => {
  const calendarContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = calendarContainerRef.current;
    if (container) container.scrollLeft = 390;
  }, []);

  const childrens = items.map((item) => children(item));

  const handleScroll = () => {
    const currentContainer = calendarContainerRef.current;
    if (!currentContainer) return;

    if (currentContainer.style.visibility === "") {
      currentContainer.style.visibility = "visible";
      currentContainer.style.scrollBehavior = "smooth";
    }
  };
  return (
    <div
      ref={calendarContainerRef}
      className="flex flex-row overflow-x-auto snap-x snap-mandatory"
      onScroll={handleScroll}
    >
      {childrens}
    </div>
  );
};
