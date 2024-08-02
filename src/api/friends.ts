import { getCookie } from "@/utils/cookie";
import { api } from "./api";
import {
  ACCEPT_FRIEND_REQUEST,
  FRIENDS_LIST,
  FRIENDS_REQUEST_LIST,
  SEARCH_FRIENDS,
  SEND_FRIEND_REQUEST,
} from "./endPoints";

export const fetchFriendList = async () => {
  try {
    const response = await api.get(FRIENDS_LIST, {
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
    });
    return response.data.friends;
  } catch (error: any) {
    console.log("Error fetching search friends result:", error.response);
    return null;
  }
};

export const fetchSearchFriendUsername = async (username: string) => {
  try {
    const response = await api.get(SEARCH_FRIENDS, {
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
      params: {
        username: username,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log("Error fetching search friends result:", error.response);
    return null;
  }
};

export const sendFriendRequest = async (memberId: number) => {
  try {
    const response = await api.post(
      SEND_FRIEND_REQUEST,
      { receiverID: memberId },
      {
        headers: {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.log("Error send request", error.response);
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
    console.log("Error fetching friends request result:", error.response);
    return null;
  }
};

export const acceptFriendRequest = async (requestId: number) => {
  try {
    const response = await api.post(
      ACCEPT_FRIEND_REQUEST,
      { requestId },
      {
        headers: {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      }
    );
    if (response.status === 200) return true;
    else return false;
  } catch (error: any) {
    console.log("Error fetching search friends result:", error.response);
    return null;
  }
};
