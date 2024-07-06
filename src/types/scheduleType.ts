export interface ScheduleProps {
  name: string;
  date: string | null;
  startDate: Date | null;
  endDate: Date | null;
  days: string | null;
  time: string | null;
  startTime: Date | null;
  locations: PlaceType[] | [];
}

export interface KeywordType {
  id: number;
  keyword: string;
  date: string;
  type: string;
  category?: string;
  address?: string;
  longitude?: number;
  latitude?: number;
}

export interface PlaceType {
  name: string;
  category: string;
  address: string;
  longitude: number;
  latitude: number;
}
