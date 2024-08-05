"use client";

import { Provider } from "react-redux";
import store from "@/store/store";
import { AlertProvider } from "@/context/AlertProvider";
import { ConfirmProvider } from "@/context/ConfirmationProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AlertProvider>
        <ConfirmProvider>{children}</ConfirmProvider>
      </AlertProvider>
    </Provider>
  );
}
