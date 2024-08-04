"use client";

import { Provider } from "react-redux";
import store from "@/store/store";
import { AlertProvider } from "@/context/AlertProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AlertProvider>{children}</AlertProvider>
    </Provider>
  );
}
