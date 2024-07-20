import { Notetype, PlaceType } from "@/types/scheduleType";
import { api } from "../api";
import { getCookie } from "@/utils/cookie";

interface ScheduleType {
  title: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  locations: PlaceType[];
  notes: Notetype[];
  memberIds: number[];
}
export const createSchedule = async (scheduleData: ScheduleType) => {
  try {
    const response = await api.post("/appointment", scheduleData, {
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
    });
    console.log("Schedule created:", response.data);
  } catch (error: any) {
    console.error("Error creating schedule:", error.response);
  }
};
