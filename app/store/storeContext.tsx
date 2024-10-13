"use client";
import React, { createContext, ReactNode, useContext } from "react";
import CalendarStore from "./calendarStore";

const StoreContext = createContext<CalendarStore | null>(null);

let clientStore: CalendarStore;

const initializeStore = (initData = null) => {
  // check if we already declare store (client Store), otherwise create one
  const store = clientStore ?? new CalendarStore();
  // hydrate to store if receive initial data
  if (!clientStore && initData) store.hydrate(initData);

  // Create a store on every server request
  if (typeof window === "undefined") return store;
  // Otherwise it's client, remember this store and return
  if (!clientStore) clientStore = store;
  return store;
};

interface StoreProviderProps {
  children: ReactNode; // Añade children como parte de las props
  initialData?: never;
}
export const StoreProvider: React.FC<StoreProviderProps> = ({
  children,
  initialData,
}) => {
  const store = initializeStore(initialData);
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === null) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
