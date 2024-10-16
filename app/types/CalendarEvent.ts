export enum CalendarEventColors {
  Blue = "#2563eb",
}
export type CalendarEventType = {
  id?: string;
  title: string;
  location: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  durationInMinutes: number;
  isAllDay: boolean;
  color?: CalendarEventColors;
};

export type ServerData = {
  events: Record<string, CalendarEventType[]>;
};
