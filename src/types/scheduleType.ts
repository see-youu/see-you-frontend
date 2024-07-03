export interface ScheduleProps {
  name: string;
  date: string | null;
  startDate: Date | null;
  endDate: Date | null;
  days: string | null;
  time: string | null;
  startTime: Date | null;
}

export interface LocationType {
  title: string;
  category: string;
  address: string;
  longitude: number;
  latitude: number;
}
