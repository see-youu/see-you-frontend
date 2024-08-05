import { configureStore } from "@reduxjs/toolkit";
import isLoginReducer from "./isLoginSlice";
import userReducer from "./userSlice";
import modalReducer from "./modalSlice";

const store = configureStore({
  reducer: {
    isLogin: isLoginReducer,
    userInfo: userReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
