import { ReactNode } from "react";
import { StoreProvider } from "./store/storeContext";
import { getMonthlyEvents } from "./services/eventsService";
import { CalendarEventType } from "./types/CalendarEvent";

export default async function ClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  const events = (await getMonthlyEvents(new Date())) as Record<
    string,
    CalendarEventType[]
  >;
  const initialData = { events };
  return <StoreProvider initialData={initialData}>{children}</StoreProvider>;
}
