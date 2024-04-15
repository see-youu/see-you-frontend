import { api } from "./api";
import { SIGNIN_USER } from "./endPoints";

type SigninType = {
  username: string;
  password: string;
};

export const signinUser = async (user: SigninType) => {
  try {
    const response = await api.post(`${SIGNIN_USER}`, user);
    if (response?.status === 200) return true;
    else return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};
