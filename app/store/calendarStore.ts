import { makeAutoObservable } from "mobx";

export default class CalendarStore {
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

  hydrate = (initData: CalendarStore) => {
    this.month = initData.month;
    this.year = initData.year;
    this.day = initData.day;
  };
}
