import { makeAutoObservable } from "mobx";

export enum Views {
  Month,
  Week,
  Day,
}
export default class CalendarStore {
  selectedView: Views = Views.Month;
  month: number = 0;
  year: number = 0;
  day: number = 0;

  constructor() {
    makeAutoObservable(this);
    this.today();
  }

  previousMonth() {
    if (this.month === 0) {
      this.month = 12;
      this.year--;
    }
    this.month--;
  }

  nextMont() {
    if (this.month === 11) {
      this.month = -1;
      this.year++;
    }
    this.month++;
  }

  today() {
    const defaultDate = new Date();
    this.month = defaultDate.getMonth();
    this.year = defaultDate.getFullYear();
    this.day = defaultDate.getDate();
  }

  setMonth(month: number, year: number) {
    this.month = month;
    this.year = year;
  }

  setSelectedView(view: Views) {
    this.selectedView = view;
  }

  hydrate = (initData: CalendarStore) => {
    this.month = initData.month;
    this.year = initData.year;
    this.day = initData.day;
  };
}
