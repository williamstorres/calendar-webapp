"use client"; // Marcar como Client Component

import { ReactNode } from "react";
import { StoreProvider } from "./store/storeContext";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>;
}
