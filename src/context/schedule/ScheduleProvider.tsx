import { ScheduleProps } from "@/types/scheduleType";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ScheduleContextType {
  scheduleInput: ScheduleProps;
  setScheduleInput: React.Dispatch<React.SetStateAction<ScheduleProps>>;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(
  undefined
);

export function useSchedule() {
  const context = useContext(ScheduleContext);
  if (context === undefined) {
    throw new Error("useSchedule must be used within a ScheduleProvider");
  }
  return context;
}
interface ScheduleProviderProps {
  children: ReactNode;
}

export const ScheduleProvider: React.FunctionComponent<
  ScheduleProviderProps
> = ({ children }) => {
  const [scheduleInput, setScheduleInput] = useState<ScheduleProps>({
    name: "",
    date: "미정",
    startDate: null,
    endDate: null,
    days: "1",
    time: "미정",
    startTime: null,
  });

  return (
    <ScheduleContext.Provider value={{ scheduleInput, setScheduleInput }}>
      {children}
    </ScheduleContext.Provider>
  );
};
