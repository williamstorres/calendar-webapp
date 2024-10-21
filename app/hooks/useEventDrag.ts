import { MutableRefObject } from "react";
import { getHours, getMinutes } from "date-fns";
import { minutesInHour } from "date-fns/constants";
import { weekEventHeightInRem } from "../libs/constants";

type Transform = {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
};
type UseCalendarEventType = {
  transform: Transform | null;
  eventDurationInMinutes: number;
  overlaping: number;
  startDateTime: Date;
  node: MutableRefObject<HTMLElement | null>;
  selectedViewIsMonth: boolean;
  selectedViewIsDay: boolean;
};
export const useCalendarEvent = ({
  transform,
  eventDurationInMinutes,
  overlaping,
  startDateTime,
  node,
  selectedViewIsMonth,
  selectedViewIsDay,
}: UseCalendarEventType) => {
  const deltaY = (node: MutableRefObject<HTMLElement | null>) =>
    (node.current!.offsetHeight + 2) / 4;
  const deltaX = (node: MutableRefObject<HTMLElement | null>) =>
    node.current!.offsetWidth + 2;

  const getNewY = (y: number) =>
    selectedViewIsMonth ? y : Math.round(y / deltaY(node)) * deltaY(node);
  const getNewX = (x: number) =>
    selectedViewIsMonth ? x : Math.round(x / deltaX(node)) * deltaX(node);

  const style = transform
    ? {
        transform: `translate3d(${selectedViewIsDay ? 0 : getNewX(transform.x)}px, ${getNewY(transform.y)}px, 0)`,
      }
    : undefined;

  const height = calculateHeightInRem(eventDurationInMinutes);
  const width = 100 / overlaping;
  const top = calculateDistanceFromTopInRem(
    getHours(startDateTime),
    startDateTime,
  );

  return { style, height, width, top };
};

const calculateDistanceFromTopInRem = (startHour: number, startDate: Date) =>
  weekEventHeightInRem * (startHour + getMinutes(startDate) / minutesInHour);

const calculateHeightInRem = (durationInMinutes: number) =>
  (weekEventHeightInRem / minutesInHour) * durationInMinutes;
