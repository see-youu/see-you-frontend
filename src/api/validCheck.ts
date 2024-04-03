import { api } from "./api";
import {
  VALID_CHECK_NICKNAME,
  VALID_CHECK_PHONENUMBER,
  VALID_CHECK_USERNAME,
} from "./endPoints";

export const validCheckUsername = async (username: string) => {
  try {
    const response = await api.get(`${VALID_CHECK_USERNAME}/${username}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const validCheckNickname = async (nickname: string) => {
  try {
    const response = await api.get(`${VALID_CHECK_NICKNAME}/${nickname}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const validCheckPhoneNumber = async (PhoneNumber: string) => {
  try {
    const response = await api.get(`${VALID_CHECK_PHONENUMBER}/${PhoneNumber}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
