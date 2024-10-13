export enum CalendarEventColors {
  Blue = "#2563eb",
}
export type CalendarEventType = {
  id: string;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  durationInMinutes: number;
  isAllDay: boolean;
  color: CalendarEventColors;
};
