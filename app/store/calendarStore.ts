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
  date = setMinutes(new Date(), 0);
  events: Record<string, CalendarEventType[]> = {};
  //set utiliza un listado para en un futuro precargar por lo menos tres calendarios
  //el actual, el posterior y el siguiente, asi poder animar el cambio de un mes a otro
  calendars: CalendarType[] = [];
  error: string = "";
  selectedEvent: CalendarEventType | undefined;
  showEventView = false;

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

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setEvents(events: Record<string, CalendarEventType[]>) {
    this.events = events;
  }
  setShowEventForm(showEventFrom: boolean) {
    this.showEventForm = showEventFrom;
    if (!showEventFrom) this.cleanSelectedEvent();
  }
  setShowEventView(showEventView: boolean) {
    this.showEventView = showEventView;
  }
  setSelectedEvent(event: CalendarEventType) {
    this.selectedEvent = event;
  }
  setCalendars(calendars: CalendarType[]) {
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

  getDayEvents(day: string) {
    return this.events[day] ?? [];
  }

  editEvent(event: CalendarEventType) {
    this.selectedEvent = event;
    this.setShowEventForm(true);
  }

  async saveEvent(event: CalendarEventType) {
    if (this.selectedEvent?.id) {
      await this.updateEvent({ ...event, id: this.selectedEvent.id });
    } else {
      await this.addNewEvent(event);
    }
    this.selectedEvent = undefined;
    this.showEventForm = false;
  }

  cleanSelectedEvent() {
    delete this.selectedEvent;
  }

  async fethMonthlyEvents() {
    const _events = await this.loading(
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
    this.setEvents(_events);
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

  updateEventInEvents(event: CalendarEventType) {
    const eventsToUpdate = this.events;
    for (const date in this.events) {
      if (Array.isArray(eventsToUpdate[date])) {
        eventsToUpdate[date] = this.events[date].filter(
          (item) => item.id !== event.id,
        );
      }
    }

    const dateKey = generateDateAsKey(event.startDateTime);
    if (!eventsToUpdate[dateKey]) eventsToUpdate[dateKey] = [];
    eventsToUpdate[dateKey] = [...eventsToUpdate[dateKey], event];
    this.setEvents(eventsToUpdate);
  }

  async updateEvent(event: CalendarEventType) {
    //primero se actualiza en el listado de eventos, para que los cambios en el calendario sean instantaneos
    this.updateEventInEvents(event);
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
    this.setIsLoading(true);
    return prom.finally(() => {
      this.setIsLoading(false);
    });
  };

  hydrate = (initData: { events: Record<string, CalendarEventType[]> }) => {
    this.events = initData.events;
    return this;
  };
}
