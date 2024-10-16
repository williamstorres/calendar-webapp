import {
  subMonths,
  subWeeks,
  addMonths,
  addWeeks,
  subDays,
  addDays,
} from "date-fns";
import { makeAutoObservable } from "mobx";
import {
  addNewEvent,
  deleteEvent,
  getMonthlyEvents,
  updateEvent,
} from "../services/eventsService";
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

  async saveEvent(event: CalendarEventType) {
    console.log(event);
    if (event.id) {
      await this.updateEvent(event);
    } else {
      await this.addNewEvent(event);
    }
    this.showEventForm = false;
  }

  cleanSelectedEvent() {
    delete this.selectedEvent;
  }

  async fethMonthlyEvents() {
    this.events = await this.loading(
      getMonthlyEvents(this.date)
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
        }),
    );
  }

  async addNewEvent(newEvent: CalendarEventType) {
    this.events[generateDateAsKey(newEvent.startDateTime)]?.push(newEvent);
    await this.loading(
      addNewEvent(newEvent).catch((err) => {
        console.error(err);
        this.error = "Ha ocurrido un error al agregar el evento";
      }),
    );
    this.fethMonthlyEvents();
  }

  async updateEvent(event: CalendarEventType) {
    await this.loading(
      updateEvent(event).catch((err) => {
        console.error(err);
        this.error = "Ha ocurrido un error al actualizar el evento";
      }),
    );
    this.fethMonthlyEvents();
  }

  async deleteEvent() {
    if (!this.selectedEvent?.id) return;
    await this.loading(
      deleteEvent(this.selectedEvent.id).catch((err) => {
        console.error(err);
        this.error = "Ha ocurrido un error al eliminar el evento";
      }),
    );
    this.cleanSelectedEvent();
    this.fethMonthlyEvents();
  }

  loading = async <T>(prom: Promise<T>) => {
    this.isLoading = true;
    return prom.finally(() => {
      this.isLoading = false;
    });
  };

  hydrate = (initData: { events: Record<string, CalendarEventType[]> }) => {
    this.events = initData.events;
    return this;
  };
}
