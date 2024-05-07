import { jwtDecode } from "jwt-decode";
import { getCookie } from "./cookie";

interface User {
  username: string;
}

export const getUsername = () => {
  const jwtToken = getCookie("jwtToken");
  const decodeToken = jwtDecode<User>(jwtToken);
  return decodeToken.username;
};
