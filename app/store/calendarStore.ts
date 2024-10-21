import {
  subMonths,
  subWeeks,
  addMonths,
  addWeeks,
  subDays,
  addDays,
  setMinutes,
} from "date-fns";
import { makeAutoObservable } from "mobx";
import { Month } from "../types/CalendarType";
import RootStore from "./rootStore";

export enum Views {
  Month,
  Week,
  Day,
}
export default class CalendarStore {
  root: RootStore;
  isLoading = false;
  showEventForm = false;
  selectedView = Views.Month;
  date = setMinutes(new Date(), 0);
  //set utiliza un listado para en un futuro precargar por lo menos tres calendarios
  //el actual, el posterior y el siguiente, asi poder animar el cambio de un mes a otro
  calendars: Month[] = [];
  error: string = "";
  showEventView = false;

  constructor(root: RootStore) {
    this.root = root;
    this.calendars = [{ month: this.month, year: this.year }];
    makeAutoObservable(this);
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
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setShowEventForm(showEventFrom: boolean) {
    this.showEventForm = showEventFrom;
    if (showEventFrom) this.setShowEventView(false);
  }
  setShowEventView(showEventView: boolean) {
    this.showEventView = showEventView;
    if (showEventView) this.setShowEventForm(false);
  }
  setCalendars(calendars: Month[]) {
    this.calendars = calendars;
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
    this.setCalendars([{ month: this.month, year: this.year }]);
  }
  setError(error: string) {
    this.error = error;
  }
  handleClickOnDay(date: Date) {
    if (this.selectedViewIsMonth) {
      this.setSelectedView(Views.Day);
      this.setDate(date);
      return;
    }
    this.setDate(date);
    this.setShowEventForm(true);
  }
}
