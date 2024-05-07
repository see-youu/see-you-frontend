"use client";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function () {
  const userNickname = useSelector(
    (state: RootState) => state.userInfo.nickname
  );
  return <div>{userNickname} 로그인 성공</div>;
}
