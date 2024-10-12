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
import { CalendarEvent } from "../types/CalendarEvent";

export enum Views {
  Month,
  Week,
  Day,
}
export default class CalendarStore {
  isLoading = false;
  selectedView = Views.Month;
  date = new Date();
  events: CalendarEvent[] = [];
  error: string = "";

  constructor() {
    makeAutoObservable(this);
    this.today();
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
  }

  previousMonth() {
    this.date = subMonths(this.date, 1);
  }
  nextMonth() {
    this.date = addMonths(this.date, 1);
  }
  previousWeek() {
    this.date = subWeeks(this.date, 1);
  }
  nextWeek() {
    this.date = addWeeks(this.date, 1);
  }
  previousDay() {
    this.date = subDays(this.date, 1);
  }
  nextDay() {
    this.date = addDays(this.date, 1);
  }
  clearError() {
    this.error = "";
  }

  today() {
    const defaultDate = new Date();
    this.date = defaultDate;
  }

  async fethMonthlyEvents() {
    this.isLoading = true;
    this.events = await getMonthlyEvents(this.date)
      .catch((err) => {
        console.error(err);
        this.error = "Ha ocurrido un error al obtener los eventos";
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  hydrate = (initData: CalendarStore) => {
    this.date = initData.date;
  };
}
