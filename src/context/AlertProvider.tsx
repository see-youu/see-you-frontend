import React, { createContext, useContext, useState, ReactNode } from "react";

interface AlertContextType {
  alert: string | null;
  setAlert: React.Dispatch<React.SetStateAction<string | null>>;
  // message: string;
  // setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function useAlert() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within a AlertProvider");
  }
  return context;
}
interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FunctionComponent<AlertProviderProps> = ({
  children,
}) => {
  const [alert, setAlert] = useState<string | null>(null);
  // const [message, setMessage] = useState<string>("");

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
