import { getCookie } from "@/utils/cookie";
import { api } from "./api";
import { FRIENDS_REQUEST_LIST, SEARCH_FRIENDS } from "./endPoints";

export const fetchSearchFriendUsername = async (username: string) => {
  try {
    const response = await api.get(SEARCH_FRIENDS, {
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
      params: {
        username,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log("Error fetching search friends result:", error.response);
    return null;
  }
};

export const fetchFriendsRequestList = async () => {
  try {
    const response = await api.get(FRIENDS_REQUEST_LIST, {
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
    });
    return response.data.friendRequests;
  } catch (error: any) {
    console.log("Error fetching search friends result:", error.response);
    return null;
  }
};
