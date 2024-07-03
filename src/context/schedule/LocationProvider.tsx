import { LocationType } from "@/types/scheduleType";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface LocationContextType {
  location: LocationType;
  setLocation: React.Dispatch<React.SetStateAction<LocationType>>;
}

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a ScheduleProvider");
  }
  return context;
}
interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider: React.FunctionComponent<
  LocationProviderProps
> = ({ children }) => {
  const [location, setLocation] = useState<LocationType>({
    title: "",
    category: "",
    address: "",
    longitude: 127.105399,
    latitude: 37.3595704,
  });

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
