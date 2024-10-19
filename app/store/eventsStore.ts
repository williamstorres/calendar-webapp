import { makeAutoObservable } from "mobx";
import { CalendarEventType } from "../types/CalendarEvent";
import RootStore from "./rootStore";
import {
  addNewEvent,
  deleteEvent,
  getMonthlyEvents,
  updateEvent,
} from "../services/eventsService";
import { generateDateAsKey } from "../libs/date";

export default class EventsStore {
  root: RootStore;
  events: Record<string, CalendarEventType[]>;
  selectedEvent: CalendarEventType | undefined;

  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
    this.events = {};
  }
  setEvents(events: Record<string, CalendarEventType[]>) {
    this.events = events;
  }
  setSelectedEvent(event: CalendarEventType) {
    this.selectedEvent = event;
  }
  getDayEvents(day: string) {
    return this.events[day] ?? [];
  }
  editEvent(event: CalendarEventType) {
    this.selectedEvent = event;
  }
  async saveEvent(event: CalendarEventType) {
    if (this.selectedEvent?.id) {
      await this.updateEvent({ ...event, id: this.selectedEvent.id });
    } else {
      await this.addNewEvent(event);
    }
    this.selectedEvent = undefined;
    this.root.calendarStore.setShowEventForm(false);
  }
  cleanSelectedEvent() {
    delete this.selectedEvent;
  }

  fethMonthlyEvents(date: Date) {
    const { cancel, request } = getMonthlyEvents(date);

    return {
      cancel,
      events: this.root.loading(
        request
          .then((_events) => {
            this.setEvents(_events);
            return this.events;
          })
          .catch((err) => {
            console.error(err);
            this.root.calendarStore.setError(
              "Ha ocurrido un error al obtener los eventos",
            );
            return {} as Record<string, CalendarEventType[]>;
          }),
      ),
    };
  }

  async addNewEvent(newEvent: CalendarEventType) {
    this.events[generateDateAsKey(newEvent.startDateTime)]?.push(newEvent);
    await this.root.loading(
      addNewEvent(newEvent).catch((err) => {
        console.error(err);
        this.root.calendarStore.setError(
          "Ha ocurrido un error al agregar el evento",
        );
      }),
    );
    this.fethMonthlyEvents(this.root.calendarStore.date);
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
    await this.root.loading(
      updateEvent(event).catch((err) => {
        console.error(err);
        this.root.calendarStore.setError(
          "Ha ocurrido un error al actualizar el evento",
        );
      }),
    );
    this.fethMonthlyEvents(this.root.calendarStore.date);
  }

  async deleteEvent() {
    if (!this.selectedEvent?.id) return;
    await this.root.loading(
      deleteEvent(this.selectedEvent.id).catch((err) => {
        console.error(err);
        this.root.calendarStore.setError(
          "Ha ocurrido un error al eliminar el evento",
        );
      }),
    );
    this.cleanSelectedEvent();
    this.fethMonthlyEvents(this.root.calendarStore.date);
  }
}
