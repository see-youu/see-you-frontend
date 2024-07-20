import { getCookie } from "@/utils/cookie";
import { api } from "../api";
import { SCHEDULE, SCHEDULE_LIST } from "../endPoints";

export const fetchScheduleList = async () => {
  try {
    const response = await api.get(SCHEDULE_LIST, {
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
    });
    return response.data.appointments;
  } catch (error: any) {
    console.error("Error creating schedule:", error.response);
    return null;
  }
};

export const fetchScheduleDetail = async (id: number) => {
  try {
    const response = await api.get(`${SCHEDULE}/${id}`, {
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error creating schedule:", error.response);
    return null;
  }
};
