export enum CalendarEventColors {
  Blue = "",
}
export type CalendarEvent = {
  title: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  isAllDay: boolean;
  color: CalendarEventColors;
};
