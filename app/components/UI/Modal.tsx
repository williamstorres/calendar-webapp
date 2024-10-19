"use client";
import { useStore } from "@/app/store/storeContext";
import { observer } from "mobx-react-lite";
import EventForm from "../EventForm";
import { CalendarEventView } from "../CalendarEventView/CalendarEventView";
import { twJoin } from "tailwind-merge";
import { useEffect, useState } from "react";

/**
 * Componente `Modal` que muestra un formulario de evento o una vista de evento.
 *
 * Este componente utiliza el contexto del estado para determinar si debe mostrar
 * el formulario de evento o la vista de evento. La visibilidad del modal se
 * anima y se gestiona mediante un estado local.
 *
 * @returns {JSX.Element|null} Un elemento que representa el modal, o null si no debe mostrarse.
 */
export const Modal: React.FC = observer(() => {
  const { calendarStore } = useStore();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const willShow = calendarStore.showEventForm || calendarStore.showEventView;
    if (showModal !== willShow) {
      setTimeout(() => setShowModal(willShow), 300);
    }
  }, [
    calendarStore,
    calendarStore.showEventForm,
    calendarStore.showEventView,
    showModal,
  ]);

  //Bloquea el scroll cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  if (!showModal) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      <div
        className={twJoin(
          "w-screen h-[98%] p-8 bg-background z-[1000] fixed bottom-0 rounded-t-3xl shadow-[0px_-8px_10px_0px_#1a202c] md:max-w-[40rem] inset-x-0 mx-auto",
          "transform transition-transform duration-100",
          calendarStore.showEventForm || calendarStore.showEventView
            ? "animate-slide-up"
            : "animate-slide-down",
        )}
      >
        {showModal && calendarStore.showEventForm && <EventForm />}
        {showModal && calendarStore.showEventView && <CalendarEventView />}
      </div>
    </>
  );
});
