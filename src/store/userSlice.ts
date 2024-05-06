import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { JwtPayload, jwtDecode } from "jwt-decode";

interface UserInfo {
  nickname: string;
}

const initialState: UserInfo = {
  nickname: "",
};

interface CustomJwtPayload extends JwtPayload {
  username: string;
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<string>) => {
      const decodeToken = jwtDecode<CustomJwtPayload>(action.payload);
      state.nickname = decodeToken.username;
    },
    clearUserInfo: (state) => {
      state.nickname = "";
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;

export default userSlice.reducer;
