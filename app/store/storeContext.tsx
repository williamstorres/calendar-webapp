"use client";
import React, { createContext, ReactNode, useContext } from "react";
import RootStore, { ServerData } from "./rootStore";

// Este es el tipo con solo las propiedades de la clase

const StoreContext = createContext<RootStore | null>(null);

const initializeStore = (initData: ServerData | null = null) => {
  // check if we already declare store (client Store), otherwise create one
  const store = new RootStore();
  // hydrate to store if receive initial data
  if (initData) {
    store.hydrate(initData);
  }

  // Create a store on every server request
  if (typeof window === "undefined") return store;
  // Otherwise it's client, remember this store and return
  //if (!clientStore) clientStore = store;
  return store;
};

interface StoreProviderProps {
  children: ReactNode; // Añade children como parte de las props
  initialData?: ServerData;
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
