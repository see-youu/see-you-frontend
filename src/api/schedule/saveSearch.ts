import { getCookie } from "@/utils/cookie";
import { api } from "../api";
import { KeywordType, PlaceType } from "@/types/scheduleType";

interface SearchResponse {
  histories: KeywordType[];
}

export const fetchRecentSearch = async () => {
  try {
    const response = await api.get<SearchResponse>("/history", {
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching recent search:", error);
  }
};

export const saveSearch = async (keyword: string) => {
  try {
    await api.post(
      "/history/keyword",
      { keyword: keyword },
      {
        headers: {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      }
    );
  } catch (error: any) {
    console.error("Error saving search:", error);
    return null;
  }
};

export const saveSearcLocation = async (location: PlaceType) => {
  try {
    await api.post("/history/location", location, {
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
    });
  } catch (error: any) {
    console.error("Error saving search:", error);
  }
};
