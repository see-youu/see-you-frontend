import { getCookie } from "@/utils/cookie";
import { api } from "../api";

export const fetchScheduleList = async () => {
  try {
    const response = await api.get("/members/appointment", {
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
