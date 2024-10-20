import RootStore from "@/app/store/rootStore";
import { StoreProvider } from "@/app/store/storeContext";
import { render } from "@testing-library/react";

export function renderStoreProvider(
  children: React.ReactNode,
  store: RootStore,
) {
  return render(<StoreProvider initialData={store}>{children}</StoreProvider>);
}
