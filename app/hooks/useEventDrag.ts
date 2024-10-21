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
/**
 * Hook que calcula las propiedades de estilo y dimensiones para un evento en el calendario a medida que este se mueve mediante drag a drop
 *
 * @param {UseCalendarEventType} param0 - Propiedades para el evento del calendario.
 * @returns {{ style: React.CSSProperties | undefined, height: number, width: number, top: number }} Un objeto que contiene:
 *  - `style`: Propiedades de estilo CSS para la transformación del evento.
 *  - `height`: Altura del evento en rem.
 *  - `width`: Ancho del evento como un porcentaje basado en el número de eventos que se superponen.
 *  - `top`: Distancia desde la parte superior en rem.
 *
 * @example
 * const { style, height, width, top } = useCalendarEvent({
 *   transform: { x: 10, y: 20, scaleX: 1, scaleY: 1 },
 *   eventDurationInMinutes: 60,
 *   overlaping: 2,
 *   startDateTime: new Date(),
 *   node: useRef(null),
 *   selectedViewIsMonth: false,
 *   selectedViewIsDay: true,
 * });
 */
export const useCalendarEvent = ({
  transform,
  eventDurationInMinutes,
  overlaping,
  startDateTime,
  node,
  selectedViewIsMonth,
  selectedViewIsDay,
}: UseCalendarEventType): {
  style: React.CSSProperties | undefined;
  height: number;
  width: number;
  top: number;
} => {
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
