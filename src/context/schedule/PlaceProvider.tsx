import { PlaceType } from "@/types/scheduleType";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface PlaceContextType {
  place: PlaceType;
  setPlace: React.Dispatch<React.SetStateAction<PlaceType>>;
}

const PlaceContext = createContext<PlaceContextType | undefined>(undefined);

export function usePlace() {
  const context = useContext(PlaceContext);
  if (context === undefined) {
    throw new Error("usePlace must be used within a ScheduleProvider");
  }
  return context;
}
interface PlaceProviderProps {
  children: ReactNode;
}

export const PlaceProvider: React.FunctionComponent<PlaceProviderProps> = ({
  children,
}) => {
  const [place, setPlace] = useState<PlaceType>({
    name: "",
    category: "",
    address: "",
    longitude: 127.105399,
    latitude: 37.3595704,
  });

  return (
    <PlaceContext.Provider value={{ place, setPlace }}>
      {children}
    </PlaceContext.Provider>
  );
};
