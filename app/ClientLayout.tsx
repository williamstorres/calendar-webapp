import { ReactNode } from "react";
import { StoreProvider } from "./store/storeContext";
import { getMonthlyEvents } from "./services/eventsService";

export default async function ClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  console.log("ClientLayour");
  const events = await getMonthlyEvents(new Date());
  const initialData = { events };
  return <StoreProvider initialData={initialData}>{children}</StoreProvider>;
}
