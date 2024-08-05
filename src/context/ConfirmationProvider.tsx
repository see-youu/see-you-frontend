import React, { createContext, useContext, useState, ReactNode } from "react";

interface ConfirmContextType {
  confirmFunction: () => void;
  setConfirmFunction: React.Dispatch<React.SetStateAction<() => void>>;
  confirmCancelFunction: () => void;
  setConfirmCancelFunction: React.Dispatch<React.SetStateAction<() => void>>;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export function useConfirm() {
  const context = useContext(ConfirmContext);
  if (context === undefined) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }
  return context;
}

interface ConfirmProviderProps {
  children: ReactNode;
}

export const ConfirmProvider: React.FunctionComponent<ConfirmProviderProps> = ({
  children,
}) => {
  const [confirmFunction, setConfirmFunction] = useState<() => void>(() => {});
  const [confirmCancelFunction, setConfirmCancelFunction] = useState<
    () => void
  >(() => {});
  return (
    <ConfirmContext.Provider
      value={{
        confirmFunction,
        setConfirmFunction,
        confirmCancelFunction,
        setConfirmCancelFunction,
      }}
    >
      {children}
    </ConfirmContext.Provider>
  );
};
