import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IsLoginState {
  value: boolean;
}
const initialState: IsLoginState = {
  value: false,
};
export const isLoginSlice = createSlice({
  name: "isLogin",
  initialState,
  reducers: {
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setIsLogin } = isLoginSlice.actions;

export default isLoginSlice.reducer;
