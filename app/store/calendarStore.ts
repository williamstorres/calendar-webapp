import {
  subMonths,
  subWeeks,
  addMonths,
  addWeeks,
  subDays,
  addDays,
} from "date-fns";
import { makeAutoObservable } from "mobx";

export enum Views {
  Month,
  Week,
  Day,
}
export default class CalendarStore {
  selectedView = Views.Month;
  date = new Date();

  constructor() {
    makeAutoObservable(this);
    this.today();
  }

  get day() {
    return this.date.getDate();
  }

  get selectedViewIsWeek() {
    return this.selectedView === Views.Week;
  }

  get month() {
    return this.date.getMonth();
  }

  get year() {
    return this.date.getFullYear();
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

  today() {
    const defaultDate = new Date();
    this.date = defaultDate;
  }

  hydrate = (initData: CalendarStore) => {
    this.date = initData.date;
  };
}
