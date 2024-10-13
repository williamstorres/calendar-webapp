import {
  subMonths,
  subWeeks,
  addMonths,
  addWeeks,
  subDays,
  addDays,
} from "date-fns";
import { makeAutoObservable } from "mobx";
import { getMonthlyEvents } from "../services/eventsService";
import { CalendarEventType } from "../types/CalendarEvent";
import { CalendarType } from "../types/CalendarType";

export enum Views {
  Month,
  Week,
  Day,
}
export default class CalendarStore {
  isLoading = false;
  selectedView = Views.Month;
  date = new Date();
  events: Record<string, CalendarEventType[]> = {};
  calendars: CalendarType[] = [];
  error: string = "";

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

  async fethMonthlyEvents() {
    this.isLoading = true;
    this.events = await getMonthlyEvents(this.date)
      .catch((err) => {
        console.error(err);
        this.error = "Ha ocurrido un error al obtener los eventos";
        return {} as Record<string, CalendarEventType[]>;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  hydrate = (initData: { events: Record<string, CalendarEventType[]> }) => {
    this.events = initData.events;
    return this;
  };
}
