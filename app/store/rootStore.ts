import CalendarStore from "./calendarStore";
import EventsStore from "./eventsStore";

export default class RootStore {
  calendarStore: CalendarStore;
  eventsStore: EventsStore;

  constructor() {
    this.calendarStore = new CalendarStore(this);
    this.eventsStore = new EventsStore(this);
  }

  loading = async <T>(prom: Promise<T>) => {
    this.calendarStore.setIsLoading(true);
    return prom.finally(() => {
      this.calendarStore.setIsLoading(false);
    });
  };

  hydrate(initData: ServerData) {
    Object.assign(this.calendarStore, initData.calendarStore);
    Object.assign(this.eventsStore, initData.eventsStore);
  }
}
export type ServerData = {
  calendarStore?: Partial<CalendarStore>;
  eventsStore?: Partial<EventsStore>;
};
