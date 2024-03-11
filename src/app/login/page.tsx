import SocialLoginButton from "@/components/button/SocialLoginButton";
import Link from "next/link";
import React from "react";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-3">
      <h1 className="text-5xl gaegu mb-9 ">나랑노랑</h1>
      <form action="" className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="아이디를 입력하세요."
          className="inline-block h-10 px-2 text-sm border border-gray-400 border-solid rounded w-60"
        />
        <input
          type="password"
          placeholder="비밀번호를 입력하세요."
          className="inline-block h-10 px-2 text-sm border border-gray-400 border-solid rounded w-60"
        />
        <button className="h-10 text-sm rounded bg-customYellow w-60">
          로그인
        </button>
      </form>
      <p className="flex my-2 text-xs divide-x divide-solid ">
        <span className="px-2 cursor-pointer">비밀번호 찾기</span>
        <Link href={"/signup"} className="px-2 cursor-pointer">
          회원가입
        </Link>
      </p>
      <section className="flex flex-col gap-1 my-2 text-sm">
        <SocialLoginButton bgColor="bg-yellow-300" textColor="text-black">
          카카오톡 로그인
        </SocialLoginButton>
        <SocialLoginButton bgColor="bg-green-500">
          네이버 로그인
        </SocialLoginButton>
        <SocialLoginButton bgColor="bg-black">애플 로그인</SocialLoginButton>
      </section>
    </div>
  );
}
