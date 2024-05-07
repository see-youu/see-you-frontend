"use client";
import Menubar from "@/components/menubar/menubar";
import { getUsername } from "@/utils/jwtToken";

export default function () {
  const userNickname = getUsername();
  return (
    <div className="bg-yellow-50">
      <span>{userNickname} 로그인 성공</span>
      <Menubar />
    </div>
  );
}
