import { getCookie } from "@/utils/cookie";
import { api } from "../api";
import { KeywordType, PlaceType } from "@/types/scheduleType";
import {
  RECENT_SEARCH,
  RECENT_SEARCH_KEYWORD,
  RECENT_SEARCH_LOCATION,
} from "../endPoints";

interface SearchResponse {
  histories: KeywordType[];
}

export const fetchRecentSearch = async () => {
  try {
    const response = await api.get<SearchResponse>(RECENT_SEARCH, {
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
      RECENT_SEARCH_KEYWORD,
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
    await api.post(RECENT_SEARCH_LOCATION, location, {
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
    });
  } catch (error: any) {
    console.error("Error saving search:", error);
  }
};

export const deleteSearch = async (id: number) => {
  try {
    await api.delete(RECENT_SEARCH, {
      data: {
        historyId: id,
      },
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
    });
  } catch (error: any) {
    console.error("Error delete search:", error);
  }
};
