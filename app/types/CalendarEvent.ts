export enum CalendarEventColors {
  Blue = "#2563eb",
}
export type CalendarEvent = {
  id: string;
  title: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  isAllDay: boolean;
  color: CalendarEventColors;
};
