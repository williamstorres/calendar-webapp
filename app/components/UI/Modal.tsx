"use client";
import { useStore } from "@/app/store/storeContext";
import { observer } from "mobx-react-lite";
import EventForm from "../EventForm";
import { CalendarEventView } from "../CalendarEventView/CalendarEventView";
import { twJoin } from "tailwind-merge";
import { useEffect, useState } from "react";

export const Modal = observer(() => {
  const { showEventForm, showEventView } = useStore();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const willShow = showEventForm || showEventView;
    if (showModal !== willShow) {
      setTimeout(() => setShowModal(willShow), 300);
    }
  }, [showEventForm, showEventView, showModal]);

  if (!showModal) return null;

  return (
    <div
      className={twJoin(
        "w-screen h-[90%] p-8 bg-background z-[1000] fixed bottom-0 rounded-t-3xl shadow-[0px_-8px_10px_0px_#1a202c]",
        "transform transition-transform duration-100",
        showEventForm || showEventView
          ? "animate-slide-up"
          : "animate-slide-down",
      )}
    >
      {showModal && showEventForm && <EventForm />}
      {showModal && showEventView && <CalendarEventView />}
    </div>
  );
});
