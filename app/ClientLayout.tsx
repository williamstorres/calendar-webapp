import { ReactNode } from "react";
import { ServerData, StoreProvider } from "./store/storeContext";
import { getMonthlyEvents } from "./services/eventsService";
import { CalendarEventType } from "./types/CalendarEvent";

export default async function ClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { request } = getMonthlyEvents(new Date());
  const events = (await request) as Record<string, CalendarEventType[]>;
  const initialData: ServerData = { eventsStore: { events } };
  return <StoreProvider initialData={initialData}>{children}</StoreProvider>;
}
