import { UserType } from "@/types/userType";
import { api } from "./api";
import { SIGNUP_USER } from "./endPoints";

export const signupUser = async (user: UserType) => {
  try {
    const response = await api.post(`${SIGNUP_USER}`, user);
    if (response?.status === 201) {
      window.alert("회원가입이 완료되었습니다.");
      return true;
    }
  } catch (err) {
    console.error(err);
    window.alert("회원가입에 실패하였습니다.");
    return false;
  }
};
