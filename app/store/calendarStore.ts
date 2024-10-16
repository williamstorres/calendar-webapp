import {
  subMonths,
  subWeeks,
  addMonths,
  addWeeks,
  subDays,
  addDays,
} from "date-fns";
import { makeAutoObservable } from "mobx";
import { addNewEvent, getMonthlyEvents } from "../services/eventsService";
import { CalendarEventType } from "../types/CalendarEvent";
import { CalendarType } from "../types/CalendarType";
import { generateDateAsKey } from "../libs/date";

export enum Views {
  Month,
  Week,
  Day,
}
export default class CalendarStore {
  isLoading = false;
  showEventForm = false;
  selectedView = Views.Month;
  date = new Date();
  events: Record<string, CalendarEventType[]> = {};
  calendars: CalendarType[] = [];
  error: string = "";
  selectedEvent: CalendarEventType | undefined;

  constructor() {
    makeAutoObservable(this);
    this.calendars = [{ month: this.month, year: this.year }];
  }

  get day() {
    return this.date.getDate();
  }

  get selectedViewIsMonth() {
    return this.selectedView === Views.Month;
  }
  get selectedViewIsWeek() {
    return this.selectedView === Views.Week;
  }

  get selectedViewIsDay() {
    return this.selectedView === Views.Day;
  }

  get month() {
    return this.date.getMonth();
  }

  get year() {
    return this.date.getFullYear();
  }

  get hasError() {
    return this.error === "";
  }

  setSelectedView(view: Views) {
    this.selectedView = view;
  }

  setDate(date: Date) {
    this.date = date;
    this.calendars = [{ month: this.month, year: this.year }];
    this.fethMonthlyEvents();
  }

  previousMonth() {
    this.setDate(subMonths(this.date, 1));
  }
  nextMonth() {
    this.setDate(addMonths(this.date, 1));
  }
  previousWeek() {
    this.setDate(subWeeks(this.date, 1));
  }
  nextWeek() {
    this.setDate(addWeeks(this.date, 1));
  }
  previousDay() {
    this.setDate(subDays(this.date, 1));
  }
  nextDay() {
    this.setDate(addDays(this.date, 1));
  }
  clearError() {
    this.error = "";
  }
  today() {
    this.setDate(new Date());
    this.calendars = [{ month: this.month, year: this.year }];
  }

  getDayEvents(day: string) {
    return this.events[day] ?? [];
  }

  editEvent(event: CalendarEventType) {
    this.selectedEvent = event;
    this.showEventForm = true;
  }

  saveEvent(event: CalendarEventType) {
    if (event.id) return this.updateEvent(event);
    addNewEvent(event);
  }

  cleanSelectedEvent() {
    delete this.selectedEvent;
  }

  async fethMonthlyEvents() {
    this.isLoading = true;
    this.events = await getMonthlyEvents(this.date)
      .then((response) => {
        return {
          ...response,
          startDateTime: new Date(response.startDateTime),
          endDateTime: new Date(response.endDateTime),
        };
      })
      .catch((err) => {
        console.error(err);
        this.error = "Ha ocurrido un error al obtener los eventos";
        return {} as Record<string, CalendarEventType[]>;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  async addNewEvent(newEvent: CalendarEventType) {
    this.isLoading = true;
    this.events[generateDateAsKey(newEvent.startDateTime)]?.push(newEvent);
    await addNewEvent(newEvent)
      .catch((err) => {
        console.error(err);
        this.error = "Ha ocurrido un error al agregar el evento";
      })
      .finally(() => {
        this.isLoading = false;
      });
    this.fethMonthlyEvents();
  }

  async updateEvent(event: CalendarEventType) {
    console.log(event);
    this.isLoading = true;
    this.fethMonthlyEvents();
  }

  hydrate = (initData: { events: Record<string, CalendarEventType[]> }) => {
    this.events = initData.events;
    return this;
  };
}
