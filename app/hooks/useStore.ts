import { useContext } from "react";
import { StoreContext } from "../store/storeContext";

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === null) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
