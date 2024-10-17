"use client";
import { useStore } from "@/app/store/storeContext";
import { observer } from "mobx-react-lite";
import EventForm from "../EventForm";
import { CalendarEventView } from "../CalendarEventView/CalendarEventView";

export const Modal = observer(() => {
  const store = useStore();
  const showModal = store.showEventForm || store.showEventView;

  if (!showModal) return null;
  return (
    <div className="w-screen h-[90%] p-8 bg-background z-[1000] fixed bottom-0 rounded-t-3xl shadow-[0px_-8px_10px_0px_#1a202c]">
      {store.showEventForm && <EventForm />}
      {store.showEventView && <CalendarEventView />}
    </div>
  );
});
