import { useContext } from "react";
import { StoreContext } from "../store/storeContext";
import RootStore from "../store/rootStore";

/**
 * Hook personalizado para acceder al contexto del store de MobX.
 *
 * Este hook proporciona acceso al store global, permitiendo a los componentes
 * acceder y manipular el estado global gestionado por MobX.
 *
 * @example
 * const { eventsStore, calendarStore } = useStore();
 */
export const useStore = (): RootStore => {
  const context = useContext(StoreContext);
  if (context === null) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
