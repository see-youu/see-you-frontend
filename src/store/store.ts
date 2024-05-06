import { configureStore } from "@reduxjs/toolkit";
import isLoginReducer from "./isLoginSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    isLogin: isLoginReducer,
    userInfo: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
